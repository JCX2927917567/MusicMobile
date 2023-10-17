import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import "amfe-flexible";
import store from "@/store";
import Vue3Marquee from "vue3-marquee";
import "vant/es/dialog/style";
import { lazyPlugin } from "@/directives";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Vue3Marquee);
app.use(lazyPlugin);
app.mount("#app");
