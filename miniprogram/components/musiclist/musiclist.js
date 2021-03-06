// components/musiclist/musiclist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist: Array
  },

  data: {
     playingId : -1
  },
  methods: {
    onSelect(event){
      const ds = event.currentTarget.dataset
      console.log(ds)
      this.setData({
        playingId: ds.musicid

      })
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${ds.musicid}&index=${ds.index}`,
      })
    }
  }
})
