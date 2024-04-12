<template>
	<view>
	  <uv-steps :current="currentStep"   style="margin-top: 20rpx;">
		<uv-steps-item title="已提交"></uv-steps-item>
		<uv-steps-item :error="isOutOfStock" :title = "applicationTitle"></uv-steps-item>
		<uv-steps-item title="审核通过"></uv-steps-item>
	  </uv-steps>
	</view>
	<view class="applicationStatusTitle" v-show="applicationStatus === '审核中'">
		<view>
			<image src="../../../static/personalCenter/applicitionWait.png" class="applicationImg"></image>
		</view>
		您的申请已提交，管理员审核中，请耐心等待！
		<uv-button type="error" text="取消申请" @click="cancellationApplication" style="margin-top: 480rpx;"></uv-button>
	</view>
	
	<view class="applicationStatusTitle" v-show="applicationStatus === '审核通过'">
		<view>
			<image src="../../../static/personalCenter/applicitionSuccess.png" class="applicationImg"></image>
		</view>
		恭喜你，审核通过了！
	</view>
	<view class="applicationStatusTitle" v-show="applicationStatus === '审核失败'">
		<view>
			<image src="../../../static/personalCenter/applicitionError.png" class="applicationImg"></image>
		</view>
		<text>
		  抱歉，您的审核未通过，请根据提示进行修改后再次提交！<br>
		  如有疑问，可联系客服电话：404-1234567！
		</text>
		<h4 style="text-align: left;margin-top: 30rpx;margin-bottom: 20rpx;">修改意见：</h4>
		<view>
			<text style="color: red;">{{modifyApplicationMsg}}</text>
		</view>
		<uv-button type="error" text="修改申请" @click="modifyApplication" style="margin-top: 300rpx;"></uv-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentStep: 1, // 审核的进度
				isOutOfStock: false, // 审核是否错误
				applicationTitle:'审核中',
				applicationStatus:'',//审核的状态，用来渲染不同的提示信息
				applicationMsg:'',
				modifyApplicationMsg:"店铺名称错误，资质内容与营业执照冲突"
			}
		},
		mounted() {
		  // 获取全局变量传递过来的参数信息
		  const applicationMsg = uni.getStorageSync('applicationMsg');
		  this.applicationMsg = applicationMsg;
		  // 使用参数
		  console.log('参数:', applicationMsg);
		  this.applicationStatus = applicationMsg.applicationUnit;
		  if(applicationMsg.applicationUnit === '审核失败'){
			  this.applicationTitle = '审核失败';
			  this.isOutOfStock = true;
		  }
		  if(applicationMsg.applicationUnit === '审核通过'){
			  this.currentStep = 3;
		  }
		  
		  // 使用完参数后清空全局数据
		  // uni.removeStorageSync('applicationMsg');
		},
		methods: {
			modifyApplication(){
				//前往修改页面的逻辑
				console.log('参数:', this.applicationMsg);
				uni.switchTab({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/personalCenter/personalCenter'
				})
			},
			cancellationApplication(){
				console.log("取消申请的逻辑代码");
				//取消申请的逻辑代码
				console.log('参数:', this.applicationMsg);
			}
		},

	}
</script>

<style>
	
.applicationStatusTitle{
	text-align: center;
	margin: 300rpx 50rpx 100rpx 50rpx;
}
	
.applicationImg{
	width: 100rpx;
	height: 100rpx;
	margin-bottom: 30rpx;
}
</style>
