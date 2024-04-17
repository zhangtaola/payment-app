<template>
	<view id="box">
		<view class="headContainer">
			<view class="header">
				<span class="orderMoney" v-if="order.orderStatus==0">
					+{{ order.orderMoney }}
				</span>
				<span class="orderMoney" v-if="order.orderStatus==1">
					-{{ order.orderMoney }}
				</span>
				<span class="orderStatus" v-if="order.orderStatus==1">
					有退款
				</span>
				<span class="orderStatus" v-if="order.orderStatus==0">
					交易关闭
				</span>
				<span class="orderStatus" >
					支付方式：{{ order.orderPayway }}
				</span>
			</view>
			<view class="infoContainer">
				<view class="left">
					<span class="payTime">支付时间</span>
					<span class="orderNumber">订单号</span>
				</view>
				<view class="right">
					<span class="payTime">
						{{ order.orderCreatetime }}
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
				// 接收后端数据
				order:{},
				// 上传后端数据
				info:{
					storeId:1,
					orderNumber:"",
				}
			}
		},
		methods: {
			// 获取的订单详细信息
			getOrderInfo(){
				this.info.orderNumber = uni.getStorageSync("orderNumber")
				console.log(this.info.orderNumber + "要渲染的订单号")
				this.$request("/storeOrder/getOrderDetail","POST",this.info).then(res => {
					console.log(res)
					this.order = res.data.data[0]
				}).catch(err => {
					uni.showToast({
						"title":"服务器出错，请稍后再试",
						"icon":"none"
					})
				})
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
		border:1rpx solid black;
		text-align: center;
		border-radius: 8rpx 8rpx 0rpx 0rpx;
		background-color: aliceblue;
		box-shadow: 5rpx 5rpx 1rpx 2rpx gainsboro;
		
	}
	
	.orderMoney{
		display: inline-block;
		font-size: 40rpx;
		margin-top: 10rpx;
	}
	
	.orderStatus{
		display: block;
		margin-top: 20rpx;
	}
	
	.infoContainer{
		height: 200rpx;
		width: 95%;
		margin: 0 auto;
		display: flex;
		border-left: 1rpx solid black;
		border-bottom: 1rpx solid black;
		border-right: 1rpx solid black;
		border-radius: 0rpx 0rpx 8rpx 8rpx;
		background-color: aliceblue;
		box-shadow: 5rpx 5rpx 3rpx 2rpx gainsboro;
	}
	
	.left{
		height: 200rpx;
		width: 50%;
		border-right: 1px solid black;
		
	}
	
	.right{
		height: 200rpx;
		width: 50%;
		
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
