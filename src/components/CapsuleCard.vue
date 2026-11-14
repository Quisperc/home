<template>
  <section class="card capsule-card">
    <div class="card-title"><Icon name="hourglass" :size="20" />时光胶囊</div>
    <div class="capsules">
      <div v-for="item in items" :key="item.name" class="capsule">
        <div class="row">
          <span
            >{{ item.name
            }}<span class="dim"> · 剩余 {{ item.remaining }} {{ item.unit }}</span></span
          >
          <span class="pct">{{ Math.round(item.percent) }}%</span>
        </div>
        <div class="track">
          <div class="fill" :style="{ width: `${item.percent}%` }" />
        </div>
      </div>
    </div>
    <p v-if="uptimeText" class="uptime">{{ uptimeText }}</p>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import Icon from "./Icon.vue";
import { settings } from "@/lib/settings";
import { capsule, uptime } from "@/lib/time";

const items = ref(capsule());
const uptimeText = computed(() =>
  settings.siteStartShow ? uptime(import.meta.env.VITE_SITE_START) : null,
);
let timer;

onMounted(() => (timer = setInterval(() => (items.value = capsule()), 1000)));
onBeforeUnmount(() => clearInterval(timer));
</script>

<style scoped>
.capsules {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (max-width: 600px) {
  .capsules {
    grid-template-columns: 1fr;
  }
}
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 0.9rem;
}
.dim,
.pct {
  color: var(--md-on-surface-variant);
}
.pct {
  font-variant-numeric: tabular-nums;
}
.track {
  height: 8px;
  border-radius: 999px;
  background: var(--md-surface-container-highest);
  overflow: hidden;
}
.fill {
  height: 100%;
  border-radius: 999px;
  background: var(--md-primary);
  transition: width 0.6s var(--ease);
}
.uptime {
  margin-top: 16px;
  text-align: center;
  font-size: 0.85rem;
  color: var(--md-on-surface-variant);
}
</style>
