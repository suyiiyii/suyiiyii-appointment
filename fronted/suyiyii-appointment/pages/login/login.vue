<template>
	<view class="content">
		<!-- <h1>登录界面</h1> -->

		<view class="logo" style="margin-top: 100rpx;">
			<image src="@/static/logo.png" style="width: 100px; height: 100px;"></image>
		</view>

		<view id="login_box">

			<view class="welcome_info">
				<view>WECLOME TO</view>
				<view style="font-size: 34px;">Suyiiyii's Lab</view>
			</view>
			<view class="login_input">
				<uni-easyinput class="login_input" v-model="username" placeholder="username" focus />
			</view>

			<view class="login_input">
				<uni-easyinput v-model="password" placeholder="passowrd" type="password" passwordIcon />
			</view>

			<view class="button_container">
				<uv-button type="primary" @click="login(username, password);">Login</uv-button>
				<span style="margin-left: 20rpx;"></span>
				<uv-button style="margin-left: 20rpx;" @click="">Register</uv-button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			redirect() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			login(username, password) {

			}
		}
	}
</script>

<style>
	#login_box {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		margin-top: 100rpx;
		width: 500rpx;
	}

	.login_input {
		margin: 10rpx 0;
		width: 100%;
	}

	.button_container {
		margin: 10rpx 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.welcome_info {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		margin: 10rpx;
	}
</style>