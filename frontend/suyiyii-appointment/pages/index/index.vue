<template>
	<view class="content">

		<!-- 问候语 -->
		<view class="hello">
			<view style="font-size: 60rpx; text-align: left;">{{ hello }}</view>
			<view style="font-size: 40rpx;">{{ decodedToken.sub }}</view>

		</view>

		<!-- 通知框 -->
		<uni-card class="card" title="通知" thumbnail="" extra="" note="Tips">
			{{ notification.content }}
		</uni-card>
		<uni-card class="card" title="INFOS ABOUT US" thumbnail="" extra="" note="Tips">
			<!-- <image src="https://via.placeholder.com/150x150.png/3c9cff/fff"></image> -->
			欢迎来到Suyiiyii's Lab —— 在科技领域中，我们是一个充满活力和创新精神的工作室。我们的团队由一群充满热情的专业人士组成，他们擅长在前端、后端和大数据等各个技术领域内提供解决方案。

		</uni-card>

		<uni-card class="card" title="MORE INFO ABOUT DIRECTION" thumbnail="" extra="" note="Tips">
			<ul>
				<li>前端工程师：设计并实现网站的用户界面和交互功能。</li>
				<li>后端工程师：构建服务器逻辑、数据库管理，保证网站运行。</li>
				<li>大数据分析师：分析数据洞察趋势，支持决策，优化策略。</li>
				<li>UI/UX设计师：专注于用户体验和界面设计，提升产品易用性。</li>
				<li>系统架构师：设计系统架构，确保技术方案的可靠性和扩展性。</li>
			</ul>
		</uni-card>

	</view>
</template>

<script>
import {
	BASE_URL
} from '@/config.js';
export default {
	data() {
		return {
			hello: '',
			token: '',
			decodedToken: '',
			notification: {
				'content': '23123',
			},
		}
	},
	onShow() {
		this.hello = this.getGreeting();
		this.read_token();
		this.get_notification();
	},
	methods: {

		read_token() {
			// 读取token方法，更新token变量
			// 如果token不存在，跳转到登录页面
			// 从LocalStorage中读取token

			try {
				let token = uni.getStorageSync('token');
				if (token) {
					this.token = token;
					// 解析token
					let base64Url = token.split('.')[1];
					let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
					let jsonPayload = decodeURIComponent(this.atob(base64).split('').map(function (c) {
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
		get_notification() {
			// 获取通知
			// 从服务器获取通知
			// 更新notification变量
			let url = `${BASE_URL}/notifications`;
			uni.request({
				url: url,
				method: 'GET',
				dataType: 'json',
				header: {
					'Authorization': `Bearer ${this.token}`
				},
				success: res => {
					console.log(res);
					if (res.statusCode == 200) {
						console.log(res);
						this.notification = res.data[0];
					} else {
						// 获取通知失败，提示用户
						this.notification = {
							'content': '获取通知失败'
						};
					}
				},
				fail: (e) => {
					console.log("ERROR")
					console.log(e)
					this.notification = {
						'content': e.errMsg
					};
				}
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