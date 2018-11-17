class Song{
    constructor({id,mid,singer,name,album,duration,image,url}){
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }
}

function filterSinger(singer){
    let ret = [];
    if(!singer){
        return ""
    }
    singer.forEach((s)=>{
        ret.push(s.name)
    });
    return ret.join('-')
}
export default function createSong(musicData){
    return new Song({
        id:musicData.songid,
        mid:musicData.songmid,
        singer:filterSinger(musicData.singer),
        name:musicData.songname,
        album:musicData.albumname,
        duration:musicData.interval,
        image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url:`http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=3239715600&vkey=A23C539C5BA41C1F38B6F3863863F26DB805919F4270A2F249B504B9747B2EBF8BB244375A7BB44F41F247E2B99A96AA99ADF4E5A502914B&uin=0&fromtag=38`
    })
}