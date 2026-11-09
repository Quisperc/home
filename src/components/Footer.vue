<template>
  <footer class="footer">
    <span>
      © <template v-if="startYear && startYear < year">{{ startYear }} - </template>{{ year }}
      <a :href="siteUrl">{{ author }}</a>
    </span>
    <a v-if="icp" href="https://beian.miit.gov.cn" target="_blank" rel="noopener">{{ icp }}</a>
    <a
      v-if="ga"
      :href="`https://beian.mps.gov.cn/#/query/webSearch?code=${gaCode}`"
      target="_blank"
      rel="noopener"
    >
      <img src="/images/备案图标.png" alt="" />{{ ga }}
    </a>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
const startYear = Number(import.meta.env.VITE_SITE_START?.slice(0, 4)) || null;
const author = import.meta.env.VITE_SITE_AUTHOR;
const icp = import.meta.env.VITE_SITE_ICP;
const ga = import.meta.env.VITE_SITE_GA;
const gaCode = import.meta.env.VITE_SITE_GA_CODE;
const url = import.meta.env.VITE_SITE_URL;
const siteUrl = url?.startsWith("http") ? url : `https://${url || "www.civer.cn"}`;
</script>

<style scoped>
.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 6px 16px;
  padding: 8px 0;
  font-size: 0.8rem;
  color: var(--md-on-surface-variant);
}
.footer a {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.footer a:hover {
  color: var(--md-primary);
  text-decoration: underline;
}
.footer img {
  width: 14px;
  height: 14px;
}
</style>
