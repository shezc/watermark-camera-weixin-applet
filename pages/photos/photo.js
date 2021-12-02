//index.js 
//获取应用实例 
var app = getApp() 
Page({ 
 data: { 
  tempFilePaths: ''
 }, 
 onLoad: function(options) {
   const { tempUrl } = options
   this.setData({tempFilePaths: tempUrl})
 }, 
 chooseimage: function () { 
  wx.chooseImage({ 
   count: 9, // 默认9 
   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
   sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有 
   success: res => { 
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
      this.setData({ 
       tempFilePaths:res.tempFilePaths[0]
      })
   } 
  }) 
 } ,
  getPosition () {
    wx.navigateTo({
      url: '/pages/position/position'
    })
  }
})