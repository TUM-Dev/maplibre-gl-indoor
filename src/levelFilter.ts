import type { ExpressionSpecification } from "maplibre-gl";

import type { Level } from "./Types";

export function levelFilters(level: Level): ExpressionSpecification {
  return [
    "all",
    [
      // level=MIN~... => if LEVEL <= current_level, we can display
      "<=",
      [
        "to-number",
        ["slice", ["get", "level"], 0, ["index-of", "~", ["get", "level"]]],
      ],
      level,
    ],
    [
      // level=...~MAX => if LEVEL >= current_level, we can display
      ">=",
      [
        "to-number",
        [
          "slice",
          ["get", "level"],
          ["+", ["index-of", "~", ["get", "level"]], 1],
        ],
      ],
      level,
    ],
  ];
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
      ["any", ["!", ["has", "level"]], levelFilters(level)],
    ];
  } else {
    return ["all", initialFilter, levelFilters(level)];
  }
}
