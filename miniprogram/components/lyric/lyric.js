let lyricHeight = 0
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLyricShow:{
      type:Boolean,
      value:false,
    },
    lyric:String,
  },
  /**
   * 组件的初始数据
   */
  data: {
   lyrics:[],
   nowLyricIndex: 0,//当前选中的歌词的索引
   scrollTop: 0,//滚动条滚动的高度
  },
   observers:{
      lyric(lrc){
        if(lrc === '暂无歌词'){
          let _lyrics = []
          _lyrics.push(lrc)
          this.setData({
            lyrics : _lyrics
          })
        }else{
          this._parseLyric(lrc)
        }
        console.log(lrc)
      }
   },
   lifetimes: {
       ready() {
         wx.getSystemInfo({
           success: (res) => {
             lyricHeight = res.screenWidth / 750*64
           },
         })
       }
   },
  /**
   * 组件的方法列表
   */
  methods: {
    update(currentTime) {
         let lrcList = this.data.lyrics
         if (lrcList.length == 0) {
           return
         }
         if (currentTime > lrcList[lrcList.length-1].time) {
           if(this.data.nowLyricIndex != -1) {
             this.setData({
               nowLyricIndex: -1,
               scrollTop: lrcList.length * lyricHeight
             })
           }
         }
         for(let i=0,len=lrcList.length;i<len;i++){
          if(currentTime<=lrcList[i].time){
           
            this.setData({
              nowLyricIndex:i-1,
              scrollTop:(i-1)*lyricHeight
            })
            console.log('&&&&&&&'+this.data.nowLyricIndex+"-----"+this.data.scrollTop)
            break;
          }
        }
         
    },
      _parseLyric(lyricSrc){
         let lines = lyricSrc.split('\n')
         let _lrcList = []
         lines.forEach(elem=>{
          let time=elem.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
          if(time!=null){
            let lrc=elem.split(time)[1]
            let timeReg=time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
            console.log(timeReg)
            let time2Seconds=parseInt(timeReg[1])*60+parseInt(timeReg[2])+parseInt(timeReg[3])/1000
            _lrcList.push({
              lrc,
              time:time2Seconds
            })
          }
        })
            console.log('----------------------------------')
            console.log(_lrcList)
           this.setData({
           lyrics :_lrcList
         })

      }
  }
})
