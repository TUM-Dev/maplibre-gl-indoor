import IndoorLayer from "./IndoorLayer";

import type { MapGLWithIndoor } from "./Types";
import type { Map } from "maplibre-gl";

export default function addIndoorTo(map: Map): MapGLWithIndoor {
  Object.defineProperty(map, "indoor", {
    get: function () {
      if (!this._indoor) {
        this._indoor = new IndoorLayer(this);
      }
      return this._indoor;
    },
  });

  return map as MapGLWithIndoor;
}
