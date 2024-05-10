<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// uni.hideTabBar({})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log("退出了");
			var now = Date.now();
			var expiredTime = now + 30 * 10000; // 过期时间为当前时间的半分钟后
			uni.setStorageSync('userMsgExpiredTime', expiredTime);
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
