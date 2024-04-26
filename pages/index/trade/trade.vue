<template>
	<view>
		<view>
			<uv-navbar title="最新交易" @leftClick="goToIndex"></uv-navbar>
		</view>
		<br><br>
		<!-- <view style="margin-top: 80rpx;width: 780rpx;height: 10rpx;"></view>
		<view class="tradebar">
			<view class="tradebar-container">
				<view style="width: 150rpx;">
					<uv-input placeholder="2024-4-10" border="surround" v-model="value" @change="change" :disabled="true"
						style="width: 150rpx;"></uv-input>
				</view>
				<text>日交易</text>
			</view>
			<view class="tradebar-info">
				<text>收入:￥7823.00.00</text>
			</view>
		</view> -->
		<uv-list>
			<view v-for="item in orderList ">
				<uv-list-item v-if="item.orderPayway=='支付宝' && item.orderReback==0" title="支付成功" :note="item.orderCreatetime" thumb="/static/icon/alipay.png" thumb-size="lg"
					:rightText="item.orderMoney.toString()" :customStyle="{ borderBottom: '1px solid #F2F2F2' }">
				</uv-list-item>
				<uv-list-item v-if="item.orderPayway=='支付宝' && item.orderReback==1" title="退款成功" :note="item.orderCreatetime" thumb="/static/icon/alipay.png" thumb-size="lg"
					:rightText="item.orderMoney.toString()" :customStyle="{ borderBottom: '1px solid #F2F2F2' }">
				</uv-list-item>
				<uv-list-item v-if="item.orderPayway=='微信' && item.orderReback==0" title="支付成功" :note="item.orderCreatetime" thumb="/static/icon/wechat.png" thumb-size="lg"
					:rightText="item.orderMoney.toString()" :customStyle="{ borderBottom: '1px solid #F2F2F2' }">
				</uv-list-item>
				<uv-list-item v-if="item.orderPayway=='微信' && item.orderReback==1" title="退款成功" :note="item.orderCreatetime" thumb="/static/icon/wechat.png" thumb-size="lg"
					:rightText="item.orderMoney.toString()" :customStyle="{ borderBottom: '1px solid #F2F2F2' }">
				</uv-list-item>
			</view>
			<!-- <uv-list-item title="**付款" note="4月10日 14:19" thumb="/static/icon/wechat.png" thumb-size="lg"
				rightText="27.00" custom-style="border-bottom:1px solid #F2F2F2">
			</uv-list-item>
			<uv-list-item title="**付款" note="4月10日 14:19" thumb="/static/icon/alipay.png" thumb-size="lg"
				rightText="120.00" custom-style="border-bottom:1px solid #F2F2F2">
			</uv-list-item>
			<uv-list-item title="**付款" note="4月10日 14:19" thumb="/static/icon/alipay.png" thumb-size="lg"
				rightText="130.00" custom-style="border-bottom:1px solid #F2F2F2">
			</uv-list-item> -->
		</uv-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList:[],
			};
		},
		methods: {
			goToIndex() {
				uni.switchTab({
					url: '/pages/index/index' // 请替换为实际的页面路径
				});
			},
			change(){
				
			},
			getOrder(){
				// 从本地获取数据
				var userMsg = uni.getStorageSync('userMsg');
				console.log(userMsg);
				var userId = userMsg.userId;
				this.$request(
					"/form/allOrder",
					"POST", {
						storeId: this.storeId,
						userId: userId,
					},
				).then(res => {
					console.log('orderList',res)
					if (res.data.code == 200) {
						this.orderList = res.data.data
							
					}
				})
			},

		},
		mounted() {
			this.getOrder();
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