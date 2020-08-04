import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./http/api";
import Vant from "vant";
import "vant/lib/index.css";
import { Lazyload } from "vant";
import { ImagePreview } from "vant";
import uitls from "./uitls";

Vue.use(ImagePreview);
Vue.use(Lazyload);
Vue.use(Vant);
Vue.prototype.$api = api;
Vue.config.productionTip = false;
Vue.prototype.$uitls = uitls;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
