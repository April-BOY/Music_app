import "babel-polyfill"

import Vue from 'vue'
import App from "./App"
import VueResource from "vue-resource"
import router from "./router/index.js"
import './common/stylus/index.styl'

Vue.use(VueResource);

new Vue({
  el:"#app",
  router,
  render:h=>h(App)
});
