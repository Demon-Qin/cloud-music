// 云函数入口文件
const cloud = require('wx-server-sdk')


//初始化云环境（修改为自己的id）
cloud.init({
  env: 'zyqin-8gjt4wj432d7f602'
})
const db = cloud.database()
const playListCollection = db.collection('playlist')

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await playListCollection.get()
  console.log('#######' + res.data)
  return res.data
}