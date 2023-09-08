<template>
	<router-view />
	<FooterMusic />
</template>

<script setup>
import FooterMusic from "@/components/musicitem/FooterMusic";

import usePlayListStore from "@/store/playList";
import { nextTick, onMounted } from "vue";

const usePlayList = usePlayListStore();

onMounted(() => {
	nextTick();
	usePlayList.cookie = sessionStorage.getItem("cookie");
	usePlayList.updateStatus();
});
</script>

<style lang="less">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.icon {
	width: 44px;
	height: 44px;
	fill: #ffffff;
}
a {
	color: black;
}
</style>
