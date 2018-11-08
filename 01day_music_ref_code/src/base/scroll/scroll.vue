<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from "better-scroll"
    export default {
        data(){
            return {

            }
        },
        methods:{
            _initScroll(){
                if(!this.$refs.wrapper){
                    return;
                }
                this.scroll = new BScroll(this.$refs.wrapper,{

                })
            }
        },
        mounted(){
            this._initScroll();
        }

    }
</script>

<style scoped>

</style>