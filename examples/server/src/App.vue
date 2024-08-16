<script setup lang="ts">
import { Map } from "maplibre-gl";
import { onMounted, ref } from "vue";
import { IndoorControl, MapServerHandler } from "maplibre-gl-indoor";
onMounted(maybeCreateMap);

function maybeCreateMap() {
  if (document.getElementById("map")) {
    setTimeout(createMap, 0);
  } else {
    setTimeout(maybeCreateMap, 1000);
  }
}
const indoorMap = ref<MapServerHandler | null>(null);

async function createMap() {
  const baseMap = new Map({
    style: "https://nav.tum.de/maps/styles/osm-liberty/style.json",
    center: [11.670099, 48.266921],
    zoom: 17.5,
    container: "map",
    hash: true,
    antialias: true,
  });
  const map = MapServerHandler.manage(
    "https://nav.tum.de/api/maps/indoor",
    baseMap,
  );

  // Add the specific control
  map.map.addControl(new IndoorControl(), "bottom-left");
  // @ts-expect-error: typescript can't handle recursion height
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
