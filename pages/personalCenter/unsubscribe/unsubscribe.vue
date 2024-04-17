<template>
	<view class="box">
		<view class="title">注销须知</view>
		<text>在你提交注销申请之前，请先确认以下信息，以保证你的账号、财产安全：</text>
		<br>
		<view>
			<view style="display: flex;">
				<image src="../../../static/personalCenter/shuzi1.png" class="tipImg"></image>
				<text class="tip">账号处于安全状态</text>
			</view>
			<br>	
			<text class="tellUserMsg">
				账号未发生过被盗、被封等风险，且在最近一个月内没有进行修改密码、换绑手机等敏感信息变更的操作。
			</text>
		</view>
		<view>
			<view style="display: flex;">
				<image src="../../../static/personalCenter/shuzi2.png" class="tipImg"></image>
				<text class="tip">微博支付财产已结清</text>
			</view>
			<br>	
			<text class="tellUserMsg">
				微博钱包内余额、红包已清空，各类微博卡券已清空，与支付宝的绑定关系已解绑。
			</text>
		</view>
		<view>
			<view style="display: flex;">
				<image src="../../../static/personalCenter/shuzi3.png" class="tipImg"></image>
				<text class="tip">其他APP，网站的账号已解绑</text>
			</view>
			<br>	
			<text class="tellUserMsg">
				已解除与第三方账号的绑定关系，如淘宝、微信、QQ、百度、UC浏览器、天翼、360账号等。
			</text>
		</view>
		<view>
			<view style="display: flex;">
				<image src="../../../static/personalCenter/shuzi4.png" class="tipImg"></image>
				<text class="tip">微博账号的站外授权关系已清空</text>
			</view>
			<br>	
			<text class="tellUserMsg">
				已清空对所有第三方APP、网站的授权， 如滴滴出行、今日头条、京东、网易云音乐、大众点评、聚美优品等等。
			</text>
		</view>
		<view>
			<view style="display: flex;">
				<image src="../../../static/personalCenter/shuzi5.png" class="tipImg"></image>
				<text class="tip">开发者权限解除已解除</text>
			</view>
			<br>	
			<text class="tellUserMsg">
				微博开放平台的开发者账号身份与相应权限， 无接入的第三方服务， 如APP、网站、链接等。
			</text>
		</view>
		<uv-button type="error" text="以了解,确认注销" @click="confirmCancellation" style="margin-top: 250rpx;"></uv-button>
			<view>
				<uv-action-sheet 
				ref="actionSheet"
				:actions="popUpWindow" 
				:title= "closeTitle"
				@select="chooseModify"
				@close="close">
				</uv-action-sheet>
			</view>
		<view style="height: 50rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				closeTitle:"确定要注销账号吗？",
				popUpWindow: [{
					name: '确定'
				},{
					name: '取消'
				}],
			}
		},
		methods: {
			chooseModify(e) {
				// console.log('选中该项：', e.name);
				if(e.name === "确定"){
					//这里执行一些注销条件的判断
					this.$request(
						"/user/unsubscribe",
						"GET",
						{ userId: "1" }
						).then(res=>{
						console.log(res)
						if(res.data.code == 200) {
						this.$refs.notify.success ('密码修改成功');
						this.clearFields();
						// 使用 setTimeout 添加延时，单位为毫秒（这里是 2000 毫秒，即 2 秒）
						setTimeout(() => {
						// 跳转到个人中心页面
							uni.switchTab({
							  url: '/pages/personalCenter/personalCenter'
							});
						  }, 2000); // 2秒延时
					  }else if(res.data.code == 201) {
						this.$refs.notify.error('修改失败');
					  }else if(res.data.code == 202){
						this.$refs.notify.error('旧密码输入错误，修改失败');
					  }
					}).catch(err=>{
						console.log(err)
					})
				}
			},
			close() {
				// console.log('关闭');
			},
			confirmCancellation(){
				this.$refs.actionSheet.open();
			}
		}
	}
</script>

<style scoped>
	.box{
		padding: 20rpx;
	}
	 .title{
		 text-align: center;
		 font-weight: 700;
		 margin-top: 20rpx;
		 margin-bottom: 20rpx;
	 }
	 .tip{
		 margin-top: 20rpx;
		 font-weight: 700;
	 }
	 .tellUserMsg{
		 display: inline-block;
		 margin-top: -20rpx;
		 margin-left: 45rpx;
	 }
	 .tipImg{
		 width: 40rpx;
		 height: 40rpx;
		 margin-top: 0.65rem;
		 margin-right: 10rpx;
	 }
</style>
