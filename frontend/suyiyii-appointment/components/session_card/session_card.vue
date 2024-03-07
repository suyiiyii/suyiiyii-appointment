<template>
	<view>

		<uni-card :title="item.name" thumbnail="" :extra="`${item.registered}/${item.capacity}`" note="Tips">
			<view>
				起始时间：{{ formatTimestamp(item.start_time) }}
				<br>
				结束时间：{{ formatTimestamp(item.end_time) }}
				<br>
				&emsp;&emsp;地点：{{ item.location }}
				<br>
				注意事项：{{ item.tips }}
			</view>
			<!-- <view>{{item.registered}}/{{ item.capacity}} &nbsp;</view> -->

		</uni-card>
	</view>
</template>

<script>
	export default {
		name: "session_card",
		props: {
			item: Object
		},

		data() {
			return {

			};
		},
		methods: {

			formatTimestamp(timestamp) {
				if (timestamp < 10000000000) {
					timestamp *= 1000;
				}
				const date = new Date(timestamp);
				const year = date.getFullYear();
				const month = ("0" + (date.getMonth() + 1)).slice(-2);
				const day = ("0" + date.getDate()).slice(-2);
				const hour = ("0" + date.getHours()).slice(-2);
				const minute = ("0" + date.getMinutes()).slice(-2);
				return `${year}年${month}月${day}日 ${hour}:${minute}`;
			},
		}
	}
</script>

<style>

</style>