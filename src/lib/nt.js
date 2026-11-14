// 新标签页模式：扩展 newtab 页，或 ?nt=1（本地预览用）
export const isNt =
  location.protocol === "chrome-extension:" ||
  new URLSearchParams(location.search).has("nt");

if (isNt) document.documentElement.classList.add("nt");