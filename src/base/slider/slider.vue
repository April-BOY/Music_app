//  轮播图组件,在这个复用性的组件中不处理数据和业务逻辑
<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <!-- 因为不知道使用者的轮播图有几张图，所以，为了扩展性更强，使用插槽 -->
            <slot></slot>
        </div>
        <div class="dots">
            <span :class="['dot',{'active':index == currentPageIndex}]" v-for="(item,index) in dots" :key="index"></span>
        </div>
    </div>
</template>

<script>
/**
* * 实现的关键点：
* * (1)首先，实现 better-scroll 要求的长容器和短容器
* * (2)初始化轮播图，让轮播图滚动起来
* * (3)初始化小圆点
* * (4)小圆点跟随高亮的效果
* *     判断当前是哪副图，然后加上高亮的 css 样式的类名
* * (5)播放下一张
* * (6)自动轮播
*/
import BScroll from "better-scroll";
export default {
    data(){
        return{
            dots:[],
            currentPageIndex:0
        }
    },
    props:{
        // 是否无缝滚动
        loop:{
            type:Boolean,
            default:true
        },
        // 是否自动轮播
        autoPlay:{
            type:Boolean,
            default:true
        },
        // 间隔的时间
        interval:{
            type:Number,
            default:3000
        }
    },
    methods:{
        /**
        * * 因为给每一张图片添加类名 slider-item，让图片浮动后，由于外层容器 sliderGroup
        * * 的宽度给图片的宽度一样，导致图片浮动后，因为容器宽度不够而继续往下面排列，
        * * 所以，这里需要设置 sliderGroup 的宽度为所有图片的宽度的总和，做成一个长容器
        * *
        */
        _setSliderWidth(resize){
            //! 获取容器中所有的图片节点，并将节点绑定到 vue 实例上，这样 vue 实例的所有方法都可以使用这些图片节点了
            this.children = this.$refs.sliderGroup.children;
            // 长容器 sliderGroup 总的宽度初始化为 0，因为这是要计算出来的
            let width = 0;
            // 设置每张图片的宽度
            let sliderWidth = this.$refs.slider.clientWidth;
            // 给每一个图片节点加类名，即让每张图片浮动起来
            for(let i=0;i < this.children.length;i++){
                let child = this.children[i];
                child.classList.add('slider-item');
                width += sliderWidth;
                child.style.width = sliderWidth+"px";
            }
            /**
            * * 解决无缝滚动导致的 bug：
            * * 在移动端进行无缝滚动时，会在当前图片前面和后面都预先补一张图片，
            * * 这就导致了宽度不够.
            * * 因此，需要当无缝滚动时，需要多加两张图片的宽度
            */
            if(this.loop&&!resize){
                width += 2*sliderWidth;
            }
            this.$refs.sliderGroup.style.width = width+"px";
        },
         /**
            * @name
            * @description  初始化轮播图,即让轮播图滚动起来
                            这里使用的是短容器 slider，这是 better-scroll 插件的文档要求这样写的,具体查看文档的 _initSlide() 方法
                            https://github.com/ustbhuangyi/better-scroll/blob/master/example/components/slide/slide.vue
            * @param {Boolean} loop 是否无缝滚动
            * !param {Object} slider slider 是通过 new BScroll() 构建的 better-scroll
            * !                       的一个实例，不是 vue 实例，但通过 this 将其添加为 vue
            * !                       实例的一个属性，这样，就可以在这个组件中的其他地方使用
            * @function _initSlider
            * @version 1.0.0
            * @author 张瀚
            * @update 2018 November Thu 19:18:12
            */
        _initSlider(){
            this.slider = new BScroll(this.$refs.slider,{
                //better-scroll 插件默认是竖向滚动。因为需求是横向轮播，所以设 scrollX 为真
                scrollX:true,
                snap:{
                    loop:this.loop
                },
                momentum:false,
                click:true
            });
            /**
            * * scrollEnd 这是 better-scroll 插件自己封装的事件
            * * on 是 better-scroll 插件自己封装的方法
            * * https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/events.html#scrollend
            * *
            * * getCurrentPage() 是 better-scroll 封装的方法
            * * 文档:https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/api-specific.html#getcurrentpage 结合例子：
            * * https://github.com/ustbhuangyi/better-scroll/blob/master/example/components/slide/slide.vue 中的 _onScrollEnd()
            * * 确定使用 getCurrentPage() 方法获取当前图片的索引
            * *
            */
            this.slider.on('scrollEnd',()=>{
                // 实现小圆点跟随功能
                /**
                * * 设置宽度_setSliderWidth()的时候，不需要更新索引
                * * 初始化轮播图的时候，需要更新索引，但是，
                * * 当滚动结束的时候，更新(获取)图片的索引更合适，所以，写在这里
                */
                this.currentPageIndex = this.slider.getCurrentPage().pageX;
                // 实现自动轮播功能
                if(this.autoPlay){
                    clearTimeout(this.timer);
                    this._play();
                }
            });
        },
        _initDots(){
            if(this.loop){
                // 因为无缝轮播时多了两张图片，因此，这里需要减去 2
                this.dots = new Array(this.children.length -2);
            }else{
                this.dots = new Array(this.children.length);
            }
        },
        _play(){
            // 通过 better-scroll 的 next() 方法实现播放下一张的功能
            // 这是 better-scroll 插件的文档要求这样写的,具体查看文档的 _play() 方法
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.slider.next();
            }, this.interval);
        }
    },
     /**
    * * 轮播图图片的样式也要在这里写好，不需要使用这个组件的人自己再写样式.
    * * 因此，就需要给 dom 元素添加 css 中写好的样式的类名。
    * ! 因为在 mounted 钩子函数中完成了el的挂载，页面中生成了 DOM 元素。
    * ! 这样就可以操作 DOM 添加样式的类名
    */
    mounted(){
        /**
        * ! 这里存在一个 bug：
        * ! 只执行 this._setSliderWidth(); 时，页面上过一段时间才会显示内容
        * ! 原因：因为刚挂载的时候，recommend.vue 中的接口就去请求数据了，并且
        * !     recommends:[] 初始化为空数组，所以，第一次挂载的时候什么都没有。
        * !     过了一段时间(网速好的话,数据来的就快)，请求到数据了，recommend 
        * !     这个数组就会更新，即 data 更新，因此，会执行 beforeupdate 和
        * !      update 的操作，这时候就会显示内容了
        * * 解决方案：
        * *     方案一：将 mounted 钩子函数改为 updated 钩子函数
        * *         改成 updated 函数的目的是：当数据有更新，就会重新执行 this._setSliderWidth();
        * *         这样就能保证可以给 DOM 元素设置到宽度，因此，内容可以正常显示
        * *         缺点：只要数据有变化，虚拟DOM 就会不断地执行，生命周期会被频繁地调用
        * *     方案二：
        * *         在最外层的容器加一个判断：v-if="recommends.length"，当数据来了
        * *         再挂载轮播图组件
        */
            this._setSliderWidth();
            this._initSlider();
            this._initDots();
            if(this.autoPlay){
                this._play();
            };
            /**
            * ! 解决当页面的大小发生变化时，轮播图图片大小没有响应式的变化的问题
            * * refresh() 是 better-scroll 封装的方法
            * * https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/api.html#refresh
            * 
            * ! 解决页面变化后长容器多出来两个图片宽度的bug：
            * * this._setSliderWidth(true);里的实参 true 是给 resize 形参赋的值。
            * * 因为当页面大小发生变化时，才会执行监听，然后，才会去执行this._setSliderWidth(true);进行赋值
            * * 
            * * 所以，当页面刚加载时，this._setSliderWidth(true);不会执行，不会给 resize 赋值
            * * 因此，if(this.loop&&!resize) 这里的条件为 true，只会增加无缝轮播需要的两张图片的宽度.
            * * 
            * * 当页面大小发生变化时，this._setSliderWidth(true);执行，给 resize 赋值为 true
            * * 因此，if(this.loop&&!resize) 这里的条件为 false，不会在增加了无缝轮播需要的两张图片的宽度的基础上再增加两张图片的宽度
            */
            window.addEventListener('resize',()=>{
                // 如果当前的 DOM 结构不存在，即还没有生成，则什么都不做，即 return。否则，就执行后面的内容
                if(!this.slider){
                    return;
                }
                this._setSliderWidth(true);
                this.slider.refresh();
            });
    },
    destroyed(){
        clearTimeout(this.timer);
    }
}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable"
    .slider
        min-height: 1px
        position: relative
        .slider-group
            position: relative
            overflow: hidden
            white-space: nowrap
            .slider-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                a
                    display: block
                    width: 100%
                    overflow: hidden
                    text-decoration: none
                img
                    display: block
                    width: 100%
        .dots
            position: absolute
            right: 0
            left: 0
            bottom: 12px
            text-align: center
            font-size: 0
            .dot
                display: inline-block
                margin: 0 4px
                width: 8px
                height: 8px
                border-radius: 50%
                background: $color-text-l
                &.active
                    width: 20px
                    border-radius: 5px
                    background: $color-text-ll
</style>