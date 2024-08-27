import {
  EvaluationContext,
  StyleExpression,
} from "@maplibre/maplibre-gl-style-spec";
import { createExpression } from "@maplibre/maplibre-gl-style-spec";

import type { Level } from "../src";

import { levelFilters } from "../src/levelFilter";

function testFilterExpression(
  levelFilter: Level,
  levelProperty: string,
  expected: boolean,
) {
  test(`level ${levelFilter} for ${levelProperty} should be ${expected}`, () => {
    const compiled = createExpression(levelFilters(levelFilter));
    expect(compiled.result).toStrictEqual("success");
    const styleExpr = compiled.value as StyleExpression;
    expect(styleExpr._warningHistory).toStrictEqual({});
    const ctx = new EvaluationContext();
    ctx.feature = {
      id: "123456",
      properties: { level: levelProperty },
      type: "Point",
    };
    const actual = styleExpr.expression.evaluate(ctx);
    expect(actual).toStrictEqual(expected);
  });
}

describe("levelFilters", () => {
  describe("simple", () => {
    testFilterExpression(1, "1~1", true);
    testFilterExpression(2, "1~1", false);
    testFilterExpression(1, "2~2", false);
    testFilterExpression(-2, "-2~-2", true);
  });
  describe("range", () => {
    testFilterExpression(1, "1~2", true);
    testFilterExpression(1, "0~2", true);
    testFilterExpression(2, "0~2", true);
    testFilterExpression(0, "1~3", false);
    testFilterExpression(-1, "0~1", false);
    testFilterExpression(-1, "-1~1", true);
    testFilterExpression(0, "-1~1", true);
    testFilterExpression(1, "-1~1", true);
    testFilterExpression(-2, "-2~-1", true);
    testFilterExpression(-1, "-2~-1", true);
    testFilterExpression(-3, "-2~-1", false);
    testFilterExpression(-1, "-3~-2", false);
    testFilterExpression(-3, "-4~-2", true);
  });
});
