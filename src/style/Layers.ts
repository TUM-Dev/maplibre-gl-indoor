import type {
  ExpressionSpecification,
  LayerSpecification,
  SymbolLayerSpecification,
} from "maplibre-gl";

import { defaultLayers } from "./default";

let layers = defaultLayers;
/**
 * Transform the generic "poi-indoor" layer into multiple layers using filters based on OSM tags
 */

const POI_LAYER_ID = "poi-indoor";

type FilterMakiEntry = {
  filter: ExpressionSpecification;
  maki: string;
};

const OSM_SHOPS: { maki: string; shop: string }[] = [
  { maki: "suitcase", shop: "travel_agency" },
  { maki: "grocery", shop: "convenience" },
  { maki: "bakery", shop: "bakery" },
  { maki: "pharmacy", shop: "chemist" },
  { maki: "clothing-store", shop: "clothes" },
];

const OSM_FILTER_MAPBOX_MAKI_LIST: FilterMakiEntry[] = [
  { filter: ["==", ["get", "amenity"], "fast_food"], maki: "fast-food" },
  { filter: ["==", ["get", "amenity"], "restaurant"], maki: "restaurant" },
  { filter: ["==", ["get", "amenity"], "cafe"], maki: "cafe" },
  {
    filter: [
      "in",
      ["get", "amenity"],
      ["literal", ["bank", "vending_machine"]],
    ],
    maki: "bank",
  },
  { filter: ["==", ["get", "amenity"], "toilets"], maki: "toilet" },
  {
    filter: [
      "any",
      ["==", ["get", "highway"], "elevator"],
      ["has", "elevator"],
    ],
    maki: "triangle-stroked",
  },
  { filter: ["==", ["get", "natural"], "tree"], maki: "park" },
  { filter: ["==", ["get", "highway"], "steps"], maki: "entrance" },
  ...OSM_SHOPS.map(
    ({ maki, shop }) =>
      ({ filter: ["==", ["get", "shop"], shop], maki }) as FilterMakiEntry,
  ),
];

function createPoiLayers(
  metaLayer: SymbolLayerSpecification,
): Array<SymbolLayerSpecification> {
  const shops: string[] = OSM_SHOPS.map((val) => val.shop);
  OSM_FILTER_MAPBOX_MAKI_LIST.push({
    filter: ["in", ["get", "shop"], ["literal", shops]],
    maki: "shop",
  });

  return OSM_FILTER_MAPBOX_MAKI_LIST.map((poi) => {
    const newLayer: LayerSpecification = Object.assign({}, metaLayer);
    newLayer.id += `-${poi.maki}`;
    newLayer.filter = poi.filter;
    newLayer.layout = Object.assign({}, metaLayer.layout);
    newLayer.layout["icon-image"] = poi.maki;
    return newLayer;
  });
}

const poiLayer = layers.find((layer) => layer.id === POI_LAYER_ID);
if (poiLayer) {
  // Convert poi-indoor layer into several poi-layers
  createPoiLayers(poiLayer as SymbolLayerSpecification).forEach((_layer) =>
    layers.push(_layer),
  );
  layers = layers.filter((layer) => layer.id !== POI_LAYER_ID);
}

export default layers;
