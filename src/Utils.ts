import type { BBox, Position } from "geojson";
import type { ExpressionSpecification } from "maplibre-gl";

import type { Level } from "./Types";

export function overlap(bounds1: BBox, bounds2: BBox) {
  const oneRectangleIsOnLeftSideOfOther =
    bounds1[0] > bounds2[2] || bounds2[0] > bounds1[2];
  if (oneRectangleIsOnLeftSideOfOther) {
    return false;
  }
  const rectangleIsAboveOther =
    bounds1[3] < bounds2[1] || bounds2[3] < bounds1[1];
  return !rectangleIsAboveOther;
}

export function filterWithLevel(
  initialFilter: ExpressionSpecification,
  level: Level,
  showFeaturesWithEmptyLevel: boolean = false,
): ExpressionSpecification {
  const levelBetween: ExpressionSpecification = [
    "all",
    ["in", ";", ["get", "level"]],
    [
      // level=LEVEL;... => if LEVEL <= current_level, we can display
      "<=",
      [
        "to-number",
        ["slice", ["get", "level"], 0, ["index-of", ";", ["get", "level"]]],
      ],
      level,
    ],
    [
      // level=...;LEVEL => if LEVEL >= current_level, we can display
      ">=",
      [
        "to-number",
        [
          "slice",
          ["get", "level"],
          ["+", ["index-of", ";", ["get", "level"]], 1],
        ],
      ],
      level,
    ],
  ];
  const levelFilters: ExpressionSpecification[] = [
    levelBetween,
    ["==", ["get", "level"], level.toString()],
  ];
  if (showFeaturesWithEmptyLevel) {
    return [
      "all",
      initialFilter,
      ["any", ["!", ["has", "level"]], ...levelFilters],
    ];
  } else {
    return ["all", initialFilter, ["any", ...levelFilters]];
  }
}

export function bboxCenter(bbox: BBox): Position {
  const [west, south, east, north] = bbox;
  return [(west + east) / 2, (south + north) / 2];
}

export function bboxContains(bbox: BBox, point: Position): boolean {
  const [west, south, east, north] = bbox;
  const [lng, lat] = point;

  const containsLatitude = south <= lat && lat <= north;
  let containsLongitude = west <= lng && lng <= east;
  if (west > east) {
    containsLongitude = west >= lng && lng >= east;
  }

  return containsLatitude && containsLongitude;
}
