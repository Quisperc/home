<template>
  <!-- 基本信息 -->
  <div class="message">
    <!-- Logo -->
    <div class="logo">
      <div class="logo-container">
        <img class="logo-img" :src="siteLogo" alt="logo" />
      </div>
      <div :class="{ name: true, 'text-hidden': true, long: siteUrl[0].length >= 6 }">
        <span class="bg">{{ siteUrl[0] }}</span>
        <span class="sm">.{{ siteUrl[1] }}</span>
      </div>
    </div>
    <!-- 简介 -->
    <div class="description cards" @click="changeBox">
      <div class="content">
        <Icon size="16" class="quote-icon">
          <QuoteLeft />
        </Icon>
        <Transition name="fade" mode="out-in">
          <div :key="descriptionText.hello + descriptionText.text" class="text">
            <p class="hello-text">{{ descriptionText.hello }}</p>
            <p class="description-text">{{ descriptionText.text }}</p>
          </div>
        </Transition>
        <Icon size="16" class="quote-icon">
          <QuoteRight />
        </Icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@vicons/utils";
import { QuoteLeft, QuoteRight } from "@vicons/fa";
import { Error } from "@icon-park/vue-next";
import { mainStore } from "@/store";
const store = mainStore();

// 主页站点logo
const siteLogo = import.meta.env.VITE_SITE_MAIN_LOGO;
// 站点链接
const siteUrl = computed(() => {
  const url = import.meta.env.VITE_SITE_URL;
  if (!url) return "Quisper.top".split(".");
  // 判断协议前缀
  if (url.startsWith("http://") || url.startsWith("https://")) {
    const urlFormat = url.replace(/^(https?:\/\/)/, "");
    return urlFormat.split(".");
  }
  return url.split(".");
});

// 简介区域文字
const descriptionText = reactive({
  hello: import.meta.env.VITE_DESC_HELLO,
  text: import.meta.env.VITE_DESC_TEXT,
});

// 切换右侧功能区
const changeBox = () => {
  if (store.getInnerWidth >= 721) {
    store.boxOpenState = !store.boxOpenState;
  } else {
    ElMessage({
      message: "当前页面宽度不足以开启盒子",
      grouping: true,
      icon: h(Error, {
        theme: "filled",
        fill: "#efefef",
      }),
    });
  }
};

// 监听状态变化
watch(
  () => store.boxOpenState,
  (value) => {
    if (value) {
      descriptionText.hello = import.meta.env.VITE_DESC_HELLO_OTHER;
      descriptionText.text = import.meta.env.VITE_DESC_TEXT_OTHER;
    } else {
      descriptionText.hello = import.meta.env.VITE_DESC_HELLO;
      descriptionText.text = import.meta.env.VITE_DESC_TEXT;
    }
  },
);
</script>

<style lang="scss" scoped>
.message {
  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    animation: fade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    max-width: 460px;
    gap: 24px;
    .logo-container {
      position: relative;
      .logo-img {
        border-radius: 50%;
        width: 120px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        transition: all var(--transition-normal);
        &:hover {
          transform: rotate(10deg) scale(1.05);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
        }
      }
    }
    .name {
      width: 100%;
      transform: translateY(-8px);
      font-family: "Pacifico-Regular";
      .bg {
        font-size: 5rem;
        background: linear-gradient(135deg, var(--primary-blue), var(--secondary-purple));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        display: inline-block;
        transition: transform var(--transition-normal);
        &:hover {
          transform: scale(1.05);
        }
      }
      .sm {
        margin-left: 8px;
        font-size: 2rem;
        color: var(--text-secondary);
        transition: color var(--transition-normal);
        &:hover {
          color: var(--primary-green);
        }
        @media (min-width: 721px) and (max-width: 789px) {
          display: none;
        }
      }
    }
    @media (max-width: 768px) {
      .logo-container {
        .logo-img {
          width: 100px;
        }
      }
      .name {
        height: 128px;
        .bg {
          font-size: 4.5rem;
        }
      }
    }
    @media (max-width: 720px) {
      max-width: 100%;
      gap: 16px;
    }
  }

  .description {
    padding: 1.5rem;
    margin-top: 3.5rem;
    max-width: 460px;
    animation: fade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
    .content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .quote-icon {
        color: var(--text-muted);
        transition: all var(--transition-normal);
        &:hover {
          color: var(--primary-blue);
          transform: scale(1.2);
        }
        &:nth-of-type(2) {
          align-self: flex-end;
        }
      }
      .text {
        margin: 0 1.25rem;
        line-height: 2rem;
        margin-right: auto;
        transition: all var(--transition-normal);
        .hello-text {
          font-family: "Pacifico-Regular";
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          transition: color var(--transition-normal);
          &:hover {
            color: var(--primary-green);
          }
        }
        .description-text {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
      }
    }
    @media (max-width: 720px) {
      max-width: 100%;
      pointer-events: none;
      padding: 1.25rem;
    }
  }
  @media (max-width: 390px) {
    .logo {
      flex-direction: column;
      gap: 12px;
      .logo-container {
        .logo-img {
          width: 80px;
        }
      }
      .name {
        margin-left: 0;
        height: auto;
        transform: none;
        text-align: center;
        .bg {
          font-size: 3.5rem;
        }
        .sm {
          font-size: 1.4rem;
        }
      }
    }
    .description {
      margin-top: 2.5rem;
    }
  }
}
</style>
