//index.js
//获取应用实例
var sysind=0;
var time='';
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    imgs:['jiandao.png', 'shitou.png', 'bu.png'],
    userimg:'',
    liveimg:'../../souces/bu.png',
    start:true,
    stop:false,
    result:'',
    score:'',
    word:'开始'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   var s= wx.getStorageSync("score");
    this.setData({
      score:s
    })
  },
  again:function(){
      var that = this;
      if (sysind < 2) {
        sysind++;
      } else {
        sysind = 0;
      }
      that.setData({
        liveimg: '../../souces/' + that.data.imgs[sysind]
      })
  },
  chooseimg:function(e){
    if (this.data.stop){
      return;
    }
    //还未开始
    if (this.data.start) {
      return;
    }
    clearInterval(time);
    var userind = e.currentTarget.dataset.id;
    var resulttxt='';
    if (sysind ==userind){
      resulttxt='平局'
    } else if (sysind == 0 && userind == 2 || sysind == 1 && userind == 2 || sysind == 2 && userind == 1){
      resulttxt='你输了'
    }else{
      resulttxt ='你赢了';
      this.data.score+=3;     
    }
    var that= this;
    wx.setStorageSync('score',that.data.score);
    that.setData({
      stop:true,
      userimg: '../../souces/' + that.data.imgs[userind],
      result:resulttxt,
      score: this.data.score
    })
    
  },
  continuego:function(){
    if(this.data.stop){
      this.data.score--;      
      wx.setStorageSync('score', this.data.score);
      time=setInterval(this.again, 100);
      this.setData({
        stop:false,
        result:'',
        userimg:'',
        score: this.data.score
      })
    }
    if (this.data.start){
      this.data.score--;     
      time = setInterval(this.again, 100);
      this.setData({
        start: false,
        score: this.data.score,
        word:'继续'
      })
    }
  }
})
