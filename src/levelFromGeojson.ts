import type { BBox, FeatureCollection, Geometry } from "geojson";

import bbox from "@turf/bbox";

import type { LevelsRange } from "./Types";

/**
 * Extract level from feature
 *
 * @returns {LevelsRange | null} the level or the range of level.
 * @param range e.g. "-1~-2"
 */
export function parseLevelRange(range: string): LevelsRange | null {
  const splitRange = range.split("~");
  const parsedRange = {
    max: parseFloat(splitRange[1]),
    min: parseFloat(splitRange[0]),
  };
  if (isNaN(parsedRange.min) || isNaN(parsedRange.max)) {
    return null;
  }
  return parsedRange;
}

/**
 * Extract level from feature
 *
 * @returns {LevelsRange | null} the level or the range of level.
 * @param level
 */
export function extractLevelRangeFromFeature(
  level: string,
): LevelsRange | null {
  const splitLevel: LevelsRange[] = level
    .split(";")
    .map(parseLevelRange)
    .filter((r) => r !== null);

  if (!splitLevel.length) return null;

  return {
    max: Math.max(...splitLevel.map((l) => l.max)),
    min: Math.min(...splitLevel.map((l) => l.min)),
  };
}

/**
 * Extract levels range and bounds from geojson
 *
 * @param {FeatureCollection<Geometry>} geojson the geojson
 * @returns {Object} the levels range and bounds.
 */
export function extractLevelsRangeAndBounds(
  geojson: FeatureCollection<Geometry>,
): {
  bounds: BBox;
  levelsRange: LevelsRange;
} {
  if (geojson.type !== "FeatureCollection") {
    throw new Error(
      geojson.type +
        " is not allowed as a top level collection, please use FeatureCollection instead.",
    );
  }
  const levelRanges: LevelsRange[] = geojson.features
    .filter(
      (feat) => !!feat.properties && typeof feat.properties.level === "string",
    )
    .map((feat) => extractLevelRangeFromFeature(feat.properties?.level ?? ""))
    .filter((r) => r !== null);

  if (levelRanges.length == 0) {
    console.debug(geojson);
    throw new Error(
      "the FeatureCollection does not contain a single level. " +
        "Cannot compute the range of levels to display",
    );
  }
  return {
    bounds: bbox(geojson),
    levelsRange: {
      max: Math.max(...levelRanges.map((l) => l.max)),
      min: Math.min(...levelRanges.map((l) => l.min)),
    },
  };
}
