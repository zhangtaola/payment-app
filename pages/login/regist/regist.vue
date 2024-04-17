<template>
	<view class="content">

		<view class="login_from">

			<view class="login_from_input">
				<view class="login_from_name">手机号</view>
				<view class="login_from_fun"><input type="number" placeholder="请输入手机号码" v-model="user.account"></view>
			</view>

			<view class="login_from_input">
				<view class="login_from_name">密码</view>
				<view class="login_from_fun"><input type="text" password="true" placeholder="请输入登录密码" v-model="user.pwd"></view>
			</view>

			<view class="login_from_input">
				<view class="login_from_name">验证码</view>
				<view class="login_from_fun">
					<input style="width: 40%; text-align: left" type="number" maxlength="6" placeholder="验证码" v-model="user.code">
					<label class="regFrom_tom_yzlabel" :style="{ color : QzyzmStare?'#cccccc':'#2ebbfe'}"
						@click="Qzyzm">{{Qztime}}{{Qztext}}</label>
				</view>
			</view>
			<view class="login_from_input">
				<view class="login_from_name">昵称</view>
				<view class="login_from_fun"><input type="test" placeholder="请输入昵称" v-model="user.nickName"></view>
			</view>
			<span class="pwdTips">密码必须至少包含一个字母、一个数字和一个特殊字符，并且长度在8到16个字符之间。</span>



			<view class="login_from_dl">
				<button @click="regist">注册</button>
			</view>

			<view class="logo_xieyi">
				<label @click="moutcl" :class="gouxSta?'cuIcon-squarecheckfill':'cuIcon-square'"></label>
				<view class="logo_text">请勾选并阅读<text>《注册协议》</text>及<text>《隐私协议》</text></view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				gouxSta: false,
				Qztime: '',
				QzyzmStare: false,
				Qztext: '获取验证码',
				user:{
					account:"",
					pwd:"",
					code:"",
					nickName:""
				}
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

			regist() {
				if (this.gouxSta == false) {
					uni.showToast({
						"title": "请阅读并勾选用户协议",
						"icon": 'none'
					})
					
				} else {
					// 密码规则
					const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
					if(passwordRegex.test(this.user.pwd)){
						this.$request("/user/regist","POST",this.user).then(res => {
							console.log(res)
							if(res.data.code == 200){
								uni.showToast({
									"title": "注册成功",
									"icon": 'none'
								})
								uni.navigateBack()
							}else{
								uni.showToast({
									"title": res.data.msg,
									"icon": 'none'
								})
							}
							
						}).catch(err => {
							uni.showToast({
								"title": "服务器出错，请稍后再试 ",
								"icon": 'none'
							})
						})
					}else{
						uni.showToast({
							"title": "密码不符合要求，请重新输入",
							"icon": 'none'
						})
					}
				}
			},

			Qzyzm() {
				var num = 60;
				const rule = /^1[3-9]\d{9}$/
				if(rule.test(this.user.account)){
					if (this.QzyzmStare == false) {
						this.Qztime = '60';
						this.Qztext = 's后重新获取';
						this.QzyzmStare = true;
						var interval = setInterval(() => {
							--this.Qztime
						}, 1000)
						setTimeout(() => {
							clearInterval(interval)
							this.Qztext = '获取验证码'
							this.Qztime = ''
							this.QzyzmStare = false
						}, 60000)
						
							this.$request("/messageCode/send/" + this.user.account + "/interAspect","POST",null).then(res => {
								console.log(res)
								
							}).catch(err => {
								uni.showToast({
									"title": "服务器出错，请稍后再试 ",
									"icon": 'none'
								})
							})
					}
				}else{
					uni.showToast({
						"title": "输入的手机号不规范,请重新输入",
						"icon": "none"
					})
				}
			},
		}
	}
</script>

<style>
	page {
		background: #fff;
	}
	
	.pwdTips{
		margin-top: 20rpx;
		display: inline-block;
		color: #ccc;
	}

	.login_img {
		width: 100%;
		height: auto;
		margin-top: 90upx;
	}

	.login_img image {
		width: 170upx;
		height: 170upx;
		display: block;
		margin: 0px auto;
		border-radius: 50%;
	}

	.login_from {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding: 20upx 8%;
	}

	.login_from_input {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px #eee solid;
		padding: 40upx 0px;
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
		align-items: center;
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
		background: #FF3B00;
		color: #fff;
		border-radius: 50px;
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
		color: #FF3B00;
	}

	.logo_text text {
		color: #FF3B00;
	}

	.getyzm {
		width: 60%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		color: #FF3B00;
	}

	.cuicon {
		font-size: 18px;
	}

	.regFrom_tom_yzlabel {
		width: 60%;
		text-align: right;
	}

	.cuIcon-squarecheckfill {
		background: #FF3B00;
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
