<template>
  <div class="background" aria-hidden="true">
    <img v-if="isImage" :key="imgKey" :src="imgUrl" alt="" @load="onLoad" @error="onError" />
    <div v-else class="gradient" :style="{ background: gradient.css }" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { settings } from "@/lib/settings";
import { GRADIENTS, extractSeed, setWallpaperSeed } from "@/lib/theme";

// 公开随机图 API（302 直返图片）；加载失败回退内置渐变
const SOURCES = {
  bing: "https://api.dujin.org/bing/1920.php",
  genshin: "https://v2.xxapi.cn/api/ys?return=302",
  acg: "https://v2.xxapi.cn/api/randomAcgPic?type=pc&return=302",
};
const index = ref(Math.floor(Math.random() * GRADIENTS.length));
const imgKey = ref(0);
const failed = ref(false);

const isImage = computed(() => !!SOURCES[settings.wallpaper] && !failed.value);
const imgUrl = computed(() => SOURCES[settings.wallpaper]);
const gradient = computed(() => GRADIENTS[index.value % GRADIENTS.length]);

watch(
  () => settings.wallpaper,
  () => (failed.value = false),
);
watch(
  [isImage, index],
  () => {
    if (!isImage.value) setWallpaperSeed(gradient.value.seed);
  },
  { immediate: true },
);

const onLoad = (e) => {
  const seed = extractSeed(e.target);
  if (seed) setWallpaperSeed(seed);
};
const onError = () => (failed.value = true);
const shuffle = () => {
  if (isImage.value) imgKey.value++;
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