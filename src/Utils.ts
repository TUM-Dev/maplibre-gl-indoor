import type { Level } from './Types';
import type { ExpressionSpecification } from 'maplibre-gl';
import type { BBox, Position } from 'geojson';

export const EarthRadius = 6371008.8;

export function overlap(bounds1: BBox, bounds2: BBox) {
    const oneRectangleIsOnLeftSideOfOther = bounds1[0] > bounds2[2] || bounds2[0] > bounds1[2]
    if (oneRectangleIsOnLeftSideOfOther) {
        return false;
    }
    const rectangleIsAboveOther = bounds1[3] < bounds2[1] || bounds2[3] < bounds1[1];
    return !rectangleIsAboveOther;
}

export function filterWithLevel(initialFilter: ExpressionSpecification, level: Level, showFeaturesWithEmptyLevel: boolean = false): ExpressionSpecification {
    const levelFilter: ExpressionSpecification = [
        'all',
        [
            "any",
            [
                "==",
                ["get", "level"],
                level.toString()
            ],
            [
                "all",
                [
                    "!=",
                    [
                        "index-of",
                        ";",
                        ["get", "level"]
                    ],
                    -1,
                ],
                [
                    ">=",
                    level,
                    [
                        "to-number",
                        [
                            "slice",
                            ["get", "level"],
                            0,
                            [
                                "index-of",
                                ";",
                                ["get", "level"]
                            ]
                        ]
                    ]
                ],
                [
                    "<=",
                    level,
                    [
                        "to-number",
                        [
                            "slice",
                            ["get", "level"],
                            [
                                "+",
                                [
                                    "index-of",
                                    ";",
                                    ["get", "level"]
                                ],
                                1
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ];
    if (showFeaturesWithEmptyLevel) {
        return [
            "all",
            initialFilter,
            [
                'any',
                ["!", ["has", "level"]],
                levelFilter,
            ] ,
        ];
    } else {
        return [
            "all",
            initialFilter,
            levelFilter,
        ];
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
