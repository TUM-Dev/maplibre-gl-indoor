import type { BBox } from "geojson";
import type {
  ExpressionSpecification,
  LayerSpecification,
  Map,
} from "maplibre-gl";

import { default as turfDistance } from "@turf/distance";

import type { Level } from "./Types";

import { bboxCenter, overlap } from "./bbox";
import IndoorMap from "./IndoorMap";
import { filterWithLevel } from "./levelFilter";

type SavedFilter = {
  filter: ExpressionSpecification;
  layerId: string;
};

const SOURCE_ID = "indoor";

/**
 * Manage indoor levels
 * @param {Map} map the Maplibre map
 */
export default class IndoorLayer {
  _indoorMaps: Array<IndoorMap>;
  _level: Level | null;

  _map: Map;
  _mapLoadedPromise: Promise<void>;
  _previousSelectedLevel: Level | null;
  _previousSelectedMap: IndoorMap | null;

  _savedFilters: Array<SavedFilter>;
  _selectedMap: IndoorMap | null;

  _updateMapPromise: Promise<void>;

  constructor(map: Map) {
    this._map = map;
    this._level = null;

    this._indoorMaps = [];
    this._savedFilters = [];
    this._selectedMap = null;
    this._previousSelectedMap = null;
    this._previousSelectedLevel = null;
    this._updateMapPromise = Promise.resolve();

    if (this._map.loaded()) {
      this._mapLoadedPromise = Promise.resolve();
    } else {
      this._mapLoadedPromise = new Promise((resolve) =>
        this._map.on("load", resolve),
      );
    }

    this._map.on("moveend", () => this._updateSelectedMapIfNeeded());
  }

  _addLayerForFiltering(layer: LayerSpecification, beforeLayerId?: string) {
    this._map.addLayer(layer, beforeLayerId);
    this._savedFilters.push({
      filter: (this._map.getFilter(layer.id) as ExpressionSpecification) || [
        "all",
      ],
      layerId: layer.id,
    });
  }

  _closestMap() {
    // TODO enhance this condition
    if (this._map.getZoom() < 16.5) {
      return null;
    }

    const cameraBounds = this._map.getBounds();
    const cameraBoundsTurf = [
      cameraBounds.getWest(),
      cameraBounds.getSouth(),
      cameraBounds.getEast(),
      cameraBounds.getNorth(),
    ] as BBox;
    const mapsInBounds = this._indoorMaps.filter((indoorMap) =>
      overlap(indoorMap.bounds, cameraBoundsTurf),
    );

    if (mapsInBounds.length === 0) {
      return null;
    }

    if (mapsInBounds.length === 1) {
      return mapsInBounds[0];
    }

    /*
     * If there is multiple maps at this step, select the closest
     */
    let minDist = Number.POSITIVE_INFINITY;
    let closestMap = mapsInBounds[0];
    for (const map of mapsInBounds) {
      const _dist = turfDistance(
        bboxCenter(map.bounds),
        bboxCenter(cameraBoundsTurf),
      );
      if (_dist < minDist) {
        closestMap = map;
        minDist = _dist;
      }
    }
    return closestMap;
  }

  _removeLayerForFiltering(layerId: string) {
    this._savedFilters = this._savedFilters.filter(
      ({ layerId: id }) => layerId !== id,
    );
    this._map.removeLayer(layerId);
  }

  /**
   * ***********************
   * Handle level change
   * ***********************
   */

  _updateFiltering() {
    const level = this._level;

    let filterFn: (filter: ExpressionSpecification) => ExpressionSpecification;
    if (level !== null) {
      const showFeaturesWithEmptyLevel = this._selectedMap
        ? this._selectedMap.showFeaturesWithEmptyLevel
        : false;
      filterFn = (filter: ExpressionSpecification) =>
        filterWithLevel(filter, level, showFeaturesWithEmptyLevel);
    } else {
      filterFn = (filter: ExpressionSpecification): ExpressionSpecification =>
        filter;
    }

    this._savedFilters.forEach(({ filter, layerId }) => {
      this._map.setFilter(layerId, filterFn(filter));
    });
    // one can use the following to see the generated style
    // console.log(structuredClone(this._map.getStyle()));
  }

  _updateSelectedMap(indoorMap: IndoorMap | null) {
    const previousMap = this._selectedMap;

    // Remove the previous selected map if it exists
    if (previousMap !== null) {
      previousMap.layersToHide.forEach((layerId) =>
        this._map.setLayoutProperty(layerId, "visibility", "visible"),
      );
      previousMap.layers.forEach(({ id }) => this._removeLayerForFiltering(id));
      this._map.removeSource(SOURCE_ID);

      if (!indoorMap) {
        // Save the previous map level.
        // It enables the user to exit and re-enter, keeping the same level shown.
        this._previousSelectedLevel = this._level;
        this._previousSelectedMap = previousMap;
      }

      this.setLevel(null, false);
      this._map.fire("indoor.map.unloaded", { indoorMap: previousMap });
    }

    this._selectedMap = indoorMap;
    if (!indoorMap) {
      return;
    }

    const { beforeLayerId, geojson, layers, levelsRange } = indoorMap;

    // Add map source
    this._map.addSource(SOURCE_ID, {
      data: geojson,
      type: "geojson",
    });

    // Add layers and save filters
    layers.forEach((layer) => this._addLayerForFiltering(layer, beforeLayerId));

    // Hide layers which can overlap for rendering
    indoorMap.layersToHide.forEach((layerId) =>
      this._map.setLayoutProperty(layerId, "visibility", "none"),
    );

    // Restore the same level when the previous selected map is the same.
    const level =
      this._previousSelectedMap === indoorMap
        ? this._previousSelectedLevel
        : Math.max(
            Math.min(indoorMap.defaultLevel, levelsRange.max),
            levelsRange.min,
          );

    this.setLevel(level, false);

    this._map.fire("indoor.map.loaded", { indoorMap });
  }

  async _updateSelectedMapIfNeeded() {
    await this._mapLoadedPromise;

    // Avoid to call "closestMap" or "updateSelectedMap" if the previous call is not finished yet
    await this._updateMapPromise;
    this._updateMapPromise = (async () => {
      const closestMap = this._closestMap();
      if (closestMap !== this._selectedMap) {
        this._updateSelectedMap(closestMap);
      }
    })();
    await this._updateMapPromise;
  }

  addLayerForFiltering(layer: LayerSpecification, beforeLayerId?: string) {
    this._addLayerForFiltering(layer, beforeLayerId);
    this._updateFiltering();
  }

  async addMap(map: IndoorMap) {
    this._indoorMaps.push(map);
    await this._updateSelectedMapIfNeeded();
  }

  /**
   * **************
   * Handle maps
   * **************
   */

  getLevel(): Level | null {
    return this._level;
  }

  getSelectedMap(): IndoorMap | null {
    return this._selectedMap;
  }

  removeLayerForFiltering(layerId: string) {
    this._removeLayerForFiltering(layerId);
    this._updateFiltering();
  }

  async removeMap(map: IndoorMap) {
    this._indoorMaps = this._indoorMaps.filter(
      (_indoorMap) => _indoorMap !== map,
    );
    await this._updateSelectedMapIfNeeded();
  }

  setLevel(level: Level | null, fireEvent: boolean = true): void {
    if (this._selectedMap === null) {
      throw new Error("Cannot set level, no map has been selected");
    }

    this._level = level;
    this._updateFiltering();
    if (fireEvent) {
      this._map.fire("indoor.level.changed", { level });
    }
  }
}
