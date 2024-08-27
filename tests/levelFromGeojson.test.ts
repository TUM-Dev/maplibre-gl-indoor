import {
  extractLevelRangeFromFeature,
  parseLevelRange,
  extractLevelsRangeAndBounds,
} from "../src/levelFromGeojson";
import type { FeatureCollection, Geometry } from "geojson";

describe("extractLevelRangeFromFeature", () => {
  test("example-collection", () => {
    const collection = {
      features: [
        {
          geometry: {
            coordinates: [
              [11.6701479, 48.2668645],
              [11.6701577, 48.2668634],
              [11.6701702, 48.2668618],
            ],
            type: "LineString",
          },
          id: 1290116452,
          properties: {
            indoor: "wall",
            level: "0~1",
          },
          type: "Feature",
        },
        {
          geometry: {
            coordinates: [11.669933, 48.266857],
            type: "Point",
          },
          id: 11976838772,
          properties: {
            door: "yes",
            indoor: "yes",
            level: "2~2",
          },
          type: "Feature",
        },
      ],
      type: "FeatureCollection",
    } as FeatureCollection<Geometry>;
    const expected = {
      bounds: [11.669933, 48.266857, 11.6701702, 48.2668645],
      levelsRange: {
        max: 2,
        min: 0,
      },
    };
    expect(extractLevelsRangeAndBounds(collection)).toStrictEqual(expected);
  });
});
describe("extractLevelRangeFromFeature", () => {
  test("gibberish", () => {
    expect(extractLevelRangeFromFeature("abc")).toStrictEqual(null);
  });
  test("single range", () => {
    for (let i = -100; i < 100; i++) {
      const expected = { max: i, min: i };
      expect(extractLevelRangeFromFeature(`${i}~${i}`)).toStrictEqual(expected);
    }
  });
  test("range", () => {
    for (let from = -100; from < 100; from++) {
      for (let to = from; to < 100; to++) {
        const expected = { max: to, min: from };
        expect(extractLevelRangeFromFeature(`${from}~${to}`)).toStrictEqual(
          expected,
        );
      }
    }
  });
});

describe("parseLevelRange", () => {
  test("gibberish", () => {
    expect(parseLevelRange("abc")).toStrictEqual(null);
  });
  test("plain numbers", () => {
    for (let i = -100; i < 100; i++) {
      const expected = { max: i, min: i };
      expect(parseLevelRange(`${i}~${i}`)).toStrictEqual(expected);
    }
  });
  test("ranges", () => {
    for (let from = -10; from < 10; from++) {
      for (let to = from; to < 10; to++) {
        const expected = { max: to, min: from };
        expect(
          parseLevelRange(`${expected.min}~${expected.max}`),
        ).toStrictEqual(expected);
        expected.min += 0.5;
        expected.max += 0.5;
        expect(
          parseLevelRange(`${expected.min}~${expected.max}`),
        ).toStrictEqual(expected);
      }
    }
  });
});
