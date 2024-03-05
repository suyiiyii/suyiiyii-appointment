<template>
	<view class="content">
		<h1>这是预约界面</h1>
		<image src="https://via.placeholder.com/400x200.png/3c9cff/fff"></image>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				tabBars: [{
						name: '快来报名',
						id: 'register'
					},
					{
						name:"预约面试",
						id: 'appointment'
					},
					{
						name:"面试签到",
						id: 'checkin'
					},
					{
						name:"进度查看",
						id:'progress'
					},
				],

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>