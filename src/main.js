/**
* * 导入本地的 Vue 实例
* * 因为不是通过 script 标签引用的 Vue，而是通过 Vue-cli 脚手架
* * 创建的项目，Vue 已经下好在本地，所以，通过 import Vue from "vue"; 引入
* * form 后面没有指明具体的路径，就去 node_modules 文件夹下找。具体路径如下：
* * music\node_modules\vue\dist\vue.js
* 
*/
import Vue from "vue";
import App from "./App.vue";

/*
 * 所有的文件最后都能转成 js
 * 
 */
import "./common/stylus/index.styl";


new Vue({
  el: "#app",
  render: h => h(App)
});
