<template>
	<view>
		<view>
			<uv-navbar title="实名认证" @leftClick="goToPersonalCenter()"></uv-navbar>
		</view>
		<view v-if = "showPage">
			<view style="margin-top: 150rpx;width: 780rpx;height: 10rpx;"></view>
			<uv-input placeholder="请输入姓名" border="bottom" v-model="info.userName"></uv-input>
			<uv-input placeholder="请输入身份证" border="bottom" v-model="info.userIdCard" style="margin-top: 50rpx"></uv-input>
			<uv-button @click="submit" type="error" text="提交" style="margin:auto;margin-top: 50rpx;width: 80%;"></uv-button>
		</view>
		<view v-if = "!showPage" style="margin-top: 300rpx;">
			<h3 style="margin-left: 25%;">您已经实名认证过了哦！</h3>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPage:false,
				info:{
					userName:"",
					userIdCard:"",
					userId:""
				},
				
				goToPersonalCenter() {
					uni.switchTab({
						url: '/pages/personalCenter/personalCenter' // 请替换为实际的页面路径
					});
				},
			}
		},
		mounted() {
			// 从本地获取数据
			var userMsg = uni.getStorageSync('userMsg');
			var userIsAuthentication = userMsg.userIsAuthentication;
			if(userMsg.userAccountType === 0){
				this.showPage = true;
			}else{
				this.showPage = false;
			}
		},
		methods: {
			submit(){
				console.log(this.info);
				// 从本地获取数据
				var userMsg = uni.getStorageSync('userMsg');
				console.log(userMsg);
				this.info.userId = userMsg.userId;
				this.$request(
					"/ocr/certification",
					"POST",
					this.info
				).then(res => {
					if (res.data.code == 200) {
						userMsg.userIsAuthentication = 1;
						uni.setStorageSync('userMsg', userMsg);
						uni.showToast({
							title:"验证成功!"
						})
						uni.switchTab({
							url: '/pages/personalCenter/personalCenter'
						})
					}else{
						uni.showToast({
							title:"验证失败!",
							icon:'error'
						})
					} 
				})
			}
		}
	}
</script>

<style>

</style>