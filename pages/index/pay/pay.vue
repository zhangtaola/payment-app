<template>
	<view>
		<view>
			<uv-navbar title="支付" @leftClick="goToIndex"></uv-navbar>
		</view>
		<view style="margin-top: 80rpx;width: 780rpx;height: 10rpx;"></view>
		<view class="paybar">
			<view class="paybar-image">
				<uv-avatar src="https://via.placeholder.com/200x200.png/2878ff" shape="circle" size="80"></uv-avatar>
				<text style="margin-top: 30rpx;">超级无敌暴龙神</text>
			</view>
			<view class="paybar-info">
				<text style="margin-left: 25rpx;">金额 (元)</text>
				<view class="paybar-money">
					<uv-input v-model="value" border="bottom" font-size="50" custom-style="height:115rpx"
						color="#C8C7CD"></uv-input>
				</view>
				<uv-input placeholder="添加备注(20字内)" border="none" font-size="18"></uv-input>
			</view>
			<view class="paybar-button">
				<uv-button type="error" size="large" text="付款"></uv-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '0.0'
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

	.paybar {
		width: 100%;
		height: 460rpx;
		background-color: white;
	}

	.paybar-image {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.paybar-info {
		width: 90%;
		height: 300rpx;
		margin: 0 auto;
		/* 		background-color: aquamarine; */
	}
	
	.paybar-button{
		width: 90%;
		margin: 0 auto;
	}
</style>