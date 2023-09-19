<template>
  <router-view v-if="$route.meta.noLayout" />
  <layout v-else>
    <router-view />
  </layout>
</template>

<script lang="ts" setup>
import Layout from "@/layout/index.vue";
import { useRoute } from "vue-router";
const $route = useRoute();
</script>

<style>
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>
