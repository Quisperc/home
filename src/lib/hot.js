export const HOT_BASE = (import.meta.env.VITE_HOT_API_BASE || "").replace(/\/+$/, "");

export const HOT_SOURCES = [
  { id: "weibo", name: "微博" },
  { id: "zhihu", name: "知乎" },
  { id: "bilibili", name: "B站" },
  { id: "baidu", name: "百度" },
  { id: "douyin", name: "抖音" },
  { id: "toutiao", name: "头条" },
];

const cache = new Map();
const TTL = 10 * 60 * 1000;

export async function getHot(id, force = false) {
  const hit = cache.get(id);
  if (!force && hit && Date.now() - hit.t < TTL) return hit.data;
  const res = await fetch(`${HOT_BASE}/api/s?id=${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data.items)) throw new Error("响应格式异常");
  cache.set(id, { t: Date.now(), data });
  return data;
}