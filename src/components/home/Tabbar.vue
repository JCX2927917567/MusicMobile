<template>
	<van-tabbar route border="false">
		<van-tabbar-item to="/home">
			<span>发现</span>
			<template #icon="props">
				<svg class="icon" aria-hidden="true">
					<use
						:xlink:href="props.active ? '#icon-yinle-active' : '#icon-yinle'"
					></use>
				</svg>
			</template>
		</van-tabbar-item>
		<van-tabbar-item to="/player">
			<span>播客</span>
			<template #icon="props">
				<svg class="icon" aria-hidden="true">
					<use
						:xlink:href="
							props.active ? '#icon-radioguangbo-active' : '#icon-radioguangbo'
						"
					></use>
				</svg>
			</template>
		</van-tabbar-item>
		<van-tabbar-item to="/infoUser">
			<span>我的</span>
			<template #icon="props">
				<svg class="icon" aria-hidden="true">
					<use
						:xlink:href="props.active ? '#icon-yinle1-active' : '#icon-yinle1'"
					></use>
				</svg>
			</template>
		</van-tabbar-item>
		<van-tabbar-item to="/follow">
			<span>关注</span>
			<template #icon="props">
				<svg class="icon" aria-hidden="true">
					<use
						:xlink:href="
							props.active ? '#icon-guanzhu-active' : '#icon-guanzhu'
						"
					></use>
				</svg>
			</template>
		</van-tabbar-item>
		<van-tabbar-item to="/chat">
			<span>社区</span>
			<template #icon="props">
				<svg class="icon" aria-hidden="true">
					<use
						:xlink:href="
							props.active
								? '#icon-shequ-xianxing-active'
								: '#icon-shequ-xianxing'
						"
					></use>
				</svg>
			</template>
		</van-tabbar-item>
	</van-tabbar>
</template>

<script setup></script>

<style lang="less" scoped>
.icon {
	width: 20px;
	height: 20px;
	fill: #999;
}
</style>
