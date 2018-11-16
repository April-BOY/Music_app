<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
/**
* * 功能点：
* * (1)点击长容器的某个 dom 元素，长容器会滚动到指定的位置
* * (2)长容器滚动的时候，每时每刻都输入滚动的位置，即坐标
* * (3)滚动到指定的dom元素
*/
import BScroll from "better-scroll";
export default {
    data(){
        return {

        }
    },
    props:{
        click:{
            type:Boolean,
            default:true
        },
        // 实时汇报滚动的位置，这是 better-scroll 插件规定的默认值
        probeType:{
            type:Number,
            default:3
        },
        // 是否监听在 momentum 滚动动画运行过程中实时派发 scroll 事件
        listenScroll:{
            type:Boolean,
            default:false
        },
        //! 用户做懒加载等其他可能导致数据不断变化，可能就会导致滚动的效果异常
        //! 所以，这里就创建一个 data 属性，让用户将需要滚动的内容传进来，只对这部分内容进行滚动
        data:{
            type:Array,
            default:null
        }
    },
    methods:{
        _initScroll(){
            // 如果 wrapper 节点不存在，则什么都不做，即 return出去。如果存在，就执行后面的代码，即初始化 BScroll 实例
            if(!this.$refs.wrapper){
                return;
            }
    /**
    * * better-scroll 插件默认是竖向滚动,所以，不需要设
    * @param {Boolean} click better-scroll 默认会阻止浏览器的原生 click 事件。
    * 当设置为 true，better-scroll 会派发一个 click 事件
    * @param {Number} probeType 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，
    * 而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
    *    momentum的作用：当快速在屏幕上滑动一段距离的时候，
    *                   会根据滑动的距离和时间计算出动量
    * ! 派发事件：
    */

            this.scroll = new BScroll(this.$refs.wrapper,{
                click:this.click,
                // 实现：长容器滚动的时候，每时每刻都输入滚动的位置，即坐标
                probeType:this.probeType
            });
            /**
            * ! 因为当前组件是可复用的组件，所以，动作应该由用户决定，因此，加个判断，根据用户传进来的参数做出动作
            * * 当listenscroll 为 true 时，表示用户需要监听 scroll 事件来获取坐标
            * @param {Number} pos position的缩写，滚动的实时坐标
            * * 文档：https://ustbhuangyi.github.io/better-scroll/doc/events.html#scroll
            */
            if(this.listenScroll){
                this.scroll.on('scroll',(pos)=>{
                    // 通过打印 console.log(pos);可以知道返回的 pos 是滚动的坐标。
                    // 获得的坐标不在可复用组件中处理，因为，一旦处理了就有业务逻辑，复用性就降低。
                    //! 而且，获得的坐标【目的】是给父组件用，所以，这里就相当于一个接口。
                    // 因此，将坐标通过 emit() 方法报给父组件使用。之所以，再报一个 scroll 事件，是因为
                    // 这样，用户就可以通过监听 scroll 事件就可以获得坐标，简化用户的操作
                    this.$emit('scroll',pos);
                });
            }
        },
        refresh(){
            // 解决懒加载的导致的问题，即懒加载中不会一次性加载全部的内容，因此，
            // 歌单列表的高度就会变化，导致滚动异常。
            // 这里，通过调用 better-scroll 插件自带的 refresh() 重新计算better-scroll来解决这个问题
            // https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/api.html#refresh
            //! 防御性编程:前面加上 this.scroll 的目的是为了防止 BSscroll() 实例不存在，但是，你又直接调用它的 refresh() 方法导致的错误
            this.scroll&&this.scroll.refresh();
        },
        scrollTo(){
            // 实现：点击长容器的某个 dom 元素，长容器会滚动到指定的位置
            // scrollTo()是better-scroll 插件自带的的方法
            //! 防御性编程:后面再接上apply()方法是为了确保调用scrollTo()方法时，是this.scroll在调用(即BScroll对象在调用)
            this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments);
        },
        scrollToElement(){
            // 实现：滚动到指定的dom元素
            this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments);
        }
    },
    mounted(){
        this._initScroll();
    },
    watch:{
        data(){
            
        }
    }
}
</script>

<style>

</style>
