import type {
    Map,
    Listener,
    LayerSpecification,
} from 'maplibre-gl';

import type IndoorLayer from './IndoorLayer';

export type Level = number;

export type LevelsRange = {
    min: Level,
    max: Level
};

export type IndoorMapOptions = {
    beforeLayerId?: string,
    defaultLevel?: number,
    layers?: Array<LayerSpecification>,
    layersToHide?: Array<string>,
    showFeaturesWithEmptyLevel?: boolean
}

export type IndoorMapEvent = 'indoor.map.loaded'
    | 'indoor.map.unloaded'
    | 'indoor.level.changed';

export type MaplibreMapWithIndoor = Map & {
    indoor: IndoorLayer,
    on(type: IndoorMapEvent, listener: Listener): Map;
    off(type: IndoorMapEvent, listener: Listener): Map;
};

export type MapGLWithIndoor = MaplibreMapWithIndoor;
