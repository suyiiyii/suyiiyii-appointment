<template>
	<view class="content">
		<!-- <h1>这是预约界面</h1> -->
		<uv-tabs :list='tabBars' @change="switchTab"></uv-tabs>
		<uv-line></uv-line>
		<!-- <image src="https://via.placeholder.com/400x200.png/3c9cff/fff"></image> -->

		<uv-picker ref="picker" :columns="candidates" @confirm="pickerConfirm"></uv-picker>
		<view class="card" v-if="scrollInto == 'register'">
			<uni-card @click="this.$refs.picker.open();">
				<text>{{ choose_way }}</text>
				<text style="text-align: right;"> &gt &nbsp;</text>
			</uni-card>

			<uni-card title="自我介绍">
				<textarea class="card_padding mytextarea" v-model="selfIntro" placeholder="做个自我介绍吧" />
			</uni-card>
			<uni-card title="学习进度">
				<textarea class="card_padding mytextarea" v-model="progress" placeholder="现在学到哪啦" />
				<!-- <textarea value="" placeholder="现在学到哪啦" /> -->
			</uni-card>
			<button type="primary">提交报名</button>
		</view>
		<view class="card" v-if="scrollInto == 'appointment'">
			<view>
				<text class="center_text">当前的可选择的场次</text>
				<uv-modal ref="modal" title="预约确认" content='你要预约这一场面试吗' @confirm="session_register"
					showCancelButton></uv-modal>
				<!-- <button @click="openModal">打开</button> -->
				<view v-for="(item, index) in sessions" :key="index">

					<session_card :item="item" @click="session_click(item.id)"></session_card>

				</view>
			</view>
		</view>
		<view class="card" v-if="scrollInto == 'checkin'">
			<text class="center_text">当前预约的面试</text>
			<session_card :item="registered_session"></session_card>
			<text class="center_text">
				当前状态：{{ session_status }}<br><br>
				排队人数：{{ people_in_line }}</text>
			<button type="default" style="margin-top: 30rpx;">签到</button>
			<button type="default" style="margin-top: 30rpx;">取消签到</button>

		</view>
		<view class="card" v-if="scrollInto == 'progress'">
			<view style="height: 30rpx;"></view>
			<uni-steps :options="progess_show" direction="column" :active="0"></uni-steps>
		</view>

	</view>

</template>

<script>
export default {
	data() {
		return {
			// 标签栏
			tabBars: [{
				name: '快来报名',
				id: 'register',
				isActive: true
			},
			{
				name: "预约面试",
				id: 'appointment',
				isActive: false
			},
			{
				name: "面试签到",
				id: 'checkin',
				isActive: false
			},
			{
				name: "进度查看",
				id: 'progress',
				isActive: false
			},
			],
			//报名
			scrollInto: "register",
			selfIntro: '',
			progress: '',
			choose_way: '选择方向',
			candidates: [
				['前端', '后台', '安卓', '大数据', '区块链']
			],
			//面试报名
			sessions: [{
				'id': 323,
				'name': "XXX面试",
				'start_time': 1709617812,
				'end_time': 1709619812,
				'capacity': 100,
				'registered': 99,
				'location': 'lllllocation',
				'tips': '这是注释'
			}, {
				'id': 323,
				'name': "XXX面试2222",
				'start_time': 1701617812,
				'end_time': 1709119812,
				'capacity': 100000,
				'registered': 99,
				'location': 'llllfasjfoijdsioflocation',
				'tips': '这是注释'
			}],
			session_click_id: -1,
			//面试签到
			registered_session: {
				'id': 323,
				'name': "XXX面试2222",
				'start_time': 1701617812,
				'end_time': 1709119812,
				'capacity': 100000,
				'registered': 99,
				'location': 'llllfasjfoijdsioflocation',
				'tips': '这是注释'
			},
			session_status: "待开始",
			people_in_line: "未入队",
			//进度
			progess_show: [{
				title: '预约面试',
				desc: '2018-11-11'
			}, {
				title: '正式面试',
				desc: '2018-11-12'
			}, {
				title: '第二次面试',
				desc: '2018-11-13'
			}, {
				title: '评审',
				desc: '2018-11-14'
			}]



		}
	},
	methods: {
		//报名
		switchTab(e) {
			console.log(e);
			this.scrollInto = e.id
		},
		pickerConfirm(e) {
			console.log(e)
			this.choose_way = e.value[0]

		},
		//面试
		session_click(id) {
			console.log(id);
			this.session_click_id = id;
			this.$refs.modal.open();
		},
		session_register() {
			console.log(this.session_click_id)
		}

	},
}
</script>

<style>
.mytextarea {
	height: 200rpx;
}

.center_text {
	font-size: 40rpx;
	margin-top: 50rpx;
	display: flex;
	justify-content: center;
}
</style>