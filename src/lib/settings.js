import { reactive, watch } from "vue";

const KEY = "home-settings";
const defaults = {
  theme: "system", // light | dark | system
  seed: "auto", // auto = 跟随壁纸取色，或 #rrggbb
  wallpaper: "local", // local | bing
  siteStartShow: true,
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
