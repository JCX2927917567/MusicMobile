<template>
	<router-view />
	<FooterMusic />
</template>

<script setup>
import FooterMusic from "@/components/musicitem/FooterMusic";
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
