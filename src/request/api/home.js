import service from "..";
/**获取首页轮播图数据 */
export function getBanner() {
	return service({
		method: "GET",
		url: "/banner?type=2",
	});
}
// 推荐歌单
export function getMusicList() {
	return service({
		method: "GET",
		url: "/personalized?limit=10",
	});
}
// 搜索
export function getSearchMusic(value) {
	return service({
		method: "GET",
		url: `/search?keywords=${value}`,
	});
}
// 获取二维码登录的key
export function generateQRKey() {
	return service({
		method: "GET",
		url: `/login/qr/key?timerstamp=${new Date().getTime()}`,
	});
}
// 获取二维码登录的base64码
export function generateQRCode(key) {
	return service({
		method: "GET",
		url: `/login/qr/create?key=${key}&timerstamp=${new Date().getTime()}&qrimg=true`,
	});
}
// 检查二维码状态
export function checkQRCode(key) {
	return service({
		method: "GET",
		url: `/login/qr/check?key=${key}&timerstamp=${new Date().getTime()}`,
	});
}
