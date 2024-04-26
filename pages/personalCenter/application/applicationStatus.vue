<template>
	<view>
	  <uv-steps :current="currentStep"   style="margin-top: 20rpx;">
		<uv-steps-item title="已提交"></uv-steps-item>
		<uv-steps-item :error="isOutOfStock" :title = "applicationTitle"></uv-steps-item>
		<uv-steps-item title="审核通过"></uv-steps-item>
	  </uv-steps>
	</view>
	<view class="applicationStatusTitle" v-show="applicationStatus === 0">
		<view>
			<image src="../../../static/personalCenter/applicitionWait.png" class="applicationImg"></image>
		</view>
		您的申请已提交，管理员审核中，请耐心等待！
		<view>
			<uv-popup ref="popup" mode="center">
				<view style="width: 600rpx;">
					<text style="display: block;
							text-align: center;
							width: 300px;
							margin-top: 20px;
							margin-bottom: 50px;
							color: rgb(231 36 36);">
							确认取消申请吗？
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
			</view>
		<uv-button type="error" text="取消申请" v-show="cancellationApplicationBtn" @click="cancellationApplication" style="margin-top: 480rpx;"></uv-button>
	</view>
	
	<view class="applicationStatusTitle" v-show="applicationStatus === 1">
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
	
	
	
	<view class="applicationStatusTitle" v-show="applicationStatus === 2">
		<view>
			<image src="../../../static/personalCenter/applicitionSuccess.png" class="applicationImg"></image>
		</view>
		恭喜你，审核通过了！
	</view>
	
	<view class="applicationStatusTitle" v-show="applicationStatus === 3">
		<view>
			<image src="../../../static/personalCenter/applicitionError.png" class="applicationImg"></image>
		</view>
		已取消申请！
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
				modifyApplicationMsg:"",
				cancellationApplicationBtn:true
			}
		},
		mounted() {
		  // 获取全局变量传递过来的参数信息
		  const applicationMsg = uni.getStorageSync('applicationMsg');
		  this.applicationMsg = applicationMsg;
		  // 使用参数
		  console.log('参数:', applicationMsg);
		  this.applicationStatus = applicationMsg.auditStatus;
		  this.modifyApplicationMsg = applicationMsg.auditSuggestion
		  if(applicationMsg.auditStatus === 1){
			  this.applicationTitle = '驳回修改';
			  this.isOutOfStock = true;
		  }
		  if(applicationMsg.auditStatus === 2){
			  this.currentStep = 3;
		  }
		  if(applicationMsg.auditStatus === 3){
			  this.applicationTitle = '取消申请';
			  this.isOutOfStock = true;
		  }
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
				this.$refs.popup.open();
			},
			close(){
				this.$refs.popup.close();
			},
			//取消申请
			confirm(){
				console.log("退出的逻辑",this.applicationMsg.auditId);
				this.cancellationApplicationBtn = false;
				this.$request(
					"/application/cancellationApplication",
					"GET",
					{auditId: this.applicationMsg.auditId},
				).then(res => {
					console.log("name", res)
					if (res.data.code == 200) {
						this.productList = res.data.data;
						console.log(res.data.data);
					}
				})
				// 使用完参数后清空全局数据
				uni.removeStorageSync('applicationMsg');
				this.$refs.popup.close();
				uni.switchTab({
					// 保留当前页面，跳转到应用内的某个页面
					url: '/pages/personalCenter/personalCenter'
				});
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
