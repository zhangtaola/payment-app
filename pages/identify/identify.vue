<template>
	<view>
		<view>
			<uv-navbar title="实名认证" @leftClick="goToPersonalCenter()"></uv-navbar>
		</view>
		<view style="margin-top: 80rpx;width: 780rpx;height: 10rpx;"></view>
		<uv-input placeholder="请输入姓名" border="bottom" ></uv-input>
		<uv-input placeholder="请输入身份证" border="bottom" ></uv-input>
		<uv-button type="error" size="small" text="大小尺寸"></uv-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goToPersonalCenter() {
					uni.switchTab({
						url: '/pages/personalCenter/personalCenter' // 请替换为实际的页面路径
					});
				},
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
