<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
/**
* ! 这里的 MHeader 的 H 必须大写，m 可以大写，也可以小写没影响。
* ! 如果 H 没有大写，那么就无法生成 <m-header> 标签。
* ! 因为这个标签是根据驼峰命名来转化的
* 
*/
import MHeader from "./components/m-header/m-header.vue"
import Tab from "./components/tab/tab.vue";
 /**
    * ￥ 因为 MHeader 和 Tab 是局部注册的组件，所以，需要在这里导出到
    * ￥ main.js 中的 Vue 实例中进行注册
    * *
    * * Vue.js 文档的语法：在模块系统中局部注册
    */
export default {
  components: {
    MHeader,
    Tab
  }
};
</script>
