<template>
  <section class="card clock-card">
    <p class="date">{{ now.date }}</p>
    <div class="dial">
      <time class="time" :datetime="now.hm">{{ now.hm }}</time>
      <span class="sec" aria-hidden="true">{{ now.ss }}</span>
    </div>
    <p class="weather">
      <Icon name="cloud" :size="16" />
      <span v-if="weather">{{ weather.city }} · {{ weather.text }} {{ weather.temp }}℃</span>
      <span v-else>{{ weatherError ? "天气暂不可用" : "天气加载中…" }}</span>
    </p>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import Icon from "./Icon.vue";
import { getWeather } from "@/lib/api";
import { clock } from "@/lib/time";

const now = ref(clock());
const weather = ref(null);
const weatherError = ref(false);
let timer;

onMounted(() => {
  timer = setInterval(() => (now.value = clock()), 1000);
  getWeather()
    .then((data) => (weather.value = data))
    .catch(() => (weatherError.value = true));
});

onBeforeUnmount(() => clearInterval(timer));
</script>

<style scoped>
.clock-card {
  container-type: inline-size;
  container-name: clock;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
  padding: 20px;
  --clock-scale: 30cqi;
}
.date {
  font-size: clamp(0.8rem, 3.4cqi, 1rem);
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--md-on-surface-variant);
}
.dial {
  align-self: center;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 1.5cqi;
  min-width: 0;
}
.time {
  font-size: clamp(2.75rem, var(--clock-scale), 10rem);
  line-height: 0.9;
  font-weight: 700;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  color: var(--md-on-surface);
}
.sec {
  font-size: clamp(0.9rem, 8cqi, 2.4rem);
  line-height: 1;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  margin-top: 0.28em;
  color: var(--md-primary);
}
.weather {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: clamp(0.78rem, 3.2cqi, 0.9rem);
  color: var(--md-on-surface-variant);
  background: color-mix(in srgb, var(--md-surface-container-high) 55%, transparent);
  border: 1px solid color-mix(in srgb, var(--md-on-surface) 8%, transparent);
}
</style>