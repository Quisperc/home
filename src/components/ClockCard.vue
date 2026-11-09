<template>
  <section class="card clock-card">
    <p class="date">{{ now.date }}</p>
    <div class="dial">
      <svg class="face" viewBox="0 0 200 200" role="img" :aria-label="now.hm">
        <g class="ticks">
          <line
            v-for="i in 60"
            :key="i"
            x1="100"
            y1="6"
            x2="100"
            :y2="i % 5 === 0 ? 16 : 11"
            :stroke-width="i % 5 === 0 ? 3 : 1.5"
            :transform="`rotate(${i * 6} 100 100)`"
          />
        </g>
        <line class="hand hour" x1="100" y1="100" x2="100" y2="58" :transform="`rotate(${now.hourDeg} 100 100)`" />
        <line class="hand minute" x1="100" y1="100" x2="100" y2="38" :transform="`rotate(${now.minuteDeg} 100 100)`" />
        <line class="hand second" x1="100" y1="112" x2="100" y2="30" :transform="`rotate(${now.secondDeg} 100 100)`" />
        <circle class="cap" cx="100" cy="100" r="4.5" />
      </svg>
      <time class="digital" :datetime="now.hm">
        {{ now.hm }}<span class="sec">{{ now.ss }}</span>
      </time>
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
}
.date {
  font-size: clamp(0.8rem, 3.4cqi, 1rem);
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--md-on-surface-variant);
}
.dial {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 0;
}
/* 圆盘以可用高度为直径，同时填满方形上下与左右 */
.face {
  flex: 1;
  min-height: 0;
  width: auto;
  max-width: 100%;
  aspect-ratio: 1;
}
.ticks line {
  stroke: var(--md-on-surface-variant);
  opacity: 0.55;
  stroke-linecap: round;
}
.hand {
  stroke: var(--md-on-surface);
  stroke-linecap: round;
}
.hour {
  stroke-width: 6;
}
.minute {
  stroke-width: 4;
}
.second {
  stroke: var(--md-primary);
  stroke-width: 2;
}
.cap {
  fill: var(--md-primary);
}
.digital {
  font-size: clamp(1rem, 5cqi, 1.6rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: var(--md-on-surface);
}
.sec {
  margin-left: 0.2em;
  font-size: 0.7em;
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