import { reactive, watch } from "vue";

// v2：旧版保存的偏好曾固化旧默认壁纸，升键以重置为新默认（二次元）
const KEY = "home-settings-v2";
const defaults = {
  theme: "system", // light | dark | system
  seed: "auto", // auto = 跟随壁纸取色，或 #rrggbb
  wallpaper: "acg", // local | bing | genshin | acg | blog（跟随博客）
  siteStartShow: true,
  searchEngine: "bing", // 新标签页搜索：bing | google | baidu | duckduckgo
  blogShow: true,
  hotShow: true,
};

let saved = {};
try {
  saved = JSON.parse(localStorage.getItem(KEY)) || {};
} catch {
  saved = {};
}

export const settings = reactive(
  Object.fromEntries(Object.entries(defaults).map(([k, v]) => [k, saved[k] ?? v])),
);

watch(settings, (s) => localStorage.setItem(KEY, JSON.stringify(s)), { deep: true });
