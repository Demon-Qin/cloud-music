// //app.js
// App({
//   onLaunch: function () {
//     if (!wx.cloud) {
//       console.log('执行')
//       console.error('请使用 2.2.3 或以上的基础库以使用云能力')
//     } else {
//       wx.cloud.init({
//         // env 参数说明：
//         //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
//         //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
//         env:'zyqin-8gjt4wj432d7f602',
//         traceUser: true,
//       })
//     }

//     this.globalData = {}
//   },
//   onShow(options) {
//     console.log('onShow 执行')
//     console.log(options)
//   }
// })
App({
  onLaunch: function (options) {
    console.log('onLaunch 执行')
    console.log(options)
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'zyqin-8gjt4wj432d7f602',
        traceUser: true,
      })
    }
    this.globalData = {
      sysInfo: this.getSysInfo(),
    }
  },
  getSysInfo:function() {
    //获取系统信息
    let SystemInfo = wx.getSystemInfoSync()
    //计算px转换到rpx的比例
    let pxToRpxScale = 750 / SystemInfo.windowWidth;
    //状态栏高度
    let statusBarHeight = SystemInfo.statusBarHeight
    //胶囊按钮信息
    let rect = wx.getMenuButtonBoundingClientRect()
    const sysInfo = {
      pxToRpxScale,
      statusBarHeight,
      rect
    }
  
  return sysInfo
},

  onShow(options) {
    console.log('onShow 执行')
    console.log(options)
  },
  
  
})

