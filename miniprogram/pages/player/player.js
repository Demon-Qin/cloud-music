// pages/player/player.js
let musiclist = []
// 正在播放歌曲index
let playingIndex = 0
const backgroundAudioManager =wx.getBackgroundAudioManager()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '',
    isPlaying:false,
    name: '',
    singer: '',
    isLyricShow: false,
    lyric:'歌词歌词歌词歌词'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(options.musicId, typeof (options.musicId))
    console.log(options.musicId)
    playingIndex = options.index
    musiclist = wx.getStorageSync('musiclist')
    this._loadMusicDetail(options.musicId)
  },
  savePlayHistory() {
    //当前正在播放的歌曲
    const music = musiclist[playingIndex]
    console.log(music)
    const openid =  app.globalData.openid
    //根据用户openId取出本地存储
    const history = wx.getStorageSync(openid)
    //本地是否已经保存了当前歌曲
    let bHave = false
    //遍历本地存储，和当前歌曲对比
    for (let i=0,len = history.length; i < len; i++) {
      if(history[i].id == music.id) {
        bHave = true
        break
      }
    }
    if(!bHave) {
      //将当前歌曲加入历史记录头部
      history.unshift(music)
      //更新本地存储
      wx.setStorage({
        data: history,
        key: openid,
      })
    }
  },
  _loadMusicDetail(musicId){
    console.log(playingIndex)
    let music = musiclist[playingIndex]
    console.log(musiclist)
    console.log(music)
    wx.setNavigationBarTitle({
      title: music.name,
    })
    this.setData({
      picUrl: music.al.picUrl
    })
    wx.cloud.callFunction({
      name:'music',
      data:{
        musicId,
        $url:'musicUrl',
      }
    }).then((res) => {
      console.log(res)
      const url = res.result.data[0].url
      if(url === null){
        wx.showToast({
          title: '没有权限播放',
        })
        backgroundAudioManager.pause()
        this.setData({
          isPlaying: false
        })
        return
      }

     backgroundAudioManager.src = url
    backgroundAudioManager.title = music.name
    backgroundAudioManager.coverImgUrl = music.al.picUrl
    backgroundAudioManager.singer = music.ar[0].name
      this.savePlayHistory()
      this.setData({
        isPlaying:true
      })
      wx.hideLoading()
      //请求歌词
      wx.cloud.callFunction({
        name: 'music',
        data: {
          musicId,
          $url: 'lyric',
        }
      }).then((res) => {
        console.log(res)

        let lyric = '暂无歌词'
        const lrc = res.result.lrc
        if (lrc) {
          lyric = lrc.lyric
        }
        this.setData({
          lyric
        })
      })
    })
  },
  togglePlaying(){
    if(this.data.isPlaying){
      backgroundAudioManager.pause()
    }else{
      backgroundAudioManager.play()
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },
  onLyricShow() {
    this.setData({
      isLyricShow: !this.data.isLyricShow,
    })
  },
  timeUpdate(event) {
      this.selectComponent('.lyric').update(event.detail.currentTime)
  },
  onPrev(){
    playingIndex--
    if(playingIndex === 0){
      playingIndex = musiclist.length - 1
    }  
    this._loadMusicDetail(musiclist[playingIndex].id)
  
  },
  onNext(){
    playingIndex++
    if(playingIndex === musiclist.length){
      playingIndex = 0
    }  
    this._loadMusicDetail(musiclist[playingIndex].id)
  }
})