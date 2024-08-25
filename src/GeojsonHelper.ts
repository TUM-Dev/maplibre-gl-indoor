import type { BBox, FeatureCollection, Geometry } from "geojson";

import bbox from "@turf/bbox";

import type { LevelsRange } from "./Types";

/**
 * Extract level from feature
 *
 * @returns {LevelsRange | null} the level or the range of level.
 * @param range e.g. "-1--2","1-2","1-2"
 */
export function parseLevelRange(range: string): LevelsRange | null {
  range = range.replaceAll(" ", "");
  const firstIsNegative = range.startsWith("-");
  let firstEnd = firstIsNegative
    ? range.substring(1).indexOf("-")
    : range.indexOf("-");
  if (firstEnd === -1) {
    // e.g "1"
    const rangeFloat = parseFloat(range);
    if (isNaN(rangeFloat)) return null;
    return { max: rangeFloat, min: rangeFloat };
  }
  if (firstIsNegative) {
    firstEnd += 1; // if we add this before, we could not differentiate "-100" from "100-"
  }
  const secondStart = firstEnd + 1;
  const firstFloat = parseFloat(range.substring(0, firstEnd));
  const secondFloat = parseFloat(range.substring(secondStart));
  if (isNaN(firstFloat) || isNaN(secondFloat)) return null;
  return {
    max: Math.max(firstFloat, secondFloat),
    min: Math.min(firstFloat, secondFloat),
  };
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
      (feat) => !feat.properties || typeof feat.properties.level !== "string",
    )
    .map((feat) => extractLevelRangeFromFeature(feat.properties?.level ?? ""))
    .filter((r) => r !== null);

  if (levelRanges.length == 0) {
    console.debug(geojson);
    throw new Error(
      `the FeatureCollection does not contain a single level. cannot compute the range of levels to display`,
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
