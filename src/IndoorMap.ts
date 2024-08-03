import Style from "./style";
import GeoJsonHelper from "./GeojsonHelper";

import type {IndoorMapOptions, LevelsRange} from "./Types";
import type {LayerSpecification} from "maplibre-gl";
import type {BBox, FeatureCollection, Geometry} from "geojson";

class IndoorMap {
  bounds: BBox;
  geojson: FeatureCollection<Geometry>;
  layers: Array<LayerSpecification>;
  levelsRange: LevelsRange;
  beforeLayerId?: string;
  layersToHide: Array<string>;
  defaultLevel: number;
  showFeaturesWithEmptyLevel: boolean;

  constructor(
    bounds: BBox,
    geojson: FeatureCollection<Geometry>,
    layers: Array<LayerSpecification>,
    levelsRange: LevelsRange,
    layersToHide: Array<string>,
    defaultLevel: number,
    showFeaturesWithEmptyLevel: boolean,
    beforeLayerId?: string,
  ) {
    this.bounds = bounds;
    this.geojson = geojson;
    this.layers = layers;
    this.levelsRange = levelsRange;
    this.layersToHide = layersToHide;
    this.defaultLevel = defaultLevel;
    this.showFeaturesWithEmptyLevel = showFeaturesWithEmptyLevel;
    this.beforeLayerId = beforeLayerId;
  }

  static fromGeojson(
    geojson: FeatureCollection<Geometry>,
    options: IndoorMapOptions = {},
  ) {
    const { bounds, levelsRange } =
      GeoJsonHelper.extractLevelsRangeAndBounds(geojson);

    return new IndoorMap(
        bounds,
        geojson,
        options.layers ? options.layers : Style.DefaultLayers,
        levelsRange,
        options.layersToHide ? options.layersToHide : [],
        options.defaultLevel ? options.defaultLevel : 0,
        options.showFeaturesWithEmptyLevel
            ? options.showFeaturesWithEmptyLevel
            : false,
        options.beforeLayerId,
    );
  }
}

export default IndoorMap;
