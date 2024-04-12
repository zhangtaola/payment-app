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
			<uv-picker ref="picker" :columns="columns" @confirm="check"></uv-picker>
		</view>
		<!-- 日期选择 -->
		<view>
			<uv-calendars ref="calendars" color="#ff0000" mode="range" @confirm="confirm" />
		</view>
		<!-- 显示金额 -->
		<view class="container">
			<view class="moneyContainer" v-for="(item,index) in info" :key="index"
				@click="getDailyOrderDetail(item.totalDateTime)">
				<view class="moneyContainerHeader">
					<h2 class="moneyContainerDate">
						{{ item.dateTime }}
					</h2>
					<span class="moneyContainerBetween">(自00:00:00至23:59:59)</span>
					<image src="../../static/icon/a-xiala2.png" class="xiala"></image>
				</view>
				<view class="moneyContainerBody">
					<view class="acceptOrder">
						<span class="orderStatus">收款成功</span>
						<span class="orderMoney">{{ item.acceptMoney }}元</span>
						<span class="orderCount">{{ item.acceptOrder }}笔</span>
					</view>
					<view class="rebackOrder">
						<span class="orderStatus">退款成功</span>
						<span class="orderMoney">{{ item.rebackMoney }}元</span>
						<span class="orderCount">{{ item.rebackOrder }}笔</span>
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
				info: [{
						totalDateTime: "2024-01-19",
						dateTime: "01月19日",
						acceptMoney: 23466,
						acceptOrder: 2345,
						rebackMoney: 234,
						rebackOrder: 1234,
					},
					{
						totalDateTime: "2024-01-18",
						dateTime: "01月18日",
						acceptMoney: 23466,
						acceptOrder: 2345,
						rebackMoney: 234,
						rebackOrder: 1234,
					},
				],
				columns: [
					['中国', '美国', '日本']
				]
			}
		},
		methods: {
			showDateTime() {
				this.$refs.calendars.open();
			},
			// 日期选择，axios请求，重新复制渲染
			confirm(e) {
				console.log('日历选择：', e.range.data)
				this.info = [{
						totalDateTime: "2024-01-17",
						dateTime: "01月17日",
						acceptMoney: 23466,
						acceptOrder: 2345,
						rebackMoney: 234,
						rebackOrder: 1234,
					},
					{
						totalDateTime: "2024-01-16",
						dateTime: "01月16日",
						acceptMoney: 23466,
						acceptOrder: 2345,
						rebackMoney: 234,
						rebackOrder: 1234,
					}
				]
			},
			check(e) {
				console.log('check', e);
			},
			getDailyOrderDetail(index) {
				console.log("事件绑定" + index)
				uni.setStorageSync("orderDailyTime", index)
				uni.navigateTo({
					url: "/pages/bill/getDailyOrder/getDailyOrder",
					"animationType":"slide-in-right",
					"animationDuration": 200
				})
			},
			// 页面初始化
			init() {
				const now = new Date();
				const year = now.getFullYear(); // 获取年份
				const month = now.getMonth() + 1; // 获取月份，月份需要+1
				const day = now.getDate(); // 获取日
				const hours = now.getHours(); // 获取小时
				const minutes = now.getMinutes(); // 获取分钟
				const seconds = now.getSeconds(); // 获取秒钟
				// 格式化为两位数时间
				const formatNumber = (n) => {
					n = n.toString();
					return n[1] ? n : '0' + n;
				};
				// 拼接成YYYY-MM-DD HH:mm:ss格式
				// console.log(`${year}-${formatNumber(month)}-${formatNumber(day)} ${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`)
				// const time = `${year}-${formatNumber(month)}-${formatNumber(day)}`
				// console.log(time.split("-"))
			},
			changeStore() {
				console.log("切换按钮")
				this.$refs.picker.open();
			},

		},
		mounted() {
			this.init()
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