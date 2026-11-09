<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="modelValue" class="overlay" @click.self="close">
        <div class="dialog" role="dialog" aria-modal="true" aria-label="设置">
          <div class="head">
            <h2>设置</h2>
            <button class="icon-btn" title="关闭" @click="close"><Icon name="close" /></button>
          </div>

          <div class="body">
            <section>
              <h3>外观模式</h3>
              <div class="segmented">
                <label v-for="opt in themes" :key="opt.value">
                  <input v-model="settings.theme" type="radio" :value="opt.value" />
                  <span>{{ opt.label }}</span>
                </label>
              </div>
            </section>

            <section>
              <h3>主题色</h3>
              <div class="seeds">
                <button
                  v-for="seed in SEEDS"
                  :key="seed.value"
                  class="seed"
                  :class="{ active: settings.seed === seed.value, auto: seed.value === 'auto' }"
                  :style="seed.value === 'auto' ? null : { background: seed.value }"
                  :title="seed.name"
                  @click="settings.seed = seed.value"
                >
                  <Icon v-if="settings.seed === seed.value" name="check" :size="18" />
                </button>
              </div>
              <p class="hint">「跟随壁纸」会从当前壁纸中提取主题色</p>
            </section>

            <section>
              <h3>壁纸</h3>
              <div class="wallpaper-row">
                <div class="segmented">
                  <label v-for="opt in wallpapers" :key="opt.value">
                    <input v-model="settings.wallpaper" type="radio" :value="opt.value" />
                    <span>{{ opt.label }}</span>
                  </label>
                </div>
                <button class="text-btn" @click="$emit('shuffle')">
                  <Icon name="refresh" :size="18" />换一张
                </button>
              </div>
            </section>

            <section class="switch-row">
              <div>
                <h3>建站日期显示</h3>
                <p class="hint">在时光胶囊中显示站点运行时长</p>
              </div>
              <label class="switch">
                <input v-model="settings.siteStartShow" type="checkbox" />
                <span class="track"><span class="thumb" /></span>
              </label>
            </section>
          </div>

          <footer class="foot">
            v{{ version }} · MIT ·
            <a :href="github" target="_blank" rel="noopener">源码</a>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from "vue";
import Icon from "./Icon.vue";
import { settings } from "@/lib/settings";
import { SEEDS } from "@/lib/theme";
import { version, github } from "@/../package.json";

const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(["update:modelValue", "shuffle"]);
const close = () => emit("update:modelValue", false);

const themes = [
  { label: "浅色", value: "light" },
  { label: "深色", value: "dark" },
  { label: "跟随系统", value: "system" },
];
const wallpapers = [
  { label: "内置渐变", value: "local" },
  { label: "每日一图", value: "bing" },
  { label: "原神", value: "genshin" },
  { label: "二次元", value: "acg" },
];

const onKeydown = (e) => e.key === "Escape" && close();
watch(
  () => props.modelValue,
  (open) => {
    if (open) window.addEventListener("keydown", onKeydown);
    else window.removeEventListener("keydown", onKeydown);
  },
);
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgb(0 0 0 / 45%);
}
.dialog {
  width: min(520px, 100%);
  max-height: min(85dvh, 720px);
  display: flex;
  flex-direction: column;
  background: var(--md-surface-container-high);
  border-radius: var(--radius-card);
  padding: 24px;
  color: var(--md-on-surface);
  box-shadow:
    0 4px 8px 3px rgb(0 0 0 / 0.15),
    0 1px 3px rgb(0 0 0 / 0.3);
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.head h2 {
  font-size: 1.3rem;
  font-weight: 500;
}
.body {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px 4px;
}
h3 {
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 10px;
}
.hint {
  margin-top: 8px;
  font-size: 0.8rem;
  color: var(--md-on-surface-variant);
}

/* M3 segmented button */
.segmented {
  display: flex;
  border: 1px solid var(--md-outline);
  border-radius: 999px;
  overflow: hidden;
}
.segmented label {
  flex: 1;
}
.segmented input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.segmented span {
  display: block;
  padding: 9px 12px;
  text-align: center;
  font-size: 0.9rem;
  cursor: pointer;
  border-left: 1px solid var(--md-outline);
  transition: background-color 0.2s var(--ease);
}
.segmented label:first-child span {
  border-left: 0;
}
.segmented span:hover {
  background: color-mix(in srgb, var(--md-on-surface) 6%, transparent);
}
.segmented input:checked + span {
  background: var(--md-secondary-container);
  color: var(--md-on-secondary-container);
  font-weight: 500;
}
.segmented input:focus-visible + span {
  outline: 2px solid var(--md-primary);
  outline-offset: -2px;
}

/* 主题色种子 */
.seeds {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.seed {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  transition: transform 0.2s var(--ease);
}
.seed:hover {
  transform: scale(1.08);
}
.seed.auto {
  background: conic-gradient(#d81b60, #ef6c00, #558b2f, #00897b, #4285f4, #6750a4, #d81b60);
}
.seed.active {
  outline: 2px solid var(--md-on-surface);
  outline-offset: 3px;
}

.wallpaper-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.wallpaper-row .segmented {
  flex: 1;
}
.text-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--md-primary);
  transition: background-color 0.2s var(--ease);
}
.text-btn:hover {
  background: color-mix(in srgb, var(--md-primary) 10%, transparent);
}

/* M3 switch */
.switch-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.switch-row h3 {
  margin-bottom: 2px;
}
.switch-row .hint {
  margin-top: 0;
}
.switch input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.switch .track {
  position: relative;
  display: block;
  width: 52px;
  height: 32px;
  border-radius: 999px;
  border: 2px solid var(--md-outline);
  background: var(--md-surface-container-highest);
  cursor: pointer;
  transition:
    background-color 0.2s var(--ease),
    border-color 0.2s var(--ease);
}
.switch .thumb {
  position: absolute;
  top: 50%;
  left: 6px;
  translate: 0 -50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--md-outline);
  transition:
    left 0.2s var(--ease),
    width 0.2s var(--ease),
    height 0.2s var(--ease),
    background-color 0.2s var(--ease);
}
.switch input:checked + .track {
  background: var(--md-primary);
  border-color: var(--md-primary);
}
.switch input:checked + .track .thumb {
  left: 22px;
  width: 24px;
  height: 24px;
  background: var(--md-on-primary);
}
.switch input:focus-visible + .track {
  outline: 2px solid var(--md-primary);
  outline-offset: 2px;
}

.foot {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--md-outline-variant);
  text-align: center;
  font-size: 0.8rem;
  color: var(--md-on-surface-variant);
}
.foot a {
  color: var(--md-primary);
}
.foot a:hover {
  text-decoration: underline;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s var(--ease);
}
.dialog-enter-active .dialog,
.dialog-leave-active .dialog {
  transition: transform 0.2s var(--ease);
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
.dialog-enter-from .dialog,
.dialog-leave-to .dialog {
  transform: scale(0.95);
}
</style>
