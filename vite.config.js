//vite.config.js

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postCssPxToRem from "postcss-pxtorem";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			resolvers: [VantResolver()],
		}),
		eslint(),
	],
	css: {
		postcss: {
			plugins: [
				postCssPxToRem({
					rootValue: 41.4,
					// 1rem，根据 设计稿宽度/10 进行设置
					propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
				}),
			],
		},
	},

	resolve: {
		// 配置路径别名
		alias: {
			"@": resolve(__dirname, "src"),
		},
		// 省略文件后缀
		extensions: ["", ".js", ".json", ".vue", ".scss", ".css", ".mjs"],
	},
	server: {
		// 修改端口
		port: 8888,
		open: true,
	},
});
