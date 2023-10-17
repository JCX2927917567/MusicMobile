import service from "..";
// 获取歌单详情页数据
export function getMusicItem(id) {
	return service({
		method: "GET",
		url: `/playlist/detail?id=${id}`,
		showLoading: true,
	});
}

// 获取歌单详情页播放列表
export function getMusicItemList(id) {
	return service({
		method: "GET",
		url: `/playlist/track/all?id=${id}`,
		showLoading: true,
	});
}

// 获取歌曲的歌词  例子：/lyric?id=33894312
export function getMusicLyric(id) {
	return service({
		method: "GET",
		url: `/lyric?id=${id}`,
		showLoading: false,
	});
}

// 获取每日推荐歌曲
export function getDayRecommend(cookie) {
	return service({
		method: "GET",
		url: `/recommend/songs?cookie=${cookie}`,
		showLoading: true,
	});
}
