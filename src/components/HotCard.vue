<template>
  <section class="card hot-card">
    <div class="card-title">
      <Icon name="flame" :size="20" />今日热榜
      <span v-if="updated" class="updated">{{ updated }} 更新</span>
      <button class="icon-btn refresh" title="刷新" :disabled="loading" @click="load(true)">
        <Icon name="refresh" :size="18" />
      </button>
    </div>
    <div class="tabs" role="tablist" aria-label="热榜来源">
      <button
        v-for="s in HOT_SOURCES"
        :key="s.id"
        class="tab"
        role="tab"
        :aria-selected="s.id === active"
        :class="{ active: s.id === active }"
        @click="select(s.id)"
      >
        {{ s.name }}
      </button>
    </div>
    <div v-if="loading" class="skeleton" aria-hidden="true">
      <span v-for="i in 8" :key="i" class="line" />
    </div>
    <div v-else-if="error" class="empty">
      <p>热榜走丢了</p>
      <button class="text-btn" @click="load(true)">重试</button>
    </div>
    <ol v-else class="list">
      <li v-for="(item, i) in items.slice(0, 10)" :key="item.id ?? i">
        <a class="row" :href="item.url" target="_blank" rel="noopener">
          <span class="rank" :class="`r${i + 1}`">{{ i + 1 }}</span>
          <span class="title">{{ item.title }}</span>
          <span v-if="item.extra?.info" class="heat">{{ item.extra.info }}</span>
        </a>
      </li>
    </ol>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import Icon from "./Icon.vue";
import { HOT_SOURCES, getHot } from "@/lib/hot";

const active = ref(localStorage.getItem("hot-source") || HOT_SOURCES[0].id);
const items = ref([]);
const updatedTime = ref(0);
const loading = ref(true);
const error = ref(false);
let timer;

const updated = computed(() => {
  if (!updatedTime.value) return "";
  const d = new Date(Number(updatedTime.value));
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
});

async function load(force = false) {
  loading.value = true;
  error.value = false;
  try {
    const data = await getHot(active.value, force);
    items.value = data.items;
    updatedTime.value = data.updatedTime;
  } catch {
    error.value = true;
  } finally {
    loading.value = false;
  }
}

function select(id) {
  if (id === active.value) return;
  active.value = id;
  try {
    localStorage.setItem("hot-source", id);
  } catch {
    /* 忽略存储失败 */
  }
  items.value = [];
  updatedTime.value = 0;
  load();
}

onMounted(() => {
  load();
  timer = setInterval(() => load(true), 15 * 60 * 1000);
});
onBeforeUnmount(() => clearInterval(timer));
</script>

<style scoped>
.hot-card {
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.updated {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: 400;
  font-variant-numeric: tabular-nums;
  color: var(--md-on-surface-variant);
  opacity: 0.8;
}
.refresh {
  width: 32px;
  height: 32px;
}
.tabs {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 10px;
  margin-bottom: 6px;
  border-bottom: 1px solid var(--md-outline-variant);
}
.tabs::-webkit-scrollbar {
  display: none;
}
.tab {
  flex: none;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 0.82rem;
  color: var(--md-on-surface-variant);
  background: color-mix(in srgb, var(--md-surface-container-high) 65%, transparent);
  transition:
    background-color 0.2s var(--ease),
    color 0.2s var(--ease);
}
.tab:hover {
  background: color-mix(in srgb, var(--md-on-surface) 10%, transparent);
}
.tab.active {
  background: var(--md-secondary-container);
  color: var(--md-on-secondary-container);
  font-weight: 600;
}
.list {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  list-style: none;
  padding: 0 4px 0 0;
  margin: 0;
}
.row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px;
  border-radius: 12px;
  transition: background-color 0.2s var(--ease);
}
.row:hover {
  background: color-mix(in srgb, var(--md-on-surface) 7%, transparent);
}
.rank {
  flex: none;
  width: 20px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 700;
  font-style: italic;
  font-variant-numeric: tabular-nums;
  color: var(--md-on-surface-variant);
  opacity: 0.75;
}
.rank.r1 {
  color: #f43f5e;
  opacity: 1;
}
.rank.r2 {
  color: #fb923c;
  opacity: 1;
}
.rank.r3 {
  color: #eab308;
  opacity: 1;
}
.title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.88rem;
}
.row:hover .title {
  color: var(--md-primary);
}
.heat {
  flex: none;
  max-width: 34%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  color: var(--md-on-surface-variant);
  opacity: 0.8;
}
.skeleton {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 10px;
}
.line {
  height: 16px;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--md-on-surface) 7%, transparent),
    color-mix(in srgb, var(--md-on-surface) 13%, transparent),
    color-mix(in srgb, var(--md-on-surface) 7%, transparent)
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s linear infinite;
}
.line:nth-child(odd) {
  width: 88%;
}
@keyframes shimmer {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}
.empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--md-on-surface-variant);
  font-size: 0.9rem;
}
.text-btn {
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--md-primary);
  transition: background-color 0.2s var(--ease);
}
.text-btn:hover {
  background: color-mix(in srgb, var(--md-primary) 10%, transparent);
}
</style>