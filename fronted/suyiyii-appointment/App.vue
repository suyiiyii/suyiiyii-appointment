<script>
	import tuiLoading from "@/uni_modules/thorui/tui-loading/tui-loading.vue"
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */

	.content {
		/* margin-top: 3em; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.card {
		/* display: flex; */
		width: 650rpx;
	}

/* 	.uni-card {
		display: flex;
		justify-content: space-between;
	} */
	.card_padding{
		padding-right: 35rpx;
	}
</style>