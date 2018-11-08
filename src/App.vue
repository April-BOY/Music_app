<template>
  <div id="app">
    <m-header></m-header>
  </div>
</template>

<script>
/* 
 * 这里的 MHeader 的 H 必须大写，m 可以大写，也可以小写没影响。
 * 如果 H 没有大写，那么就无法生成 <m-header> 标签。
 * 因为这个标签是根据驼峰命名来转化的
 *
*/
import MHeader from "./components/m-header/m-header.vue";
export default {
  components: {
    MHeader
  }
};
</script>
