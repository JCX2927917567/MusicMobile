module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	overrides: [
		{
			files: ["src/**/*.vue"],
			rules: { "vue/multi-word-component-names": "off" },
		},
	],
	extends: [
		"eslint:recommended",
		"plugin:vue/vue3-essential",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["vue"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "windows"],
		"no-unused-vars": "off",
		"no-console": "off",
		"no-debugger": "off",
	},
};
