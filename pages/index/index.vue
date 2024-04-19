<template>
	<view style="margin-top: 55rpx;"></view>
	<view class="topcolor">
		<view>
			<uv-navbar :fixed="false" title="聚合支付" :safeAreaInsetTop="false" bgColor="#FA4848">
				<template v-slot:left>
					<view class="uv-nav-slot">

					</view>
				</template>
				<template v-slot:right>
					<view class="uv-nav-slot">
						<!-- <uv-icon name="scan" size="25" color="white"></uv-icon> -->
					</view>
				</template>
			</uv-navbar>
		</view>
		<view class="functionbar">
			<view class="functionbar2" @click="goToPay">
				<image src="../../static/icon/collection1.png" style="width: 100rpx;height: 100rpx;"></image>
				<span>收款码</span>
			</view>
			<view class="functionbar2" @click="scanCode()">
				<image src="../../static/icon/scanpay1.png" style="width: 100rpx;height: 100rpx;"></image>
				<span>扫码收款</span>
			</view>
			<view class="functionbar2" @click="goToMechantSettled">
				<image src="../../static/icon/merchant.png" style="width: 100rpx;height: 100rpx;"></image>
				<span>商家入驻</span>
			</view>
			<view class="functionbar2" @click="gotoUnusualOrders">
				<image src="../../static/icon/unusual.png" style="width: 100rpx;height: 100rpx;"></image>
				<span>异常订单</span>
			</view>
		</view>
		<!-- 今日营业额 -->
		<view class="paybar">
			<span style="padding-left: 10px;line-height: 2;	color: #C8C7CD;font-size: 15px;">今日营业额</span>
			<view class="paybar-container">
				<view class="paybar-left">
					<span>1,848.00</span>
					<p>收款汇总(元)</p>
				</view>
				<view class="paybar_right">
					<span>84</span>
					<p>笔数(笔)</p>
				</view>
			</view>
		</view>
	</view>

	<!-- 最新交易 -->
	<view class="tradebar">
		<view>
			<navigator url="" hover-class="none" class="tradebar-top">
				<view class="txt">
					<text>最新交易</text>
					<text @click="goToTrade">更多</text>
				</view>

			</navigator>
		</view>
		<view class="tradebar-bottom">
			<uv-list>
				<uv-list-item title="支付成功" note="4月10日 14:19" thumb="/static/icon/wechat.png" thumb-size="lg"
					rightText="27.00" :clickable="true" style="font-weight: bold;">
				</uv-list-item>
				<uv-list-item title="支付成功" note="4月10日 14:19" thumb="/static/icon/alipay.png" thumb-size="lg"
					rightText="120.00" :clickable="true" :custom-style=asd style="font-weight: bold;">
				</uv-list-item>
				<uv-list-item title="支付成功" note="4月10日 14:19" thumb="/static/icon/alipay.png" thumb-size="lg"
					rightText="130.00" :clickable="true" style="font-weight: bold;">
				</uv-list-item>
			</uv-list>
		</view>
	</view>

	<!-- 结算出款通知 -->
	<view class="settlementbar">
		<view>
			<uv-notice-bar text="结算出款通知" bgColor="#E75650" style="border-radius: 20rpx;" color="white"></uv-notice-bar>
		</view>
	</view>

	<!-- 广告栏 -->
	<view class="uv-demo-block">
		<!-- <text class="uv-demo-block__title">卡片式</text> -->
		<uv-swiper :list="list" previousMargin="30" nextMargin="30" circular :autoplay="false" radius="5"
			gColor="#ffffff" height="350rpx">
		</uv-swiper>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				value: 0,
				list: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png'
				],
				asd:{
					
				}
			}
		},
		methods: {
			leftClick() {
				console.log('leftClick');
			},
			goToPay(){
				uni.navigateTo({
					url: '/pages/index/pay/pay'
				});
			},
			goToMechantSettled() {
				uni.navigateTo({
					url: '/pages/index/merchantSettled/merchantSettled'
				});
			},
			goToTrade() {
				uni.navigateTo({
					url: '/pages/index/trade/trade'
				})
			},
			gotoUnusualOrders() {
				uni.navigateTo({
					url: '/pages/index/unusualOrders/unusualOrders'
				})
			},
			scanCode() {
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			
		},
	}
