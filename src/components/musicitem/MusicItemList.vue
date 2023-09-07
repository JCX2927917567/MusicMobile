<!-- 推荐歌单详情歌曲列表 -->
<template>
	<div class="musicitemBottom">
		<van-sticky :offset-top="`1.158301rem`">
			<div class="listTop">
				<div class="left">
					<svg class="icon bf" aria-hidden="true">
						<use xlink:href="#icon-bofang"></use>
					</svg>
					<span class="title">播放列表</span>
					<span class="count">({{ props.songs.length }})</span>
				</div>
				<div class="right">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-xiazai1"></use>
					</svg>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-xinzengdaohangliebiao_o"></use>
					</svg>
				</div>
			</div>
		</van-sticky>
		<div v-if="props.songs" class="list">
			<div
				v-for="(song, index) in props.songs"
				:key="song.id"
				class="listItem"
				@click="playMusic(index)"
			>
				<span class="no">{{ index + 1 }}</span>
				<div class="song">
					<span class="songName">{{ song.name }}</span>
					<span class="singers">
						<template v-for="(item, i) in song.ar" :key="item.id">
							<template v-if="i + 1 !== song.ar.length"
								>{{ item.name }}/</template
							>
							<template v-else>{{ item.name }}</template>
						</template>
					</span>
				</div>
				<div class="icons">
					<svg v-if="song.mv !== 0" class="icon mvIcon" aria-hidden="true">
						<use xlink:href="#icon-shipin"></use>
					</svg>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-gengduo"></use>
					</svg>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import usePlayListStore from "@/store/playList";

const usePlayList = usePlayListStore();
const props = defineProps({
	songs: {
		type: Array,
		required: true,
	},
});
function playMusic(value) {
	usePlayList.updatePlayList(props.songs);
	usePlayList.updatePlayListIndex(value);
}
</script>

<style lang="less" scoped>
.musicitemBottom {
	background: #ffffff;
	border-top-left-radius: 12px;
	border-top-right-radius: 12px;
	:deep(.van-sticky--fixed) {
		z-index: 0;
	}
	.listTop {
		display: flex;
		height: 50px;
		font-size: 14px;
		align-items: center;
		justify-content: space-between;
		background: #ffffff;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		padding: 0 16px;
		.left {
			display: flex;
			height: 100%;
			align-items: center;
			.bf {
				width: 20px;
				height: 20px;
				fill: red;
			}
			.title {
				font-size: 18px;
				font-weight: bold;
				margin: 0 10px 0 12px;
			}
			.count {
				color: #999999;
			}
		}
		.right {
			display: flex;
			width: 64px;
			align-items: center;
			justify-content: space-between;
			.icon:nth-child(1) {
				width: 16px;
				height: 16px;
				fill: black;
			}
			.icon:nth-child(2) {
				width: 16px;
				height: 20px;
				fill: black;
			}
		}
	}
	.list {
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
}
</style>
