<template>
	<view id="box">
		<uv-sticky>
			<view class="header">
				<h2 class="dailyTime">选择的时间 : {{ orderDailyTime }}</h2>
			</view>
		</uv-sticky>
		<view class="dailyOrderContainer" v-for="(item,index) in items" :key="index" @click=getOrderDetail(item.time)>
			<view class="left">
				<span class="orderWay firstLine">{{ item.orderWay }} - 商品</span>
				<span class="orderWay">{{ item.orderWay }}</span>
				<span class="orderWay">{{ item.time }} </span>
				
			</view>
			<view class="right">
				<span class="orderMoney" v-if="item.orderStatus==1">+{{ item.orderMoney }} 元</span>
				<span class="orderMoney" v-if="item.orderStatus==0">-{{ item.orderMoney }} 元</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: [],
				orderDailyTime: "",
				items: [
					{
						"orderStatus":1,
						"orderWay": "收款",
						"time": "23:21:23",
						"orderMoney": 123,
					},
					{
						"orderStatus": 0,
						"orderWay": "退款",
						"time": "23:21:13",
						"orderMoney": 23,
					},
				]
			}
		},
		methods: {
			getOrderDailyTime() {
				this.orderDailyTime = uni.getStorageSync("orderDailyTime")
				console.log(uni.getStorageSync("orderDailyTime"))
				// console.log(orderDailyTime)
			},
			
			getOrderDetail(time){
				const res = this.orderDailyTime + " " + time
				console.log(this.orderDailyTime + " " + time)
				uni.setStorageSync("dayTime",res)
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
		margin-left: 200rpx;
		margin-top: 30rpx;
		color: red;
		font-size: 25rpx;
	}
</style>