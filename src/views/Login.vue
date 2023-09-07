<template>
	<div class="login">
		<div class="loginTop">欢迎登录</div>
		<div class="loginContent" v-if="!showQRCode">
			<input
				type="tel"
				name="phone"
				v-model="loginInfo.phone"
				class="phone"
				placeholder="请输入手机号"
			/>
			<input
				type="password"
				name="password"
				v-model="loginInfo.password"
				class="password"
				placeholder="请输入密码"
			/>
			<button class="btn" @click="Login">登录</button>
			<button @click="codeLogin()">切换至二维码登录</button>
		</div>
		<div class="qrCode" v-else>
			<img :src="qrCodeBase64" alt="二维码" v-if="qrCodeBase64" />
			<div v-else>Loading...</div>
			<button @click="showQRCode = false">切换至手机登录</button>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import usePlayListStore from "../store/playList";

const usePlayList = usePlayListStore();
// 是否切换二维码登录
const showQRCode = ref(false);

const { qrCodeBase64 } = storeToRefs(usePlayList);

let loginInfo = reactive({
	phone: "",
	password: "",
});
async function codeLogin() {
	showQRCode.value = true;
	const cookie = await usePlayList.pollQRStatus(showQRCode.value);
}
</script>

<style lang="less" scoped>
.login {
	display: flex;
	flex-direction: column;
	background-color: rgba(222, 56, 56, 0.675);
	width: 100%;
	height: 100vh;
	.loginTop {
		display: flex;
		height: 20%;
		width: 200px;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
	}
	.loginContent {
		display: flex;
		padding: 0 60px 50px 60px;
		height: 60%;
		flex-direction: column;
		justify-content: space-around;
		.btn {
			width: 160px;
			margin: 0 auto;
			background-color: aquamarine;
		}
	}
	.qrCode {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: fit-content;
		height: 40%;
		margin: 0 auto;
	}
}
</style>
