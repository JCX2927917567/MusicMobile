<!-- 轮播图 -->
<template>
    <div class="swipeBanner">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { getBanner } from '@/request/api/home'

const state = reactive({
    images: [
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg'
    ]
})

onMounted(async () => {
    let res = await getBanner()
    state.images = res.data.banners
    // console.log(res);
})
</script>

<style lang="stylus" scoped>
.swipeBanner
    margin-top 16px
    .van-swipe 
        width 100%
        .van-swipe-item 
            padding 0 16px
            img 
                width 100%
                height 150px 
                border-radius 12px

        :deep(.van-swipe__indicator--active) 
            background-color red

</style>