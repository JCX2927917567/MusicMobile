// 底部播放组件歌曲列表
import { defineStore } from "pinia";
import { getMusicLyric } from "../request/api/musicItem";
import {
	generateQRKey,
	generateQRCode,
	checkQRCode,
	getStatus,
} from "../request/api/home";
import router from "@/router";

const usePlayListStore = defineStore("playList", {
	state: () => ({
		playList: [
			{
				al: {
					id: 123723319,
					name: "再见莫妮卡",
					pic: 109951165770805060,
					picUrl:
						"https://p2.music.126.net/me6QV0CallEOlOP6Zb0b3w==/109951165770805050.jpg",
					pic_str: "109951165770805050",
				},
				ar: [
					{
						id: 30644200,
						name: "彭席彦",
					},
					{
						id: 12338185,
						name: "Franky弗兰奇",
					},
				],
				id: 1824045033,
				name: "再见莫妮卡",
			},
		],
		playListIndex: 0, // 默认下标
		isPlay: false, // 播放暂停按钮切换
		detailShow: false, // 详情页展示
		lyricList: {}, // 歌词
		isLyricShow: false,
		currentTime: 0, // 当前时间
		duration: 0, // 歌曲总时长
		isLogin: false, // 是否登录
		qrCodeBase64: null, // 二维码base64码
		cookie: null,
	}),
	getters: {},
	actions: {
		updateIsPlay(value) {
			this.isPlay = value;
		},
		updatePlayList(value) {
			this.playList = value;
			console.log(this.playList, "///");
		},
		updatePlayListIndex(value) {
			this.playListIndex = value;
		},
		pushPlayList(value) {
			this.playList.push(value);
		},
		updateDetailShow() {
			this.detailShow = !this.detailShow;
		},
		updateLyricList(value) {
			this.lyricList = value;
		},
		getLyric: async function (value) {
			let res = await getMusicLyric(value);
			// console.log(res.data.lrc.lyric);
			this.updateLyricList(res.data.lrc.lyric);
		},
		updateCurrentTime: function (value) {
			// console.log(this.currentTime);
			this.currentTime = value;
		},
		updateDuration: function (value) {
			// console.log("更新了总时长");
			this.duration = value;
		},
		pollQRStatus: async function (showQRCode) {
			let resKey = await generateQRKey();
			let resCode = await generateQRCode(resKey.data.data.unikey);
			console.log(resCode);
			this.qrCodeBase64 = resCode.data.data.qrimg;
			let timer = setInterval(async () => {
				if (this.cookie) {
					console.log("清除定时器");
					clearInterval(timer);
					// this.updateStatus();
				}
				if (showQRCode) {
					const response = await checkQRCode(resKey.data.data.unikey);
					console.log(response, "000");
					const status = response.data.code;
					if (status === 803) {
						// 用户已登录成功，获取 cookies
						const cookie = response.data.cookie;
						// 存储 cookies 或执行其他操作
						console.log("登录成功", cookie);
						this.cookie = cookie;
						sessionStorage.setItem("cookie", cookie);
						this.isLogin = true;
						router.push("home");
					} else {
						console.log("继续轮询扫码状态", response.data.message);
					}
				}
			}, 2000); // 每2秒轮询一次
		},
		updateStatus: async function () {
			let cookie = sessionStorage.getItem("cookie");
			let res = await getStatus(cookie);
			console.log(res);
		},
		// getMusic: async function (id) {
		// 	let res = await getMusicUrl(id);
		// 	console.log(res.data.data[0].url);
		// 	return res.data.data[0].url;
		// },
	},
});
export default usePlayListStore;
