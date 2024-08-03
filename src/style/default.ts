import type { LayerSpecification } from "maplibre-gl";

export const defaultLayers: Array<LayerSpecification> = [
  {
    filter: ["any", ["has", "building"], ["has", "building:part"]],
    id: "buildings-background",
    type: "fill",
    source: "indoor",
    paint: {
      "fill-color": "#E6E4E0",
      "fill-opacity": {
        base: 1,
        stops: [
          [16.5, 0],
          [18, 1],
        ],
      },
    },
  },
  {
    filter: ["==", "indoor", "level"],
    id: "level-background",
    type: "fill",
    source: "indoor",
    paint: {
      "fill-color": "#E6E4E0",
      "fill-opacity": {
        base: 1,
        stops: [
          [16.5, 0],
          [18, 1],
        ],
      },
    },
  },
  {
    id: "indoor-gardens",
    type: "fill",
    source: "indoor",
    filter: ["==", "leisure", "garden"],
    layout: {
      visibility: "visible",
    },
    paint: {
      "fill-color": "#cde8a2",
      "fill-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [18, 1],
        ],
      },
    },
  },
  {
    filter: ["==", "amenity", "parking"],
    id: "indoor-parkings",
    type: "fill",
    source: "indoor",
    paint: {
      "fill-color": "#D7CCC8",
      "fill-outline-color": "#000000",
      "fill-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [18, 1],
        ],
      },
    },
  },
  {
    filter: ["==", "amenity", "parking"],
    id: "indoor-parkings-patterns",
    type: "fill",
    source: "indoor",
    paint: {
      "fill-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [18, 0.1],
        ],
      },
      "fill-pattern": "si-main-3",
      "fill-translate-anchor": "viewport",
    },
  },
  {
    filter: ["==", "indoor", "corridor"],
    id: "indoor-corridors",
    type: "fill",
    source: "indoor",
    paint: {
      "fill-color": "#D7CCC8",
      "fill-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [18, 1],
        ],
      },
    },
  },
  {
    filter: [
      "any",
      ["filter-in-small", "indoor", ["literal", ["room", "area"]]],
      ["==", "railway", "platform"],
    ],
    id: "indoor-rooms",
    type: "fill",
    source: "indoor",
    paint: {
      "fill-color": "#A1887F",
      "fill-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [18, 1],
        ],
      },
    },
  },
  {
    filter: ["any", ["==", "indoor", "room"]],
    id: "indoor-rooms-borders",
    type: "line",
    source: "indoor",
    paint: {
      "line-color": "#000",
      "line-width": 1,
      "line-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [18, 1],
        ],
      },
    },
  },
  {
    filter: ["==", "indoor", "area"],
    id: "indoor-areas",
    type: "fill",
    source: "indoor",
    paint: {
      "fill-color": "#D7CCC8",
      "fill-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [18, 1],
        ],
      },
    },
  },
  {
    filter: ["all", ["==", "highway", "pedestrian"], ["has", "level"]],
    id: "indoor-highways-area",
    type: "fill",
    source: "indoor",
    paint: {
      "fill-color": {
        base: 1,
        stops: [
          [16, "hsl(230, 16%, 94%)"],
          [16.25, "hsl(230, 50%, 98%)"],
        ],
      },
      "fill-outline-color": "hsl(230, 26%, 88%)",
      "fill-opacity": 1,
    },
  },
  {
    filter: ["all", ["==", "highway", "pedestrian"], ["has", "level"]],
    id: "indoor-highways-area-pattern",
    type: "fill",
    source: "indoor",
    paint: {
      "fill-color": "hsl(0, 0%, 100%)",
      "fill-outline-color": "hsl(35, 10%, 83%)",
      "fill-pattern": "pedestrian-polygon",
      "fill-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [18, 1],
        ],
      },
    },
  },
  {
    filter: ["all", ["==", "indoor", "area"], ["==", "balcony", "yes"]],
    id: "indoor-balcony",
    type: "fill",
    source: "indoor",
    paint: {
      "fill-color": "#BDBDBD",
      "fill-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [18, 1],
        ],
      },
    },
  },
  {
    filter: [
      "any",
      ["==", "stairs", "yes"],
      ["==", "elevator", "yes"],
      ["==", "highway", "elevator"],
    ],
    id: "indoor-stairs",
    type: "fill",
    source: "indoor",
    paint: {
      "fill-color": "#7B635A",
      "fill-outline-color": "#000000",
      "fill-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [18, 1],
        ],
      },
    },
  },
  {
    filter: ["==", "indoor", "wall"],
    id: "indoor-walls",
    type: "line",
    source: "indoor",
    paint: {
      "line-color": "#000000",
      "line-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [18, 1],
        ],
      },
    },
  },
  {
    filter: ["has", "barrier"],
    id: "indoor-barriers",
    type: "line",
    source: "indoor",
    paint: {
      "line-color": "#000000",
      "line-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [18, 1],
        ],
      },
    },
  },
  {
    filter: ["==", "indoor", "block"],
    id: "indoor-blocks",
    type: "fill",
    source: "indoor",
    paint: {
      "fill-color": "#000000",
      "fill-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [18, 1],
        ],
      },
    },
  },
  {
    filter: ["==", "handrail", "yes"],
    id: "indoor-handrail",
    type: "line",
    source: "indoor",
    paint: {
      "line-color": "#000000",
      "line-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [19, 1],
        ],
      },
    },
  },
  {
    filter: ["==", "railway", "rail"],
    id: "indoor-rails",
    type: "line",
    source: "indoor",
    paint: {
      "line-color": "hsl(230, 10%, 74%)",
      "line-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [19, 1],
        ],
      },
    },
  },
  {
    filter: ["==", "railway", "rail"],
    id: "indoor-rails-tracks",
    type: "line",
    source: "indoor",
    paint: {
      "line-color": "hsl(230, 10%, 74%)",
      "line-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [19, 1],
        ],
      },
      "line-width": {
        base: 1.5,
        stops: [
          [14, 4],
          [20, 8],
        ],
      },
      "line-dasharray": [0.1, 15],
    },
  },
  {
    filter: [
      "any",
      [
        "filter-in-small",
        "indoor",
        [
          "literal",
          [
            "table",
            "cupboard",
            "chair",
            "kitchen",
            "sofa",
            "tv",
            "shelf",
            "furniture-item",
          ],
        ],
      ],
      ["==", "trashcan", "yes"],
      ["==", "copier", "yes"],
      ["==", "amenity", "vending_machine"],
    ],
    id: "indoor-furniture",
    type: "fill",
    source: "indoor",
    paint: {
      "fill-color": "#000",
      "fill-outline-color": "#000",
      "fill-opacity": {
        base: 1,
        stops: [
          [18, 0],
          [19, 0.2],
        ],
      },
    },
  },
  {
    id: "indoor-steps",
    paint: {
      "line-width": {
        base: 1.5,
        stops: [
          [17, 1],
          [18, 1.6],
          [19, 6],
        ],
      },
      "line-color": "hsl(0, 0%, 100%)",
      "line-dasharray": {
        base: 1,
        stops: [
          [17, [1, 0]],
          [17.5, [1.75, 1]],
          [18, [1, 0.75]],
          [19, [0.3, 0.3]],
        ],
      },
      "line-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [17.25, 1],
        ],
      },
    },
    type: "line",
    source: "indoor",
    filter: ["all", ["==", "highway", "steps"], ["!", ["has", "conveying"]]],
    layout: {
      "line-join": "round",
    },
  },
  {
    id: "indoor-conveying",
    paint: {
      "line-width": {
        base: 1.5,
        stops: [
          [17, 1],
          [18, 1.6],
          [19, 6],
        ],
      },
      "line-color": "#FF0000",
      "line-dasharray": {
        base: 1,
        stops: [
          [17, [1, 0]],
          [17.5, [1.75, 1]],
          [18, [1, 0.75]],
          [19, [0.3, 0.3]],
        ],
      },
      "line-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [17.25, 1],
        ],
      },
    },
    type: "line",
    source: "indoor",
    filter: ["all", ["==", "highway", "steps"], ["has", "conveying"]],
    layout: {
      "line-join": "round",
    },
  },
  {
    interactive: true,
    minzoom: 17,
    layout: {
      "text-line-height": 1.2,
      "text-size": {
        base: 1,
        stops: [
          [17, 10],
          [20, 12],
        ],
      },
      "text-allow-overlap": false,
      "text-ignore-placement": false,
      "text-max-angle": 38,
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Regular"],
      "symbol-placement": "point",
      "text-padding": 2,
      visibility: "visible",
      "text-rotation-alignment": "viewport",
      "text-anchor": "center",
      "text-field": "{name}",
      "text-letter-spacing": 0.02,
      "text-max-width": 8,
    },
    filter: ["==", "indoor", "room"],
    type: "symbol",
    source: "indoor",
    id: "poi-indoor-text-ref",
    paint: {
      "text-color": "#65513d",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1,
      "text-opacity": {
        base: 1,
        stops: [
          [18, 0],
          [18.5, 0.5],
          [19, 1],
        ],
      },
    },
  },
  {
    interactive: true,
    minzoom: 17,
    layout: {
      "text-line-height": 1.2,
      "icon-size": {
        base: 1,
        stops: [
          [17, 0.5],
          [20, 1],
        ],
      },
      "text-size": {
        base: 1,
        stops: [
          [17, 11],
          [20, 13],
        ],
      },
      "text-allow-overlap": false,
      "icon-image": "{maki}-15",
      "icon-anchor": "center",
      "text-ignore-placement": false,
      "text-max-angle": 38,
      "symbol-spacing": 250,
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Regular"],
      "symbol-placement": "point",
      "text-padding": 2,
      visibility: "visible",
      "text-offset": [0, 1],
      "icon-optional": false,
      "text-rotation-alignment": "viewport",
      "text-anchor": "top",
      "text-field": "{name}",
      "text-letter-spacing": 0.02,
      "text-max-width": 8,
      "icon-allow-overlap": true,
    },
    filter: ["boolean", false],
    type: "symbol",
    source: "indoor",
    id: "poi-indoor",
    paint: {
      "text-color": "#65513d",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1,
      "text-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [17.5, 0.5],
          [19, 1],
        ],
      },
      "icon-opacity": {
        base: 1,
        stops: [
          [17, 0],
          [17.5, 0.5],
          [19, 1],
        ],
      },
    },
  },
];
