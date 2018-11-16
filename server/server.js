/**
* ! 后台做代理，就是后台去访问真正的数据接口。而前端通过后台给定的接口访问后台，即可拿到数据
* *
* *
*/
const url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
const express = require('express');
const axios = require('axios');
const app = express();
const apiRouter = express.Router();

// 获取分类歌单的数据
apiRouter.get('/getDissList',(req,res) =>{
    // 允许全部的请求都可以跨域
    /**
    * ! 因为现在页面是通过 vue-cli 工具开的服务器，并将端口开在了 8080 端口，
    * ! 但是，后台这里是通过 8888 端口去请求数据，所以，前端访问后台的时候跨域了。
    * ! 因此,要设置允许全部的请求都可以跨域：
    * ! res.setHeader('Access-Control-Allow-Origin','*');
    */
    res.setHeader('Access-Control-Allow-Origin','*');
    axios({
        methods:'get',
        url:'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?picmid=1&rnd=0.4662310252656452&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&categoryId=10000000&sortId=5&sin=0&ein=29',
        // 伪装请求头
        headers:{
            host:"c.y.qq.com",
            referer:"https://y.qq.com/"
        }
    // 这里是 es6 的 promise 语法
    }).then((response)=>{
        // 通过打印 console.log(response);，确定数据在 data 属性中
        res.json(response.data);
    });
});

app.use('/api',apiRouter);
app.listen(8888);