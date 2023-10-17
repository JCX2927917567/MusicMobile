<template>
	<div class="container">
		<div class="scroll-wrapper" ref="scroll">
			<div class="scroll-content" ref="content">
				<div
					@click="$router.push(item.path)"
					class="scroll-item"
					v-for="item in menus"
					:key="item.id"
				>
					<svg class="icon" aria-hidden="true">
						<use :xlink:href="'#' + item.ico"></use>
					</svg>
					<span>{{ item.name }}</span>
				</div>
			</div>
			<div class="pointer-wrapper">
				<div class="inner" :style="{ left: innerLeft }"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
import _ from "lodash";
import BScroll from "@better-scroll/core";
import ObserveDom from "@better-scroll/observe-dom";
BScroll.use(ObserveDom);
import { onMounted, ref } from "vue";
// 菜单数组
const menus = [
	{ id: 1, ico: "icon-meirituijian1", name: "每日推荐", path: "/daySongs" },
	{ id: 2, ico: "icon-diantai", name: "私人FM", path: "" },
	{ id: 3, ico: "icon-gedan", name: "歌单", path: "" },
	{ id: 4, ico: "icon-paihangbang1", name: "排行榜", path: "" },
	{ id: 5, ico: "icon-shuben", name: "有声书", path: "" },
	{ id: 6, ico: "icon-zhuanji", name: "数字专辑", path: "" },
	{ id: 7, ico: "icon-fuwuzhibo_huaban", name: "直播", path: "" },
	{ id: 8, ico: "icon-guanzhu", name: "关注新歌", path: "" },
	{ id: 9, ico: "icon-yinle-", name: "一歌一遇", path: "" },
	{ id: 10, ico: "icon-shoucang1", name: "收藏家", path: "" },
	{ id: 11, ico: "icon-youxi", name: "游戏专区", path: "" },
];
const innerLeft = ref("0rem");
const scroll = ref(null);
const content = ref(null);
let wrapperWidth = 0;
let contentWidth = 0;
let bs = null;
onMounted(() => {
	wrapperWidth = scroll.value.offsetWidth;
	contentWidth = content.value.offsetWidth;
	// console.log(wrapperWidth, contentWidth);
	bs = new BScroll(scroll.value, {
		probeType: 3,
		scrollX: true,
		scrollY: false,
		observeDOM: true,
		click: true,
	});
	const onScroll = (position) => {
		// console.log(position, '////');
		let percent = Math.abs(position.x) / (contentWidth - wrapperWidth);
		// console.log(percent);
		let moveLeft = percent * 0.666667;
		innerLeft.value = `${moveLeft}rem`;
	};
	bs.on("scroll", _.throttle(onScroll, 50));
});
</script>

<style lang="less" scoped>
.container {
	width: 100%;
	height: 100px;
	padding: 16px;
	border-bottom: 1px solid #e6e6e6;
	text-align: center;
	.scroll-wrapper {
		width: 100%;
		height: 68px;
		white-space: nowrap;
		overflow: hidden;
		position: relative;
		.scroll-content {
			display: flex;
			width: fit-content;
			height: 100%;
			.scroll-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 8px 0;
				justify-content: space-between;
				height: 100%;
				width: calc((100vw - 32px) * 0.2);
				text-align: center;
			}
			.scroll-item span {
				font-size: 12px;
				color: #808080;
			}
			.scroll-item .icon {
				width: 30px;
				height: 30px;
				fill: red;
			}
		}
		// 滚动显示
		.pointer-wrapper {
			position: absolute;
			bottom: 2px;
			width: 34px;
			height: 2px;
			background: pink;
			opacity: 0.5;
			left: 50%;
			margin-left: -17px;
			.inner {
				position: absolute;
				background: red;
				width: 6px;
				height: 100%;
			}
		}
	}
}
</style>
