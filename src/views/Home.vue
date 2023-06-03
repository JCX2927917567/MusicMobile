<template>
    <div class="home">
        <!-- 头部 -->
        <TopNav />
        <!-- 轮播图 -->
        <SwipeBanner />
        <!-- 滚动导航菜单 -->
        <horizen-scroll-menu />
        <!-- 歌单推荐 -->
        <MusicList />
    </div>
</template>

<script setup>
import TopNav from '@/components/home/TopNav';
import SwipeBanner from '@/components/home/SwipeBanner';
import HorizenScrollMenu from '@/components/home/HorizenScrollMenu'
import MusicList from '@/components/home/MusicList.vue';


</script>

<style lang="stylus" scoped>

</style>