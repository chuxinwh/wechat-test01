//index.js
//获取应用实例
var app = getApp()
var timer;
var n = 1; //旋转圈数
var whichdegs = "";//中奖项
var luck = ["5积分", "5金币", "10积分", "10金币", "谢谢参与", "20金币"];//定义奖项
var degs = [30, 90, 150, 210, 270, 330];// 定义旋转度数
Page({
  data: {
    animationData: {},//动画
    isclick: "start",//按钮事件  默认开始事件
    hiddenModal: true,//弹框是否隐藏
    detail: "恭喜您获得"//弹框内容
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {

  },
  start: function (e) {
    var _this = this;
    n = 1;
    //开始事件以后置为停止事件
    this.setData({
      isclick: "stop"
    })
    //重置动画
    _this.reset.call(_this);

    timer = setInterval(function () {
      //开始旋转
      star.call(_this);
      //
      n++;
      console.log(n)
    }
      , 300);
    //启动动画
    function star() {
      //开始旋转动画
      var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 300,
        timingFunction: "linear"
      });
      animation.rotate(360 * n).step();
      this.setData({
        animationData: animation.export()
      })
    }
  },
  stop: function (e) {
    console.log(360 * n);
    var _this = this;
    this.setData({
      isclick: ""
    })
    clearInterval(timer);
    timer = null;
    //结束动画
    //动画越来越慢直到停止
    sto.call(_this);
    function sto() {
      //算概率
      var gailv = parseInt(Math.random() *100);
      if(gailv<20){
        whichdegs = degs[0];
        _this.data.detail +=luck[0];
      } else if (20<gailv < 55){
        whichdegs = degs[1];
        _this.data.detail += luck[1];
      } else if (55<gailv < 80){
        whichdegs = degs[2]
        _this.data.detail += luck[2];
      } else if(80<gailv < 95){
        whichdegs = degs[3]
        _this.data.detail += luck[3];
      } else if (95 < gailv < 100){
        whichdegs = degs[4]
        _this.data.detail += luck[4];
      } else if (gailv==99){
        whichdegs = degs[5]
        _this.data.detail += luck[5];
      }
      var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 3 * 300 + whichdegs*1.4,
        timingFunction: "ease-out"
      });
      animation.rotate(n * 360 + whichdegs).step();//d转到哪个盘
      this.setData({
        animationData: animation.export()
      })
    }

    timer = setTimeout(function () {
      _this.setData({
        hiddenModal: false,
        detail:_this.data.detail
      })
    }
      , 3 * 300 + whichdegs * 1.4);

  },
  listenerConfirm: function (e) {
    var _this = this;
    this.setData({
      hiddenModal: true,
      isclick: "start",
      detail: "恭喜您获得"
    })
    _this.reset();
  },
  //重置动画
  reset: function () {
    //重置动画 度数重置为0
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 0,
      timingFunction: "linear"
    });
    animation.rotate(0).step();
    this.setData({
      animationData: animation.export()
    })
  }
})
