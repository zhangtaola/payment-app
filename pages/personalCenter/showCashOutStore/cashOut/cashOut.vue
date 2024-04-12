<template>
	<view id="box">
		<view class="header">
			<h2 class="money">￥ {{ store.money }}</h2>
			<view class="info">
				<span>可提现金额</span>
			</view>
			<view class="tips">
				<span>￥ 0不可提现</span>
			</view>
		</view>
		<view class="body">
			<view class="left">
				<view class="infoContainer">
					<span class="showInfo">提现金额</span>
				</view>
				<view class="infoContainer infoContainer_next">
					<span class="showInfo showInfo_next">收款账户</span>
				</view>
				<view class="infoContainer infoContainer_third">
					<span class="showInfo showInfo_third">服务费</span>
				</view>
			</view>
			<view class="right">
				<view class="inputContainer">
					<uv-input style="margin-top: 30rpx;width: 80%;margin-left: 23rpx;"
						:placeholder="'最多可提 ¥ ' + store.money" v-model="cashOut.tixianMoney" type="number"
						@change="change" clearable>
					</uv-input>
				</view>
				<view class="inputContainer">
					<uv-input style="margin-top: 60rpx;width: 80%;margin-left: 23rpx;" :placeholder="store.bossAccount"
						disabled>
					</uv-input>
				</view>
				<view class="inputContainer">
					<span class="chouchengInfo" v-if="isEmpty == true"> - </span>
					<span class="chouchengInfo" v-if="isEmpty == false">¥ {{ this.cashOut.choucheng }}</span>
				</view>
			</view>
		</view>
		<view class="foot">
			<uv-button type="primary" text="确定" style="width: 90%;margin: 0 auto;margin-top: 50rpx;"
				@click="submit"></uv-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEmpty: true,

				store: {
					money: "200",
					bossAccount: "123415312",
					feilv: 0.06 //提现费率 抽成
				},
				cashOut: {
					tixianMoney: "",
					choucheng: "", // 抽成的钱
				}
			}
		},
		methods: {

			change(e) {
				this.isEmpty = false
				this.cashOut.tixianMoney = e
				console.log(this.cashOut)
				this.cashOut.choucheng = this.cashOut.tixianMoney * this.store.feilv
				
				console.log(this.cashOut)
				
			},
			confirm() {
				console.log('confirm')
				this.cashOut.choucheng = this.cashOut.tixianMoney * this.store.feilv
			},
			submit() {
				console.log("提现")
			}
		}
	}
</script>

<style>
	.header {
		width: 50%;
		height: 250rpx;
		margin: 0 auto;
		margin-top: 50rpx;
		text-align: center;
		box-shadow: 6rpx 8rpx 6rpx 8rpx gainsboro;
	}

	.money {
		display: inline-block;
		margin-top: 20rpx;
		color: goldenrod;
		font-size: 50rpx;
	}

	.info {
		margin-top: 20rpx;
		font-size: 25rpx;
	}

	.tips {
		margin-top: 30rpx;
		font-size: 25rpx;
		color: gray;
	}

	.body {
		height: 500rpx;
		width: 90%;
		margin: 0 auto;
		margin-top: 40rpx;
		box-shadow: 6rpx 8rpx 6rpx 8rpx gainsboro;
		display: flex;
	}

	.left {
		width: 30%;
		height: 100%;

	}

	.infoContainer {
		height: 50rpx;
		text-align: center;
		margin-top: 40rpx;
	}

	.infoContainer_next {
		height: 50rpx;
		text-align: center;
		margin-top: 65rpx;
	}

	.infoContainer_third {
		height: 50rpx;
		text-align: center;
		margin-top: 65rpx;
	}

	.showInfo_next {
		margin-top: 60rpx;
	}

	.showInfo_third {
		margin-top: 60rpx;
	}

	.right {
		width: 70%;
		height: 100%;
	}

	.inputContainer {
		height: 50rpx;
	}

	.chouchengInfo {
		margin-top: 80rpx;
		display: inline-block;
		float: right;
		margin-right: 60rpx;
		color: goldenrod;
		font-size: 30rpx;
	}
</style>