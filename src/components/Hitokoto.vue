<template>
  <div
    class="hitokoto cards"
    v-show="!store.musicOpenState"
    @mouseenter="openMusicShow = true"
    @mouseleave="openMusicShow = false"
    @click.stop
  >
    <!-- 打开音乐面板 -->
    <Transition name="el-fade-in-linear">
      <div
        class="open-music"
        v-show="openMusicShow && store.musicIsOk"
        @click="store.musicOpenState = true"
      >
        <music-menu theme="filled" size="18" fill="#efefef" />
        <span>打开音乐播放器</span>
      </div>
    </Transition>
    <!-- 一言内容 -->
    <Transition name="el-fade-in-linear" mode="out-in">
      <div :key="hitokotoData.text" class="content" @click="updateHitokoto">
        <span class="text">{{ hitokotoData.text }}</span>
        <span class="from">-「&nbsp;{{ hitokotoData.from }}&nbsp;」</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { MusicMenu, Error } from "@icon-park/vue-next";
import { getHitokoto } from "@/api";
import { mainStore } from "@/store";
import debounce from "@/utils/debounce.js";

const store = mainStore();

// 开启音乐面板按钮显隐
const openMusicShow = ref(false);

// 一言数据
const hitokotoData = reactive({
  text: "这里应该显示一句话",
  from: "Quisper",
});

// 获取一言数据
const getHitokotoData = async () => {
  try {
    const result = await getHitokoto();
    hitokotoData.text = result.hitokoto;
    hitokotoData.from = result.from;
  } catch (error) {
    ElMessage({
      message: "一言获取失败",
      icon: h(Error, {
        theme: "filled",
        fill: "#efefef",
      }),
    });
    hitokotoData.text = "这里应该显示一句话";
    hitokotoData.from = "Quisper";
  }
};

// 更新一言数据
const updateHitokoto = () => {
  // 防抖
  debounce(() => {
    getHitokotoData();
  }, 500);
};

onMounted(() => {
  getHitokotoData();
});
</script>

<style lang="scss" scoped>
.hitokoto {
  width: 100%;
  height: 100%;
  padding: 24px;
  animation: fade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both;
  .open-music {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    padding: 8px 0;
    border-radius: var(--card-border-radius) var(--card-border-radius) 0 0;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all var(--transition-normal);
    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
    .i-icon {
      width: 18px;
      height: 18px;
      display: block;
      margin-right: 8px;
      color: var(--primary-green);
    }
    span {
      font-size: 0.95rem;
      color: var(--text-secondary);
    }
  }
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    cursor: pointer;
    .text {
      font-size: 1.2rem;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      color: var(--text-primary);
      line-height: 1.6;
      transition: color var(--transition-normal);
      &:hover {
        color: var(--primary-blue);
      }
    }
    .from {
      font-weight: bold;
      align-self: flex-end;
      font-size: 1.1rem;
      color: var(--text-muted);
      transition: color var(--transition-normal);
      &:hover {
        color: var(--primary-green);
      }
    }
  }
}
</style>
