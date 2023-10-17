<!-- 推荐歌单 -->
<template>
	<div class="musicList">
		<div class="title">
			<div class="left">
				<span>推荐歌单</span>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-jiantou_liebiaoxiangyou_o"></use>
				</svg>
			</div>
			<div class="right">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-gengduo"></use>
				</svg>
			</div>
		</div>
		<div class="content">
			<van-swipe
				:loop="false"
				:width="state.itemWidth"
				:show-indicators="false"
			>
				<van-swipe-item v-for="item in state.musicList" :key="item.id">
					<router-link :to="{ path: '/musicItem', query: { id: item.id } }">
						<img v-img-lazy="item.picUrl" alt="" />
						<span class="playCount">
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-play"></use>
							</svg>
							{{ changeCount(item.playCount) }}
						</span>
						<svg class="Rbicon icon" aria-hidden="true">
							<use xlink:href="#icon-play"></use>
						</svg>
						<span class="name">
							{{ item.name }}
						</span>
					</router-link>
				</van-swipe-item>
			</van-swipe>
		</div>
	</div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { changeCount } from "@/common/js/changeCount";
import { getMusicList } from "@/request/api/home";

const state = reactive({
	musicList: [],
	itemWidth: 126,
});

onMounted(async () => {
	let res = await getMusicList();
	// console.log(res);
	state.musicList = res.data.result;
	0;
	// console.log(window,'????');
	state.itemWidth = (window.innerWidth / 10) * 3.040541;
	window.addEventListener("resize", () => {
		state.itemWidth = (window.innerWidth / 10) * 3.040541; // 3.040541为初始页面，px->rem值
	});
});
</script>

<style lang="less" scoped>
.musicList {
	padding: 16px 0;
	border-bottom: 1px solid #e6e6e6;
}
.title {
	display: flex;
	width: 100%;
	padding: 0 16px 16px;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	span {
		font-weight: bold;
		font-size: 18px;
	}
	.left {
		display: flex;
		align-items: center;
	}
	.right {
		display: flex;
		align-items: center;
	}
	.icon {
		width: 18px;
		height: 18px;
		fill: #808080;
	}
}
.content {
	width: 100%;
	height: 164px;
	padding: 0 12px;
	.van-swipe {
		height: 100%;
		.van-swipe__track {
			.van-swipe-item {
				position: relative;
				padding: 0 4px;
				img {
					width: 118px;
					height: 118px;
					border-radius: 12px;
				}
				.Rbicon {
					position: absolute;
					top: 92px;
					right: 8px;
					width: 20px;
					height: 20px;
				}
				.playCount {
					display: flex;
					align-items: center;
					position: absolute;
					color: whitesmoke;
					z-index: 1;
					right: 8px;
					top: 6px;
					font-size: 14px;
					.icon {
						width: 14px;
						height: 14px;
					}
				}
			}
		}
		.name {
			display: -webkit-inline-box;
			font-size: 13px;
			height: 36px;
			color: #333333;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
	}
}
</style>
