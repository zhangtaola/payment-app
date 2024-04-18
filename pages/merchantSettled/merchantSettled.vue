<template>
	<view>
		<uv-navbar title="商家入驻" @leftClick="goToIndex"></uv-navbar>
	</view>
	<view style="margin-top: 80rpx;width: 700rpx;height: 10rpx;">
	</view>

	<view class="formInfo">
		<uv-form :model="form" ref="form">
			<uv-input placeholder="商铺基本信息" border="bottom" :disabled="true" ></uv-input>
			<uv-form-item label="店铺图片" prop="pics" label-width="180rpx">
				<uv-upload :fileList="fileList4" name="4" multiple :maxCount="1" @afterRead="afterRead3"
					@delete="deletePic" style="margin-left: 50rpx;">
				</uv-upload>
			</uv-form-item>
			<uv-form-item label="营业执照" prop="pics" label-width="180rpx">
				<uv-upload :fileList="fileList3" name="3" multiple :maxCount="1" @afterRead="afterRead2"
					@delete="deletePic" style="margin-left: 50rpx;">
				</uv-upload>
			</uv-form-item>
			<uv-form-item label="店铺名称" prop="auditStoreName" label-width="180rpx">
				<uv-input v-model="form.auditStoreName" placeholder="请输入店铺名称" :clearable="true" />
			</uv-form-item>
			<uv-form-item label="详细地址" prop="merchantAddress" label-width="180rpx">
				<uv-input v-model="form.merchantAddress" placeholder="请输入详细地址" :disabled="true" />
			</uv-form-item>
			<uv-form-item label="信用代码" prop="auditStoreNumber" label-width="180rpx">
				<uv-input v-model="form.auditStoreNumber" placeholder="请输入信用代码" :disabled="true" />
			</uv-form-item>
			<uv-input placeholder="负责人信息" border="bottom" :disabled="true" ></uv-input>
			<uv-form-item label="身份证国徽面" prop="pics" label-width="180rpx">
				<uv-upload :fileList="fileList1" name="1" multiple :maxCount="1" @afterRead="afterRead"
					@delete="deletePic" style="margin-left: 50rpx;">
					<image src="https://cdn.uviewui.com/uview/demo/upload/positive.png" mode="widthFix"
						style="width: 230px;height: 150px;"></image>
				</uv-upload>
			</uv-form-item>
			<uv-form-item label="身份证信息面" prop="pics" label-width="180rpx">
				<uv-upload :fileList="fileList2" name="2" multiple :maxCount="1" @afterRead="afterRead"
					@delete="deletePic" style="margin-left: 50rpx;">
					<image src="https://cdn.uviewui.com/uview/demo/upload/positive.png" mode="widthFix"
						style="width: 230px;height: 150px;"></image>
				</uv-upload>
			</uv-form-item>
			<uv-form-item label="负责人姓名" prop="userName" label-width="180rpx">
				<uv-input v-model="form.userName" placeholder="请输入负责人姓名" :disabled="true" />
			</uv-form-item>
			<uv-form-item label="负责人身份证" prop="userIdCard" label-width="180rpx">
				<uv-input v-model="form.userIdCard" placeholder="请输入负责人身份证" :disabled="true" />
			</uv-form-item>
		</uv-form>
		<uv-button @click="submit" type="primary" customStyle="margin-top: 10px">提交</uv-button>
		<!-- <uv-button type="error" text="重置" customStyle="margin-top: 10px"></uv-button> -->
		<uv-notify ref="notify"></uv-notify>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList1: [],
				fileList2: [],
				fileList3: [],
				fileList4: [],
				form: {
					auditStoreName: '',
					merchantAddress: '',
					auditStoreNumber: '',
					username: '',
					userIdCard: '',
					auditStoreHeadImage: '',
					auditStoreIdentifyImage: '',
					auditStoreIdentifyCardFront: '',
					auditStoreIdentifyCardBack: '',
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
				if(this.form.auditStoreHeadImage != '' && this.form.auditStoreIdentifyImage !='' && this.form.auditStoreIdentifyCardFront !='' && this.form.auditStoreIdentifyCardBack != '' ){
					if(this.form.auditStoreName!=''){
						this.$request("/audit/addMerchant", "POST",
							this.form
						).then(res => {
							console.log(res)
						}).catch(err => {
							console.log(err)
						})
					}else{
						this.$refs.notify.error("商铺名不能为空" || '未知错误');
					}
				
				}else{
					this.$refs.notify.error("请将信息补充完整" || '未知错误');
				}
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1);
			},
			// 新增图片
			async afterRead(event) {
				let lists = [].concat(event.file);
				let fileListLen = this[`fileList${event.name}`].length;
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					});
				});
				for (let i = 0; i < lists.length; i++) {
					try {
						const result = await this.uploadFilePromise(lists[i].url);
						let item = this[`fileList${event.name}`][fileListLen];
						this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
							status: 'success',
							message: '',
							url: result.url // 假设result包含URL在url属性中
						}));
						fileListLen++;
					} catch (error) {
						console.error('上传失败', error);
						this.$refs.notify.error('上传失败');
					}
				}
			},
			uploadFilePromise(filePath) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: 'http://127.0.0.1:8080/ocr/idcard', // 示例URL
						filePath: filePath,
						name: 'multipartFile',
						formData: {
							user: 'test'
						},
						success: (res) => {
							let responseData = JSON.parse(res.data);
							console.log(responseData);
							if (responseData.code == 200) {
								// 假设响应格式包括code, msg, 和 data
								this.$refs.notify.success(responseData.msg || '未知错误');
								this.form.userName = responseData.data.idName;
								this.form.userIdCard = responseData.data.idNum;
								this.form.auditStoreIdentifyCardFront = responseData.data
									.idCardFrontUrl;
								resolve(responseData.data); // 用响应中的所需数据解决promise
							} else if (responseData.code == 201) {
								this.form.auditStoreIdentifyCardBack = responseData.data.idCardBackUrl;
								this.$refs.notify.success(responseData.msg || '未知错误');
								resolve(responseData.data);
							} else if (responseData.code == 202) {
								this.$refs.notify.error(responseData.msg || '未知错误');
								reject(new Error(responseData.msg || '上传失败'));
							} else if (responseData.code == 203) {
								this.$refs.notify.error(responseData.msg || '未知错误');
								reject(new Error(responseData.msg || '上传失败'));
							} else if (responseData.code == 204) {
								this.$refs.notify.error(responseData.msg || '未知错误');
								reject(new Error(responseData.msg || '上传失败'));
							}
						},
						fail: (err) => {
							reject(err);
						}
					});
				});
			},
			// 新增图片
			async afterRead2(event) {
				let lists = [].concat(event.file);
				let fileListLen = this[`fileList${event.name}`].length;
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					});
				});
				for (let i = 0; i < lists.length; i++) {
					try {
						const result = await this.uploadFilePromise2(lists[i].url);
						let item = this[`fileList${event.name}`][fileListLen];
						this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
							status: 'success',
							message: '',
							url: result.url // 假设result包含URL在url属性中
						}));
						fileListLen++;
					} catch (error) {
						console.error('上传失败', error);
						this.$refs.notify.error('上传失败');
					}
				}
			},
			uploadFilePromise2(filePath) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: 'http://127.0.0.1:8080/ocr/businessLicense', // 示例URL
						filePath: filePath,
						name: 'multipartFile',
						formData: {
							user: 'test'
						},
						success: (res) => {
							let responseData = JSON.parse(res.data);
							console.log(responseData);
							if (responseData.code == 200) {
								// 假设响应格式包括code, msg, 和 data
								this.form.auditStoreName = responseData.data.businessName;
								this.form.merchantAddress = responseData.data.address;
								this.form.auditStoreNumber = responseData.data.socialCreditCode;
								this.form.auditStoreIdentifyImage = responseData.data.businessUrl;
								resolve(responseData.data); // 用响应中的所需数据解决promise
							} else {
								this.$refs.notify.error(responseData.msg || '未知错误');
								reject(new Error(responseData.msg || '上传失败'));
							}
						},
						fail: (err) => {
							reject(err);
						}
					});
				});
			},
			// 新增图片
			async afterRead3(event) {
				let lists = [].concat(event.file);
				let fileListLen = this[`fileList${event.name}`].length;
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					});
				});
				for (let i = 0; i < lists.length; i++) {
					try {
						const result = await this.uploadFilePromise3(lists[i].url);
						let item = this[`fileList${event.name}`][fileListLen];
						this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
							status: 'success',
							message: '',
							url: result.url // 假设result包含URL在url属性中
						}));
						fileListLen++;
					} catch (error) {
						console.error('上传失败', error);
						this.$refs.notify.error('上传失败');
					}
				}
			},
			uploadFilePromise3(filePath) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: 'http://127.0.0.1:8080/ocr/uploadMerchant', // 示例URL
						filePath: filePath,
						name: 'multipartFile',
						formData: {
							user: 'test'
						},
						success: (res) => {
							let responseData = JSON.parse(res.data);
							console.log(responseData);
							if (responseData.code == 200) {
								// 假设响应格式包括code, msg, 和 data
								this.form.auditStoreHeadImage = responseData.data.storeHeadImageUrl;
								resolve(responseData.data); // 用响应中的所需数据解决promise
							} else {
								this.$refs.notify.error(responseData.msg || '未知错误');
								reject(new Error(responseData.msg || '上传失败'));
							}
						},
						fail: (err) => {
							reject(err);
						}
					});
				});
			},
			// async blobUrlToFile(blobUrl) {
			// 	try {
			// 		// 使用 fetch 获取 Blob 对象
			// 		const response = await fetch(blobUrl);
			// 		const blob = await response.blob();

			// 		// 创建文件对象
			// 		const file = new File([blob], 'filename.png', {
			// 			type: blob.type
			// 		});

			// 		// 返回文件对象
			// 		return file;
			// 	} catch (error) {
			// 		console.error('转换 Blob URL 到文件时出错:', error);
			// 		throw error;
			// 	}
			// },
			// async processBlobUrls(blobUrls) {
			// 	try {
			// 		const files = [];

			// 		// 遍历数组中的每个 Blob URL，并转换为文件对象
			// 		for (const blobUrl of blobUrls) {
			// 			const file = await this.blobUrlToFile(blobUrl);
			// 			files.push(file);
			// 		}

			// 		// 返回文件对象数组
			// 		return files;
			// 	} catch (error) {
			// 		console.error('处理 Blob URL 数组时出错:', error);
			// 		throw error;
			// 	}
			// },

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