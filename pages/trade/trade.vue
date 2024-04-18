<template>
	<view>
		<view>
			<uv-navbar title="最新交易" @leftClick="goToIndex"></uv-navbar>
		</view>
		<view style="margin-top: 80rpx;width: 780rpx;height: 10rpx;"></view>
		<view class="tradebar">
			<view class="tradebar-container">
				<view style="width: 150rpx;">
					<uv-input placeholder="2024-4-10" border="surround" v-model="value" @change="change" disabled="true"
						style="width: 150rpx;"></uv-input>
				</view>
				<text>日交易</text>
			</view>
			<view class="tradebar-info">
				<text>收入:￥7823.00.00</text>
			</view>
		</view>
		<uv-list>
			<uv-list-item title="**付款" note="4月10日 14:19" thumb="/static/icon/wechat.png" thumb-size="lg"
				rightText="27.00" custom-style="border-bottom:1px solid #F2F2F2">
			</uv-list-item>
			<uv-list-item title="**付款" note="4月10日 14:19" thumb="/static/icon/alipay.png" thumb-size="lg"
				rightText="120.00" custom-style="border-bottom:1px solid #F2F2F2">
			</uv-list-item>
			<uv-list-item title="**付款" note="4月10日 14:19" thumb="/static/icon/alipay.png" thumb-size="lg"
				rightText="130.00" custom-style="border-bottom:1px solid #F2F2F2">
			</uv-list-item>
		</uv-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			goToIndex() {
				uni.switchTab({
					url: '/pages/index/index' // 请替换为实际的页面路径
				});
			},
			getNewTrade() {
				this.$request("/order/getNewOrder", "POST", {
		
				}).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			}

		},
		mounted() {
			this.getNewTrade();
		}
	}
</script>

<style scoped>
	.tradebar {
		width: 751rpx;
		height: 120rpx;
		display: flex;
		/* background-image: linear-gradient(to bottom,#E75750 40%, #D66156 50%,#E77A78 60%, #EE9393 70%, #F5ACAD 80%, #FCc5C7 90%, #FFFFFF 100%); */
		flex-direction: column;
		justify-content: space-around;
	}

	.tradebar-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tradebar-container text {
		color: #ABACA3;
	}

	.tradebar-info text {
		color: #ABACA3;
	}
</style>