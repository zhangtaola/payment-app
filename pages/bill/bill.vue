<template>
	<view id="box">
		<!-- 头部店铺名 -->
		<view class="header">
			<view class="store_name">
				<h1>{{ storeName }}</h1>
			</view>
			<view class="changeButtonContainer">
				<image src="../../static/icon/changebutton.png" class="changeButton" @click="changeStore"></image>
			</view>
			<view class="selectContainer">
				<image src="../../static/icon/shaixuan.png" class="selectImage" @click="showDateTime"></image>
			</view>
		</view>
		
		
		
		<!-- 店面选择 -->
		<view>
			<uv-picker ref="picker" :columns="columns" @confirm="check" :closeOnClickOverlay="false"></uv-picker>
		</view>
		<!-- 日期选择 -->
		<view>
			<uv-calendars ref="calendars" color="#ff0000" mode="range" @confirm="confirm" />
		</view>
		
		<!-- 显示金额 -->
		<view class="container">
			<view v-if="storeOrder.length === 0 " style="margin: 100rpx auto;"><text  style="font-size: 100rpx; font-weight: bold;">暂无数据</text></view>
			<view class="moneyContainer" v-for="(item,index) in storeOrder" :key="index"
				@click="getDailyOrderDetail(item.date)">
				<view class="moneyContainerHeader">
					<h2 class="moneyContainerDate">
						{{ item.date }}
					</h2>
					<!-- <span class="moneyContainerBetween">(自00:00:00至23:59:59)</span> -->
					<!-- <image src="../../static/icon/a-xiala2.png" class="xiala"></image> -->
				</view>
				<view class="moneyContainerBody">
					<view class="acceptOrder">
						<span class="orderStatus">收款成功</span>
						<span class="orderMoney" >{{ item.sum }}元</span>
						<!-- <span class="orderMoney" v-if="item.profitMoney == null">0元</span> -->
						<span class="orderCount">{{ item.count }}笔</span>
					</view>
					<view class="rebackOrder">
						<span class="orderStatus">退款成功</span>
						<span class="orderMoney" v-if="item.refund != 0">-{{ item.refund }}元</span>
						<span class="orderMoney" v-if="item.refund == 0">0元</span>
						<span class="orderCount">{{ item.refundSum }}笔</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				storeName: "幸福刀削面",
				storeOrder:[],
				// orders:[],
				columns: [],
				storeId: 0,
				info:{},
				listData:[],
			}
		},
		methods: {
			showDateTime() {
				this.$refs.calendars.open();
			},
			// 日期选择，axios请求，重新复制渲染
			confirm(e) {
				console.log('日历选择：', e)
				this.listData = [e.range.before, e.range.after]
				this.getAllOrder()
			},
			check(e) {
				console.log('check', e);
				this.storeName = e.value[0]
				const item = this.info.find(obj => obj.storeName === this.storeName);
				this.storeId = item.storeId
				this.getAllOrder()
				
			},
			getDailyOrderDetail(index) {
				uni.setStorageSync("orderDailyTime", index)
				uni.navigateTo({
					url: "/pages/bill/getDailyOrder/getDailyOrder",
					"animationType":"slide-in-right",
					"animationDuration": 200
				})
			},
			// 页面初始化
			// init() {
			// 	const now = new Date();
			// 	const year = now.getFullYear(); // 获取年份
			// 	const month = now.getMonth() + 1; // 获取月份，月份需要+1
			// 	const day = now.getDate(); // 获取日
			// 	const hours = now.getHours(); // 获取小时
			// 	const minutes = now.getMinutes(); // 获取分钟
			// 	const seconds = now.getSeconds(); // 获取秒钟
			// 	// 格式化为两位数时间
			// 	const formatNumber = (n) => {
			// 		n = n.toString();
			// 		return n[1] ? n : '0' + n;
			// 	};
			// 	this.$request("/storeOrder/getStoreMonthOrder","POST",this.storeId).then(res => {
			// 		var length = res.data.data.profitMoney.length
			// 		length -= 1
			// 		for(var i = length;i >= 0;i--){
			// 			this.storeOrder.push({
			// 				profitMoney: res.data.data.profitMoney[i],
			// 				profitOrderCount: res.data.data.profitOrderCount[i],
			// 				rebackMoney: res.data.data.rebackMoney[i],
			// 				rebackOrderCount: res.data.data.rebackOrderCount[i],
			// 				dateTime: month + "月" + (i+1) + "日",
			// 				totalDateTime: year + "-" + month + "-" + (i+1)
			// 			})
			// 		}
			// 	}).catch(err => {
			// 		uni.showToast({
			// 			"title":"服务器出错，请稍后再试",
			// 			"icon":"none"
			// 		})
			// 	})
			// },
			changeStore() {
				console.log("切换按钮")
				this.$refs.picker.open();
			},
			getAllOrder(){
				this.$request(
					"/form/order",
					"POST", {
						data: this.listData,
						storeId: this.storeId
					},
				).then(res => {
					console.log("storeOrder",res)
					if (res.data.code == 200) {
						this.storeOrder = res.data.data
					}
				})
			},
			getStoreName() {
				this.$request(
					"/form/storeName",
					"GET",
				).then(res => {
					if (res.data.code == 200) {
						this.info = res.data.data
						const col = []
						res.data.data.forEach(item => {
							col.push(
								item.storeName
							);
						});
						this.columns.push(col)
						console.log("this.info",this.info[0].storeId)
						this.storeName = this.columns[0][0]
						this.storeId = this.info[0].storeId
						
					}
				})
			},
		},
		onLoad() {
			this.getStoreName()
			setTimeout(() => this.getAllOrder(), 1000);
			// this.init()
		},
	}
