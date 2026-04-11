<template>
  <!-- 音乐控制面板 -->
  <div
    class="music"
    @mouseenter="volumeShow = true"
    @mouseleave="volumeShow = false"
    v-show="store.musicOpenState"
  >
    <div class="btns">
      <span @click="openMusicList()">音乐列表</span>
      <span @click="store.musicOpenState = false">回到一言</span>
    </div>
    <div class="control">
      <go-start theme="filled" size="30" fill="#efefef" @click="changeMusicIndex(0)" />
      <Transition name="fade" mode="out-in">
        <div :key="store.playerState" class="state" @click="changePlayState">
          <play-one theme="filled" size="50" fill="#efefef" v-show="!store.playerState" />
          <pause theme="filled" size="50" fill="#efefef" v-show="store.playerState" />
        </div>
      </Transition>
      <go-end theme="filled" size="30" fill="#efefef" @click="changeMusicIndex(1)" />
    </div>
    <div class="menu">
      <div class="name" v-show="!volumeShow">
        <span>{{
          store.getPlayerData.name
            ? store.getPlayerData.name + " - " + store.getPlayerData.artist
            : "未播放音乐"
        }}</span>
      </div>
      <div class="volume" v-show="volumeShow">
        <div class="icon">
          <volume-mute theme="filled" size="24" fill="#efefef" v-if="volumeNum == 0" />
          <volume-small
            theme="filled"
            size="24"
            fill="#efefef"
            v-else-if="volumeNum > 0 && volumeNum < 0.7"
          />
          <volume-notice theme="filled" size="24" fill="#efefef" v-else />
        </div>
        <el-slider v-model="volumeNum" :show-tooltip="false" :min="0" :max="1" :step="0.01" />
      </div>
    </div>
  </div>
  <!-- 音乐列表弹窗 -->
  <Transition name="fade" mode="out-in">
    <div class="music-list" v-show="musicListShow" @click="closeMusicList()">
      <Transition name="zoom">
        <div class="list" v-show="musicListShow" @click.stop>
          <close-one
            class="close"
            theme="filled"
            size="28"
            fill="#ffffff60"
            @click="closeMusicList()"
          />
          <Player
            ref="playerRef"
            :songServer="playerData.server"
            :songType="playerData.type"
            :songId="playerData.id"
            :volume="volumeNum"
          />
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import {
  GoStart,
  PlayOne,
  Pause,
  GoEnd,
  CloseOne,
  VolumeMute,
  VolumeSmall,
  VolumeNotice,
} from "@icon-park/vue-next";
import Player from "@/components/Player.vue";
import { mainStore } from "@/store";
const store = mainStore();

// 音量条数据
const volumeShow = ref(false);
const volumeNum = ref(store.musicVolume ? store.musicVolume : 0.7);

// 播放列表数据
const musicListShow = ref(false);
const playerRef = ref(null);
const playerData = reactive({
  server: import.meta.env.VITE_SONG_SERVER,
  type: import.meta.env.VITE_SONG_TYPE,
  id: import.meta.env.VITE_SONG_ID,
});

// 开启播放列表
const openMusicList = () => {
  musicListShow.value = true;
  playerRef.value.toggleList();
};

// 关闭播放列表
const closeMusicList = () => {
  musicListShow.value = false;
  playerRef.value.toggleList();
};

// 音乐播放暂停
const changePlayState = () => {
  playerRef.value.playToggle();
};

// 音乐上下曲
const changeMusicIndex = (type) => {
  playerRef.value.changeSong(type);
};

onMounted(() => {
  // 空格键事件
  window.addEventListener("keydown", (e) => {
    if (!store.musicIsOk) {
      return;
    }
    if (e.code == "Space") {
      changePlayState();
    }
  });
  // 挂载方法至 window
  window.$openList = openMusicList;
});

// 监听音量变化
watch(
  () => volumeNum.value,
  (value) => {
    store.musicVolume = value;
    playerRef.value.changeVolume(store.musicVolume);
  },
);
</script>

<style lang="scss" scoped>
.music {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: var(--card-border-radius);
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  animation: fade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-normal);
  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  }
  .btns {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    gap: 12px;
    span {
      background: rgba(255, 255, 255, 0.2);
      padding: 4px 12px;
      border-radius: var(--card-border-radius);
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
      font-size: 0.9rem;
      color: var(--text-secondary);
      transition: all var(--transition-normal);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
        color: var(--text-primary);
        transform: translateY(-2px);
      }
      &:active {
        transform: translateY(0);
      }
    }
  }
  .control {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    gap: 24px;
    .state {
      transition: all var(--transition-normal);
      .i-icon {
        width: 50px;
        height: 50px;
        display: block;
        color: var(--primary-blue);
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .i-icon {
      width: 40px;
      height: 40px;
      display: flex;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      transform: scale(1);
      background: rgba(255, 255, 255, 0.1);
      transition: all var(--transition-normal);
      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
      }
      &:active {
        transform: scale(0.95);
      }
    }
  }
  .menu {
    height: 32px;
    width: 100%;
    line-height: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    .name {
      width: 100%;
      text-align: center;
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
      animation: fade 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      font-size: 0.95rem;
      color: var(--text-secondary);
      font-weight: 500;
    }
    .volume {
      width: 100%;
      padding: 0 16px;
      display: flex;
      align-items: center;
      flex-direction: row;
      animation: fade 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      .icon {
        margin-right: 16px;
        span {
          width: 24px;
          height: 24px;
          display: block;
          color: var(--text-secondary);
        }
      }
      :deep(*) {
        transition: none;
      }
      :deep(.el-slider__button) {
        transition: all var(--transition-normal);
        &:hover {
          transform: scale(1.2);
        }
      }
      .el-slider {
        margin-right: 16px;
        --el-slider-main-bg-color: var(--primary-blue);
        --el-slider-runway-bg-color: rgba(255, 255, 255, 0.2);
        --el-slider-button-size: 16px;
      }
    }
  }
}
.music-list {
  position: fixed;
  top: 0;
  left: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 1;
  .list {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 640px;
    height: 600px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: var(--card-border-radius);
    z-index: 999;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    @media (max-width: 720px) {
      width: 90%;
      height: 80%;
    }
    .close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 32px;
      height: 32px;
      display: block;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-normal);
      &:hover {
        transform: scale(1.2);
        background: rgba(255, 255, 255, 0.2);
      }
      &:active {
        transform: scale(0.95);
      }
    }
  }
}

// 弹窗动画
.zoom-enter-active {
  animation: zoom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.zoom-leave-active {
  animation: zoom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse;
}
@keyframes zoom {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(-600px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
