<!-- 歌曲播放界面组件 -->
<template>
	<!-- 背景图片 -->
	<img :src="list.al.picUrl" alt="" class="bgImg" />
	<div class="detail">
		<!-- 头部 -->
		<div class="detailTop">
			<div class="detailTopLeft" @click="hideDetail()">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-arrow-b_line"></use>
				</svg>
			</div>
			<div class="detailTopCenter">
				<Vue3Marquee scrollamount="3">
					<p>{{ props.list.name }}</p>
				</Vue3Marquee>
				<span class="author">
					<template v-for="(item, i) in props.list.ar" :key="i">
						<template v-if="i < props.list.ar.length - 1">
							{{ item.name }}/
						</template>
						<template v-else>
							{{ item.name }}
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-jiantou_liebiaoxiangyou_o"></use>
							</svg>
						</template>
					</template>
				</span>
			</div>
			<div class="detailTopRight">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-fenxiang"></use>
				</svg>
			</div>
		</div>
		<!-- 组件中间磁盘、指针部分 -->
		<div
			class="detailContent"
			v-show="!isLyricShow"
			@click="isLyricShow = true"
		>
			<img
				src="@/assets/needle-ab.png"
				alt=""
				:class="isPlay ? 'img_needle_active' : 'img_needle'"
			/>
			<img src="@/assets/cd.png" alt="" class="img_cd" />
			<img
				:src="list.al.picUrl"
				alt=""
				class="img_al"
				:class="isPlay ? 'img_al_active' : 'img_al_paused'"
			/>
		</div>
		<!-- 歌词部分 -->
		<div
			class="musicLyric"
			ref="musicLyric"
			v-show="isLyricShow"
			@click="isLyricShow = false"
		>
			<p
				v-for="(item, index) in lyric"
				:key="index"
				:class="{
					active:
						(currentTime * 1000 >= item.time &&
							currentTime * 1000 < item.pre) ||
						(lyric[index + 1] &&
							lyric[index + 1].lrc == '' &&
							currentTime * 1000 > item.pre &&
							currentTime * 1000 < lyric[index + 1].pre),
				}"
			>
				{{ item.lrc }}
			</p>
		</div>
		<!-- 底部功能部分 -->
		<div class="detailBottom">
			<div class="topControls">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-xihuan"></use>
				</svg>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-xiazai"></use>
				</svg>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-changpian"></use>
				</svg>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-pinglun1"></use>
				</svg>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-gengduo"></use>
				</svg>
			</div>
			<div class="slider">
				{{ timeFormat(currentTime) }}
				<input
					type="range"
					class="range"
					min="0"
					:max="duration"
					step="0.05"
					v-model="currentTime"
				/>
				{{ timeFormat(duration) }}
			</div>
			<div class="bottomControls">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-repeat2"></use>
				</svg>
				<svg class="icon" aria-hidden="true" @click="pre()">
					<use xlink:href="#icon-shangyishou"></use>
				</svg>
				<svg
					v-if="!isPlay"
					class="icon icon-play"
					aria-hidden="true"
					@click="play"
				>
					<use xlink:href="#icon-zanting"></use>
				</svg>
				<svg v-else class="icon icon-play" aria-hidden="true" @click="play">
					<use xlink:href="#icon-bofang2"></use>
				</svg>
				<svg class="icon" aria-hidden="true" @click="next()">
					<use xlink:href="#icon-xiayishou"></use>
				</svg>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-24gl-playlistMusic3"></use>
				</svg>
			</div>
		</div>
	</div>
</template>

<script setup>
import usePlayListStore from "@/store/playList";
import { storeToRefs } from "pinia";
import { computed, watch, ref, onMounted, onUpdated } from "vue";
const props = defineProps({
	list: {
		type: Object,
		required: true,
	},
	play: {
		type: Function,
		required: true,
	},
	addDuration: {
		type: Function,
		required: true,
	},
});
const musicLyric = ref(null);
onMounted(() => {
	props.addDuration();
});
const usePlayList = usePlayListStore();
const {
	playList,
	playListIndex,
	isPlay,
	detailShow,
	isLyricShow,
	lyricList,
	currentTime,
	duration,
} = storeToRefs(usePlayList);
/**歌曲详情页关闭时，切换为磁盘 */
function hideDetail() {
	usePlayList.updateDetailShow();
	isLyricShow.value = false;
}
/**切换上一首歌曲 */
function pre() {
	let index = playListIndex.value - 1;
	if (index >= 0) {
		usePlayList.updatePlayListIndex(index);
	} else {
		usePlayList.updatePlayListIndex(playList.value.length - 1);
	}
}
/**切换下一首歌曲 */
function next() {
	let index = playListIndex.value + 1;
	if (index <= playList.value.length - 1) {
		usePlayList.updatePlayListIndex(index);
	} else {
		usePlayList.updatePlayListIndex(0);
	}
}
/**时间格式转化 */
function timeFormat(e) {
	let time = Math.floor(e);
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
	return result;
}

