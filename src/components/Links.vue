<template>
  <div v-if="siteLinks[0]" class="links">
    <div class="line">
      <Icon size="20">
        <Link />
      </Icon>
      <span class="title">网站列表</span>
    </div>
    <!-- 网站列表 -->
    <Swiper
      v-if="siteLinks[0]"
      :modules="[Pagination, Mousewheel]"
      :slides-per-view="1"
      :space-between="40"
      :pagination="{
        el: '.swiper-pagination',
        clickable: true,
        bulletElement: 'div',
      }"
      :mousewheel="true"
    >
      <SwiperSlide v-for="site in siteLinksList" :key="site">
        <el-row class="link-all" :gutter="20">
          <el-col v-for="(item, index) in site" :span="8" :key="item">
            <div
              class="item cards"
              :style="index < 3 ? 'margin-bottom: 20px' : null"
              @click="jumpLink(item)"
            >
              <Icon size="26">
                <component :is="siteIcon[item.icon]" />
              </Icon>
              <span class="name text-hidden">{{ item.name }}</span>
            </div>
          </el-col>
        </el-row>
      </SwiperSlide>
      <div class="swiper-pagination" />
    </Swiper>
  </div>
</template>

<script setup>
import { Icon } from "@vicons/utils";
// 可前往 https://www.xicons.org 自行挑选并在此处引入
import { Link, Blog, CompactDisc, Cloud, Compass, Book, Fire, LaptopCode, Comment,BookOpen, Scroll, MailBulk, FileAlt, FolderOpen } from "@vicons/fa"; // 注意使用正确的类别
import { mainStore } from "@/store";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Mousewheel } from "swiper/modules";
import siteLinks from "@/assets/siteLinks.json";

const store = mainStore();

// 计算网站链接
const siteLinksList = computed(() => {
  const result = [];
  for (let i = 0; i < siteLinks.length; i += 6) {
    const subArr = siteLinks.slice(i, i + 6);
    result.push(subArr);
  }
  return result;
});

// 网站链接图标
const siteIcon = {
  Blog,
  Cloud,
  CompactDisc,
  Compass,
  Book,
  Fire,
  LaptopCode,
  Comment,
  BookOpen,
  Scroll,
  MailBulk,
  FileAlt,
  FolderOpen
};

// 链接跳转
const jumpLink = (data) => {
  if (data.name === "音乐" && store.musicClick) {
    if (typeof $openList === "function") $openList();
  } else {
    window.open(data.link, "_blank");
  }
};

onMounted(() => {
  console.log(siteLinks);
});
</script>

<style lang="scss" scoped>
.links {
  .line {
    margin: 2rem 0.25rem 1.5rem;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    animation: fade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s both;
    .i-icon {
      color: var(--primary-blue);
      transition: all var(--transition-normal);
      &:hover {
        transform: rotate(15deg) scale(1.1);
      }
    }
    .title {
      margin-left: 12px;
      font-size: 1.25rem;
      font-weight: 600;
      text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      color: var(--text-primary);
      transition: color var(--transition-normal);
      &:hover {
        color: var(--primary-green);
      }
    }
  }
  .swiper {
    left: -10px;
    width: calc(100% + 20px);
    padding: 10px 10px 20px;
    z-index: 0;
    .swiper-slide {
      height: 100%;
    }
    .swiper-pagination {
      margin-top: 16px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      :deep(.swiper-pagination-bullet) {
        background-color: var(--text-muted);
        width: 24px;
        height: 4px;
        margin: 0 6px;
        border-radius: 4px;
        opacity: 0.4;
        transition: all var(--transition-normal);
        &.swiper-pagination-bullet-active {
          opacity: 1;
          background-color: var(--primary-blue);
          width: 32px;
        }
        &:hover {
          opacity: 0.8;
          background-color: var(--primary-blue);
        }
      }
    }
  }
  .link-all {
    height: 240px;
    .item {
      height: 100px;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      padding: 0 16px;
      animation: fade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      box-shadow: var(--card-shadow);
      transition: all var(--transition-normal);

      &:hover {
        transform: translateY(-4px) scale(1.03);
        background: rgba(0, 0, 0, 0.5);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
      }

      &:active {
        transform: translateY(0) scale(0.98);
      }

      .i-icon {
        color: var(--primary-green);
        transition: all var(--transition-normal);
        &:hover {
          transform: scale(1.2);
          color: var(--primary-blue);
        }
      }

      .name {
        font-size: 1.1rem;
        margin-left: 12px;
        color: var(--text-primary);
        font-weight: 500;
        transition: color var(--transition-normal);
        &:hover {
          color: var(--primary-blue);
        }
      }
      @media (min-width: 720px) and (max-width: 820px) {
        .name {
          display: none;
        }
      }
      @media (max-width: 720px) {
        height: 80px;
      }
      @media (max-width: 460px) {
        flex-direction: column;
        gap: 8px;
        .name {
          font-size: 1rem;
          margin-left: 0;
          margin-top: 0;
        }
      }
    }
    @media (max-width: 720px) {
      height: 180px;
    }
  }
}
</style>
