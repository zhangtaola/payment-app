<template>
	<view class="header">
		<view class="uesr">
			<view class="top-xh">
				<view>
				</view>
			</view>
			<view class="fot-xh">
				<!-- <navigator url="" hover-class="none"> -->
					<view class="pic">
						<image src="../../static/personalCenter/people.png" style="width: 130rpx;" mode="widthFix">
						</image>
					</view>
					<view class="txt">
						<view class="name">
							<view class="h3">
								昵称：{{userNickname}}
							</view>
							<view class="storeId">
								账号类型：{{userAccountType}}
							</view>
						</view>
					</view>
				<!-- </navigator> -->
			</view>
		</view>
		<view class="money">
			<view class="m-a1">
				<view class="money-box">
					<navigator url="/pages/personalCenter/showAuditStoreMoney/showAuditStoreMoney" hover-class="none">
					<view class="storeMoney">
						<view class="pic">
							<image src="../../static/personalCenter/daishenghe.png" style="width: 76rpx;" mode="widthFix"></image>
						</view>
						<view class="txt">
							<text class="s1">待审核</text>
							<text>{{auditingMoney}}元</text>
						</view>
					</view>
					</navigator>
					<navigator url="/pages/personalCenter/showCashOutStore/showCashOutStore" hover-class="none">
					<view class="storeMoney">
						<view class="pic">
							<image src="../../static/personalCenter/ketixian.png" style="width: 76rpx;" mode="widthFix"></image>
						</view>
						<view class="txt">
							<text class="s1">可提现</text>
							<text>{{withdrawableMoney}}元</text>
						</view>
					</view>
					</navigator>
				</view>
			</view>
		</view>
		<view class="ul-list1-xh">
			<view class="li">
				<navigator url="/pages/personalCenter/storeManagement/storeManagement" hover-class="none">
					<view class="pic">
						<image src="../../static/personalCenter/dianpu.png" style="width: 40rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text>店铺管理</text>
					</view>
				</navigator>
			</view>
			<view class="li">
				<navigator url="/pages/personalCenter/application/applicationAll" hover-class="none">
					<view class="pic">
						<image src="../../static/personalCenter/shengqingjindu.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text>申请进度</text>
					</view>
				</navigator>
			</view>
			<view class="li">
				<navigator url="/pages/personalCenter/userOpinion/userOpinion" hover-class="none">
					<view class="pic">
						<image src="../../static/personalCenter/yijian.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text>意见反馈</text>
					</view>
				</navigator>
			</view>
			<view class="li">
				<navigator url="/pages/personalCenter/chatWindow/chatWindow" hover-class="none">
					<view class="pic">
						<image src="../../static/personalCenter/lianxiwomen.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text>联系我们</text>
					</view>
				</navigator>
			</view>
			<view class="li">
				<navigator url="/pages/personalCenter/unsubscribe/unsubscribe" hover-class="none">
					<view class="pic">
						<image src="../../static/personalCenter/zhuxiaozhanghu.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt" style="border-bottom: none;">
						<text>注销账户</text>
					</view>
				</navigator>
			</view>
			<view class="li">
				<navigator url="/pages/personalCenter/changePassword/changePassword" hover-class="none">
					<view class="pic">
						<image src="../../static/personalCenter/xiugaimima.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt" style="border-bottom: none;">
						<text>修改密码</text>
					</view>
				</navigator>
			</view>
				<view>
					<uv-popup ref="popup" mode="center">
						<view style="width: 600rpx;">
							<text style="display: block;
									text-align: center;
									width: 300px;
									margin-top: 20px;
									margin-bottom: 50px;
									color: rgb(231 36 36);">
									确认要退出吗？
							</text>
							<uv-button 
							type="default" 
							text="确认退出"
							@click="confirm" 
							style="margin-top: 20px;background-color: #ccdade36;margin: 20px 5px 10px 5px;"
							></uv-button>
		
							<uv-button 
							type="default" 
							text="取消" 
							@click="close" 
							style="margin-top: 30px;background-color: #ccdade36;margin: 0px 5px 10px 5px;">
							</uv-button>
						</view>
					</uv-popup>
					<uv-button type="error" text="退出登录" @click="exitApp" style="margin-top: 100rpx;"></uv-button>
				</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//店铺名称
				userNickname:"",
				//商户id
				userAccountType:"",
				//待审核金额
				auditingMoney:"500000",
				//可提现金额
				withdrawableMoney:"50000",
				inputValue_store: '',
				candidates_store: [{
					id: '1',
					name: '选项一'
				}, {
					id: '2',
					name: '选项二',
					disabled: true // 单独设置disabled后即可禁用该选项
				}, {
					id: '3',
					name: '选项三'
				}, {
					id: '4',
					name: '选项四'
				}, {
					id: '5',
					name: '选项五',
					disabled: true // 单独设置disabled后即可禁用该选项
				}, {
					id: '6',
					name: '...'
				}]
			}
		},
		mounted() {
			// 从本地获取数据
			var userMsg = uni.getStorageSync('userMsg');
			this.userNickname = userMsg.userNickname;
			if(userMsg.userAccountType === 0){
				this.userAccountType = "普通账号";
			}else if(userMsg.userAccountType === 1){
				this.userAccountType = "商家主账号";
			}else{
				this.userAccountType = "商家子账号";
			}
		},
		methods: {
			input_store(e) {
                console.log(e) // 选项一
            },
            select_store(e) {
                console.log(e) // {id: '1',name: '选项一'}
            },
			exitApp(){
				this.$refs.popup.open();
			},
			close(){
				this.$refs.popup.close();
			},
			//确认退出系统
			confirm(){
				console.log("退出的逻辑");
				this.$refs.popup.close();
				// 删除存储的数据
				uni.removeStorageSync('userMsg'); // 删除存储的 userMsg
				uni.removeStorageSync('userMsgExpiredTime'); // 删除存储的过期时间
				uni.redirectTo({
				    // 不保留当前页面，跳转到应用内的某个页面
				    url: '/pages/login/login'
				})
			},
		}
	}
