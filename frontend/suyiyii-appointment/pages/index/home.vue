<template>
	<view class="content">
		<!-- <h1>这是我的界面</h1> -->
		<image src="../../static/VIP_header.png" mode="" style="margin-top: 50rpx;"></image>

		<!-- 
		<view class="opt">
			<uv-list>

				<uv-list-item title="默认 navigateTo 方式跳转页面" link to="/pages/vue/index/index" border
					@click="($event,1)"></uv-list-item>
				<uv-list-item title="reLaunch 方式跳转页面" link="reLaunch" to="/pages/vue/index/index" border
					@click="($event,1)"></uv-list-item>
				<uv-list-item title="退出登录" clickable show-arrow border></uv-list-item>
			</uv-list>
		</view> -->

		<uni-card class="card" @click="this.$refs.popup.open();">
			<text>修改密码</text>
			<text style="text-align: right;"> &gt &nbsp;</text>
		</uni-card>


		<uv-popup ref="popup" mode="center" round='20'>
			<view style="width: 600rpx; padding: 30rpx;">

				<text>更改密码</text>
				<view class="login_input">
					<uni-easyinput v-model="old_password" placeholder="请输入旧密码" type="password" passwordIcon />
				</view>

				<view class="login_input">
					<uni-easyinput v-model="password" placeholder="请输入新密码" type="password" passwordIcon />
				</view>
				<button type="primary" size="mini" @click="change_password(old_password, password)">提交</button>
			</view>

			<uni-popup ref="input_empty_popup" type="message">
				<uni-popup-message type="warn" :message="failmsg" :duration="2000"></uni-popup-message>
			</uni-popup>
		</uv-popup>



		<uni-card class="card" @click="personal_info()">
			<text>完善个人信息</text>
			<text style="text-align: right;"> &gt &nbsp;</text>
		</uni-card>

		<uv-toast ref="toast"></uv-toast>


		<uni-card class="card" @click="logout()">
			<text>退出登录</text>
			<text style="text-align: right;"> &gt &nbsp;</text>
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
				old_password: '',
				password: '',
				failmsg: "",
				token: "",
			}
		},
		onShow() {
			this.get_token()
		},
		methods: {
			logout() {
				uni.removeStorageSync('token');
				uni.redirectTo({
					url: '/pages/login/login'
				})
			},
			personal_info(e) {
				this.$refs.toast.show({
					type: 'default',
					title: '默认主题',
					message: "暂时不支持保存个人信息"
				})
			},
			get_token() {
				this.token = uni.getStorageSync('token');
			},
			change_password(old_password, password) {
				let url = `${BASE_URL}/users/change_password`;

				if (old_password == '' || password == '') {
					// 提示用户补全输入
					this.failmsg = '请输入新密码和旧密码';
					this.$refs.input_empty_popup.open('top');
					return
				}
				let data = {
					'oldpassword': old_password,
					'newpassword': password,
				}
				console.log("token:");
				console.log(this.token);
				uni.request({
					url: url,
					method: 'POST',
					data: data,
					header: {
						'Authorization': `Bearer ${this.token}`
					},
					success: (res) => {
						if (res.statusCode == 200) {
							this.$refs.toast.show({
								type: 'success',
								title: '修改成功',
								message: '修改成功'
							})
							this.$refs.popup.close();

						} else {
							this.$refs.toast.show({
								type: 'error',
								title: '修改失败',
								message: '修改失败'
							})
						}
					}

				})
			}
		}
	}
</script>

<style>
	.opt {
		margin-top: 200rpx;
	}

	.login_input {
		margin: 10rpx 0;
		width: 100%;
	}
</style>