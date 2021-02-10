// miniprogram/pages/play-history/play-history.js
const app = getApp()
Page({
  data: {
     musiclist: [] 
  },
  
back() {
  wx.navigateBack({
    delta: 1,
  })
},
  onLoad: function (options) {
    const playHistory = wx.getStorageSync(app.globalData.openid)
    if (playHistory.length == 0) {
      wx.showModal({
        title: '播放历史为空',
        content: '',
      })
    } else {
      wx.setStorage({
        data: playHistory,
        key: 'musiclist',
      })
      this.setData({
        musiclist: playHistory
      })
    }
  },

 
})