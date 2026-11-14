const BLOG_URL = (import.meta.env.VITE_BLOG_URL || "https://blog.civer.cn").replace(/\/+$/, "");

export const blogUrl = BLOG_URL;

export async function getBlogPosts(limit = 3) {
  const res = await fetch(`${BLOG_URL}/api/allPostMeta.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const posts = await res.json();
  return posts.filter((p) => !p.password).slice(0, limit);
}

const THEME_KEY = "blog-theme-v1";
const THEME_TTL = 6 * 3600 * 1000;

// 从博客已发布页面提取主题色相与桌面壁纸池（无需改动博客代码）
export async function getBlogTheme() {
  try {
    const cached = JSON.parse(localStorage.getItem(THEME_KEY));
    if (cached && Date.now() - cached.t < THEME_TTL && cached.pool?.length) return cached;
  } catch {
    /* 缓存损坏则重新抓取 */
  }
  const res = await fetch(`${BLOG_URL}/`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const hue = Number(doc.getElementById("config-carrier")?.dataset.hue);
  const pool = [
    ...new Set(
      [...doc.querySelectorAll("img[src]")]
        .map((img) => img.getAttribute("src"))
        .filter((src) => /^\/_astro\/d\d+\./.test(src))
        .map((src) => new URL(src, BLOG_URL).href),
    ),
  ];
  if (!pool.length) throw new Error("博客页面未包含壁纸");
  const theme = { t: Date.now(), hue: Number.isFinite(hue) ? hue : null, pool };
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  } catch {
    /* 存储满时忽略 */
  }
  return theme;
}

export function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const hex = (v) =>
    Math.round(255 * v)
      .toString(16)
      .padStart(2, "0");
  return `#${hex(f(0))}${hex(f(8))}${hex(f(4))}`;
}