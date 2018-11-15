// 推荐页
<template>
    <div class="recommend">
        <div class="slider-wrapper" v-if="recommends.length">
            <!-- slider 会被渲染成一个类名是 slider 的 div 标签 -->
            <slider :loop="true">
                <div v-for="(item,index) in recommends" :key="index">
                    <a :href="item.linkUrl">
                        <img :src="item.picUrl">
                    </a>
                </div>
            </slider>
        </div>
        <div class="recommend-list">
            <h1>热门歌单推荐</h1>
            <ul>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script>
import Slider from "../../base/slider/slider.vue";
import { url,params,callback,ERR_OK } from "../../api/getRecommend.js";
export default {
    data(){
        return {
            recommends:[]
        }
    },
    methods:{

    },
    /**
    * ! 因为获取轮播图的数据不依赖用户的点击，一打开应用就获取数据
    * ! 因此，需要使用生命周期钩子函数。
    * ! 又因为在 created 的钩子函数中，data 完成了初始化，因此，在 created中请求数据
    * * $http 是 vue-resource 中的方法，vue-resource 已在 main.js 中引入
    */
    created:function(){
        /**
        * * vue-resource 的文档要求 jsonp 方法的格式是：jsonp(url, [config])，
        * * config 是 params 时必须传入一个参数
        */
        this.$http.jsonp(url,{
            /**
            * * 这里的 params,callback 等参数，就是从 getRecommend.js 中导入进来的
            * * params 是 ES6 中的语法，ES5 的写法是 params:params
            */
            params,
            "jsonp":callback,
        }).then((res)=>{
            /**
            * * vue-resource 要求在 body 中处理返回的数据
            * * console.log(res.body.data.slider);
            * *
            */
            this.recommends = res.body.data.slider;
        });
    },
    components:{
        Slider
    }
}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable"

    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        .name
                            margin-bottom: 10px
                            color: $color-text
                        .desc
                            color: $color-text-d
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>

