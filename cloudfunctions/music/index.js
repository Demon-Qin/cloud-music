// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'zyqin-8gjt4wj432d7f602'
})
//引入路由
const TcbRouter = require('tcb-router')
//引入axios
const axios = require('axios')
//定义基础URL
const BASE_URL = 'https://zyq-cloudmusic.cn.utools.club'

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })
//歌单列表请求，传入url，起始记录索引，请求记录数
app.router('playlist',async (ctx,next) => {
  ctx.body = await cloud.database().collection('playlist')
  .skip(event.start)
  .limit(event.count)
  .orderBy('createTime','desc')
  .get()
  .then((res) => {
    return res
  })
})

app.router('musiclist',async (ctx, next) => {
  console.log('#####' + event.playlistId)
  const res = await axios.get(`${BASE_URL}/playlist/detail?id=${parseInt(event.playlistId)}`)
  console.log('####' + res)
  ctx.body = res.data
})
app.router('musicUrl', async (ctx, next) => {
  const res = await axios.get(`${BASE_URL}/song/url?id=${event.musicId}`)
  ctx.body = res.data

})
//根据id获取歌词
app.router('lyric',async(ctx, next) => {
  const res = await axios.get(`${BASE_URL}/lyric?id=${event.musicId}`)
  ctx.body = res.data
  console.log(lyric)
})
return app.serve()
}