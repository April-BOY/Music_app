<template>
    <div class="singer">
        <list-view :list="singers" v-if="singers.length" @select="selectSinger"></list-view>
    </div>
</template>

<script>
    import ListView from "../../base/listview/listview"
    import {url,callback,ERR_OK,params} from "../../api/getSingerList"
    import Singer from "../../common/js/singer"
    const HOT_NAME = "热门";
    const HOT_SINGER_LEN=10;
    export default {
        data(){
            return{
                singers:[]
            }
        },
        components:{
            ListView
        },
        methods:{
            _getSingerList(){
                this.$http.jsonp(url,{
                    params,
                    "jsonp":callback
                }).then((res)=>{
                    if(res.body.code==ERR_OK){
                        this.singers = this._normallizeSinger(res.data.data.list);
                        console.log(this.singers)
                    }
                })
            },
            _normallizeSinger(list){
                let map = {
                    hot:{
                        title:HOT_NAME,
                        items:[]
                    }

                };
                list.forEach((item,index)=>{
                    if(index<HOT_SINGER_LEN){
                        map.hot.items.push(new Singer(
                            {
                                id:item.Fsinger_mid,
                                name:item.Fsinger_name
                            }
                        ))
                    }
                    const key = item.Findex;
                    if(!map[key]){
                        map[key]={
                            title:key,
                            items:[]
                        }
                    }
                    map[key].items.push(new Singer(
                        {
                            id:item.Fsinger_mid,
                            name:item.Fsinger_name
                        }
                    ))
                });
                //序列化
                let hot = [];
                let ret = [];
                for(let key in map){
                    let val = map[key];
                    if(val.title.match(/[a-zA-Z]/)){
                        ret.push(val)
                    }else if(val.title==HOT_NAME){
                        hot.push(val)
                    }
                }
                ret.sort((a,b)=>{
                    return a.title.charCodeAt(0)-b.title.charCodeAt(0)
                });
                return hot.concat(ret);
            },
            selectSinger(singer){
                console.log(singer)
            }
        },
        created(){
            this._getSingerList();
        }
    }
</script>

<style scoped lang="stylus">
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>