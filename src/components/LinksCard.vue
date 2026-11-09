<template>
  <section class="card links-card">
    <div class="card-title"><Icon name="apps" :size="20" />站点导航</div>
    <div class="sites">
      <a
        v-for="site in sites"
        :key="site.name"
        class="site"
        :href="site.link"
        target="_blank"
        rel="noopener"
      >
        <span class="site-icon"><Icon :name="site.icon" :size="22" /></span>
        <span class="site-name">{{ site.name }}</span>
        <Icon class="outward" name="outward" :size="16" />
      </a>
    </div>
    <div class="social">
      <a
        v-for="item in socials"
        :key="item.name"
        class="icon-btn"
        :href="item.url"
        :title="item.tip"
        target="_blank"
        rel="noopener"
      >
        <img :src="item.icon" :alt="item.name" />
      </a>
    </div>
  </section>
</template>

<script setup>
import Icon from "./Icon.vue";
import sites from "@/data/siteLinks.json";
import socials from "@/data/socialLinks.json";
</script>

<style scoped>
.sites {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 8px;
}
.site {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-tile);
  background: var(--md-surface-container-high);
  transition: background-color 0.2s var(--ease);
}
.site:hover {
  background: color-mix(in srgb, var(--md-surface-container-high) 92%, var(--md-on-surface));
}
.site-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--md-primary-container);
  color: var(--md-on-primary-container);
}
.site-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.95rem;
}
.outward {
  margin-left: auto;
  color: var(--md-on-surface-variant);
  opacity: 0;
  transition: opacity 0.2s var(--ease);
}
.site:hover .outward {
  opacity: 1;
}
.social {
  display: flex;
  gap: 4px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--md-outline-variant);
}
.social img {
  width: 22px;
  height: 22px;
  object-fit: contain;
}
:root[data-theme="light"] .social img {
  filter: brightness(0);
  opacity: 0.7;
}
</style>
