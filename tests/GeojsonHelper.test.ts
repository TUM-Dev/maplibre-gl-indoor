import {
  extractLevelRangeFromFeature,
  parseLevelRange,
} from "../src/levelFromGeojson";

describe("extractLevelRangeFromFeature", () => {
  test("gibberish", () => {
    expect(extractLevelRangeFromFeature("abc")).toStrictEqual(null);
  });
  test("single", () => {
    for (let i = -100; i < 100; i++) {
      expect(extractLevelRangeFromFeature(i.toString())).toStrictEqual({
        max: i,
        min: i,
      });
    }
  });
  test("single range", () => {
    for (let i = -100; i < 100; i++) {
      expect(extractLevelRangeFromFeature(i.toString())).toStrictEqual({
        max: i,
        min: i,
      });
      expect(extractLevelRangeFromFeature(`${i};${i + 1}`)).toStrictEqual({
        max: i + 1,
        min: i,
      });
    }
  });
  test("double-single range", () => {
    for (let from1 = -4; from1 < 4; from1++) {
      for (let to1 = -4; to1 < 4; to1++) {
        for (let i = -4; i < 4; i++) {
          const expected = {
            max: Math.max(from1, to1, i),
            min: Math.min(from1, to1, i),
          };
          expect(
            extractLevelRangeFromFeature(`${i};${from1}-${to1}`),
          ).toStrictEqual(expected);
          expect(
            extractLevelRangeFromFeature(`${from1}-${to1};${i}`),
          ).toStrictEqual(expected);
        }
      }
    }
  });
  test("double range", () => {
    for (let from1 = -3; from1 < 3; from1++) {
      for (let to1 = -3; to1 < 3; to1++) {
        for (let from2 = -2; from2 < 2; from2++) {
          for (let to2 = -2; to2 < 2; to2++) {
            expect(
              extractLevelRangeFromFeature(`${from1}-${to1};${from2}-${to2}`),
            ).toStrictEqual({
              max: Math.max(from1, to1, from2, to2),
              min: Math.min(from1, to1, from2, to2),
            });
          }
        }
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
      expect(parseLevelRange(i.toString())).toStrictEqual(expected);
      expect(parseLevelRange(" " + i.toString())).toStrictEqual(expected);
      expect(parseLevelRange(i.toString() + "")).toStrictEqual(expected);
    }
  });
  test("ranges", () => {
    for (let from = -10; from < 10; from++) {
      for (let to = -10; to < 10; to++) {
        const expected = { max: Math.max(from, to), min: Math.min(from, to) };
        expect(parseLevelRange(`${from}-${to}`)).toStrictEqual(expected);
        expect(parseLevelRange(` ${from} - ${to} `)).toStrictEqual(expected);
        expect(parseLevelRange(`${from + 0.5}-${to + 0.5}`)).toStrictEqual({
          min: expected.min + 0.5,
          max: expected.max + 0.5,
        });
      }
    }
  });
});
