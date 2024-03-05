<template>
	<view class="content">

		<!-- 问候语 -->
		<view class="hello">
			<view style="font-size: 60rpx; text-align: left;">{{ hello }}</view>
			<view style="font-size: 40rpx;">{{ decodedToken.sub }}</view>

		</view>

		<!-- 通知框 -->
		<uni-card class="card" title="通知" thumbnail="" extra="" note="Tips">
			您暂时没有新消息
		</uni-card>
		<uni-card class="card" title="INFOS ABOUT INTERVIEW" thumbnail="" extra="" note="Tips">
			<image src="https://via.placeholder.com/150x150.png/3c9cff/fff"></image>
		</uni-card>

		<uni-card class="card" title="MORE INFO ABOUT DIRECTION" thumbnail="" extra="" note="Tips">
			内容主体，可自定义内容及样式
		</uni-card>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				hello: '',
				token: '',
				decodedToken: ''
			}
		},
		onLoad() {
			this.hello = this.getGreeting();
			this.read_token();
		},
		methods: {

			read_token() {
				// 读取token方法，更新token变量
				// 如果token不存在，跳转到登录页面
				// try {
				// 从LocalStorage中读取token

				try {
					let token = uni.getStorageSync('token');
					if (token) {
						this.token = token;
						// 解析token
						let base64Url = token.split('.')[1];
						let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
						let jsonPayload = decodeURIComponent(this.atob(base64).split('').map(function(c) {
							return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
						}).join(''));
						this.decodedToken = JSON.parse(jsonPayload);

						console.log(jsonPayload)
						console.log(this.decodedToken);
						// 如果token过期，跳转到登录页面
						if (this.decodedToken.exp < Date.now() / 1000) {
							this.redirectToLogin();
						}
						console.log('检测到有效token');
					} else {
						this.redirectToLogin();
					}

				} catch (err) {
					console.log(err);
					throw err;
					this.redirectToLogin();
				}
			},
			getGreeting() {
				// 返回当前时间对于的问候语
				const currentHour = new Date().getHours();
				if (currentHour < 12) {
					return '早上好';
				} else if (currentHour < 18) {
					return '下午好';
				} else {
					return '晚上好';
				}
			},
			atob(input) {
				const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
				let str = String(input).replace(/=+$/, '');
				let output = '';

				if (str.length % 4 == 1) {
					throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
				}

				for (let bc = 0, bs, buffer, idx = 0; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 +
						buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
					buffer = chars.indexOf(buffer);
				}

				return output;
			},
			redirectToLogin() {
				console.log('token检查失败，跳转到登录页')
				// 跳转到登录页面
				uni.removeStorageSync("token")
				uni.redirectTo({
					url: '/pages/login/login'
				})
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.card {
		width: 650rpx;
	}

	.hello {
		display: flex;
		margin-top: 40rpx;
		width: 548rpx;
		flex-direction: column;
		align-items: flex-start;
	}
</style>