<!-- 推荐歌单详情页 -->
<template>
	<div class="container">
		<MusicItemTop :playlist="state.playlist" />
		<MusicItemList :songs="state.songs" />
	</div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { getMusicItem, getMusicItemList } from "@/request/api/musicItem";
import MusicItemTop from "@/components/musicitem/MusicItemTop.vue";
import MusicItemList from "@/components/musicitem/MusicItemList.vue";

const state = reactive({
	playlist: {}, // 歌单详情
	songs: [], // 歌曲列表
});

onMounted(async () => {
	// 获取歌单id
	let id = useRoute().query.id;
	// 获取歌单详情页
	let res = await getMusicItem(id);
	// console.log(res.data.playlist);
	let result = await getMusicItemList(id);
	// console.log(result.data.songs);
	state.playlist = res.data.playlist;
	state.songs = result.data.songs;
	// console.log(state.songs, "----");
});
</script>

<style lang="less" scoped>
.container {
	background: #c3988e;
	height: 100vh;
	padding-bottom: 60px;
	overflow: hidden;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		display: none;
	}
}
</style>
