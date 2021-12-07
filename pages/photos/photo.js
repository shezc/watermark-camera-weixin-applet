//index.js 
//获取应用实例 
var app = getApp()
Page({
  data: {
    showCanvas: null,
    tempImgUrl: '',
    tempMarkUrl: '',
    imgUrl: '',
    endX: 0,
    endY: 0,
    cameraHeight: 0,
    cameraWidth: 0
  },
  onLoad: function (options) {
    //  先走的这一步，再走onshow
    const {
      tempMarkUrl,
      options: stringOption,
    } = options
    const {
      tempImgUrl,
      endX,
      endY,
      cameraHeight,
      cameraWidth
    } = JSON.parse(stringOption)
    this.setData({
      endX,
      endY,
      tempImgUrl,
      tempMarkUrl,
      cameraHeight,
      cameraWidth
    })
  },
  onShow: function () {
    this.data.showCanvas = wx.createCanvasContext("show")
    // 画图 (第一个参数是临时地址，第2、3个参数是定位，第4、5个参数是图片大小)
    this.data.showCanvas.drawImage(this.data.tempImgUrl, 0, 0, this.data.cameraWidth, this.data.cameraHeight ); //拍的照片，做底
    this.data.showCanvas.drawImage(this.data.tempMarkUrl, this.data.endX, this.data.endY, 200, 200); //需要加的背景
    this.data.showCanvas.draw()
  },
  chooseimage: function () {
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有 
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        this.setData({
          tempImgUrl: res.tempFilePaths[0]
        })
      }
    })
  },
  getPosition() {
    wx.navigateTo({
      url: '/pages/position/position'
    })
  }
})