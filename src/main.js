import Vue from 'vue'
import App from './App.vue'

/*
* 所有的文件最后都能转成 js
*
*/
import './common/stylus/index.styl'


new Vue({
  el:'#app',
  render: h => h(App)
});
