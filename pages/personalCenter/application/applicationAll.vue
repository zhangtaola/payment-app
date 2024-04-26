
<template>
    <view class="content">
	<view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in productList"
			:key="item.auditId" @click="goProDetail(item)">
			<view class="topTitleV">{{item.auditStoreName}}</view>
			<view class="topTitleV unitV" :style="{ 
				color: item.auditStatus === 2 ? 'green' : (item.auditStatus === 0 ? 'blue' : 'red') }">
			{{ 
			    item.auditStatus === 0 ? '待审核' : 
			    (item.auditStatus === 1 ? '驳回修改' : 
			    (item.auditStatus === 2 ? '审核通过' : 
			    (item.auditStatus === 3 ? '取消申请' : '未知状态')))
			}}
			</view>
			<view
				style="display: flex; flex: 1; flex-wrap: wrap; margin-top: 0rpx; margin-left: -8rpx; height: 100rpx; width:calc(100vw-62rpx)">
				<!-- 自定义了一个data-id的属性,可以通过js获取到它的值!  hover-class 指定按下去的样式类-->
				<view class="cellView" :style="{ color: bindColor(index), backgroundColor: bindBgColor(index) }"
					v-for="(tagItem, index) in bindTag(item)" :key="index">
					{{tagItem}}
				</view>
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
				uni.setStorageSync('applicationMsg', item);
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/personalCenter/application/applicationStatus'
				})
            },
			bindTag(item) {
				return [item.auditStoreCreateTime]
			},
			bindColor(index) {
				let colorArr = ['rgb(131 153 218)'];
				return colorArr[index % 3];
			},	
			bindBgColor(index) {
				let bgColorArr = ['#F1F4FA'];
				return bgColorArr[index % 3];
			},
            requestData() {
                this.productList = [];
				// 从本地获取数据
				var userMsg = uni.getStorageSync('userMsg');
				console.log(userMsg);
				var userId = userMsg.userId;
				this.$request(
					"/application/selectAllApplication",
					"GET",
					{userId: userId},
				).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						this.productList = res.data.data;
						console.log(res.data.data);
					}
				})
            }
        }
    }
</script>

<style>
    page {

        background-color: #f7f7f7;
    }

    .content {
        display: flex;
        flex-direction: column;

    }

    .mui-content-padded {
        margin: 0rpx 14rpx;
        /* background-color: #ffffff; */
    }
	
	.uni-list-cell {
		flex-direction: column;
		margin-top: 50rpx;
		background-color: white;
		padding: 6rpx 12rpx;
	
	}
	
	.topTitleV {
		/* height: 26rpx; */
		height: 1rem;
		line-height: 35rpx;
		color: #333333;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 500;
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-top: 5rpx;
	
	}
	.unitV{
		color: #555555;
		font-size: 12px;
		margin-top: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		
	}
	
	.cellView {
		margin-top: 50rpx;
		margin-left: 8rpx;
		height: 22rpx;
		line-height: 22rpx;
		text-align: center;
		border-radius: 2rpx;
		padding: 0rpx 4rpx !important;
		font-size: 12px;
	
		color: #4272FF;
		background: #F3F4F6;
	}
</style>