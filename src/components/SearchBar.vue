<template>
  <form class="search" role="search" @submit.prevent="go">
    <Icon class="lead" name="search" :size="20" />
    <input
      ref="input"
      v-model="q"
      type="text"
      placeholder="搜索，从这里开始…"
      autocomplete="off"
      spellcheck="false"
      aria-label="搜索"
    />
    <select v-model="settings.searchEngine" class="engine" title="搜索引擎" aria-label="搜索引擎">
      <option value="bing">必应</option>
      <option value="google">谷歌</option>
      <option value="baidu">百度</option>
      <option value="duckduckgo">DuckDuckGo</option>
    </select>
    <button type="submit" class="go" title="搜索" :disabled="!q.trim()">
      <Icon name="outward" :size="18" />
    </button>
  </form>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Icon from "./Icon.vue";
import { settings } from "@/lib/settings";

const ENGINES = {
  bing: "https://www.bing.com/search?q=",
  google: "https://www.google.com/search?q=",
  baidu: "https://www.baidu.com/s?wd=",
  duckduckgo: "https://duckduckgo.com/?q=",
};

const q = ref("");
const input = ref(null);

const go = () => {
  const text = q.value.trim();
  if (!text) return;
  const base = ENGINES[settings.searchEngine] || ENGINES.bing;
  location.href = base + encodeURIComponent(text);
};

onMounted(() => input.value?.focus());
</script>

<style scoped>
.search {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px 8px 20px;
  border-radius: 999px;
  background:
    linear-gradient(155deg, rgb(255 255 255 / var(--glass-sheen)), transparent 55%),
    color-mix(in srgb, var(--md-surface-container) 72%, transparent);
  -webkit-backdrop-filter: blur(30px) saturate(1.8);
  backdrop-filter: blur(30px) saturate(1.8);
  border: 1px solid color-mix(in srgb, var(--md-on-surface) 10%, transparent);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / var(--glass-spec)),
    0 8px 24px -10px rgb(0 0 0 / 0.28);
  animation: rise 0.4s var(--ease) 0.05s backwards;
  transition: border-color 0.2s var(--ease);
}
.search:focus-within {
  border-color: color-mix(in srgb, var(--md-primary) 55%, transparent);
}
.lead {
  flex: none;
  color: var(--md-on-surface-variant);
}
input {
  flex: 1;
  min-width: 0;
  font: inherit;
  font-size: 1rem;
  color: var(--md-on-surface);
  background: none;
  border: 0;
  outline: none;
}
input::placeholder {
  color: var(--md-on-surface-variant);
  opacity: 0.75;
}
.engine {
  flex: none;
  font: inherit;
  font-size: 0.82rem;
  color: var(--md-on-surface-variant);
  background: var(--md-surface-container-high);
  border: 0;
  border-radius: 999px;
  padding: 6px 10px;
  cursor: pointer;
}
.go {
  display: grid;
  place-items: center;
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--md-primary);
  color: var(--md-on-primary);
  transition:
    opacity 0.2s var(--ease),
    transform 0.2s var(--ease);
}
.go:hover:not(:disabled) {
  transform: scale(1.06);
}
.go:disabled {
  opacity: 0.4;
  cursor: default;
}
</style>