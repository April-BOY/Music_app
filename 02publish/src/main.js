import "babel-polyfill"

import Vue from 'vue'
import App from "./App"

import VueResource from "vue-resource"
import VueLazyload from "vue-lazyload"
import router from "./router/index.js"
import './common/stylus/index.styl'
import store from "./store/index"
Vue.use(VueResource);

Vue.use(VueLazyload,{
    loading:require('./common/image/default.png')
});

new Vue({
  el:"#app",
  router,
  store,
  render:h=>h(App)
});
