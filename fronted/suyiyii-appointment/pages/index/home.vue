<template>
	<view class="content">
		<h1>这是我的界面</h1>


		<view class="opt">
			<uv-list>

				<uv-list-item title="默认 navigateTo 方式跳转页面" link to="/pages/vue/index/index" border
					@click="($event,1)"></uv-list-item>
				<uv-list-item title="reLaunch 方式跳转页面" link="reLaunch" to="/pages/vue/index/index" border
					@click="($event,1)"></uv-list-item>
				<uv-list-item title="退出登录" clickable show-arrow @click="logout()" border></uv-list-item>
			</uv-list>
		</view>

		<uni-card class="card">
			<text style="width: 70%;">退出登录
				<span style="text-align: right;">></span>
			</text>
		</uni-card>


	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			logout() {
				uni.removeStorageSync('token');
				uni.redirectTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style>
	.opt {
		margin-top: 200rpx;
	}

	.card {

		width: 650rpx;
	}

</style>