function padTo2Digits(num) {
	return num.toString().padStart(2, "0");
}

const lyric = computed(() => {
	let arr;
	if (lyricList.value) {
		arr = lyricList.value.split(/[(\r\n)\r\n]+/).map((item, i) => {
			let min = item.slice(1, 3);
			let sec = item.slice(4, 6);
			let mill = item.slice(7, 10);
			let lrc = item.slice(11, item.length);
			let time =
				parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);

			// 当毫秒不是三位数时的操作
			if (isNaN(Number(mill))) {
				mill = item.slice(7, 9);
				lrc = item.slice(10, item.length);
				time =
					parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
			}
			console.log(min, sec, mill, lrc);
			return { min, sec, mill, lrc, time };
		});
		arr.forEach((item, i) => {
			if (
				i === arr.length - 1 ||
				(i === arr.length - 2 && isNaN(arr[i + 1].time))
			) {
				item.pre = Infinity;
			} else {
				item.pre = arr[i + 1].time;
			}
		});
	}
	console.log(arr);
	return arr;
});
watch(currentTime, () => {
	let p = document.querySelector("p.active");
	// console.log([p]);
	if (p) {
		if (p.offsetTop > 300) {
			requestAnimationFrame(() => {
				musicLyric.value.scrollTo({
					top: p.offsetTop - 300,
					behavior: "smooth",
				});
			});
		}
	}
});
</script>

<style lang="less" scoped>
.bgImg {
	width: 100%;
	height: 100%;
	object-fit: cover;
	position: absolute;
	z-index: -1;
	filter: blur(80px) brightness(60%);
}
.detail {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.detailTop {
	display: flex;
	width: 100%;
	height: 48px;
	align-items: center;
	justify-content: space-between;
	.icon {
		fill: #ffffff;
		width: 22px;
		height: 22px;
		margin: 0 16px;
	}
	.detailTopLeft {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
	.detailTopCenter {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		margin: 0 10px;
		justify-content: space-around;
		text-align: center;
		p {
			font-size: 18px;
			color: #ffffff;
		}
		.author {
			font-size: 12px;
			color: #ffffff;
			opacity: 0.6;
			.icon {
				margin: 0;
				width: 12px;
				height: 12px;
			}
		}
	}
	.detailTopRight {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
}
.detailContent {
	display: flex;
	width: 100%;
	flex: 1;
	overflow: hidden;
	margin-top: 20px;
	flex-direction: column;
	align-items: center;
	position: relative;
	.img_needle {
		width: 209px;
		height: 208px;
		object-fit: contain;
		position: absolute;
		z-index: 1;
		left: 150px;
		transform-origin: 56px 20px;
		transform: rotate(-10deg);
		transition: all 2s;
	}
	.img_needle_active {
		width: 209px;
		height: 208px;
		object-fit: contain;
		position: absolute;
		z-index: 1;
		left: 150px;
		transform-origin: 56px 20px;
		transform: rotate(4deg);
		transition: all 2s;
	}
	.img_cd {
		position: absolute;
		top: 140px;
		width: 318px;
		height: 318px;
	}
	.img_al {
		position: absolute;
		z-index: -1;
		top: 198px;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		animation: rotate_al 10s linear infinite;
	}
	.img_al_active {
		animation-play-state: running;
	}
	.img_al_paused {
		animation-play-state: paused;
	}
	// 磁盘内图片旋转动画
	@keyframes rotate_al {
		0% {
			transform: rotateZ(0deg);
		}
		100% {
			transform: rotateZ(360deg);
		}
	}
}
.musicLyric {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	padding-top: 300px;
	padding-bottom: 214px;
	overflow: scroll;
	transition: all 0.5s;
	p {
		font-size: 16px;
		color: #fff;
		margin-bottom: 10px;
		opacity: 0.6;
	}
	.active {
		color: aqua;
		font-size: 20px;
	}
}
.detailBottom {
	width: 100%;
	padding: 0 16px;
	.topControls {
		display: flex;
		width: 100%;
		justify-content: space-around;
		.icon {
			width: 28px;
			height: 28px;
		}
	}
	.slider {
		margin: 20px 0;
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		font-size: 16px;
		color: #fff;
		opacity: 0.6;
		.range {
			width: 100%;
			height: 6px;
			margin: 0 8px;
		}
	}
	.bottomControls {
		display: flex;
		width: 100%;
		margin-bottom: 20px;
		align-items: center;
		justify-content: space-around;
		.icon {
			width: 28px;
			height: 28px;
		}
		.icon-play {
			width: 42px;
			height: 42px;
		}
	}
}
</style>
