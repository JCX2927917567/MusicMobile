// 引入需要的模块
import { createRouter, createWebHistory } from "vue-router";
import usePlayListStore from "@/store/playList";

// 下面使用了es6的对象增强写法，命名必须是routes
const routes = [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/home",
		name: "home",
		meta: {
			title: "网易云音乐",
			hasTabber: "true",
		},
		component: () => import("@/views/home"),
	},
	{
		path: "/musicItem",
		name: "musicItem",
		meta: {
			title: "歌单详情",
		},
		component: () => import("@/views/musicitem"),
	},
	{
		path: "/search",
		name: "search",
		meta: {
			title: "搜索",
		},
		component: () => import("@/views/search"),
	},
	{
		path: "/login",
		name: "login",
		meta: {
			title: "登录",
			isHideFooter: true,
		},
		component: () => import("@/views/login"),
	},
	{
		path: "/infoUser",
		name: "infoUser",
		meta: {
			title: "个人中心",
		},
		beforeEnter: (to, from, next) => {
			const useStore = usePlayListStore();
			if (useStore.isLogin) {
				next();
			} else {
				next("/login");
			}
		},
		component: () => import("@/views/infoUser"),
	},
];

// 创建路由
const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	next();
});

// 导出路由
export default router;
