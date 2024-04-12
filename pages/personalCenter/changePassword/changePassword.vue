<template>
	<view class="container">
		<view>
			<uv-form labelPosition="left" :model="passwordInfo" :rules="rules" ref="form">
				<view class="uni-input-input">
					<uv-form-item label="原密码:" prop="pwd" borderBottom >
						<uv-input v-model="passwordInfo.oldPwd" border="none" clearable >
						</uv-input>
					</uv-form-item>
				</view>
				<view class="uni-input-input">
					<uv-form-item label="新密码:" prop="pwd" borderBottom >
						<uv-input v-model="passwordInfo.newPwd" border="none" clearable>
						</uv-input>
					</uv-form-item>
				</view>
				<view class="uni-input-input">
					<uv-form-item label="确认密码:" prop="pwd" borderBottom >
						<uv-input v-model="passwordInfo.confirmPwd" border="none" clearable>
						</uv-input>
					</uv-form-item>
				</view>
				</uv-form>
		</view>
		<uv-button type="error" text="提交修改" @click="submit" style="margin-top: 100rpx;"></uv-button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				passwordInfo:{
					oldPwd:"",
					newPwd:"",
					confirmPwd:"",
				},
				rules: {
					pwd: {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}
				}
			}
		},
		methods: {
			submit() {

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
