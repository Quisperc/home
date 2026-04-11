<template>
  <!-- 社交链接 -->
  <div class="social">
    <div class="link">
      <a
        v-for="(item, index) in socialLinks"
        :key="item.name"
        :href="item.url"
        target="_blank"
        @mouseenter="socialTip = item.tip"
        @mouseleave="socialTip = '通过这里联系我吧'"
        class="social-link"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="icon-container">
          <img class="icon" :src="item.icon" height="24" />
        </div>
      </a>
    </div>
    <Transition name="fade">
      <span class="tip">{{ socialTip }}</span>
    </Transition>
  </div>
</template>

<script setup>
import socialLinks from "@/assets/socialLinks.json";

// 社交链接提示
const socialTip = ref("通过这里联系我吧");
</script>

<style lang="scss" scoped>
.social {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 460px;
  width: 100%;
  height: 56px;
  background-color: transparent;
  border-radius: var(--card-border-radius);
  backdrop-filter: blur(0);
  animation: fade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
  transition:
    background-color var(--transition-normal),
    backdrop-filter var(--transition-normal),
    box-shadow var(--transition-normal);
  @media (max-width: 840px) {
    max-width: 100%;
    justify-content: center;
    .link {
      justify-content: space-evenly !important;
      width: 90%;
    }
    .tip {
      display: none !important;
    }
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fade 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      .icon-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.1);
        transition: all var(--transition-normal);
        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.15) rotate(5deg);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        &:active {
          transform: scale(0.95);
        }
        .icon {
          transition: all var(--transition-normal);
          &:hover {
            transform: scale(1.2);
          }
        }
      }
    }
  }
  .tip {
    display: none;
    margin-right: 20px;
    font-size: 0.9rem;
    color: var(--text-secondary);
    animation: fade 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  @media (min-width: 768px) {
    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      .tip {
        display: block;
      }
    }
  }
}
</style>
