const {wxml, style} = require('./watermark')

// 获取应用实例
const app = getApp()
Page({
  data: {
    cameraMode: ['auto', 'on', 'off', 'torch'],
    cameraIndex: 0,
    pageX: 0,
    pageY: 0,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    tempMarkUrl: '',
    cameraWidth: 0,
    cameraHeight: 0,

    cameraObj: {
      auto: '自动',
      on: '打开',
      off: '关闭',
      torch: '常亮'
    },
    deviceName: '后置',
    widget: null,


    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  // div转canvas
  onShow: function() {
    this.getPosition()

    wx.getSystemInfo({
      success: res => {
        const {windowHeight, windowWidth } = res
        this.setData({
          cameraHeight: windowHeight - 100,
          cameraWidth: windowWidth
        })
      }
    })

    // 初始化canvas
    this.widget = this.selectComponent('.widget')
    setTimeout(() => {
      this.container = this.widget.renderToCanvas({
        wxml : wxml({
          time: this.getNowTime().time,
          date: this.getNowTime().date
        }),
        style
      })
    }, 300)
  },
  // 获取当前位置
  getPosition() {
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.log(res)
        
      }
     })
  },
  // 获取当前时间
  getNowTime () {
    const weekNos = ['日', '一', '二', '三', '四', '五', '六']
    const date = new Date()  
    const yy = date.getFullYear()
    const mm = date.getMonth() + 1
    const dd = date.getDate()
    const hh = date.getHours()
    const mf = date.getMinutes() < 10 ? '0' + date.getMinutes()
      :
      date.getMinutes()
    const weekNo = `星期${weekNos[date.getDay()]}`
    return {
      time: `${hh} : ${mf}`,
      date: `${yy}/${mm}/${dd}      ${weekNo}`,
    }
  },
  // 开始移动
  touchStart(e) {
    const {
      pageX,
      pageY
    } = e.changedTouches[0]
    this.setData({
      startX: pageX,
      startY: pageY
    })
  },
  // 结束移动(e) 
  touchEnd({
    target
  }) {
    const {
      offsetLeft,
      offsetTop
    } = target
    this.setData({
      endX: offsetLeft,
      endY: offsetTop
    })
  },
  // 移动 
  move(e) {
    const {
      pageX,
      pageY
    } = e.changedTouches[0]
    const currentPageX = pageX - this.data.startX + this.data.endX
    const currentPageY = pageY - this.data.startY + this.data.endY
    // 计算边界值 说明：200是自己设置的水印宽高
    const maxCurrentPageY = this.data.cameraHeight - 200
    const maxCurrentPageX = this.data.cameraWidth - 200
    this.setData({
      pageX: currentPageX < 0 ? 0 : currentPageX > maxCurrentPageX ? maxCurrentPageX : currentPageX,
      pageY: currentPageY < 0 ? 0 : currentPageY > maxCurrentPageY ? maxCurrentPageY : currentPageY
    })
  },
  // 拍照
  async record() {
    this.data.cameraContext = wx.createCameraContext()
    this.data.cameraContext.takePhoto({
      quality: "high", //高质量的图片
      success: res => {
        //res.tempImagePath照片文件在手机内的的临时路径
        let tempImagePath = res.tempImagePath
        wx.saveFile({
          tempFilePath: tempImagePath,
          success: (res) => {
            //返回保存时的临时路径 res.savedFilePath

            // 保存到本地相册
            // wx.saveImageToPhotosAlbum({
            //   filePath: savedFilePath,
            // })

            // 给子组件传递的参数
            const options = {
              tempImgUrl: res.savedFilePath,
              endX: this.data.endX,
              endY: this.data.endY,
              cameraHeight: this.data.cameraHeight,
              cameraWidth: this.data.cameraWidth
            }

            // 将canvas转成图片
            this.widget.canvasToTempFilePath().then(data => {
              wx.navigateTo({
                // 传参
                url: `/pages/photos/photo?tempMarkUrl=${data.tempFilePath}&options=${JSON.stringify(options)}`
              })
            })

            // 跳转到相册
            
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
  changeFlashMode() {
    if (this.data.cameraIndex < 3) {
      this.setData({
        cameraIndex: this.data.cameraIndex + 1
      })
    } else {
      this.setData({
        cameraIndex: 0
      })
    }
  },
  changeDevicePosition() {
    this.setData({
      deviceName: this.data.deviceName === '后置' ? '前置' : '后置'
    })
  }
})