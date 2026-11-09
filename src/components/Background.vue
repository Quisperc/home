<template>
  <div class="background" aria-hidden="true">
    <img v-if="isBing" :key="bingKey" :src="BING" alt="" @load="onLoad" @error="onError" />
    <div v-else class="gradient" :style="{ background: gradient.css }" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { settings } from "@/lib/settings";
import { GRADIENTS, extractSeed, setWallpaperSeed } from "@/lib/theme";

const BING = "https://api.dujin.org/bing/1920.php";
const index = ref(Math.floor(Math.random() * GRADIENTS.length));
const bingKey = ref(0);
const bingFailed = ref(false);

const isBing = computed(() => settings.wallpaper === "bing" && !bingFailed.value);
const gradient = computed(() => GRADIENTS[index.value % GRADIENTS.length]);

watch(
  [isBing, index],
  () => {
    if (!isBing.value) setWallpaperSeed(gradient.value.seed);
    else bingFailed.value = false;
  },
  { immediate: true },
);

const onLoad = (e) => {
  const seed = extractSeed(e.target);
  if (seed) setWallpaperSeed(seed);
};
const onError = () => (bingFailed.value = true);
const shuffle = () => {
  if (isBing.value) bingKey.value++;
  else index.value = (index.value + 1) % GRADIENTS.length;
};
defineExpose({ shuffle });
</script>

<style scoped>
.background {
  position: fixed;
  inset: 0;
  background: var(--md-surface);
}
.background img,
.gradient {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: bg-in 0.6s var(--ease);
}
.background::after {
  content: "";
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--md-surface) 50%, transparent);
  transition: background-color 0.3s var(--ease);
}
:root[data-theme="light"] .background::after {
  background: color-mix(in srgb, var(--md-surface) 40%, transparent);
}
@keyframes bg-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>