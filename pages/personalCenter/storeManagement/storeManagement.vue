
<template>
    <view class="content">
	<view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in productList"
			:key="item.id" @click="goProDetail(item)">
			<view>
				<view class="storeMsg">店铺名：{{item.storeName}}</view>
				<view class="storeMsg">
				商铺ID：{{ item.storeId }}
				</view>
				<view class="storeMsg" style="margin-bottom: 30rpx;">
				地址：{{ item.storeAddress }}
				</view>
			</view>
			<view>
				<image class="storeImg" :src="item.storeImg"></image>
			</view>
		</view>
	</view>
    </view>
</template>

<script>

    export default {
        components: {

        },
        data() {
            return {
                // 列表数组
                productList: []
            }
        },
        onLoad () {
            this.requestData();
        },
        methods: {
            // 列表条目点击事件
            goProDetail(item) {
				//存储要传递的信息到全局变量中
				uni.setStorageSync('storeMsg', item);
				console.log(uni.getStorageSync("storeMsg"));
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/personalCenter/storeManagement/storeDetails/storeDetails'
				})
            },
            requestData() {
                this.productList = [];
                for (let i = 0; i < 6; i++) {
					this.productList.push({
						'storeName': '开心麻辣烫' + i,
						'storeId': 'md1234564654654654',
						'storeAddress': '香港特别行政区油尖旺区尖沙咀金马伦道22-24号东丽中心',
						'storeImg':'../../../static/personalCenter/store.jpg',
						'id': i + ''
					});
                }
            }
        }
    }
</script>

<style>
    page {
        background-color: #f7f7f7;
    }

	.uni-list-cell {
		flex-direction: row;
		margin-top: 0.625rem;
		background-color: white;
		padding: 0.1875rem 0.375rem;
		display: flex;
	}
	
	.storeMsg {
		width: 13.125rem;
		height: 0.9125rem;
		line-height: 1rem;
		font-weight: 500;
		font-size: 14px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-top: 1.40625rem;
		color: #44527c;
	}
	.storeImg{
		width: 8rem;
		height: 8rem;
		margin-left: 1rem;
	}
</style>