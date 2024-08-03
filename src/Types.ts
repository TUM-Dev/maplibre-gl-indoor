import type { LayerSpecification, Listener, Map } from "maplibre-gl";

import type IndoorLayer from "./IndoorLayer";

export type Level = number;

export type LevelsRange = {
  max: Level;
  min: Level;
};

export type IndoorMapOptions = {
  beforeLayerId?: string;
  defaultLevel?: number;
  layers?: Array<LayerSpecification>;
  layersToHide?: Array<string>;
  showFeaturesWithEmptyLevel?: boolean;
};

export type IndoorMapEvent =
  | "indoor.level.changed"
  | "indoor.map.loaded"
  | "indoor.map.unloaded";

export type MaplibreMapWithIndoor = {
  indoor: IndoorLayer;
  off(type: IndoorMapEvent, listener: Listener): Map;
  on(type: IndoorMapEvent, listener: Listener): Map;
} & Map;

export type MapGLWithIndoor = MaplibreMapWithIndoor;
