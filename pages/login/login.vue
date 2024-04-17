<template>

	<view class="content" v-show="isShwoPwdLogin">
		<view class="login_img">
			<image mode="aspectFill" src="../../static/icon/yonghu.png"></image>
		</view>
		<view class="login_from">
			<view class="login_from_input">
				<view class="login_from_name">账号</view>
				<view class="login_from_fun">
					<input type="number" placeholder="请输入手机号码" v-model="user.account">
				</view>
			</view>

			<view class="login_from_input">
				<view class="login_from_name">密码</view>
				<view class="login_from_fun">
					<input type="text" ref="pwdInput" password="true" placeholder="请输入密码" v-model="user.pwd">
				</view>
			</view>

			<view class="choseContainer">
				<view class="forgetPwd">
					<text @click="forgetPwd()">忘记密码？</text>
				</view>
				<view class="messageLogin">
					<text @click="doMessageLogin()">短信登录</text>
				</view>
			</view>

			<view class="login_from_dl">
				<button @click="denglu">登录</button>
			</view>

			<view class="logo_xieyi">
				<label @click="moutcl" :class="gouxSta?'cuIcon-squarecheckfill':'cuIcon-square'"></label>
				<view class="logo_text">请勾选并阅读<text>《注册协议》</text>及<text>《隐私协议》</text></view>
			</view>
			<view class="logo_xieyi">
				<view class="logo_text">
					没有账号？<text @click="goRegist">去注册</text>
				</view>
			</view>
		</view>
	</view>
	<!-- 短信登录 -->
	<view class="content messageLoginContainer" v-show="isShowMessageCodeLogin">
		<view class="login_img">
			<image mode="aspectFill" src="../../static/icon/yonghu.png"></image>
		</view>
		<view class="login_from">
			<view class="login_from_input">
				<view class="login_from_name">账号</view>
				<view class="login_from_fun"><input type="number" placeholder="请输入手机号码" v-model="user.account"></view>
			</view>
			<view class="login_from_input">
				<uv-toast ref="toast"></uv-toast>
				<uv-code :seconds="seconds" @end="end" @start="start" ref="code" @change="codeChange"></uv-code>
				<uv-button @tap="getCode">{{tips}}</uv-button>
			</view>

			<view class="login_from_input">
				<view class="login_from_name">验证码</view>
				<view class="login_from_fun"><input type="number" password="true" placeholder="请输入短信验证码"
						v-model="user.code"></view>
			</view>
			<view class="choseContainer">
				<view class="forgetPwd">
					<text @click="forgetPwd()">忘记密码？</text>
				</view>
				<view class="pwdLogin">
					<text @click="doPwdLogin()">密码登录</text>
				</view>
			</view>
			<view class="login_from_dl">
				<button @click="denglu">登录</button>
			</view>
			<view class="logo_xieyi">
				<label @click="moutcl" :class="gouxSta?'cuIcon-squarecheckfill':'cuIcon-square'"></label>
				<view class="logo_text">请勾选并阅读<text>《注册协议》</text>及<text>《隐私协议》</text></view>
			</view>
			<view class="logo_xieyi">
				<view class="logo_text">
					没有账号？<text @click="goRegist">去注册</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gouxSta: false,
				tips: '',
				seconds: 60,
				user: {
					account: "",
					pwd: "",
					code: ""
				},
				isShwoPwdLogin: true,
				isShowMessageCodeLogin: false,
				isABC: true,
				loginWay: 0 // 0账号密码登录，1短信验证码登录
			}
		},
		methods: {

			moutcl() {
				if (this.gouxSta == false) {
					this.gouxSta = true
				} else {
					this.gouxSta = false
				}
			},
			denglu() {

				if (this.gouxSta == false) {
					uni.showToast({
						"title": "请阅读并勾选用户协议",
						"icon": 'none'
					})
				} else {
					// 密码规则
					const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
					

					if (this.loginWay == 0) {
						this.$request("/user/accountLogin","POST",this.user).then(res => {
							console.log(res)
							if(res.data.code == 200){
								uni.showToast({
									"title":"登录成功",
									"icon":"none"
								})
								uni.switchTab({
									url: '/pages/index/index'
								})
							}else{
								uni.showToast({
									"title":res.data.msg,
									"icon":"none"
								})
							}
						}).catch(err => {
							uni.showToast({
								"title":"服务器出错，请稍后再试",
								"icon":"none"
							})
						})
					} else {
						this.$request("/user/messageCodeLogin","POST",this.user).then(res => {
							console.log(res)
							if(res.data.code == 200){
								uni.showToast({
									"title":"登录成功",
									"icon":"none"
								})
								uni.switchTab({
									url: '/pages/index/index'
								})
							}
						}).catch(err => {
							uni.showToast({
								"title":"服务器出错，请稍后再试",
								"icon":"none"
							})
						})
					}

				}
			},
			goRegist() {
				console.log("注册")
				uni.navigateTo({
					url: "/pages/login/regist/regist"
				})
			},
			doMessageLogin() {
				console.log("短信登录")
				this.isShwoPwdLogin = false
				this.isShowMessageCodeLogin = true
				this.loginWay = 1
				console.log(this.loginWay)
				this.user.account = ""
				this.user.pwd = ""
				this.user.messageCode = ""
				this.gouxSta = false
			},
			doPwdLogin() {
				console.log("密码登录")
				this.isShowMessageCodeLogin = false
				this.isShwoPwdLogin = true
				this.loginWay = 0
				console.log(this.loginWay)
				this.user.account = ""
				this.user.pwd = ""
				this.user.messageCode = ""
				this.gouxSta = false
			},
			forgetPwd() {
				console.log("忘记密码")
				uni.navigateTo({
					url: "/pages/login/forgetPwd/forgetPwd"
				})
			},
			sendMessage() {
				console.log("发送短信验证码")
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				// 手机号验证规则
				const rule = /^1[3-9]\d{9}$/
				if (rule.test(this.user.account) == true) {
					if (this.$refs.code.canGetCode && this.gouxSta == true) {
						// 模拟向后端请求验证码
						uni.showLoading({
							title: '正在获取验证码'
						})
						setTimeout(() => {
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							uni.showToast({
								"title": "验证码已发送"
							});
							// 通知验证码组件内部开始倒计时
							this.$refs.code.start();
						}, 2000);

						
						this.$request("/messageCode/send/" + this.user.account + "/interAspect","POST",null).then(res => {
							console.log(res)
						}).catch(err => {
							console.log(err)
						})
					} else {
						if (!this.$refs.code.canGetCode) {
							uni.showToast({
								"title": "倒计时结束后再发送"
							})
						} else if (this.gouxSta == false) {
							uni.showToast({
								"title": "请阅读并勾选用户协议",
								"icon": 'none'
							})
						}
					}
				} else {
					uni.showToast({
						"title": "输入的手机号不规范,请重新输入",
						"icon": "none"
					})
				}

			},
			end() {
				uni.showToast({
					"title": "倒计时结束"
				})
			},
			start() {
				uni.showToast({
					"title": "倒计时开始"
				})
			}
		},

	}
