// 构建新标签页扩展：vite 产物 + manifest，输出 dist-ext/
import { copyFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

execFileSync(process.execPath, ["scripts/ensure-env.mjs"], { stdio: "inherit" });
execFileSync(
  process.execPath,
  ["node_modules/vite/bin/vite.js", "build", "--config", "vite.ext.config.js"],
  { stdio: "inherit" },
);
copyFileSync("extension/manifest.json", "dist-ext/manifest.json");
console.log("扩展产物: dist-ext/ —— 在浏览器扩展页开启开发者模式后「加载解压缩的扩展」选择该目录");