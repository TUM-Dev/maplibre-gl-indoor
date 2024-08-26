import type { ExpressionSpecification } from "maplibre-gl";

import type { Level } from "./Types";

export function levelFilters(level: Level): ExpressionSpecification[] {
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
  return [levelBetween, ["==", ["get", "level"], level.toString()]];
}

export function filterWithLevel(
  initialFilter: ExpressionSpecification,
  level: Level,
  showFeaturesWithEmptyLevel: boolean = false,
): ExpressionSpecification {
  if (showFeaturesWithEmptyLevel) {
    return [
      "all",
      initialFilter,
      ["any", ["!", ["has", "level"]], ...levelFilters(level)],
    ];
  } else {
    return ["all", initialFilter, ["any", ...levelFilters(level)]];
  }
}