</script>

<style>
	.superwei-combox {
	    font-size: 14px;
	    border: 1px solid #DCDFE6;
	    border-radius: 4px;
	    padding: 6px 10px;
	    position: relative;
	    display: flex;
	    flex-direction: row;
	    align-items: center;
	    height: 15px;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 15px;
		right: 15px;
	}
	.top-xh {
			padding-top: 150rpx;
			overflow: hidden;
			margin-bottom: 60rpx;
			display: flex;
			justify-content: space-between;
	
		}
	
		.top-xh .h2 {
			float: left;
			font-size: 32rpx;
			font-weight: bold;
		}
	
		.top-xh .pic {
			float: right;
		}
	
		.uesr {
			overflow: hidden;
			padding: 0 30rpx;
			background: url(../../static/personalCenter/beijing1_03.png) no-repeat 0 center;
			background-size: cover;
			height: 500rpx;
		}
	
		.fot-xh .pic {
			float: left;
			margin-right: 30rpx;
		}
	
		.fot-xh .txt {
			padding: 20rpx 0;
			overflow: hidden;
		}
	
		.fot-xh .txt .name {
			position: relative;
			display: block;
		}
	
		.fot-xh .txt .name .h3 {
			font-size: 24rpx;
			margin-bottom: 13rpx;
			font-weight: bold;
		}
	
		.fot-xh .txt .name .storeId {
			height: 40rpx;
			line-height: 40rpx;
			font-size: 20rpx;
			width: 330rpx;
			background-size: 100rpx;
			color: rgb(68, 68, 68);
		}
	
		.fot-xh .name::after {
			content: '';
			position: absolute;
			border-top: 4rpx solid rgb(179, 179, 179);
			border-left: 4rpx solid rgb(179, 179, 179);
			width: 14rpx;
			height: 14rpx;
			right: 5rpx;
			top: 30%;
			transform: rotate(135deg);
		}
	
		.m-a1 {
			display: flex;
			justify-content: space-around;
			overflow: hidden;
			padding: 20rpx;
			background-color: #fff;
			margin: 0 60rpx;
			box-shadow: 0rpx 5rpx 16rpx 0rpx rgb(226, 236, 255);
			margin-top: -3.25rem;
			border-radius: 40rpx;
	
		}
		.storeMoney{
			display: flex;
			flex-direction: column;
			text-align: center;
		}
		.money-box{
			display: flex;
			flex-direction: row;
			width: 310px;
			justify-content: space-around;
		}
		.m-a1 .txt {
			overflow: hidden;
		}
	
		.m-a1 .pic {
			float: left;
			margin-right: 0rpx;
		}
	
		.m-a1 text {
			display: block;
			font-size: 24rpx;
			color: rgb(179, 179, 179);
		}
	
		.m-a1 .txt .s1 {
			font-size: 24rpx;
			margin-bottom: 10rpx;
			color: rgb(0, 0, 0);
			font-weight: bold;
		}
	
		.ul-list1-xh {
			overflow: hidden;
			padding: 0 30rpx;
			padding-top: 100rpx;
			padding-bottom: 300rpx;
			padding-bottom: 0.8rem;
		}
	
		.ul-list1-xh .li {
			padding: 20rpx 0;
			overflow: hidden;
			position: relative;
	
		}
	
		.ul-list1-xh .li .pic {
			float: left;
			margin-right: 20rpx;
	
		}
	
		.ul-list1-xh .li .txt {
			overflow: hidden;
			font-size: 24rpx;
			padding-bottom: 20rpx;
			border-bottom: 1px solid rgb(242, 242, 242);
		}
	
		.ul-list1-xh .li::after {
			content: '';
			position: absolute;
			border-top: 3rpx solid rgb(179, 179, 179);
			border-left: 3rpx solid rgb(179, 179, 179);
			width: 12rpx;
			height: 12rpx;
			right: 5rpx;
			top: 30%;
			transform: rotate(135deg);
		}
</style>