</script>

<style scoped>
	.choseContainer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 30rpx;
	}

	page {
		background: #fff;
		font-family: arial, verdana, helvetica, 'PingFang SC', 'HanHei SC', STHeitiSC-Light, Microsoft Yahei, sans-serif;
	}

	.login_img {
		width: 100%;
		height: auto;
		margin-top: 90upx;
	}

	.login_img image {
		width: 200upx;
		height: 200upx;
		display: block;
		margin: 0px auto;
		border-radius: 50%;
	}

	.login_from {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding: 40upx 8%;
		margin-top: 80upx;
	}

	.login_from_input {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px #eee solid;
		padding: 50upx 0px;
		margin: 0px auto;
	}

	.login_from_name {
		width: 20%;
	}

	.login_from_fun {
		width: 80%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.login_from_fun input {
		width: 100%;
		text-align: left;
		font-size: 14px;
	}


	.login_from_dl {
		width: 100%;
		height: 50px;
		line-height: 50px;
		margin-top: 150upx;
	}

	.login_from_dl button {
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #007AFF;
		color: #fff;
		border-radius: 0px;
	}

	.logo_xieyi {
		width: 100%;
		height: 40px;
		line-height: 40px;
		display: flex;
		flex-direction: row;
		margin-top: 30upx;
		align-items: center;
		color: #444;
		font-size: 14px;
		justify-content: center;
	}

	.logo_xieyi label {
		font-size: 18px;
		margin-right: 1%;
		display: block;
		width: 15px;
		height: 15px;
	}

	.cuIcon-squarecheckfill {
		color: #007AFF;
	}

	.logo_text text {
		color: #007AFF;
	}

	.messageLogin text {
		color: #007AFF;
	}

	.forgetPwd text {
		color: #007AFF;
	}

	.pwdLogin text {
		color: #007AFF;
	}

	.cuIcon-squarecheckfill {
		background: #007AFF;
		position: relative;
		border: 2px #ccc solid;
		box-sizing: border-box;
		border-radius: 3px;
	}

	.cuIcon-square {
		background: #fff;
		border: 2px #ccc solid;
		box-sizing: border-box;
		border-radius: 3px;
	}
</style>
