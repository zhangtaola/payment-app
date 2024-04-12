<template>
	<view id="box">
		<view class="storeContainer" v-for="(item,index) in stores" :key="index">
			<view class="leftContainer">
				<view class="top">
					店铺名: <h2 class="info">{{ item.storeName }}</h2>
				</view>
				<view class="mid">
					不知道写啥
				</view>
				<view class="foot">
					待审核金额: ¥<h2 class="info">{{ item.storeMoney }}</h2>
				</view>
			</view>
			<view class="rightContainer">
				<view class="imageContainer">
					<image :src="item.storeImage" class="storeImage"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stores:[
					{
						storeId:1,
						storeName: "幸福刀削面",
						storeMoney: "1234",
						storeImage: "../../../static/personalCenter/store.jpg"
					},
					{
						storeId:2,
						storeName: "必胜客",
						storeMoney: "123",
						storeImage: "../../../static/personalCenter/store.jpg"
					},
				]
			}
		},
		methods: {
			// choseStore(storeId){
			// 	console.log(storeId)
			// 	uni.setStorageSync("storeId",storeId)
			// 	uni.navigateTo({
			// 		url: "/pages/personalCenter/showCashOutStore/cashOut/cashOut",
			// 		"animationType":"slide-in-right",
			// 		"animationDuration": 200
			// 	})
			// }
		}
	}
</script>

<style>
	.storeContainer {
		width: 90%;
		height: 250rpx;
		margin: 0 auto;
		margin-top: 60rpx;
		border-radius: 15rpx 15rpx;
		display: flex;
		border: 1px solid bisque;
		box-shadow: 8rpx 8rpx 4rpx 8rpx gainsboro;
	}

	.leftContainer {
		width: 55%;
		height: 250rpx;
		border-radius: 15rpx 0rpx 0rpx 15rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		border-right: 1px solid bisque;
	}
	
	.top{
		margin-left: 30rpx;
	}
	
	.mid{
		margin-left: 30rpx;
	}
	
	.foot{
		margin-left: 30rpx;
	}
	
	.info{
		display: inline-block;
		font-size: 35rpx;
		margin-left: 14rpx;
	}

	.rightContainer {
		width: 45%;
		height: 250rpx;
		border-radius: 0rpx 15rpx 15rpx 0rpx;
	}

	.storeImage {
		width: 260rpx;
		height: 220rpx;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, 7%);
	}
</style>