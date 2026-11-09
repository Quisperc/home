<template>
  <section class="card hitokoto-card">
    <div class="card-title">
      <Icon name="quote" :size="20" />一言
      <button class="icon-btn refresh" title="换一句" :disabled="loading" @click="load">
        <Icon name="refresh" :size="18" />
      </button>
    </div>
    <Transition name="fade" mode="out-in">
      <blockquote :key="data.hitokoto" class="quote">
        <p class="text">{{ data.hitokoto }}</p>
        <footer class="from">—— {{ data.from || "佚名" }}</footer>
      </blockquote>
    </Transition>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import Icon from "./Icon.vue";
import { getHitokoto } from "@/lib/api";

const data = reactive({ hitokoto: "正在加载一句话…", from: "" });
const loading = ref(false);

async function load() {
  if (loading.value) return;
  loading.value = true;
  try {
    const result = await getHitokoto();
    data.hitokoto = result.hitokoto;
    data.from = result.from;
  } catch {
    data.hitokoto = "网络开小差了，点击刷新再试一次";
    data.from = "";
  } finally {
    loading.value = false;
  }
}

onMounted(load);
</script>

<style scoped>
.hitokoto-card {
  display: flex;
  flex-direction: column;
}
.refresh {
  margin-left: auto;
  width: 32px;
  height: 32px;
}
.quote {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  flex: 1;
}
.text {
  font-size: 1.05rem;
  line-height: 1.8;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.from {
  align-self: flex-end;
  font-size: 0.9rem;
  color: var(--md-on-surface-variant);
}
</style>
