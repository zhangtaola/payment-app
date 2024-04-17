<template>
	<view>
		<view class="storeMsg-box">
			<view class="title">商户基本信息</view>
			<uv-form labelPosition="left" :model="storeInfo" ref="form">
				<uv-form-item label="商铺名:" prop="name" borderBottom>
					<uv-input v-model="storeInfo.name" border="none" clearable>
					</uv-input>
				</uv-form-item>
				<uv-form-item label="商户号:" prop="name" borderBottom>
					<uv-input v-model="storeInfo.id" border="none" clearable>
					</uv-input>
				</uv-form-item>
				<uv-form-item label="商铺地址:" prop="name" borderBottom>
					<view style="width: 470rpx;margin-left: 140rpx;">
						<uv-textarea
						v-model="storeInfo.addres" 
						placeholder="请输入内容" 
						height = "5rem"
						maxlength = "100"
						></uv-textarea>
					</view>
				</uv-form-item>
				<uv-form-item label="商铺照片:">
				</uv-form-item>
				<uv-upload
					:fileList="fileList1"
					name="1"
					multiple 
					:maxCount="3"
					@afterRead="afterRead" 
					@delete="deletePic" 
					style="margin-left: 50rpx;"
				></uv-upload>
				<uv-form-item label="执照注册号:" prop="name" borderBottom>
					<uv-input v-model="storeInfo.registrationNo" border="none" clearable style="margin-left: 2rem;">
					</uv-input>
				</uv-form-item>
				<uv-form-item label="营业执照:">
				</uv-form-item>
				<uv-upload
					:fileList="fileList1"
					name="1"
					multiple 
					:maxCount="3"
					@afterRead="afterRead" 
					@delete="deletePic" 
					style="margin-left: 50rpx;"
				></uv-upload>
				<view class="submitBtn">
					<uv-button type="primary" text="提交修改" @click="submitStoreMsg"></uv-button>
					<uv-button type="error" text="注销店铺" @click="logOff" style="margin-top: 1rem;"></uv-button>
				</view>
				<view style="height: 50rpx;"></view>
			</uv-form>
		</view>
		
		
		<view class="storeMsg-box">
			<view class="title">店铺账号信息</view>
			<uv-form labelPosition="left" :model="storeInfo" ref="form">
				<uv-form-item label="负责人:" prop="name" borderBottom>
					<uv-input v-model="storeInfo.sonName" border="none" clearable>
					</uv-input>
				</uv-form-item>
				<uv-form-item label="店铺账号:" prop="name" borderBottom>
					<uv-input v-model="storeInfo.sonAccount" border="none" clearable style="margin-left: 0.5rem;">
					</uv-input>
				</uv-form-item>
				<uv-form-item label="店铺密码:" prop="name" borderBottom>
					<uv-input v-model="storeInfo.sonPassword" border="none" clearable :password = "inputTypeIsPwd" style="margin-left: 0.5rem;">
						<template v-slot:suffix>
							<uv-button
								@click="showPassword"
								:text="passwordTitle"
								type="warning"
								style="margin-right: 10rpx;"
							></uv-button>
						</template>
					</uv-input>
				</uv-form-item>
				<view class="submitBtn">
					<uv-button type="primary" text="提交修改" @click="submitSonMsg"></uv-button>
				</view>
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
			</uv-form>
		</view>
		<view style="height: 50rpx;"></view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				storeInfo: {
					name: '幸福刀削面',
					id:"46545646545646546544",
					addres: '香港特别行政区油尖旺区尖沙咀金马伦道22-24号东丽中心',
					sonName:"刘德华",
					sonAccount:18099996932,
					sonPassword:"Zt486453154681",
					registrationNo:911101083066224948
				},
				popUpWindow: [{
					name: '确定'
				},{
					name: '取消'
				}],
				//输入框是否是密码类型
				inputTypeIsPwd:true,
				passwordTitle:"查看密码",
				fileList1: [{
					url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				}],
				closeTitle:"",
				//选择的按钮，总共有三个提交的按钮，0代表是提交店铺修改，1是注销店铺，2是修改子账号
				chooseBtn:0
			}
		},
		methods: {
			// 提交
			submitStoreMsg() {
				this.closeTitle = "确定提交店铺修改吗？"
				this.chooseBtn = 0;
				this.$refs.actionSheet.open();
			},
			logOff(){
				this.closeTitle = "这是一个危险操作，确定要注销店铺吗？";
				this.chooseBtn = 1;
				this.$refs.actionSheet.open();
			},
			submitSonMsg() {
				this.chooseBtn = 2;
				this.closeTitle = "此操作会注销原先账号，要继续吗？"
				this.$refs.actionSheet.open();
			},
			chooseModify(e) {
				console.log(this.chooseBtn);
				console.log('选中该项：', e);
			},
			close() {
				console.log('关闭');
			},
			showPassword(){
				this.inputTypeIsPwd = !this.inputTypeIsPwd;
				if(this.inputTypeIsPwd == false){
					this.passwordTitle = "隐藏密码"
				}else{
					this.passwordTitle = "查看密码"
				}
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					console.log(url);
					let a = uni.uploadFile({
						url: 'http://127.0.0.1:8125/ocr/businessLicense', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							console.log(res);
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
				}
		}
	}
</script>
<style scoped>
	.storeMsg-box{
		margin: 20rpx;
		margin-top: 60rpx;
		box-shadow: 0px 0px 10rpx black;
		border-radius: 20rpx;
	}
	.title{
		font-size: 1.40625rem;
		display: inline-block;
		background: #dadada;
		width: 100%;
		text-align: center;
		line-height: 70px;
	}
	>>>.uv-form-item__body__left__content__label{
	    display: flex;
	    flex-direction: row;
	    flex: 1;
	    color: #303133;
	    font-size: 35rpx;
	    align-items: center;
	    width: 200rpx;
		margin-left: 50rpx;
	}
	>>>.uv-input__content__field-wrapper{
	    position: relative;
	    display: flex;
	    flex-direction: row;
	    margin: 0;
	    flex: 1;
	    margin-left: 100rpx;
	}
	>>>.uni-input-wrapper, .uni-input-form {
	    display: flex;
	    position: relative;
	    width: 100%;
	    height: 100%;
	    flex-direction: column;
	    justify-content: center;
	    font-size: 35rpx;
	}
	>>>.uv-form-item[data-v-d1e73275] {
	    display: flex;
	    flex-direction: column;
	    font-size: 14px;
	    color: #303133;
	    margin-top: 25rpx;
	}
	.submitBtn{
		margin-top: 2rem;
		width: 13rem;
		margin-left: 4.7rem;
	}
</style>