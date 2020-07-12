//index.js
const app = getApp()
const CHARTS = require('./wxcharts-min.js'); 
Page({
  data: {
    animation: '',
    bgcolor: {
      "yin": ["#7f7f7f", "#262b4e"],
      "xue": ["d7d7d7", "bdbdbd"],
      "lei": ["#2e3be4", "#11028f"],
      "shachen": ["#dbda22", "#fba01d"],
      "wu": ["#d2d2a4", "#afafac"],
      "bingbao": ["#2ce769", "#04febf"],
      "yun": ["#4d568f", "#403f62"],
      "yu": ["#56cde7", "#031eff"],
      "qing": ["#d7e123", "#fd9a1d"]
    },
  },
   onPullDownRefresh: function () {
    //  console.log("---下拉刷新----");
     this.refresh();
     wx.stopPullDownRefresh();
   },
  refresh() {
    this.startAnimationInterval();
    this.onShow();
    this.showok();
  },

  onShow: function () {
    var that = this;
    wx.request(
      {
        url: 'https://yiketianqi.com/api?version=v6&appid=98218758&appsecret=1pjGkzID',
        success(res) {
          var data = res.data;
          console.log(data);
          that.setData({
            city: data.city,
            update_time: data.update_time,
            realtimeTemp: data.tem,
            t_tem1: data.tem1,
            t_tem2: data.tem2,
            t_wea: data.wea,
            t_wea_img: data.wea_img,
            t_week: data.week,
            t_win: data.win,
            t_win_meter: data.win_meter,
            t_humidity: data.humidity,
            t_visibility: data.visibility,
            t_pressure: data.pressure,
            t_air: data.air,
            t_air_level: data.air_level,
            t_air_pm25: data.air_pm25,
            t_tips: data.air_tips,
          })
        }
      }
    )
    wx.request(
      {
        url: 'https://yiketianqi.com/api?version=v1&appid=98218758&appsecret=1pjGkzID',
        success(res) {
          var data = res.data;
          console.log(data);
          wx.setStorageSync('d2', data.data[2].week)
          wx.setStorageSync("d3", data.data[3].week)
          wx.setStorageSync("d4", data.data[4].week)
          wx.setStorageSync("d5", data.data[5].week)
          wx.setStorageSync("d6", data.data[6].week)
          wx.setStorageSync("d1_t2", data.data[1].tem2)
          wx.setStorageSync("d1_t1", data.data[1].tem1)
          wx.setStorageSync("d2_t2", data.data[2].tem2)
          wx.setStorageSync("d2_t1", data.data[2].tem1)
          wx.setStorageSync("d3_t2", data.data[3].tem2)
          wx.setStorageSync("d3_t1", data.data[3].tem1)
          wx.setStorageSync("d4_t2", data.data[4].tem2)
          wx.setStorageSync("d4_t1", data.data[4].tem1)
          wx.setStorageSync("d5_t2", data.data[5].tem2)
          wx.setStorageSync("d5_t1", data.data[5].tem1)
          wx.setStorageSync("d6_t2", data.data[6].tem2)
          wx.setStorageSync("d6_t1", data.data[6].tem1)
          that.setData({
            d1_week: data.data[1].week,
            d1_wea: data.data[1].wea,
            d1_tem1: data.data[1].tem1,
            d1_tem2: data.data[1].tem2,
            d1_wea_img: data.data[1].wea_img + '2',

            d2_week: data.data[2].week,
            d2_wea: data.data[2].wea,
            d2_tem1: data.data[2].tem1,
            d2_tem2: data.data[2].tem2,
            d2_wea_img: data.data[2].wea_img + '2',

            d3_week: data.data[3].week,
            d3_wea: data.data[3].wea,
            d3_tem1: data.data[3].tem1,
            d3_tem2: data.data[3].tem2,
            d3_wea_img: data.data[3].wea_img + '2',
          })
        }
      }
    )
    that.showLine()
    that.showok()
  },
  startAnimationInterval: function () {
    // 顺时针旋转实例
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    // 逆时针旋转实例
    var animation1 = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear'
    })

    animation.rotate(180).step()
    this.setData({
      animation: animation.export()
    })
    setTimeout(function () {
      animation1.rotate(0).step()
      this.setData({
        animation: animation1.export()
      })
    }.bind(this), 1300);
  },
  showok: function () {
    wx.showToast({
      title: '数据获取成功',
      icon: 'success',
      duration: 2000
    })
  },
  showLine: function () {
    var d2 = wx.getStorageSync('d2'); var d3 = wx.getStorageSync('d3');
    var d4 = wx.getStorageSync('d4'); var d5 = wx.getStorageSync('d5');
    var d6 = wx.getStorageSync('d6'); 
    var d1_t1 = wx.getStorageSync('d1_t1'); var d1_t2 = wx.getStorageSync('d1_t2'); 
    var d2_t1 = wx.getStorageSync('d2_t1'); var d2_t2 = wx.getStorageSync('d2_t2'); 
    var d3_t1 = wx.getStorageSync('d3_t1'); var d3_t2 = wx.getStorageSync('d3_t2'); 
    var d4_t1 = wx.getStorageSync('d4_t1'); var d4_t2 = wx.getStorageSync('d4_t2');
    var d5_t1 = wx.getStorageSync('d5_t1'); var d5_t2 = wx.getStorageSync('d5_t2');
    var d6_t1 = wx.getStorageSync('d6_t1'); var d6_t2 = wx.getStorageSync('d6_t2');

    d1_t2 = parseInt(d1_t2.substring(0,2)); d1_t1 = parseInt(d1_t1.substring(0,2));
    d2_t2 = parseInt(d2_t2.substring(0,2)); d2_t1 = parseInt(d2_t1.substring(0,2)); 
    d3_t2 = parseInt(d3_t2.substring(0,2)); d3_t1 = parseInt(d3_t1.substring(0,2)); 
    d4_t2 = parseInt(d4_t2.substring(0,2)); d4_t1 = parseInt(d4_t1.substring(0,2)); 
    d5_t2 = parseInt(d5_t2.substring(0,2)); d5_t1 = parseInt(d5_t1.substring(0,2)); 
    d6_t2 = parseInt(d6_t2.substring(0,2)); d6_t1 = parseInt(d6_t1.substring(0,2)); 

    let res = wx.getSystemInfoSync();
    var windowWidth = res.windowWidth * 0.9;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('.canvas').boundingClientRect(function (rect) {
        var Height = rect.height
        wx.setStorageSync('height', Height)
        // console.log(Height)
    }).exec();
    var height = parseInt(wx.getStorageSync('height'));
    console.log(height);
    // console.log(windowWidth)
    // console.log(d1_t2)
      let line = {
          canvasId: 'graph', // canvas-id
          type: 'line', // 图表类型，可选值为pie, line, column, area, ring
          categories: ['明天',d2, d3,d4,d5,d6],
          series: [{ // 数据列表
              name: '最高温',
              data: [d1_t1, d2_t1, d3_t1,d4_t1,d5_t1,d6_t1],
          },
          { // 数据列表
            name: '最低温',
            data: [d1_t2, d2_t2, d3_t2,d4_t2,d5_t2,d6_t2],
        }],
          yAxis: {
              min: 10 // Y轴起始值
          },
          width: windowWidth,
          height: height,
          dataLabel: true, // 是否在图表中显示数据内容值
          legend: true, // 是否显示图表下方各类别的标识
          extra: {
              lineStyle: 'curve' // (仅对line, area图表有效) 可选值：curve曲线，straight直线 (默认)
          }
      }
      new CHARTS(line);
  }
})
