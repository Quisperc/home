<template>
  <Background ref="background" />
  <div class="page">
    <header class="top">
      <img class="avatar" :src="avatar" alt="头像" />
      <div class="hello">
        <h1>{{ hello }}</h1>
        <p>{{ bio }}</p>
      </div>
      <div class="actions">
        <button
          class="icon-btn"
          :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
          @click="settings.theme = isDark ? 'light' : 'dark'"
        >
          <Icon :name="isDark ? 'sun' : 'moon'" />
        </button>
        <button class="icon-btn" title="设置" @click="setOpen = true">
          <Icon name="settings" />
        </button>
      </div>
    </header>

    <SearchBar v-if="isNt" />

    <main class="grid">
      <ClockCard />
      <HotCard v-if="hotOn" />
      <BlogCard v-if="settings.blogShow" />
      <LinksCard />
      <HitokotoCard v-if="!isNt" />
      <CapsuleCard v-if="!isNt" />
    </main>

    <Footer v-if="!isNt" />
  </div>
  <SettingsDialog v-model="setOpen" @shuffle="background?.shuffle()" />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Background from "@/components/Background.vue";
import ClockCard from "@/components/ClockCard.vue";
import HotCard from "@/components/HotCard.vue";
import BlogCard from "@/components/BlogCard.vue";
import HitokotoCard from "@/components/HitokotoCard.vue";
import CapsuleCard from "@/components/CapsuleCard.vue";
import LinksCard from "@/components/LinksCard.vue";
import SearchBar from "@/components/SearchBar.vue";
import Footer from "@/components/Footer.vue";
import SettingsDialog from "@/components/SettingsDialog.vue";
import Icon from "@/components/Icon.vue";
import { settings } from "@/lib/settings";
import { isDark } from "@/lib/theme";
import { isNt } from "@/lib/nt";
import { HOT_BASE } from "@/lib/hot";
import { greeting, memorialDay } from "@/lib/time";

const avatar = import.meta.env.VITE_SITE_MAIN_LOGO;
const bio = import.meta.env.VITE_DESC_TEXT;
const hello = greeting();
const setOpen = ref(false);
const background = ref(null);
const hotOn = computed(() => !!HOT_BASE && settings.hotShow);

onMounted(() => {
  const day = memorialDay();
  if (day) {
    document.documentElement.style.filter = "grayscale(1)";
    console.info(`今天是${day}`);
  }
});
</script>

<style scoped>
.page {
  position: relative;
  min-height: 100%;
  max-width: 1060px;
  margin: 0 auto;
  padding: clamp(16px, 3vw, 36px);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
:root.nt .page {
  padding: clamp(12px, 2vw, 24px);
  gap: 14px;
}
.top {
  display: flex;
  align-items: center;
  gap: 16px;
  animation: rise 0.5s var(--ease) backwards;
}
.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 3px var(--md-primary-container);
}
.hello h1 {
  font-size: clamp(1.4rem, 2.2vw, 1.8rem);
  font-weight: 600;
  letter-spacing: -0.01em;
}
.hello p {
  margin-top: 2px;
  font-size: 0.9rem;
  color: var(--md-on-surface-variant);
}
.actions {
  margin-left: auto;
  display: flex;
  gap: 4px;
}
.actions .icon-btn {
  background: var(--md-surface-container);
  color: var(--md-on-surface);
}
.actions .icon-btn:hover {
  background: color-mix(in srgb, var(--md-surface-container) 92%, var(--md-on-surface));
}
.grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  align-content: center;
}
:root.nt .grid {
  gap: 12px;
}
/* iOS widget 尺寸：时钟/热榜 large(2x2)，博客/导航/一言/胶囊 medium(2x1) */
.clock-card,
.hot-card {
  grid-column: span 2;
  grid-row: span 2;
}
.blog-card,
.hitokoto-card,
.links-card,
.capsule-card {
  grid-column: span 2;
}
.grid > :nth-child(2) {
  animation-delay: 0.06s;
}
.grid > :nth-child(3) {
  animation-delay: 0.12s;
}
.grid > :nth-child(4) {
  animation-delay: 0.18s;
}
.grid > :nth-child(5) {
  animation-delay: 0.24s;
}
.grid > :nth-child(6) {
  animation-delay: 0.3s;
}
:root.nt .grid > * {
  animation-delay: 0s;
  animation-duration: 0.3s;
}
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
  .clock-card,
  .hot-card {
    grid-column: 1 / -1;
    grid-row: auto;
  }
  .blog-card,
  .hitokoto-card,
  .links-card,
  .capsule-card {
    grid-column: auto;
  }
}
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .clock-card,
  .hot-card,
  .blog-card,
  .hitokoto-card,
  .links-card,
  .capsule-card {
    grid-column: auto;
  }
  .hello p {
    display: none;
  }
}
</style>