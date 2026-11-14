<template>
  <section class="card blog-card">
    <div class="card-title">
      <Icon name="article" :size="20" />最新文章
      <a class="more icon-btn" :href="blogUrl" target="_blank" rel="noopener" title="访问博客">
        <Icon name="outward" :size="18" />
      </a>
    </div>
    <div v-if="loading" class="skeleton" aria-hidden="true">
      <span v-for="i in 3" :key="i" class="line" />
    </div>
    <div v-else-if="error" class="empty">
      <p>文章加载失败</p>
      <button class="text-btn" @click="load">重试</button>
    </div>
    <template v-else>
      <a
        v-for="post in posts"
        :key="post.id"
        class="post"
        :href="`${blogUrl}/posts/${post.id}/`"
        target="_blank"
        rel="noopener"
      >
        <span v-if="post.category" class="chip">{{ post.category }}</span>
        <span class="post-title">{{ post.title }}</span>
        <time class="date">{{ post.publishedDate }}</time>
      </a>
    </template>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Icon from "./Icon.vue";
import { blogUrl, getBlogPosts } from "@/lib/blog";

const posts = ref([]);
const loading = ref(true);
const error = ref(false);

async function load() {
  loading.value = true;
  error.value = false;
  try {
    posts.value = await getBlogPosts(3);
  } catch {
    error.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(load);
</script>

<style scoped>
.blog-card {
  display: flex;
  flex-direction: column;
}
.more {
  margin-left: auto;
  width: 32px;
  height: 32px;
}
.post {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 12px;
  border-radius: var(--radius-tile);
  transition: background-color 0.2s var(--ease);
}
.post:hover {
  background: color-mix(in srgb, var(--md-on-surface) 7%, transparent);
}
.chip {
  flex: none;
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 500;
  background: var(--md-secondary-container);
  color: var(--md-on-secondary-container);
}
.post-title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.95rem;
}
.post:hover .post-title {
  color: var(--md-primary);
}
.date {
  flex: none;
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
  color: var(--md-on-surface-variant);
}
.skeleton {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 10px 12px;
}
.line {
  height: 20px;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--md-on-surface) 7%, transparent),
    color-mix(in srgb, var(--md-on-surface) 13%, transparent),
    color-mix(in srgb, var(--md-on-surface) 7%, transparent)
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s linear infinite;
}
.line:nth-child(2) {
  width: 82%;
}
.line:nth-child(3) {
  width: 64%;
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