<template>
	<div class="searchTop">
		<div class="searchLeft" @click="onClickLeft()">
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-xitongfanhui"></use>
			</svg>
		</div>
		<van-search
			v-model="secrchVal"
			show-action
			placeholder="请输入搜索关键词"
			shape="round"
			@search="searchKey()"
		>
			<template #action>
				<div @click="searchKey()">搜索</div>
			</template>
		</van-search>
	</div>
	<div class="searchHistory">
		<div class="searchTitle">
			<span>搜索历史</span>
			<svg class="icon" aria-hidden="true" @click="showConfirmationDialog()">
				<use xlink:href="#icon-shanchu"></use>
			</svg>
		</div>
		<span v-for="item in keywordList" :key="item" @click="searchHistory(item)">
			{{ item }}
		</span>
	</div>
	<!-- 搜索列表 -->
	<div v-if="searchList" class="list">
		<div
			v-for="(song, index) in searchList"
			:key="song.id"
			class="listItem"
			@click="updateIndex(song)"
		>
			<span class="no">{{ index + 1 }}</span>
			<div class="song">
				<span class="songName">{{ song.name }}</span>
				<span class="singers">
					<template v-for="(item, i) in song.artists" :key="item.id">
						<template v-if="i + 1 !== song.artists.length"
							>{{ item.name }}/</template
						>
						<template v-else>{{ item.name }}</template>
					</template>
				</span>
			</div>
			<div class="icons">
				<svg v-if="song.mvid !== 0" class="icon mvIcon" aria-hidden="true">
					<use xlink:href="#icon-shipin"></use>
				</svg>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-gengduo"></use>
				</svg>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted } from "vue";
import { showConfirmDialog } from "vant";
import { ref } from "vue";
import { getSearchMusic } from "@/request/api/home.js";
import usePlayListStore from "@/store/playList";

const usePlayList = usePlayListStore();
const secrchVal = ref("");
const keywordList = ref([]);
const searchList = ref([]);
onMounted(() => {
	if (localStorage.getItem("keywordList")) {
		keywordList.value = JSON.parse(localStorage.getItem("keywordList"));
	}
});
/**返回上一页面 */
function onClickLeft() {
	history.back();
}
/**搜索 */
async function searchKey() {
	if (secrchVal.value != "") {
		// console.log("点击了");
		keywordList.value.unshift(secrchVal.value);
		// 数组去重
		keywordList.value = [...new Set(keywordList.value)];
		// 固定长度
		if (keywordList.value.length > 10) {
			keywordList.value.length -= 1;
		}
		// 保存搜索历史
		localStorage.setItem("keywordList", JSON.stringify(keywordList.value));
		let res = await getSearchMusic(secrchVal.value);
		searchList.value = res.data.result.songs;
		console.log(searchList.value);
	}
}
/**是否删除搜索历史记录 */
function showConfirmationDialog() {
	showConfirmDialog({
		title: "确认删除",
		message: "您确定要删除搜索历史吗？",
	})
		.then(() => {
			keywordList.value = [];
			if (localStorage.getItem("keywordList")) {
				localStorage.removeItem("keywordList");
			}
		})
		.catch(() => {
			// 用户点击了取消按钮
			// 可选的取消处理逻辑
		});
}
/**根据历史记录搜索 */
async function searchHistory(val) {
	let res = await getSearchMusic(val);
	searchList.value = res.data.result.songs;
	console.log(searchList.value);
}
/**歌曲列表播放 */
function updateIndex(item) {
	console.log(item);
	item.al = item.album;
	item.al.picUrl = item.album.artist.img1v1Url;
	item.ar = item.artists;
	usePlayList.pushPlayList(item);
	usePlayList.updatePlayListIndex(usePlayList.playList.length - 1);
}
</script>

<style lang="less" scoped>
.searchTop {
	display: flex;
	width: 100%;
	height: 44px;
	padding: 0 8px;
	align-items: center;
	justify-content: center;
	.searchLeft {
		display: flex;
		align-items: center;
	}
}
.van-search {
	flex: 1;
	width: 304px;
	padding: 0;
	margin: 0 3px;
}
.icon {
	width: 24px;
	height: 24px;
	fill: #000000;
}
.searchHistory {
	display: flex;
	width: 100%;
	padding: 0 8px;
	font-size: 16px;
	flex-wrap: wrap;
	.searchTitle {
		display: flex;
		height: 28px;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin: 5px 0;
		.icon {
			width: 20px;
			height: 20px;
			fill: #999;
		}
	}
	span:first-child {
		height: 20px;
		line-height: 20px;
		margin-top: 5px;
		font-weight: 700;
	}
	span:not(:first-child) {
		height: 20px;
		line-height: 20px;
		color: #fff;
		background-color: #999;
		padding: 0px 10px;
		border-radius: 20px;
		margin: 5px 5px;
	}
}

.list {
	padding: 10px 0;
	margin-bottom: 60px;
	.listItem {
		display: flex;
		width: 100%;
		height: 60px;
		justify-content: space-between;
		padding-right: 16px;
		.no {
			display: flex;
			height: 100%;
			width: 48px;
			align-items: center;
			justify-content: center;
			color: #999999;
			font-size: 16px;
		}
		.song {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: center;
			.songName {
				font-size: 16px;
				width: 282px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color: #333333;
			}
			.singers {
				width: 282px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 12px;
				color: #999999;
			}
		}
		.icons {
			display: flex;
			align-items: center;
			justify-content: end;
			width: 68px;
			.icon {
				width: 24px;
				height: 24px;
				fill: #999999;
			}
			.mvIcon {
				margin-right: 20px;
			}
		}
	}
}
</style>
