<template>
	<div
		class="footerMusic"
		:style="{ bottom: $route.meta.hasTabber ? '45px' : '0' }"
		v-show="!$route.meta.isHideFooter"
		@click="usePlayList.updateDetailShow"
	>
		<div class="footerLeft">
			<img :src="playList[playListIndex].al.picUrl" alt="" />
			<div class="text">
				<p>
					<span>{{ playList[playListIndex].name }}</span> --
					<template v-for="item in playList[playListIndex].ar">
						{{ item.name }}
					</template>
				</p>
			</div>
		</div>
		<div class="footerRight">
			<svg v-if="!isPlay" class="icon" aria-hidden="true" @click="play">
				<use xlink:href="#icon-bofang1"></use>
			</svg>
			<svg v-else class="icon" aria-hidden="true" @click="play">
				<use xlink:href="#icon-weibiaoti--"></use>
			</svg>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-24gf-playlist"></use>
			</svg>
		</div>
		<audio
			ref="audio"
			@ended="ended()"
			:src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
		>
			该浏览器不支持
		</audio>
	</div>
	<van-popup
		v-model:show="detailShow"
		position="bottom"
		:style="{ height: '100%' }"
		:close-on-click-overlay="true"
	>
		<MusicDetail
			:list="playList[playListIndex]"
			:play="play"
			:addDuration="addDuration"
			:audio="audio"
		/>
	</van-popup>
</template>

<script setup>
import usePlayListStore from "@/store/playList";
import { storeToRefs } from "pinia";
import { onMounted, onUpdated, ref, watch } from "vue";
import MusicDetail from "@/components/musicitem/MusicDetail";

const usePlayList = usePlayListStore();
const { playList, playListIndex, isPlay, detailShow, duration } =
	storeToRefs(usePlayList);
const audio = ref(null);
let interVal = ref(null);
onMounted(() => {
	usePlayList.getLyric(playList.value[playListIndex.value].id);
	// console.log(audio);
	console.log("onMounted");
});
onUpdated(() => {
	// console.log(audio, ",,,,,,");
	console.log("update");
	usePlayList.getLyric(playList.value[playListIndex.value].id);
	audio.value.oncanplay = function () {
		addDuration();
		updateTime();
	};
});
function play(e) {
	e.stopPropagation();
	// 判断音乐是否播放
	if (audio.value.paused) {
		audio.value.play();
		console.log(audio.value.src);
		usePlayList.updateIsPlay(true);
		updateTime();
	} else {
		audio.value.pause();
		usePlayList.updateIsPlay(false);
		clearInterval(interVal.value);
	}
}

function updateTime() {
	interVal.value = setInterval(() => {
		usePlayList.updateCurrentTime(audio.value.currentTime);
	}, 1000);
}
/**总时长 */
function addDuration() {
	console.log(audio.value.duration);
	usePlayList.updateDuration(audio.value.duration);
}

/**歌曲结束切换 */
function ended() {
	let index = playList.value.length + 1;
	if (index <= playList.value.length - 1) {
		usePlayList.updatePlayListIndex(index);
	} else {
		usePlayList.updatePlayListIndex(0);
	}
}

// 监听音乐切换，自动播放
watch(playListIndex, () => {
	if (audio.value.paused) {
		audio.value.autoplay = true;
		usePlayList.updateIsPlay(true);
	}
});
watch(playList, () => {
	if (!usePlayList.isPlay) {
		audio.value.autoplay = true;
		usePlayList.updateIsPlay(true);
	}
});
</script>

<style lang="less" scoped>
.footerMusic {
	display: flex;
	width: 100%;
	height: 60px;
	padding: 0 16px;
	background: #ffffff;
	position: fixed;
	bottom: 0;
	box-shadow: 0px -1px 150px rgba(0, 0, 0, 0.1);
	.footerLeft {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		img {
			width: 44px;
			height: 44px;
			border-radius: 50%;
			border: 7px solid #333;
		}
		.text {
			padding: 0 10px;
			flex: 1;
			p {
				width: 242px;
				height: 20px;
				font-size: 12px;
				color: #808080;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				span {
					color: #000;
					font-size: 14px;
				}
			}
		}
	}
	.footerRight {
		display: flex;
		width: 76px;
		align-items: center;
		justify-content: space-between;
		.icon {
			width: 28px;
			height: 28px;
			fill: #000;
		}
	}
}
</style>
