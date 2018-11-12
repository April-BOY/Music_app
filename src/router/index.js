// 0. 如果使用模块化机制编程，导入Vue和VueRouter，导入Vue，是应为要使用Vue实例调用 Vue.use(VueRouter)
import Vue from "vue";
import VueRouter from "vue-router";

// 1. 定义 (路由) 组件
import Rank from "../components/rank/rank.vue";
import Recommend from "../components/recommend/recommend.vue";
import Singer from "../components/singer/singer.vue";
import Search from "../components/search/search.vue";

Vue.use(VueRouter);

// 2. 定义路由:每个路由应该映射一个组件。
const routes = [
    /**
    * * { path:'/',redirect:'/recommend'}
    * * 当访问 / 目录时，重定向到 recommend 目录下。
    * * 这是为了解决访问 localhost:8080 时，后面什么都没有的显示比较突兀的问题
    */
    {path:'/',redirect:'/recommend'},
    {path:'/recommend',component:Recommend},
    {path:'/rank',component:Rank},
    {path:'/singer',component:Singer},
    {path:'/search',component:Search}
];
/**
* ! 原本的写法：
* ! 3.创建 router 实例，然后传 `routes` 配置
* ! const router = new VueRouter({routes});
* ! 4. 创建和挂载根实例。
* ! 记得要通过 router 配置参数注入路由，
* ! 从而让整个应用都有路由功能
* ! const app = new Vue({
* !   router
* ! }).$mount('#app')
* 
* 
* ! 如果写成下面这种写法，则默认导出的是 router 这个实例，在 main.js 中导入时
* ! router 必须写成 router，而不能改成首字母大写等其他的写法，否则会报错
*/
export default new VueRouter({
    routes //(缩写) 相当于 routes:routes
});