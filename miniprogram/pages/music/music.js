// pages/music/music.js
const MAX_LIMIT = 15
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [{
        url: 'http://p1.music.126.net/Z90NF2dHuBYrV6x-U9jJJQ==/109951165664719544.jpg?imageView&quality=89'
      },
      {
        url: 'http://p1.music.126.net/pOXTFta-mhTpZOGhBBWvhQ==/109951165664682857.jpg?imageView&quality=89'
      },
      {
        url: 'http://p1.music.126.net/C9I9GxpvRX7nCZyXNBeqOw==/109951165664694558.jpg?imageView&quality=89'
      },
      {
        url: 'http://p1.music.126.net/q5rKcBx9Y0V37DsUSaQKXg==/109951165664695730.jpg?imageView&quality=89'
      },
      {
        url: 'http://p1.music.126.net/WOoIZuva_umxxzYOvWINLA==/109951165664707565.jpg?imageView&quality=89'
      },
      {
        url: 'http://p1.music.126.net/zUv2mRobckK7Tdn2bp9iSA==/109951165664840470.jpg?imageView&quality=89'
      },
      {
        url: 'http://p1.music.126.net/UdSM2BmqY_h_t9HAOzb5dQ==/109951165664710664.jpg?imageView&quality=89'
      },
      {
        url: 'http://p1.music.126.net/j0gp3gBDRRoqIXxAs0v7oA==/109951165664720877.jpg?imageView&quality=89'
      },
    ],
    isNavBar:false,
    playlist: []
     //   {
      //   "id":"1001",
      //   "playCount":1222822.6,
      //   "name":"有些心动一开始便覆水难收",
      //   "picUrl":"http://p2.music.126.net/RpzIkeUOZ4V7WBecytqH0Q==/109951165515305859.jpg?param=140y140"
      // },
      // {
      //   "id":"1002",
      //   "playCount":1286423.6,
      //   "name":"Acoustic/沉浸柔情海洋",
      //   "picUrl":"http://p4.music.126.net/6usq3fdV3_Ldu_3dwqz9yQ==/109951165595569687.jpg?param=140y140"
      // },
      // {
      //   "id":"1003",
      //   "playCount":963526.6,
      //   "name":"「進撃の巨人」将悲伤和决意怀揣在心中",
      //   "picUrl":"http://p4.music.126.net/lkYYScT5hEGOpqg6qqkePw==/109951165661080347.jpg?param=140y140"
      // },
      // {
      //   "id":"1004",
      //   "playCount":788324.6,
      //   "name":"【一起吹晚风】",
      //   "picUrl":"http://p3.music.126.net/swKlj43m9puewJ-YboeoSg==/109951165325068849.jpg?param=140y140"
      // },
      // {
      //   "id":"1005",
      //   "playCount":1006791.6,
      //   "name":"你一定要在自己热爱的世界里闪闪发亮啊",
      //   "picUrl":"http://p3.music.126.net/uesfHcJmZ23S3er_1mpeaw==/109951165621856219.jpg?param=140y140"
      // },
      // {
      //   "id":"1006",
      //   "playCount":873146.6,
      //   "name":"放轻松 就当漫游地球 来和我一起听吧！",
      //   "picUrl":"http://p3.music.126.net/pv2ya6nRsD0WD1TK4BybQg==/109951165216270090.jpg?param=140y140"
      // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPlaylist()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      playlist: []
    })
    this._getPlaylist()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   this._getPlaylist()
  },

  /**
   * 用户点击右上角分享
   */
  _showNavBar() {
    wx.createSelectorQuery().select('#nav').boundingClientRect(rect=>{
      console.log(rect)
      }).exec()
let top = rect.top
if(top < -50){
  this.setData({
    isNavBar:ture
  })
  
}else{

  this.setData({isNavBar:false})
}
  },
  goToFind() { 
    console.log("调用跳转方法")
    wx.switchTab({
     
      url:'../../pages/find/find'
    })
  },

  onShareAppMessage: function () {},
  _getPlaylist() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        start: this.data.playlist.length,
        count: MAX_LIMIT,
        $url: 'playlist'
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        playlist: this.data.playlist.concat(res.result.data)
      })
      wx.stopPullDownRefresh()
      wx.hideLoading()
    })
  },
})