<script setup lang="ts">
import { Map } from "maplibre-gl";
import { onMounted, ref } from "vue";
import {
  addIndoorTo,
  IndoorControl,
  IndoorMap,
  MapGLWithIndoor,
} from "maplibre-gl-indoor";
onMounted(maybeCreateMap);

function maybeCreateMap() {
  if (document.getElementById("map")) {
    setTimeout(createMap, 0);
  } else {
    setTimeout(maybeCreateMap, 1000);
  }
}
const indoorMap = ref<MapGLWithIndoor | null>(null);

async function createMap() {
  const baseMap = new Map({
    style: "https://nav.tum.de/maps/styles/navigatum-basemap/style.json",
    center: [11.670099, 48.266921],
    zoom: 17.5,
    container: "map",
    hash: true,
    antialias: true,
  });
  const map = addIndoorTo(baseMap);
  const geojson = await (await fetch("/data.geojson")).json();
  let indoorJSONMap = IndoorMap.fromGeojson(geojson);
  await map.indoor.addMap(indoorJSONMap);

  // Add the specific control
  map.addControl(new IndoorControl(), "bottom-left");
  indoorMap.value = map;
}
</script>

<template>
  <div id="map"></div>
</template>

<style>
#map {
  min-height: 100vh;
  min-width: 100vw;
}
</style>
