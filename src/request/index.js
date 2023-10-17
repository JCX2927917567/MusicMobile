import axios from "axios";
import usePlayListStore from "@/store/playList";

let service = axios.create({
	baseURL: "http://localhost:3000",
	timeout: 3000,
});

service.interceptors.request.use(
	(config) => {
		const usePlayList = usePlayListStore();
		console.log(config.showLoading, "12345789");
		usePlayList.loading = config.showLoading;
		return config;
	},
	(error) => {
		return Promise.reject(new Error(error));
	}
);

service.interceptors.response.use(
	(res) => {
		const usePlayList = usePlayListStore();
		usePlayList.loading = false;
		return res;
	},
	(error) => {
		return Promise.reject(new Error(error));
	}
);

export default service;
