// 引入需要的模块
import { createRouter, createWebHistory } from "vue-router";

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
			hasTabber: true,
			requiresAuth: false,
		},
		component: () => import("@/views/home"),
	},
	{
		path: "/daySongs",
		name: "daySongs",
		meta: {
			title: "每日推荐",
			hasTabber: false,
			requiresAuth: true,
		},
		component: () => import("@/views/DaySongs"),
	},
	{
		path: "/musicItem",
		name: "musicItem",
		meta: {
			title: "歌单详情",
			requiresAuth: false,
		},
		component: () => import("@/views/musicItem"),
	},
	{
		path: "/search",
		name: "search",
		meta: {
			title: "搜索",
			isHideFooter: false,
			hasTabber: false,
			requiresAuth: false,
		},
		component: () => import("@/views/search"),
	},
	{
		path: "/login",
		name: "login",
		meta: {
			title: "登录",
			isHideFooter: true,
			requiresAuth: false,
		},
		component: () => import("@/views/login"),
	},
	{
		path: "/infoUser",
		name: "infoUser",
		meta: {
			title: "个人中心",
			hasTabber: true,
			requiresAuth: true,
		},
		component: () => import("@/views/infoUser"),
	},
	{
		path: "/podcast",
		name: "podcast",
		meta: {
			title: "播客",
			hasTabber: true,
			requiresAuth: true,
		},
		component: () => import("@/views/Podcast"),
	},
	{
		path: "/concern",
		name: "concern",
		meta: {
			title: "关注",
			hasTabber: true,
			requiresAuth: true,
		},
		component: () => import("@/views/Concern"),
	},
	{
		path: "/community",
		name: "community",
		meta: {
			title: "社区",
			hasTabber: true,
			requiresAuth: true,
		},
		component: () => import("@/views/Community"),
	},
];

// 创建路由
const router = createRouter({
	history: createWebHistory(),
	routes,
});

// router.beforeEach((to, from, next) => {
// 	if (to.path == "/login") next();
// 	else if (sessionStorage.getItem("cookie")) {
// 		if (to.meta.title) document.title = to.meta.title;
// 		next();
// 	} else {
// 		if (to.meta.title) document.title = to.meta.title;
// 		next("/login");
// 	}
// });
router.beforeEach((to, from, next) => {
	// 检查路由的元信息是否要求身份验证
	if (to.meta.requiresAuth) {
		// 检查用户是否已登录，可以在服务器端验证
		if (sessionStorage.getItem("cookie")) {
			// 设置页面标题
			if (to.meta.title) {
				document.title = to.meta.title;
			}
			next(); // 放行
		} else {
			// 未登录，重定向到登录页
			next("/login");
		}
	} else {
		// 不需要身份验证的路由
		if (to.meta.title) {
			document.title = to.meta.title;
		}
		next();
	}
});

// 导出路由
export default router;
