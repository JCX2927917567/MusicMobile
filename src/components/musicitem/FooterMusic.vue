<template>
    <div class="footerMusic">
        <div class="footerLeft">
            <img :src="currentSong.al.picUrl" alt="">
            <div>
                <p>{{ currentSong.al.name }}</p>
                <span>横滑切换上下首</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gf-playlist"></use>
            </svg>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex'

const store = useStore()
const { playList, playListIndex } = store.state
const currentSong = computed(() => playList[playListIndex])
onMounted(() => {
    console.log(currentSong);
})

</script>

<style lang="stylus" scoped>
.footerMusic
    width 100%
    height 60px
    background #FFFFFF
    position fixed
    bottom 0
    border-top 1px solid #333
</style>