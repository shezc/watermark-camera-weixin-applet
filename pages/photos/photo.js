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
    this.data.showCanvas.setGlobalAlpha(0.5) // 设置水印的透明度
    this.data.showCanvas.drawImage(this.data.tempMarkUrl, this.data.endX, this.data.endY, 200, 200); //需要加的背景
    this.data.showCanvas.draw()
  },
  saveImg () {
    setTimeout(() => {
      // 将canvas转为临时图片
      wx.canvasToTempFilePath({
          canvasId: 'show',
          success: res => {
            // 获取临时图片路径然后保存
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: res => {
                  wx.showToast({
                    title: '保存成功'
                  })
                },
                fail() {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
          },
          fail: function(res) {
              console.log(res);
          }
      });

  })},
  getPosition() {
    wx.navigateTo({
      url: '/pages/position/position'
    })
  }
})