<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
/**
* ! 这里的 MHeader 的 H 必须大写，m 可以大写，也可以小写没影响。
* ! 如果 H 没有大写，那么就无法生成 <m-header> 标签。
* ! 因为这个标签是根据驼峰命名来转化的
* ? 在 m-header.vue 组件中使用 export default {} 什么都没有导出，这里为什么可以直接导入组件使用
*   ￥ 因为这里导入的是组件，而不是 m-header.vue 中的函数、变量、对象等内容，
*   ￥ 这是 Vue 中导入组件的机制，即在一个组件中使用另一个组件时，就是导入那个组件即可使用.
*   ￥ 组件是不需要导出的，用的时候导入即可（验证：注释了 m-header.vue 中的 export default {} 也没有报错）
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
