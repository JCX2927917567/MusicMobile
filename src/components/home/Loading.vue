<template>
	<div class="vloading" v-show="loading">
		<van-loading size="60px" type="circular" color="red" vertical></van-loading>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import usePlayListStore from "@/store/playList";

const store = usePlayListStore();

const { loading } = storeToRefs(store);
</script>

<style lang="less" scoped>
.vloading {
	position: absolute;
	z-index: 9999;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	display: flex;
	align-items: center;
	background: rgba(0, 0, 0, 0.7);
	justify-content: center;
}
</style>
