<template>
	<view>
		<view class="input-box">
			<view class="title">意见反馈</view>
			<uv-textarea 
			count
			v-model="value" 
			placeholder="您的反馈对我们非常重要,请在此输入!" 
			height = "10rem"
			maxlength = "200"
			></uv-textarea>
		</view>
		<view>
			<uv-button type="warning" text="提交反馈" @click="submit" style="width: 660rpx;margin: auto;margin-top: 200rpx;"></uv-button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				value: ''
			}
		},
		methods:{
			submit(){
				console.log(this.value);
			}
		}
	}
</script>
<style scoped>
	.input-box{
		margin: 0.7rem;
		box-shadow: 0px 0px 5px black;
		padding: 0.5rem;
		margin-top: 3rem;
		border-radius: 1rem;
	}
	.input-box .title{
		margin-top: 0.2rem;
		margin-bottom: 1rem;
		font-size: 1.2rem;
		color: #6189ad;
	}
</style>