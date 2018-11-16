// 获取轮播图数据的接口
// 请求地址
export const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
// 请求的参数：这些请求参数是在qq音乐的请求接口中复制粘贴过来的
export const params = {
    g_tk: 5381,
    uin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1
};
/**
* * 因为 jsonpCallback 后面的回调函数名是 recommend.vue 中的 this.$http.jsonp();
* * 随机生成的函数名，所以，不写在上面的 params 对象中，写在这里记录一下要传的回调
* * 函数
*/
export const callback = "jsonpCallback";
// ERR_OK 就是 code：{0} 用于记录请求失败或者成功的状态
export const ERR_OK = 0;