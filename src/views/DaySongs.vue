<template>
	<div>每日推荐</div>
</template>

<script setup>
import usePlayListStore from "@/store/playList";
import { onMounted } from "vue";

const usePlayList = usePlayListStore();

onMounted(async () => {
	const res = await usePlayList.getDayRecommend();
	console.log(res);
});
</script>

<style lang="less" scoped></style>