</script>

<style scoped>
	body {}

	.header {
		width: 100%;
		height: 150rpx;
		margin-top: 130rpx;
		display: flex;
		align-items: baseline;
	}

	.header .store_name {
		text-align: center;
		line-height: 150rpx;
		margin-left: 60rpx;
		font-size: 30rpx;
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.changeButtonContainer {
		height: 50rpx;
		margin-left: 20rpx;
	}

	.changeButton {
		width: 40rpx;
		height: 40rpx;
	}

	.selectContainer {
		height: 50rpx;
		margin-right: 50rpx;
	}

	.selectImage {
		width: 40rpx;
		height: 40rpx;
		margin-left: 230rpx;
	}

	.container {
		display: flex;
		flex-direction: column;
	}

	.moneyContainer {
		width: 90%;
		height: 350rpx;
		margin: 0 auto;
		background-color: aliceblue;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		box-shadow: 8rpx 8rpx ghostwhite;
		margin-top: 25rpx;
		font-size: 23rpx;
	}

	.moneyContainerHeader {
		height: 100rpx;
		width: 100%;
		border-radius: 10rpx 10rpx 0rpx 0rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid gainsboro;
	}

	.moneyContainerDate {
		color: gray;
		line-height: 100rpx;
		margin-left: 30rpx;
		display: inline-block;

	}

	.moneyContainerBetween {
		color: dimgray
	}

	.xiala {
		width: 60rpx;
		height: 60rpx;
		margin-left: 185rpx;
	}

	.moneyContainerBody {
		display: flex;
		width: 100%;

	}

	.acceptOrder {
		width: 50%;
		height: 250rpx;
		border-radius: 0rpx 0rpx 0rpx 10rpx;
	}

	.rebackOrder {
		width: 50%;
		height: 250rpx;
		border-radius: 0rpx 0rpx 10rpx 0rpx;
	}

	.orderStatus {
		display: block;
		margin-left: 30rpx;
		margin-top: 30rpx;
	}

	.orderMoney {
		display: block;
		margin-left: 30rpx;
		margin-top: 30rpx;
	}

	.orderCount {
		display: block;
		margin-left: 30rpx;
		margin-top: 30rpx;
	}
</style>