</script>
<style scoped lang="scss">
	uni-app,
	uni-page,
	uni-page-wrapper,
	uni-page-body {
		display: block;
		box-sizing: border-box;
		width: 100%;
		background-color: #f9f9f9;
	}

	@mixin flex($direction: row) {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: $direction;
	}

	.uv-nav-slot {
		@include flex;
		align-items: center;
		justify-content: space-between;
		border-width: 0.5rpx;
		border-radius: 100rpx;
		border-color: #FA4848;
		padding: 3rpx 7rpx;
		opacity: 0.8;
	}

	.uv-navbar ::v-deep .uv-navbar__content__title[data-v-16f3e502] {
		text-align: center;
		font-size: 20px !important;
		font-weight: bold !important;
		color: #ffffff;
	}

	.topcolor {
		width: 750rpx;
		height: 350rpx;
		// background-color: #FA4848;
		background-image: linear-gradient(to bottom, #FA4848 60%, #F5ACAD 80%, #FCc5C7 90%, #FFFFFF 100%, );
	}

	.functionbar {
		width: 100%;
		height: 200rpx;
		display: flex;
		// border-color: #FA4848;
		justify-content: space-around;
	}

	.functionbar2 {
		width: 130rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.functionbar2 image {
		margin-left: 18rpx;
		text-align: center;
	}

	.functionbar2 span {
		color: white;
		text-align: center;
	}

	.paybar {
		width: 700rpx;
		height: 200rpx;
		// position: relative;
		// top: -100rpx;
		margin: 0 auto;
		// margin-top: 35rpx;
		border-radius: 15rpx;
		// border: 1px solid whitesmoke;
		background-color: white;
	}

	.paybar-container {
		display: flex;
	}

	.paybar-container span {
		font-size: 50rpx;
		font-weight: bold;
	}

	.paybar-container p {
		font-size: 20rpx;
		color: #C8C7CD;
	}

	.paybar-left {
		width: 400rpx;
		height: 110rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.paybar_right {
		width: 400rpx;
		height: 110rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.tradebar {
		width: 700rpx;
		height: 410rpx;
		margin: 0 auto;
		margin-top: 160rpx;
		border-radius: 15rpx;
		background-color: white;
	}

	.tradebar .txt {
		display: flex;
		margin: 0 auto;
		width: 650rpx;
		justify-content: space-between;
	}

	.tradebar-top {
		padding-top: 10rpx;
		padding-left: 10rpx;
	}

	.tradebar-top text {
		color: #7a7a7d;
	}

	.tradebar-bottom image {
		width: 80rpx;
		height: 80rpx;
	}

	.tradebar-container {
		display: flex;
		margin-top: 30rpx;
		background-color: #C8C7CD;
	}

	.tradebar-container-info {
		display: flex;
		align-items: center;
	}

	.tradebar-container-info view {
		margin-left: 10rpx;
	}

	.tradebar-container-info view span {
		font-size: 30rpx;
	}

	.tradebar-container-info view p {
		font-size: 22rpx;
	}

	.tradebar-container-info text {
		margin-left: 380rpx;
	}

	.uv-list-item__container ::v-deep .uv-list-item__extra-text {
		color: #343232;
		font-weight: bold;
		font-size: 16px;
	}

	.settlementbar {
		width: 700rpx;
		height: 70rpx;
		margin: 0 auto;
		margin-top: 35rpx;
		border-radius: 15rpx;
		// background-color: #C8C7CD;
	}

	.settlementbar .txt {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.settlement-top {
		padding-top: 10rpx;
	}

	.settlement-top image {
		width: 60rpx;
		height: 50rpx;
	}

	.settlement-top text {
		color: #000;
	}

	.uv-demo-block {
		margin-top: 35rpx;
	}
	

</style>