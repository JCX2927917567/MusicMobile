// 底部播放组件歌曲列表
import { defineStore } from "pinia";
import { getMusicLyric } from "../request/api/musicItem";
import {
	generateQRKey,
	generateQRCode,
	checkQRCode,
} from "../request/api/home";

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
			setInterval(async () => {
				if (showQRCode) {
					const response = await checkQRCode(resKey.data.data.unikey);
					console.log(response, "000");
					const status = response.data.code;
					if (status === 803) {
						// 用户已登录成功，获取 cookies
						const cookies = response.data.cookie;
						// 存储 cookies 或执行其他操作
						console.log("登录成功", cookies);
						return cookies;
					} else {
						console.log("继续轮询扫码状态", response.data.message);
					}
				}
			}, 2000); // 每2秒轮询一次
		},
	},
});
export default usePlayListStore;
