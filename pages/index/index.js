// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    cameraMode: ['auto', 'on', 'off', 'torch'],
    cameraIndex: 0,
    cameraObj: {
      auto: '自动',
      on: '打开',
      off: '关闭',
      torch: '常亮'
    },
    deviceName: '后置',

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 拍照
  record () {
    this.data.cameraContext = wx.createCameraContext()
    this.data.cameraContext.takePhoto({
      quality:"high", //高质量的图片
      success: res => {
        //res.tempImagePath照片文件在手机内的的临时路径
        let tempImagePath = res.tempImagePath
        wx.saveFile({
          tempFilePath: tempImagePath,
          success: (res) => {
            //返回保存时的临时路径 res.savedFilePath
            const savedFilePath = res.savedFilePath
            // 保存到本地相册
            wx.saveImageToPhotosAlbum({
              filePath: savedFilePath,
            })

            // 跳转到相册
            wx.navigateTo({
              // 传参
              url: `/pages/photos/photo?tempUrl=${savedFilePath}`
            })
          },
          //保存失败回调（比如内存不足）
          fail: console.log
        })
      }
    })
  },
  // 录像
  takeVideo () {
    wx.chooseVideo({
      maxDuration:10,
      success:function(res1){
        app.startOperating("上传中")
        // 这个就是最终拍摄视频的临时路径了
        var tempFilePath=res1.tempFilePath;
        console.log(tempFilePath)
      },
      fail:function(){
        console.error("获取本地视频时出错");
      }
    })
  },
  // 跳转到获取相册列表
  showPosition() {
    wx.navigateTo({
      url: '/pages/photos/photo'
    })
  },
  // 改变闪光灯模式
  changeFlashMode () {
    if (this.data.cameraIndex < 3) {
      this.setData({cameraIndex: this.data.cameraIndex + 1})
    } else {
      this.setData({cameraIndex: 0})
    }
  },
  changeDevicePosition () {
    this.setData({
      deviceName: this.data.deviceName === '后置' ? '前置' : '后置'
    })
  }
})
