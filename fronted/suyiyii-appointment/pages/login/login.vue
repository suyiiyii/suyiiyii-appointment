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
				<uni-easyinput class="login_input" v-model="username" placeholder="username" />
			</view>

			<view class="login_input">
				<uni-easyinput v-model="password" placeholder="passowrd" type="password" passwordIcon />
			</view>

			<view class="button_container">
				<uv-button type="primary" @click="login(username, password);" :disabled="loading">Login</uv-button>
				<span style="margin-left: 20rpx;"></span>
				<uv-button style="margin-left: 20rpx;"
					@click="this.$refs.loginfail_popup.open('top')">Register</uv-button>
			</view>
		</view>
		<uni-popup ref="loginfail_popup" type="message">
			<uni-popup-message type="error" :message="failmsg" :duration="2000"></uni-popup-message>
		</uni-popup>

		<uni-popup ref="input_empty_popup" type="message">
			<uni-popup-message type="warn" :message="failmsg" :duration="2000"></uni-popup-message>
		</uni-popup>
		<tui-loading v-if="loading"></tui-loading>





	</view>
</template>

<script>
import tuiLoading from "@/uni_modules/thorui/tui-loading/tui-loading.vue"
import {
	BASE_URL
} from '@/config.js';
export default {
	components: {
		tuiLoading
	},
	data() {
		return {
			username: '',
			password: '',
			failmsg: '',
			token: '',
			loading: false
		}
	},
	methods: {
		redirect() {
			// 跳转到首页
			uni.switchTab({
				url: "/pages/index/index"
			})
		},
		login(username, password) {
			// 登录方法

			if (username == '' || password == '') {
				// 提示用户补全输入
				this.failmsg = '请输入用户名和密码';
				this.$refs.input_empty_popup.open('top');
				return
			}
			// 登录请求
			let url = `${BASE_URL}/users/login`;
			let data = {
				username,
				password
			};
			this.loading = true;
			uni.request({
				url: url,
				method: 'POST',
				dataType: 'json',
				data: data,
				success: res => {
					console.log(res);
					if (res.statusCode == 200) {
						// 登录成功，保存token
						uni.setStorage({
							key: "token",
							data: res.data.token.access_token,
						})
						this.redirect()
					} else {
						// 登录失败，提示用户
						this.failmsg = `登录失败：${res.data.detail}`;
						this.$refs.loginfail_popup.open('top');
					}
					this.loading = false;
				},
				fail: (e) => {
					console.log("ERROR")
					console.log(e)
					this.failmsg = e.errMsg
					this.$refs.loginfail_popup.open('top');
					this.loading = false;
				}

			})
		},
		check_token() {
			// 检查token方法
			let token;
			uni.getStorage({
				key: 'token',
				success: ({
					data
				}) => {
					this.token = data
					console.log(data)
					this.redirect()
				},
				fail: (error) => {
					this.token = ''
				}
			})
		}
	},
	onLoad() {
		this.check_token()
		if (this.token != '') {
			this.redirect()
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