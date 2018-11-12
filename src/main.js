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

/** 
 * ? 所有的.vue都会打包成一个js，然后html引入这个js就ok了。之所以写.vue组件，是为了维护方便。每个.Vue文件最后都会转换成一个js
 * ! import router from "./router/index.js";
 * ! (1)如果没有导入这个 js 文件，并在 Vue 实例中注册，浏览器将会报错：
 * ! Unknown custom element: <router-link>、Unknown custom element: <router-view>
 * ! 即无法渲染 <router-link>、<router-view> 这两个标签
 * 
 * ! (2)import router 如果 router 的首字母大写，浏览器将会报错：
 * ! [Vue warn]: Error in render: "TypeError: Cannot read property 'matched' of undefined"
 * ! 原因：
 * ! 因为在 index.js 中导出 router 这个实例时，使用的是导出默认值的方式，因为默认值
 * ! 就是 router，所以，改成其他就无法匹配（matched）
 */
import router from "./router/index.js";
import "./common/stylus/index.styl";


new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
