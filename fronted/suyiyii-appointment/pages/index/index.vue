<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>

		<h1>ds</h1>

		<uni-card title="通知" thumbnail="" extra="" note="Tips">
			您暂时没有新消息
		</uni-card>
		<uni-card title="INFOS ABOUT INTERVIEW" thumbnail="" extra="" note="Tips">
			<image src="https://via.placeholder.com/150x150.png/3c9cff/fff"></image>
		</uni-card>

		<uni-card title="MORE INFO ABOUT DIRECTION" thumbnail="" extra="额外信息" note="Tips">
			内容主体，可自定义内容及样式
		</uni-card>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				value6: 0,
			}
		},
		onLoad() {

		},
		methods: {

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

	.logo {
		height: 200rpx;
		width: 200rpx;
		/* margin-top: 200rpx; */
		margin-top: 20rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>