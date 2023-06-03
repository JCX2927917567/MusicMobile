<!-- 头部组件 -->
<template>
    <div class="topNav">
        <div class="topLeft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-list"></use>
            </svg>
        </div>
        <van-search 
            right-icon="scan" 
            placeholder="请输入搜索关键词" 
            shape='round' disabled 
        />
        <div class="topRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tinggeshiqu"></use>
            </svg>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="stylus" scoped>
.topNav
    display flex
    width 100%
    height 44px
    padding 0 8px
    align-items center
    justify-content center
.van-search
    flex 1
    width 304px
    padding 0
    margin 0 3px
.icon
    fill #000000

</style>