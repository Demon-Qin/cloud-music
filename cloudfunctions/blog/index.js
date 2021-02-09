// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const TcbRouter = require('tcb-router')
const db = cloud.database()
const blogCollection = db.collection('blog')

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })
app.router('list', async(ctx, next) =>{
  //获取关键词参数
  const keyword = event.keyword
  let w = {}
  //如果关键词非空，则新建一个
  if (keyword.trim() != '') {
    w = {
      content: new db.RegExp ({
        regexp: keyword,
        options: "i"
      })
    }
  }
  let blogList = await blogCollection.where(w).skip(event.start).limit(event.count)
  .orderBy('createTime', 'desc').get().then((res) =>{
    return res.data
  })
  ctx.body = blogList
})
  return app.serve()
}