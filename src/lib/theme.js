import { computed, ref, watchEffect } from "vue";
import { settings } from "./settings";

export const SEEDS = [
  { name: "跟随壁纸", value: "auto" },
  { name: "薰衣草紫", value: "#6750a4" },
  { name: "天空蓝", value: "#4285f4" },
  { name: "青瓷绿", value: "#00897b" },
  { name: "苔原绿", value: "#558b2f" },
  { name: "琥珀橙", value: "#ef6c00" },
  { name: "樱花粉", value: "#d81b60" },
];

// 内置原创渐变壁纸（无外部图片资产），seed 用于动态取色
export const GRADIENTS = [
  { seed: "#6750a4", css: "linear-gradient(135deg,#7c4dff,#6750a4 50%,#4a3a8c)" },
  { seed: "#4285f4", css: "linear-gradient(135deg,#8ab4f8,#4285f4 50%,#1a56c4)" },
  { seed: "#00897b", css: "linear-gradient(135deg,#4dd0c4,#00897b 50%,#00695c)" },
  { seed: "#558b2f", css: "linear-gradient(135deg,#9ccc65,#558b2f 50%,#33691e)" },
  { seed: "#ef6c00", css: "linear-gradient(135deg,#ffb74d,#ef6c00 50%,#e65100)" },
  { seed: "#d81b60", css: "linear-gradient(135deg,#f48fb1,#d81b60 50%,#ad1457)" },
];

const FALLBACK_SEED = "#6750a4";
const wallpaperSeed = ref(null);
export const setWallpaperSeed = (hex) => (wallpaperSeed.value = hex);

const media = matchMedia("(prefers-color-scheme: dark)");
const systemDark = ref(media.matches);
media.addEventListener("change", (e) => (systemDark.value = e.matches));

export const isDark = computed(
  () => settings.theme === "dark" || (settings.theme === "system" && systemDark.value),
);

function hexToHsl(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s * 100, l * 100];
}

// 以种子色相生成 Material You 色调板（HSL 近似 HCT tone）
function scheme(seed, dark) {
  const [h, s] = hexToHsl(seed);
  const t = (tone, sat = s) => `hsl(${h.toFixed(1)} ${sat.toFixed(1)}% ${tone}%)`;
  const neutral = (tone) => t(tone, Math.min(s, 6));
  const variant = (tone) => t(tone, Math.min(s, 14));
  const secondary = (tone) => t(tone, s * 0.35);
  return dark
    ? {
        primary: t(80),
        "on-primary": t(20),
        "primary-container": t(30),
        "on-primary-container": t(90),
        "secondary-container": secondary(30),
        "on-secondary-container": secondary(90),
        surface: neutral(6),
        "on-surface": neutral(90),
        "on-surface-variant": variant(80),
        "surface-container": neutral(12),
        "surface-container-high": neutral(17),
        "surface-container-highest": neutral(22),
        outline: variant(60),
        "outline-variant": variant(30),
      }
    : {
        primary: t(40),
        "on-primary": t(100),
        "primary-container": t(90),
        "on-primary-container": t(10),
        "secondary-container": secondary(90),
        "on-secondary-container": secondary(10),
        surface: neutral(98),
        "on-surface": neutral(10),
        "on-surface-variant": variant(30),
        "surface-container": neutral(94),
        "surface-container-high": neutral(92),
        "surface-container-highest": neutral(90),
        outline: variant(50),
        "outline-variant": variant(80),
      };
}

// 从壁纸采样主色（跨域图片会污染 canvas，返回 null 时沿用默认种子）
export function extractSeed(img) {
  try {
    const size = 24;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);
    const buckets = new Map();
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const l = (max + min) / 2;
      const sat = max === min ? 0 : (max - min) / (255 - Math.abs(2 * l - 255));
      if (sat < 0.2 || l < 40 || l > 220) continue;
      const key = `${r >> 5}-${g >> 5}-${b >> 5}`;
      const bucket = buckets.get(key) || { count: 0, r: 0, g: 0, b: 0, score: 0 };
      bucket.count++;
      bucket.r += r;
      bucket.g += g;
      bucket.b += b;
      bucket.score += sat;
      buckets.set(key, bucket);
    }
    let best = null;
    for (const bucket of buckets.values()) if (!best || bucket.score > best.score) best = bucket;
    if (!best) return null;
    const hex = (v) =>
      Math.round(v / best.count)
        .toString(16)
        .padStart(2, "0");
    return `#${hex(best.r)}${hex(best.g)}${hex(best.b)}`;
  } catch {
    return null;
  }
}

export function initTheme() {
  watchEffect(() => {
    const seed =
      settings.seed === "auto"
        ? wallpaperSeed.value || FALLBACK_SEED
        : /^#[0-9a-f]{6}$/i.test(settings.seed)
          ? settings.seed
          : FALLBACK_SEED;
    const colors = scheme(seed, isDark.value);
    const root = document.documentElement;
    for (const [role, value] of Object.entries(colors))
      root.style.setProperty(`--md-${role}`, value);
    root.dataset.theme = isDark.value ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", colors.surface);
  });
}
