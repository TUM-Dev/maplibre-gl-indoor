import type { BBox } from "geojson";
import type { Map } from "maplibre-gl";

import { default as turfDestination } from "@turf/destination";
import { default as turfDistance } from "@turf/distance";

import type { IndoorMapOptions, MapGLWithIndoor } from "./Types";

import addIndoorTo from "./addIndoorTo";
import IndoorMap from "./IndoorMap";
import { bboxContains } from "./Utils";

type RemoteMap = {
  indoorMap?: IndoorMap;
  name: string;
  path: string;
};

const MIN_ZOOM_TO_DOWNLOAD = 17;
const AREA_TO_DOWNLOAD = 1000; // in terms of distance from user

class MapServerHandler {
  downloadedBounds: BBox | null;

  indoorMapOptions?: IndoorMapOptions;
  loadMapsPromise: Promise<void> = Promise.resolve();
  map: MapGLWithIndoor;

  remoteMapsDownloaded: RemoteMap[];

  serverUrl: string;

  private constructor(
    serverUrl: string,
    map: MapGLWithIndoor,
    indoorMapOptions?: IndoorMapOptions,
  ) {
    this.serverUrl = serverUrl;
    this.map = map;
    this.indoorMapOptions = indoorMapOptions;
    this.remoteMapsDownloaded = [];
    this.downloadedBounds = null;

    if (map.loaded()) {
      this.loadMapsIfNecessary();
    } else {
      map.on("load", () => this.loadMapsIfNecessary());
    }
    map.on("move", () => this.loadMapsIfNecessary());
  }

  static manage(server: string, map: Map, indoorMapOptions?: IndoorMapOptions) {
    return new MapServerHandler(server, addIndoorTo(map), indoorMapOptions);
  }

  private async addCustomMap(map: RemoteMap) {
    const geojson = await (await fetch(this.serverUrl + map.path)).json();
    map.indoorMap = IndoorMap.fromGeojson(geojson, this.indoorMapOptions);
    await this.map.indoor.addMap(map.indoorMap);
    this.remoteMapsDownloaded.push(map);
  }

  private async loadMapsIfNecessary() {
    if (this.map.getZoom() < MIN_ZOOM_TO_DOWNLOAD) {
      return;
    }

    const viewPort = this.map.getBounds();
    if (this.downloadedBounds !== null) {
      if (
        bboxContains(
          this.downloadedBounds,
          viewPort.getNorthEast().toArray(),
        ) &&
        bboxContains(this.downloadedBounds, viewPort.getSouthWest().toArray())
      ) {
        // Maps of the viewport have already been downloaded.
        return;
      }
    }

    const distanceEastWest = turfDistance(
      viewPort.getNorthEast().toArray(),
      viewPort.getNorthWest().toArray(),
    );
    const distanceNorthSouth = turfDistance(
      viewPort.getNorthEast().toArray(),
      viewPort.getSouthEast().toArray(),
    );
    // It is not necessary to compute others as we are at zoom >= 17, the approximation is enough.
    const maxDistanceOnScreen = Math.max(distanceEastWest, distanceNorthSouth);
    const bestSizeOfAreaToDownload = Math.max(
      AREA_TO_DOWNLOAD,
      maxDistanceOnScreen * 2,
    );

    const center = this.map.getCenter();
    const dist = bestSizeOfAreaToDownload * Math.sqrt(2);
    const northEast = turfDestination(center.toArray(), dist, Math.PI / 4)
      .geometry.coordinates;
    const southWest = turfDestination(
      center.toArray(),
      dist,
      (-3 * Math.PI) / 4,
    ).geometry.coordinates;
    const boundsToDownload = [
      southWest[1],
      southWest[0],
      northEast[1],
      northEast[0],
    ] as BBox;

    // TODO: I put this here because fetch is async and takes more time than the next call to loadMapsIfNecessary.
    this.downloadedBounds = boundsToDownload;

    await this.loadMapsPromise;
    this.loadMapsPromise = this.loadMapsInBounds(boundsToDownload);
  }

  private async loadMapsInBounds(bounds: BBox) {
    const url =
      this.serverUrl +
      `/maps-in-bounds/${bounds[0]},${bounds[1]},${bounds[2]},${bounds[3]}`;
    const maps: RemoteMap[] = await (await fetch(url)).json();
    const mapsToRemove: RemoteMap[] = [];
    const mapsToAdd: RemoteMap[] = [];
    for (const map of maps) {
      if (!maps.find((_map) => _map.path === map.path)) {
        mapsToRemove.push(map);
      } else if (
        !this.remoteMapsDownloaded.find((_map) => _map.path === map.path)
      ) {
        mapsToAdd.push(map);
      }
    }

    mapsToAdd.forEach(this.addCustomMap.bind(this));
    mapsToRemove.forEach(this.removeCustomMap.bind(this));
  }

  private async removeCustomMap(map: RemoteMap) {
    await this.map.indoor.removeMap(map.indoorMap!);
    this.remoteMapsDownloaded.splice(this.remoteMapsDownloaded.indexOf(map), 1);
  }
}

export default MapServerHandler;
