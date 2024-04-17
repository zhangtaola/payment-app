<template>
	<view class="container">
		<view>
			<uv-form labelPosition="left" :model="passwordInfo" ref="form">
				<view class="uni-input-input">
					<uv-form-item label="原密码:" prop="pwd" borderBottom >
						<uv-input v-model="passwordInfo.oldPwd" border="none" clearable :password = "true">
						</uv-input>
					</uv-form-item>
				</view>
				<view class="uni-input-input">
					<uv-form-item label="新密码:" prop="pwd" borderBottom >
						<uv-input v-model="passwordInfo.newPwd" border="none" clearable :password = "true">
						</uv-input>
					</uv-form-item>
				</view>
				<view class="uni-input-input">
					<uv-form-item label="确认密码:" prop="pwd" borderBottom >
						<uv-input v-model="passwordInfo.confirmPwd" border="none" clearable :password = "true" style="margin-left: 20rpx;">
						</uv-input>
					</uv-form-item>
				</view>
				</uv-form>
		</view>
		<uv-button type="error" text="提交修改" @click="submit" style="margin-top: 100rpx;"></uv-button>
		<uv-notify ref="notify"></uv-notify>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				passwordInfo:{
					userId:"1",
					oldPwd:"",
					newPwd:"",
					confirmPwd:"",
				},
				rules: {
					pwd: {
						type: 'string',
						required: true,
						message: '请填写密码',
						trigger: ['blur', 'change']
					}
				}
			}
		},
		methods: {
			submit() {
				const { oldPwd, newPwd, confirmPwd } = this.passwordInfo;
				//判断输入框是否为空
				if (oldPwd === "" || newPwd === "" || confirmPwd === "") {
					return this.$refs.notify.warning('请输入完整的信息');
				};
				//判断两次密码是否输入一致
				if(newPwd != confirmPwd){
					return this.$refs.notify.error('两次密码输入不一致');
				};
				//判断旧密码是否和新密码一样，一样就不能修改
				if(newPwd === oldPwd){
					return this.$refs.notify.error('新密码和旧密码不能一样');
				};
				//发送post请求，参数为object
				this.$request(
					"/user/modifyPwd",
					"POST",
					this.passwordInfo,
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
			},
			//清空字段的值，封装起来
			clearFields() {
			  this.passwordInfo.oldPwd = "";
			  this.passwordInfo.newPwd = "";
			  this.passwordInfo.confirmPwd = "";
			}
		}
	}
</script>

<style scoped>
.uni-input-input{
	margin-top: 1rem;
}
.container{
	padding: 50rpx;
	margin-top: 2rem;
}
>>>.uv-form-item__body__left__content__label {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    color: #303133;
    font-size: 15px;
    width: 5rem;
}
>>>.uni-input-input {
    position: relative;
    display: block;
    height: 100%;
    background: none;
    color: inherit;
    opacity: 1;
    font: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    text-align: inherit;
    text-indent: inherit;
    text-transform: inherit;
    text-shadow: inherit;
    margin-left: 1rem;
}
>>>.uv-form-item__body__right__message[data-v-d1e73275] {
    margin-top: -6px;
    line-height: 24px;
    font-size: 12px;
    color: #f56c6c;
    display: inline-block;
    margin-left: 500rpx !important;
}
</style>
