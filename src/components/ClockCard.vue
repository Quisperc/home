<template>
  <section class="card clock-card">
    <div class="card-title"><Icon name="schedule" :size="20" />现在时间</div>
    <time class="time">{{ now.time }}</time>
    <p class="date">{{ now.date }}</p>
    <p class="weather">
      <Icon name="cloud" :size="18" />
      <span v-if="weather">
        {{ weather.city }} · {{ weather.text }} {{ weather.temp }}℃ · {{ weather.wind }}
      </span>
      <span v-else>{{ weatherError ? "天气信息暂不可用" : "天气加载中…" }}</span>
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
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.clock-card .card-title {
  margin-bottom: 0;
}
.time {
  margin-top: auto;
  font-size: clamp(3rem, 6vw, 4.6rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: var(--md-primary);
}
.date {
  color: var(--md-on-surface-variant);
}
.weather {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  font-size: 0.9rem;
  color: var(--md-on-surface-variant);
}
</style>
