<template>
	<view>
		<br><br><br>
		<uni-data-select class="custom-data-select"
		  v-model="value"
		  :localdata="range"
		  @change="change"
		  :clear="false"
		></uni-data-select>
	
	<uv-subsection :list="list" :current="current" @change="change1" ></uv-subsection>
		
	<uv-calendars  ref="calendars" mode="range" :endDate="maxDate" :startDate="minDate" allowSameDay 
	showLunar monthNum=4 @confirm="confirm" ></uv-calendars>
	
	<uv-grid :border="false">
		<uv-grid-item style="margin: 50rpx auto;">
			<text style="color: rgb(200,200,210);">收款金额(元)</text>
			<text style="font-size: 60rpx;font-weight: bold;">1888.00</text>
		</uv-grid-item>
	</uv-grid>
	
	<uv-grid :col="3" style="margin-bottom: 30rpx;">
		<uv-grid-item >
			<text style="font-size: 40rpx;font-weight: bold;">80</text>
			<text style="color: blue;">收款笔数(笔)</text>
		</uv-grid-item>
		<uv-grid-item >
			<text style="font-size: 40rpx;font-weight: bold;">180</text>
			<text style="color: blue;">退款金额(元)</text>
		</uv-grid-item>
		<uv-grid-item >
			<text style="font-size: 40rpx;font-weight: bold;">80</text>
			<text style="color: blue;">客单价(元)</text>
		</uv-grid-item>
	</uv-grid>
	
	<uv-gap height="20rpx" bgColor="rgb(247,247,245)"></uv-gap>
	<uv-gap height="10rpx" bgColor="#fff"></uv-gap>
	<text style="font-size: 30rpx;font-weight: bold;margin: 35rpx;">顾客统计</text>
	
	<uv-grid :col="2" style="margin-bottom: 30rpx;">
		<uv-grid-item style="background: rgb(255,247,245);margin: 20rpx; width: 335rpx;height: 200rpx;">
			<text style="font-size: 40rpx;font-weight: bold;">50</text>
			<text style="color: blue;">今日到店新顾客(人)</text>
		</uv-grid-item>
		<uv-grid-item style="background: rgb(245,250,255);margin: 20rpx; width: 335rpx; height: 200rpx;">
			<text style="font-size: 40rpx;font-weight: bold;">20</text>
			<text style="color: blue;">今日到店回头客(人)</text>
		</uv-grid-item>
	</uv-grid>
	
		
		<view class="charts-box">
			  <text class="unit-label">营业额/元</text>
		  <qiun-data-charts 
			type="line"
			:opts="opts"
			:chartData="chartData"
			:ontouch="true"
		  />
		</view>
	</view>
  
</template>

<script>
export default {
  data() {
	  const d = new Date()
	  	const year = d.getFullYear()
	  	let month = d.getMonth() + 1
	  	month = month < 10 ? `0${month}` : month
	  	const date = d.getDate()
    return {
		maxDate: `${year}-${month}-${date}`,
		minDate: `${year}-${month-3}-${date}`,
		value: 0,
		range: [
			{ value: 0, text: "全部" },
			{ value: 1, text: "A店铺" },
			{ value: 2, text: "B店铺" },
			{ value: 3, text: "C店铺" },
		],
		list: ['今天','近七天','近三十天','自定义'],
		current: 0,
      chartData: {},
	  chartData1: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        // color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        // padding: [15,10,0,15],
        enableScroll: true,
        legend: {},
        xAxis: {
          disableGrid: true,
          scrollShow: true,
          itemCount: 5
        },
        yAxis: {
          gridType: "dash",
          dashLength: 1,
		  name: "营业额/元"
        },
        extra: {
          line: {
            type: "straight",
            width: 2,
            activeType: "hollow"
          }
        }
      }
    };
  },
  mounted() {
    this.getServerData();
  },
  watch: {
      value() {
        this.updateChartData();
      }
    },
  methods: {
	  updateChartData() {
	        if (this.value !== 0) {
	          this.chartData = {
	            categories: this.chartData1.categories,
	            series: [this.chartData1.series[this.value - 1]]
	          };
	        } else {
	          this.chartData = JSON.parse(JSON.stringify(this.chartData1));
	        }
	      },
    getServerData() {		
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
            categories: ["周一","周二","周三","周四","周五","周六"],
            series: [
              {
                name: "A店",
                data: [35,8.5,25,37,4,20]
              },
              {
                name: "B店",
                data: [70,40,65,100,44,68]
              },
              {
                name: "C店",
                data: [100,80,95,150,112,132]
              }
            ]
          };
		this.chartData1 = JSON.parse(JSON.stringify(res));
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
	change(e) {
	      console.log("选择的店铺值：", e);
	    },
	change1(index) {
		if (index === 3) { // 如果选择了自定义选项
		        this.$refs.calendars.open(); // 打开日期选择器
		      } 
			this.current = index;
		},
	open() {
		this.$refs.calendar.open();
	},
	confirm(e) {
		console.log('日历选择：',e)
	}
  },
  
};
</script>

<style scoped  lang="scss">
  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
  .charts-box {
    width: 100%;
    height: 300rpx;
  }
  .unit-label {
	  margin-left: 40rpx;
      font-size: 25rpx;
      color: #666;
    }
	.custom-data-select ::v-deep .uni-select {
	  font-size: 30rpx;
	  font-weight: bolder;
	  border: none !important;
	}
</style>
