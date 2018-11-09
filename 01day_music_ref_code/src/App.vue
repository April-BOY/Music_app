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
    import MHeader from "./components/m-header/m-header"
    import Tab from "./components/tab/tab"
    /**
    * * 我的理解：因为 MHeader 和 Tab 是局部注册的组件，所以，需要在这里导出到
    * * main.js 中的 Vue 实例中进行注册
    * *
    * * Vue.js 文档的语法：在模块系统中局部注册
    */
    export default {
        components:{
            MHeader,
            Tab
        }
    }
</script>

<style scoped>

</style>