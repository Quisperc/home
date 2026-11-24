import { createApp } from "vue";
import App from "./App.vue";
import { initTheme } from "./lib/theme";
import { settings } from "./lib/settings";
import { HOT_BASE } from "./lib/hot";
import "./lib/nt";
import "./style.css";

// 按实际启用的功能预连接外部域名，消除 DNS + TLS 握手瀑布；
// 只加当前会用到的域，避免为未配置功能做无谓连接。
function preconnect() {
  const hosts = new Set(["v1.hitokoto.cn"]); // 一言卡片默认启用
  const blog = import.meta.env.VITE_BLOG_URL;
  if (blog) hosts.add(new URL(blog).host);
  if (HOT_BASE) hosts.add(new URL(HOT_BASE).host);
  if (import.meta.env.VITE_WEATHER_KEY) hosts.add("restapi.amap.com");
  else hosts.add("api.oioweb.cn");
  if (settings.wallpaper === "bing") hosts.add("api.dujin.org");
  if (settings.wallpaper === "genshin" || settings.wallpaper === "acg") hosts.add("v2.xxapi.cn");

  const frag = document.createDocumentFragment();
  for (const host of hosts) {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = `https://${host}`;
    link.crossOrigin = "anonymous";
    frag.appendChild(link);
  }
  document.head.appendChild(frag);
}

initTheme();
preconnect();
createApp(App).mount("#app");
