<template>
	<view id="box">
		<uv-sticky>
			<view class="header">
				<h2 class="dailyTime">选择的时间 : {{ orderDailyTime }}</h2>
			</view>
		</uv-sticky>
		<view class="dailyOrderContainer" v-for="(item,index) in items" :key="index" @click=getOrderDetail(item.orderNumber)>
			<view class="left">
				<span class="orderWay firstLine" v-if="item.orderStatus == 0">收款 - 商品</span>
				<span class="orderWay firstLine" v-if="item.orderStatus == 1">退款 - 商品</span>
				<span class="orderWay" v-if="item.orderStatus== 0">收款</span>
				<span class="orderWay" v-if="item.orderStatus== 1">退款</span>
				<span class="orderWay">{{ item.orderCreatetime }} </span>
				
			</view>
			<view class="right">
				<span class="orderMoney" v-if="item.orderStatus == 0">+{{ item.orderMoney }} 元</span>
				<span class="orderMoney" v-if="item.orderStatus == 1">-{{ item.orderMoney }} 元</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					startTime:"",
					endTime:"",
					storeId:1
				},
				orderDailyTime: "",
				items: []
			}
		},
		methods: {
			// 接收日期，渲染当天的订单
			getOrderDailyTime() {
				this.orderDailyTime = uni.getStorageSync("orderDailyTime")
				this.info.startTime = uni.getStorageSync("orderDailyTime") + " 00:00:00"
				this.info.endTime = uni.getStorageSync("orderDailyTime") + " 23:59:59"
				this.$request("/storeOrder/getStoreDailyOrder","POST",this.info).then(res => {
					if(res.data.data.length == 0){
						uni.showToast({
							"title":"当天暂无订单",
							"icon":"none"
						})
					}else{
						this.items = res.data.data
					}
				}).catch(err => {
					uni.showToast({
						"title":"服务器出错，请稍后再试",
						"icon":"none"
					})
				})
			},
			// 传订单号，跳转页面
			getOrderDetail(orderNumber){
				const res = orderNumber
				console.log(res)
				uni.setStorageSync("orderNumber",res)
				uni.navigateTo({
					url: "/pages/bill/getDailyOrder/orderDetail/orderDetail",
					"animationType":"slide-in-right",
					"animationDuration": 200
				})
			}
		},
		mounted() {
			this.getOrderDailyTime()
		}
	}
</script>

<style>
	

	.header {
		height: 120rpx;
		border-bottom: 1px solid black;
		line-height: 120rpx;
	}

	.dailyTime {
		margin-left: 50rpx;
		font-size: 30rpx;
	}

	.dailyOrderContainer {
		height: 230rpx;
		width: 95%;
		margin: 0 auto;
		background-color: ghostwhite;
		margin-top: 20px;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		box-shadow: 8rpx 8rpx grey;
		display: flex;
	}

	.dailyOrderContainer .orderWay {
		display: inline-block;
		width: 95%;
		margin-left: 30rpx;
		margin-top: 30rpx;
		font-size: 28rpx;
	}

	.firstLine {
		display: inline-block;
		margin-left: 150rpx;
	}

	.right .orderMoney {
		display: inline-block;
		margin-left: 30rpx;
		margin-top: 30rpx;
		color: red;
		font-size: 25rpx;
	}
</style>
