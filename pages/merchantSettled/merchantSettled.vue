<template>
	<view>
		<uv-navbar title="商家入驻" @leftClick="goToIndex"></uv-navbar>
	</view>
	<view style="margin-top: 80rpx;width: 700rpx;height: 10rpx;">
			</view>

	<view class="formInfo">
		<uv-form :model="form"  ref="form">
			<uv-input placeholder="商铺基本信息" border="bottom" disabled="true"></uv-input>
			<uv-form-item label="店铺图片" prop="pics" label-width="180rpx">
				<uv-upload :fileList="merchantList" name="1" multiple :maxCount="9" @afterRead="merchantPicsRead()"
					@delete="deleteMerchantPic" :previewFullImage="true"></uv-upload>
			</uv-form-item>
			<uv-form-item label="营业执照" prop="pics" label-width="180rpx">
				<uv-upload :fileList="licenseList" name="1" multiple :maxCount="9" @afterRead="licensePicsRead()"
					@delete="deleteLicensePic()" :previewFullImage="true"></uv-upload>
			</uv-form-item>
			<uv-form-item label="店铺名称" prop="merchantname" label-width="180rpx">
				<uv-input v-model="form.merchantname" placeholder="请输入店铺名称" />
			</uv-form-item>
			<uv-form-item label="详细地址" prop="merchantAddress" label-width="180rpx">
				<uv-input v-model="form.merchantAddress" placeholder="请输入详细地址" />
			</uv-form-item>
			<uv-form-item label="店铺电话" prop="merchantPhone" label-width="180rpx">
				<uv-input v-model="form.merchantPhone" placeholder="请输入店铺电话" />
			</uv-form-item>
			<uv-input placeholder="负责人信息" border="bottom" disabled="true"></uv-input>
			<uv-form-item label="身份证" prop="pics" label-width="180rpx">
				<uv-upload :fileList="idCardList" name="1" multiple :maxCount="9" @afterRead="idCardPicsRead()"
					@delete="deleteIdCardPic()" :previewFullImage="true"></uv-upload>
				<!-- <uv-upload :fileList="fileList" name="1" multiple :maxCount="9" @afterRead="afterRead"
					@delete="deletePic" :previewFullImage="true"></uv-upload> -->
			</uv-form-item>
			<uv-form-item label="负责人姓名" prop="userName" label-width="180rpx">
				<uv-input v-model="form.userName" placeholder="请输入负责人姓名" />
			</uv-form-item>
			<uv-form-item label="负责人电话" prop="userPhone" label-width="180rpx">
				<uv-input v-model="form.userPhone" placeholder="请输入负责人电话" />
			</uv-form-item>
		</uv-form>
		<uv-button @click="submit" type="primary" customStyle="margin-top: 10px">提交</uv-button>
		<uv-button type="error" text="重置" customStyle="margin-top: 10px"></uv-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				merchantList:[],
				licenseList:[],
				idCardList:[],
				form: {
					merchantName: '',
					merchantAddress:'',
					merchantPhone:'',
					username:'',
					userPhone:'',
					merchantPics:[],
					licensePics:[],
					idCardPics:[]
				},
			}
		},
		methods: {
			goToIndex() {
				uni.switchTab({
					url: '/pages/index/index' // 请替换为实际的页面路径
				});
			},
			submit() {
				this.$refs.form.validate().then(res => {
					uni.showToast({
						icon: 'success',
						title: '校验通过'
					})
				}).catch(errors => {
					uni.showToast({
						icon: 'error',
						title: '校验失败'
					})
				})
			},
			merchantPicsRead(e) {
				// 这里直接模拟上传成功，这里的真实逻辑参考uv-upload组件示例
				setTimeout(() => {
					this.merchantList = [{
						url: 'https://via.placeholder.com/100x100.png/3c9cff'
					}]
					this.form.merchantPics = this.merchantList;
					this.$refs.form.validateField('merchantPics', err => {
						// 处理错误后的逻辑
					})
				})
			},
			licensePicsRead(e) {
				// 这里直接模拟上传成功，这里的真实逻辑参考uv-upload组件示例
				setTimeout(() => {
					this.licenseList = [{
						url: 'https://via.placeholder.com/100x100.png/3c9cff'
					}]
					this.form.licensePics = this.licenseList;
					this.$refs.form.validateField('licensePics', err => {
						// 处理错误后的逻辑
					})
				})
			},
			idCardPicsRead(e) {
				// 这里直接模拟上传成功，这里的真实逻辑参考uv-upload组件示例
				setTimeout(() => {
					this.idCardList = [{
						url: 'https://via.placeholder.com/100x100.png/3c9cff'
					},{
						url: 'https://via.placeholder.com/100x100.png/3c9cff'
					}]
					this.form.idCardPics = this.idCardList;
					this.$refs.form.validateField('idCardPics', err => {
						// 处理错误后的逻辑
					})
				})
			},
			deleteMerchantPic(e) {
				this.merchantList.splice(e.index, 1);
				this.$refs.form.validateField('merchantPics', err => {
					// 处理错误后的逻辑
				})
			},
			deleteLicensePic(e) {
				this.licenseList.splice(e.index, 1);
				this.$refs.form.validateField('licensePics', err => {
					// 处理错误后的逻辑
				})
			},
			deleteIdCardPic(e) {
				this.idCardList.splice(e.index, 1);
				this.$refs.form.validateField('idCardPics', err => {
					// 处理错误后的逻辑
				})
			},
		}
	}
</script>

<style>
	uni-app,
	uni-page,
	uni-page-wrapper,
	uni-page-body {
		display: block;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		background-color: #f9f9f9;
	}
	.formInfo {
		width: 660rpx;
		height: 1400rpx;
		margin: 0 auto;
		border-radius: 25rpx;
		background-color: white;
	}
</style>