<template>
	<view>
		<view>
			<uv-navbar title="异常订单" @leftClick="goToIndex"></uv-navbar>
		</view>
		<view style="margin-top: 80rpx;width: 700rpx;height: 10rpx;"></view>
		<view class="unusualOrderbar">
			<view class="unusualOrder-info">
				<view class="unusualOrder-info1">
					<uv-icon name="order" size="50rpx" color="#E47470"></uv-icon>
					<text>退款信息</text>
				</view>
				<uv-divider></uv-divider>
				<view class="unusualOrder-info2">
					<text>服务单号</text>
					<text>12837192379312</text>
				</view>
				<view class="unusualOrder-info2">
					<text>申请时间</text>
					<text>2024-4-10 23:03:32</text>
				</view>
				<view class="unusualOrder-info2">
					<text>退款金额</text>
					<text>￥28.00</text>
				</view>
				<view class="unusualOrder-button">
					<uv-button type="error" shape="circle" text="拒绝" size="small" ></uv-button>
					<uv-button type="primary" shape="circle" text="同意退款" size="small"></uv-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goToIndex() {
				uni.switchTab({
					url: '/pages/index/index' // 请替换为实际的页面路径
				});
			},
		}
	}
</script>

<style>
	uni-app,
	uni-page,
	uni-page-wrapper,
	uni-page-body {
		display: block;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		background-color: #f9f9f9;
	}
	.unusualOrderbar {
		width: 751rpx;
		height: 1500rpx;

	}

	.unusualOrder-info {
		width: 700rpx;
		height: 300rpx;
		margin: 0 auto;
		border-radius: 25rpx;
		display: flex;
		flex-direction: column;
		background-color: white;
	}
	
	.unusualOrder-info view{
		margin: 5rpx;
	}

	.unusualOrder-button {
		width: 700rpx;
		display: flex;
		    justify-content: flex-end;
	}
	
	.unusualOrder-info1{
		display: flex;
		    justify-content: center;
		    align-items: center;
	}
	
	.unusualOrder-info2{
		display: flex;
		    justify-content: space-between;
	}
</style>