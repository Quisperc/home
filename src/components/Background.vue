<template>
  <div class="background" aria-hidden="true">
    <img v-if="isImage" :key="imgKey" :src="imgUrl" alt="" @load="onLoad" @error="onError" />
    <div v-else class="gradient" :style="{ background: gradient.css }" />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { settings } from "@/lib/settings";
import { GRADIENTS, extractSeed, setWallpaperSeed } from "@/lib/theme";
import { isNt } from "@/lib/nt";
import { getBlogTheme, hslToHex } from "@/lib/blog";

// 公开随机图 API（302 直返图片，无 CORS 头）走 <img> 直载；博客壁纸走 fetch 缓存管道
const SOURCES = {
  bing: "https://api.dujin.org/bing/1920.php",
  genshin: "https://v2.xxapi.cn/api/ys?return=302",
  acg: "https://v2.xxapi.cn/api/randomAcgPic?type=pc&return=302",
};
const CACHE_NAME = "home-wallpaper-v1";

const index = ref(Math.floor(Math.random() * GRADIENTS.length));
const imgKey = ref(0);
const failed = ref(false);
const imgUrl = ref("");
const blogHue = ref(null);
let objectUrl = null;
let blogPool = [];
let blogPick = Math.floor(Math.random() * 6);
let loadId = 0;

const isImage = computed(() => settings.wallpaper !== "local" && !failed.value && !!imgUrl.value);
const gradient = computed(() => GRADIENTS[index.value % GRADIENTS.length]);

function showBlob(blob) {
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = URL.createObjectURL(blob);
  imgUrl.value = objectUrl;
  imgKey.value++;
}

async function cachePut(blob) {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put("blog", new Response(blob, { headers: { "Content-Type": blob.type } }));
  } catch {
    /* 隐私模式等场景无 Cache API */
  }
}

async function cacheGet() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const res = await cache.match("blog");
    return res ? await res.blob() : null;
  } catch {
    return null;
  }
}

async function load(force = false) {
  const id = ++loadId;
  failed.value = false;
  if (settings.wallpaper === "local") return;

  const direct = SOURCES[settings.wallpaper];
  if (direct) {
    blogHue.value = null;
    imgUrl.value = direct;
    imgKey.value++;
    return;
  }

  // 博客壁纸：主题色 + 壁纸池
  let url = null;
  try {
    const theme = await getBlogTheme();
    if (id !== loadId) return;
    blogPool = theme.pool;
    blogHue.value = theme.hue;
    if (theme.hue != null) setWallpaperSeed(hslToHex(theme.hue, 62, 52));
    url = blogPool[blogPick % blogPool.length] || null;
  } catch {
    blogHue.value = null;
  }

  if (!force) {
    const cached = await cacheGet();
    if (id !== loadId) return;
    // 缓存先上屏保证首帧；新标签页模式到此为止（零网络等待）
    if (cached) {
      showBlob(cached);
      if (isNt) return;
    }
  }
  if (!url) {
    if (!imgUrl.value) failed.value = true;
    return;
  }
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10000);
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    if (!blob.type.startsWith("image/")) throw new Error("非图片响应");
    if (id !== loadId) return;
    showBlob(blob);
    cachePut(blob);
  } catch {
    if (id !== loadId) return;
    if (!imgUrl.value) failed.value = true;
  }
}

const onLoad = (e) => {
  if (blogHue.value != null) return; // 博客模式以博客主题色为准
  const seed = extractSeed(e.target);
  if (seed) setWallpaperSeed(seed);
};
const onError = () => (failed.value = true);

const shuffle = () => {
  if (settings.wallpaper === "local") {
    index.value = (index.value + 1) % GRADIENTS.length;
  } else if (SOURCES[settings.wallpaper]) {
    imgKey.value++;
  } else {
    blogPick++;
    load(true);
  }
};

watch(
  () => settings.wallpaper,
  () => load(),
);
watch(
  isImage,
  (on) => {
    if (!on) setWallpaperSeed(gradient.value.seed);
  },
  { immediate: true },
);

load();
onBeforeUnmount(() => {
  if (objectUrl) URL.revokeObjectURL(objectUrl);
});
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
:root.nt .background img,
:root.nt .gradient {
  animation-duration: 0.25s;
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