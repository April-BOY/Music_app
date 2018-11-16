// 获取歌单列表数据的接口
// 包括推荐页“热门歌单推荐”版块的数据
/**
* * 因为获取歌单列表数据的接口受到限制，所以，需要用 node.js 做代理
* * QQ 音乐限制的方式是：将请求头限制成了 https://y.qq.com/ 才可以访问
* * Access-Control-Allow-Origin:https://y.qq.com/
* *
*/
export const url = "http://localhost:8888/api/getDissList"
