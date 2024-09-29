import type { LayerSpecification } from "maplibre-gl";

export const defaultLayers: Array<LayerSpecification> = [
  {
    filter: ["any", ["has", "building"], ["has", "building:part"]],
    id: "buildings-background",
    minzoom: 16.5,
    paint: {
      "fill-color": "#FFFFFF",
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
    },
    source: "indoor",
    type: "fill",
  },
  //   unsure if the level is not better displayed :shrug: ..
  //   {
  //    filter: ["==", ["get", "indoor"], "level"],
  //    id: "indoor-level",
  //    minzoom: 16.5,
  //    paint: {
  //      "fill-color": "#b9e1ff",
  //      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
  //    },
  //    source: "indoor",
  //    type: "fill",
  //  },
  {
    filter: ["==", ["get", "leisure"], "garden"],
    id: "indoor-gardens",
    minzoom: 16.5,
    paint: {
      "fill-color": "#D8E5A4",
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
    },
    source: "indoor",
    type: "fill",
  },
  {
    filter: ["==", ["get", "amenity"], "parking"],
    id: "indoor-parkings",
    minzoom: 16.5,
    paint: {
      "fill-color": "#fbeada",
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
      "fill-outline-color": "#000000",
    },
    source: "indoor",
    type: "fill",
  },
  {
    filter: ["==", ["get", "amenity"], "parking"],
    id: "indoor-parkings-patterns",
    minzoom: 16.5,
    paint: {
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 0.1],
      "fill-pattern": "si-main-3",
      "fill-translate-anchor": "viewport",
    },
    source: "indoor",
    type: "fill",
  },
  {
    filter: [
      "any",
      ["==", ["get", "indoor"], "room"],
      ["==", ["get", "indoor"], "area"],
      ["==", ["get", "railway"], "platform"],
    ],
    id: "indoor-rooms",
    minzoom: 16.5,
    paint: {
      "fill-color": "#e0e0e0",
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
    },
    source: "indoor",
    type: "fill",
  },
  {
    filter: [
      "all",
      [
        "any",
        ["==", ["get", "indoor"], "room"],
        ["==", ["get", "indoor"], "area"],
        ["==", ["get", "railway"], "platform"],
      ],
      ["==", ["get", "access"], "no"],
    ],
    id: "indoor-rooms-no-access",
    minzoom: 16.5,
    paint: {
      "fill-color": "#878787",
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
    },
    source: "indoor",
    type: "fill",
  },
  {
    filter: [
      "any",
      ["==", ["get", "indoor"], "room"],
      ["==", ["get", "indoor"], "area"],
      ["==", ["get", "railway"], "platform"],
    ],
    id: "indoor-rooms-walls",
    minzoom: 16.5,
    paint: {
      "line-color": "#000",
      "line-offset": 1,
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
    },
    source: "indoor",
    type: "line",
  },
  {
    filter: ["==", ["get", "indoor"], "room"],
    id: "indoor-rooms-borders",
    minzoom: 16.5,
    paint: {
      "line-color": "#000",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
    },
    source: "indoor",
    type: "line",
  },
  {
    filter: [
      "all",
      ["any", ["==", ["get", "indoor"], "door"], ["has", "door"]],
      ["!", ["has", "entrance"]],
      ["!=", ["get", "access"], "no"],
    ],
    id: "indoor-doors",
    minzoom: 16.5,
    paint: {
      "circle-color": "#e0e0e0",
      "circle-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
      "circle-radius": [
        "interpolate",
        ["exponential", 2],
        ["zoom"],
        10,
        ["*", ["*", 0.5, ["number", ["get", "width"], 1.6]], ["^", 2, -6]],
        24,
        ["*", ["*", 0.5, ["number", ["get", "width"], 1.6]], ["^", 2, 8]],
      ],
    },
    source: "indoor",
    type: "circle",
  },
  {
    filter: ["==", ["get", "highway"], "pedestrian"],
    id: "indoor-highways-area",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["zoom"],
        16,
        "hsl(230, 16%, 94%)",
        16.25,
        "hsl(230, 50%, 98%)",
      ],
      "fill-opacity": 1,
      "fill-outline-color": "hsl(230, 26%, 88%)",
    },
    source: "indoor",
    type: "fill",
  },
  {
    filter: ["==", ["get", "highway"], "pedestrian"],
    id: "indoor-highways-area-pattern",
    minzoom: 16.5,
    paint: {
      "fill-color": "hsl(0, 0%, 100%)",
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
      "fill-outline-color": "hsl(35, 10%, 83%)",
      "fill-pattern": "pedestrian-polygon",
    },
    source: "indoor",
    type: "fill",
  },
  {
    filter: [
      "any",
      ["==", ["get", "indoor"], "corridor"],
      ["==", ["get", "room"], "stairs"],
    ],
    id: "indoor-corridors",
    minzoom: 16.5,
    paint: {
      "fill-color": "#b9e1ff",
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
    },
    source: "indoor",
    type: "fill",
  },
  {
    filter: ["==", ["get", "indoor"], "area"],
    id: "indoor-area",
    minzoom: 16.5,
    paint: {
      "fill-antialias": true, // otherwise the outline is invisible sometimes..,
      "fill-color": "#8dd1fc",
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
      "fill-outline-color": "#000",
    },
    source: "indoor",
    type: "fill",
  },
  {
    filter: [
      "all",
      ["==", ["get", "indoor"], "area"],
      ["==", ["get", "balcony"], "yes"],
    ],
    id: "indoor-balcony",
    minzoom: 16.5,
    paint: {
      "fill-color": "#BDBDBD",
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
    },
    source: "indoor",
    type: "fill",
  },
  {
    filter: [
      "any",
      ["==", ["get", "elevator"], "yes"],
      ["==", ["get", "highway"], "elevator"],
    ],
    id: "indoor-elevators-below",
    minzoom: 16.5,
    paint: {
      "fill-antialias": true,
      "fill-color": "#b9e1ff",
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
      "fill-outline-color": "#000000",
    },
    source: "indoor",
    type: "fill",
  },
  {
    filter: [
      "all",
      ["==", ["get", "door"], "sliding"],
      ["==", ["get", "automatic_door"], "button"],
      ["!=", ["get", "access"], "no"],
    ],
    id: "indoor-elevator-doors",
    metadata: {
      "maputnik:comment":
        "Overlaying with the base color makes a ~~door~~ *glory-wall*\n:scream:",
    },
    paint: {
      "circle-color": "#b9e1ff",
      "circle-radius": [
        "interpolate",
        ["exponential", 2],
        ["zoom"],
        10,
        ["*", ["*", 0.5, ["number", ["get", "width"], 1.6]], ["^", 2, -6]],
        24,
        ["*", ["*", 0.5, ["number", ["get", "width"], 1.6]], ["^", 2, 8]],
      ],
    },
    source: "indoor",
    type: "circle",
  },
  {
    filter: [
      "any",
      ["==", ["get", "elevator"], "yes"],
      ["==", ["get", "highway"], "elevator"],
    ],
    id: "indoor-elevators-logo",
    layout: {
      "icon-allow-overlap": true,
      "icon-image": "elevator",
      "icon-size": [
        "interpolate",
        ["exponential", 1.8],
        ["zoom"],
        17,
        ["*", 2, ["^", 2, -2]],
        24,
        ["*", 2, ["^", 2, 3]],
      ],
    },
    paint: {
      "icon-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
    },
    source: "indoor",
    type: "symbol",
  },
  {
    filter: ["==", ["get", "indoor"], "wall"],
    id: "indoor-walls",
    paint: {
      "line-color": "#000000",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 17, 0, 18, 1],
      "line-width": 2,
    },
    source: "indoor",
    type: "line",
  },
  {
    filter: ["has", "barrier"],
    id: "indoor-barriers",
    paint: {
      "line-color": "#000000",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 17, 0, 18, 1],
    },
    source: "indoor",
    type: "line",
  },
  {
    filter: ["==", ["get", "indoor"], "block"],
    id: "indoor-blocks",
    paint: {
      "fill-color": "#000000",
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 17, 0, 18, 1],
    },
    source: "indoor",
    type: "fill",
  },
  {
    filter: [
      "all",
      ["==", ["get", "handrail"], "yes"],
      ["!=", ["get", "highway"], "steps"],
    ],
    id: "indoor-handrail",
    paint: {
      "line-color": "#000000",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 17, 0, 19, 1],
    },
    source: "indoor",
    type: "line",
  },
  {
    filter: ["==", ["get", "railway"], "rail"],
    id: "indoor-rails",
    paint: {
      "line-color": "hsl(230, 10%, 74%)",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 17, 0, 19, 1],
    },
    source: "indoor",
    type: "line",
  },
  {
    filter: ["==", ["get", "railway"], "rail"],
    id: "indoor-rails-tracks",
    paint: {
      "line-color": "hsl(230,10%,74%)",
      "line-dasharray": [0.1, 15],
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 17, 0, 19, 1],
      "line-width": [
        "interpolate",
        ["exponential", 1.5],
        ["zoom"],
        14,
        4,
        20,
        8,
      ],
    },
    source: "indoor",
    type: "line",
  },
  {
    filter: [
      "any",
      [
        "in",
        ["get", "indoor"],
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
      ["==", ["get", "trashcan"], "yes"],
      ["==", ["get", "copier"], "yes"],
      ["==", ["get", "amenity"], "vending_machine"],
    ],
    id: "indoor-furniture",
    minzoom: 18,
    paint: {
      "fill-color": "#000",
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 18, 0, 19, 0.2],
      "fill-outline-color": "#000",
    },
    source: "indoor",
    type: "fill",
  },
  {
    filter: [
      "all",
      ["==", ["get", "highway"], "steps"],
      ["!", ["has", "conveying"]],
    ],
    id: "indoor-steps-white-base",
    layout: {
      "line-join": "round",
    },
    minzoom: 17,
    paint: {
      "line-color": "rgba(255, 252, 252, 0.8)",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 17, 0, 17.25, 1],
      "line-width": [
        "interpolate",
        ["exponential", 2],
        ["zoom"],
        10,
        ["*", 1, ["^", 2, -6]],
        24,
        ["*", 1, ["^", 2, 8]],
      ],
    },
    source: "indoor",
    type: "line",
  },
  {
    filter: [
      "all",
      ["==", ["get", "highway"], "steps"],
      ["!", ["has", "conveying"]],
    ],
    id: "indoor-steps-base",
    layout: {
      "line-join": "round",
    },
    minzoom: 17,
    paint: {
      "line-color": "rgba(0, 0, 0, 1)",
      "line-gap-width": [
        "interpolate",
        ["exponential", 2],
        ["zoom"],
        10,
        ["*", 1, ["^", 2, -6]],
        24,
        ["*", 1, ["^", 2, 8]],
      ],
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 17, 0, 17.25, 1],
      "line-width": [
        "interpolate",
        ["exponential", 2],
        ["zoom"],
        10,
        ["*", 0.1, ["^", 2, -6]],
        24,
        ["*", 0.1, ["^", 2, 8]],
      ],
    },
    source: "indoor",
    type: "line",
  },
  {
    filter: [
      "all",
      ["all", ["==", ["get", "highway"], "steps"], ["!", ["has", "conveying"]]],
    ],
    id: "indoor-steps-black",
    layout: {
      "line-join": "round",
    },
    minzoom: 17,
    paint: {
      "line-color": "rgba(0, 0, 0, 1)",
      "line-dasharray": [
        "step",
        ["zoom"],
        ["literal", [0, 1]],
        20,
        ["literal", [0.1, 0.4]],
        21,
        ["literal", [0.1, 0.3]],
        22,
        ["literal", [0.05, 0.2]],
      ],
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 17, 0, 17.25, 1],
      "line-width": [
        "interpolate",
        ["exponential", 2],
        ["zoom"],
        10,
        ["*", 1, ["^", 2, -6]],
        24,
        ["*", 1, ["^", 2, 8]],
      ],
    },
    source: "indoor",
    type: "line",
  },
  {
    filter: [
      "all",
      ["all", ["==", ["get", "highway"], "steps"], ["!", ["has", "conveying"]]],
    ],
    id: "indoor-steps-middle",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    minzoom: 17,
    paint: {
      "line-color": "rgba(22, 93, 177, 0.4)",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 17, 0, 17.25, 1],
      "line-width": [
        "interpolate",
        ["exponential", 1.8],
        ["zoom"],
        17,
        ["*", 1, ["^", 2, -2]],
        24,
        ["*", 1, ["^", 2, 6]],
      ],
    },
    source: "indoor",
    type: "line",
  },
  {
    filter: ["==", ["get", "highway"], "steps"],
    id: "indoor-steps-arrow",
    layout: {
      "icon-allow-overlap": true,
      "icon-ignore-placement": false,
      "icon-image": "triangle",
      "icon-keep-upright": false,
      "icon-rotate": 90,
      "icon-size": [
        "interpolate",
        ["exponential", 1.8],
        ["zoom"],
        17,
        ["*", 1, ["^", 2, -2]],
        24,
        ["*", 1, ["^", 2, 3]],
      ],
      "symbol-avoid-edges": true,
      "symbol-placement": "line",
    },
    minzoom: 18,
    paint: {
      "icon-color": "rgba(22, 93, 177, 0.4)",
      "icon-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        17,
        0,
        17.5,
        0.5,
        19,
        1,
      ],
    },
    source: "indoor",
    type: "symbol",
  },
  {
    filter: ["all", ["==", ["get", "highway"], "steps"], ["has", "conveying"]],
    id: "indoor-conveying",
    layout: {
      "line-join": "round",
    },
    paint: {
      "line-color": "#FF0000",
      "line-dasharray": [
        "step",
        ["zoom"],
        ["literal", [1, 0]],
        17.5,
        ["literal", [1.75, 1]],
        18,
        ["literal", [1, 0.75]],
        19,
        ["literal", [0.3, 0.3]],
      ],
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 17, 0, 17.25, 1],
      "line-width": [
        "interpolate",
        ["exponential", 1.5],
        ["zoom"],
        17,
        1,
        18,
        1.6,
        19,
        6,
      ],
    },
    source: "indoor",
    type: "line",
  },
  {
    filter: ["==", ["get", "indoor"], "room"],
    id: "poi-indoor-text-ref",
    layout: {
      "text-allow-overlap": false,
      "text-anchor": "center",
      "text-field": [
        "case",
        ["all", ["has", "name"], ["has", "name"]],
        [
          "format",
          ["get", "name"],
          {},
          "\n",
          {},
          ["get", "ref"],
          { "font-scale": 0.8 },
        ],
        ["has", "name"],
        ["get", "name"],
        ["get", "ref"],
      ],
      "text-font": ["Roboto Regular"],
      "text-ignore-placement": false,
      "text-justify": "auto",
      "text-padding": 5,
      "text-rotation-alignment": "auto",
      "text-size": [
        "interpolate",
        ["exponential", 1.5],
        ["zoom"],
        16.5,
        12,
        24,
        18,
      ],
    },
    minzoom: 16.5,
    paint: {
      "text-color": "#072140",
      "text-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        17.5,
        0,
        18,
        0.5,
        19,
        1,
      ],
    },
    source: "indoor",
    type: "symbol",
  },
  {
    filter: [
      "all",
      [
        "any",
        ["==", ["get", "entrance"], "exit"],
        ["==", ["get", "entrance"], "emergency"],
      ],
    ],
    id: "poi-exterior-exit-bg",
    minzoom: 18,
    paint: {
      "circle-color": "rgba(255, 255, 255, 1)",
      "circle-opacity": ["interpolate", ["linear"], ["zoom"], 18, 0, 18.5, 0.8],
      "circle-radius": 10,
    },
    source: "indoor",
    type: "circle",
  },
  {
    filter: [
      "all",
      [
        "any",
        ["==", ["get", "entrance"], "exit"],
        ["==", ["get", "entrance"], "emergency"],
      ],
    ],
    id: "poi-exterior-exit",
    layout: {
      "icon-image": "exit-alt1",
    },
    minzoom: 18,
    paint: {
      "icon-opacity": ["interpolate", ["linear"], ["zoom"], 18, 0, 18.5, 1],
    },
    source: "indoor",
    type: "symbol",
  },
  {
    filter: [
      "all",
      ["has", "entrance"],
      ["!=", ["get", "entrance"], "exit"],
      ["!=", ["get", "entrance"], "emergency"],
    ],
    id: "poi-exterior-entrance-bg",
    minzoom: 16,
    paint: {
      "circle-color": "rgba(255, 255, 255, 1)",
      "circle-opacity": ["interpolate", ["linear"], ["zoom"], 16, 0, 16.5, 1],
      "circle-radius": 10,
    },
    source: "indoor",
    type: "circle",
  },
  {
    filter: ["has", "building"],
    id: "buildings-walls",
    minzoom: 16.5,
    paint: {
      "line-color": "#FFFFFF",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 16.5, 0, 18, 1],
      "line-width": 2,
    },
    source: "indoor",
    type: "line",
  },
  {
    filter: [
      "all",
      ["has", "entrance"],
      ["!=", ["get", "entrance"], "exit"],
      ["!=", ["get", "entrance"], "emergency"],
    ],
    id: "poi-exterior-entrance",
    layout: {
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
      "icon-image": "entrance-alt1",
      "icon-optional": false,
      "text-font": [],
    },
    minzoom: 16,
    paint: {
      "icon-opacity": ["interpolate", ["linear"], ["zoom"], 16, 0, 16.5, 1],
    },
    source: "indoor",
    type: "symbol",
  },
  {
    filter: ["==", ["get", "amenity"], "toilets"],
    id: "poi-indoor-toilet",
    layout: {
      "icon-allow-overlap": true,
      "icon-anchor": "center",
      "icon-image": [
        "case",
        ["==", ["get", "wheelchair"], "yes"],
        ["literal", "wheelchair"],
        [
          "all",
          ["==", ["get", "female"], "yes"],
          ["!=", ["get", "male"], "yes"],
        ],
        ["literal", "toilet_female"],
        [
          "all",
          ["!=", ["get", "female"], "yes"],
          ["==", ["get", "male"], "yes"],
        ],
        ["literal", "toilet_male"],
        ["literal", "toilet"],
      ],
      "icon-size": ["interpolate", ["linear"], ["zoom"], 17, 0.5, 20, 1],
    },
    minzoom: 18,
    paint: {
      "icon-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        18,
        0,
        18.5,
        0.5,
        19,
        1,
      ],
    },
    source: "indoor",
    type: "symbol",
  },
  {
    filter: ["boolean", false], // changed in the poi-logic
    id: "poi-indoor",
    layout: {
      "icon-allow-overlap": true,
      "icon-anchor": "center",
      "icon-image": ["get", "maki"], // changed in the poi-logic
      "icon-optional": false,
      "icon-size": ["interpolate", ["linear"], ["zoom"], 17, 0.5, 20, 1],
      "symbol-placement": "point",
      "symbol-spacing": 250,
      "text-allow-overlap": false,
      "text-anchor": "top",
      "text-field": [
        "case",
        ["all", ["has", "name"], ["has", "name"]],
        [
          "format",
          ["get", "name"],
          {},
          "\n",
          {},
          ["get", "ref"],
          { "font-scale": 0.8 },
        ],
        ["has", "name"],
        ["get", "name"],
        ["get", "ref"],
      ],
      "text-font": ["Roboto Regular"],
      "text-ignore-placement": false,
      "text-line-height": 1.2,
      "text-max-angle": 38,
      "text-max-width": 8,
      "text-offset": [0, 1],
      "text-padding": 2,
      "text-rotation-alignment": "viewport",
      "text-size": ["interpolate", ["linear"], ["zoom"], 17, 11, 20, 13],
    },
    minzoom: 17,
    paint: {
      "icon-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        18,
        0,
        18.5,
        0.5,
        19,
        1,
      ],
      "text-color": "#072140",
      "text-halo-color": "rgb(194, 215, 239, 0.3)",
      "text-halo-width": 1,
      "text-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        17,
        0,
        17.5,
        0.5,
        19,
        1,
      ],
    },
    source: "indoor",
    type: "symbol",
  },
];
