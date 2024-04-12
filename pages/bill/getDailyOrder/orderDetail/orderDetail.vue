<template>
	<view id="box">
		<view class="headContainer">
			<view class="header">
				<span class="orderMoney" v-if="order.orderStatus==1">
					+{{ order.orderMoney }}
				</span>
				<span class="orderMoney" v-if="order.orderStatus==0">
					-{{ order.orderMoney }}
				</span>
				<span class="orderStatus" v-if="order.orderStatus==0">
					有退款
				</span>
				<span class="orderStatus" v-if="order.orderStatus==1">
					交易关闭
				</span>
			</view>
			<view class="infoContainer">
				<view class="left">
					<span class="payTime">支付时间</span>
					<span class="orderNumber">订单号</span>
				</view>
				<view class="right">
					<span class="payTime">
						{{ order.orderPayTime }}
					</span>
					<span class="orderNumber">
						{{ order.orderNumber }}
					</span>
				</view>
			</view>
		</view>
		<view class="foot">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dayTime:"",
				order:{
					orderMoney: 1433,
					orderStatus: 1,  // 0退款，1交易成功
					orderPayTime:"2024.01.05 21:32:33",
					orderNumber: "12345329823423423"
				}
			}
		},
		methods: {
			getOrderInfo(){
				this.dayTime = uni.getStorageSync("dayTime")
				console.log(this.dayTime + "要渲染的时间")
			}
		},
		mounted() {
			this.getOrderInfo()
		}
	}
</script>

<style>
	.headContainer{
		display: flex;
		flex-direction: column;
	}
	
	.header{
		height: 200rpx;
		width: 95%;
		margin: 0 auto;
		margin-top: 40rpx;
		background-color: antiquewhite;
		text-align: center;
	}
	
	.orderMoney{
		display: inline-block;
		font-size: 40rpx;
		margin-top: 40rpx;
	}
	
	.orderStatus{
		display: block;
		margin-top: 20rpx;
	}
	
	.infoContainer{
		height: 200rpx;
		width: 95%;
		margin: 0 auto;
		background-color: aqua;
		display: flex;
	}
	
	.left{
		height: 200rpx;
		width: 50%;
		background-color: aquamarine;
	}
	
	.right{
		height: 200rpx;
		width: 50%;
		background-color: beige;
	}
	
	.left .payTime{
		display: block;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	
	.left .orderNumber{
		display: block;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	
	.right .payTime{
		display: block;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	
	.right .orderNumber{
		display: block;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	
	
</style>
