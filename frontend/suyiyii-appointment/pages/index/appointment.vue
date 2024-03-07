<template>
	<view class="content">
		<!-- <h1>这是预约界面</h1> -->
		<uv-tabs :list='tabBars' @change="switchTab"></uv-tabs>
		<uv-line></uv-line>
		<!-- <image src="https://via.placeholder.com/400x200.png/3c9cff/fff"></image> -->

		<uv-picker ref="picker" :columns="title_list" @confirm="pickerConfirm"></uv-picker>
		<view class="card" v-if="scrollInto == 'register'">
			<uni-card @click="this.$refs.picker.open();">
				<text>{{ choose_way }}</text>
				<text style="text-align: right;"> &gt &nbsp;</text>
			</uni-card>

			<uni-card title_list="自我介绍">
				<textarea class="card_padding mytextarea" v-model="selfIntro" placeholder="做个自我介绍吧" />
			</uni-card>
			<uni-card title_list="学习进度">
				<textarea class="card_padding mytextarea" v-model="progress" placeholder="现在学到哪啦" />
			</uni-card>
			<button type="primary" @click="submit_application()">{{ button_word }}</button>
		</view>
		<view class="card" v-if="scrollInto == 'appointment'">
			<view>
				<text class="center_text">当前的可选择的场次</text>
				<view class="center_text" v-if="this.button_word != '修改报名信息'">请先报名</view>
				<view v-else>
					<uv-modal ref="modal" title_list="预约确认" content='你要预约这一场面试吗' @confirm="session_register"
						showCancelButton></uv-modal>
					<!-- <button @click="openModal">打开</button> -->
					<view v-for="(item, index) in sessions" :key="index">

						<session_card :item="item" @click="session_click(item.name)"></session_card>
					</view>
				</view>
			</view>
		</view>
		<view class="card" v-if="scrollInto == 'checkin'">
			<text class="center_text">当前预约的面试</text>

			<view v-if="registered_session != []">
				<view v-for="item in registered_session">
					<session_card :item="item"></session_card>
					<text class="center_text">
						当前状态：{{ session_status }}<br><br>
						排队人数：{{ people_in_line }}</text>
					<button type="default" style="margin-top: 30rpx;">签到</button>
					<button type="default" style="margin-top: 20rpx;">取消签到</button>
				</view>
			</view>
			<view v-else>
				<text class="center_text">还没有预约面试</text>
			</view>

		</view>
		<view class="card" v-if="scrollInto == 'progress'">
			<view style="height: 30rpx;"></view>
			<uni-steps :options="progess_show" direction="column" :active="0"></uni-steps>
		</view>


		<uni-popup ref="popup" type="message">
			<uni-popup-message :type="level" :message="msg" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>

</template>

<script>
import {
	BASE_URL
} from '../../config';
export default {
	data() {
		return {
			token: "",
			level: "",
			msg: "",
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
			title_list: [
				['前端', '后台', '安卓', '大数据', '区块链']
			],
			button_word: "提交报名",
			title: "",
			//面试报名
			sessions: [{
				"id": 0,
				"name": "XXXXX面试",
				"start_time": 0,
				"end_time": 0,
				"capacity": 0,
				"registered": 99999,
				"location": "string三都",
				"tips": "string注意事项"
			}, {
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
			session_click_name: -1,
			//面试签到
			registered_session: [{
				'id': 323,
				'name': "XXX面试2222",
				'start_time': 1701617812,
				'end_time': 1709119812,
				'capacity': 100000,
				'registered': 99,
				'location': 'llllfasjfoijdsioflocation',
				'tips': '这是注释'
			}],
			session_status: "待开始",
			people_in_line: "未入队",
			//进度
			progess_show: [{
				title: '预约面试',
				desc: '2024-03-08'
			}, {
				title: '正式面试',
				desc: '0000-00-00'
			}, {
				title: '第二次面试',
				desc: '0000-00-00'
			}, {
				title: '评审',
				desc: '0000-00-00'
			}]



		}
	},
	onShow() {
		this.get_token();
		this.get_application();
		this.get_session();
		this.get_my_session();
	},
	methods: {
		warn(msg) {
			this.level = "warn";
			this.msg = msg;
			this.$refs.popup.open();
		},
		success(msg) {
			this.level = "success";
			this.msg = msg;
			this.$refs.popup.open();
		},
		error(msg) {
			this.level = "error";
			this.msg = msg;
			this.$refs.popup.open();
		},
		get_token() {
			this.token = uni.getStorageSync('token');
		},
		//报名
		switchTab(e) {
			console.log(e);
			this.scrollInto = e.id
		},
		pickerConfirm(e) {
			console.log(e)
			this.choose_way = e.value[0]
			let data = {
				'前端': "frontend",
				'后台': "backend",
				'安卓': "android",
				'大数据': "bigdata",
				'区块链': "blockchain",
			}
			this.title = data[e.value[0]]
			console.log(this.title);

		},
		del_application() {
			return new Promise((resolve, reject) => { // Return a new Promise
				let url = `${BASE_URL}/appointment`
				uni.request({
					url: url,
					method: 'DELETE',
					header: {
						'Authorization': `Bearer ${this.token}`
					},
					success: res => {
						console.log(res);
						if (res.statusCode == 200) {
							this.success("请求成功");
							resolve(res); // Resolve the Promise when the request is successful
						} else {
							this.warn("请求失败");
							reject(res); // Reject the Promise when the request fails
						}
					},
					fail: err => {
						console.error(err);
						reject(err); // Reject the Promise when the request fails
					}
				})
			});
		},
		async submit_application() {
			//检查内容是否填充完毕
			//检查方向选择
			if (this.title == "") {
				this.warn("请选择方向");
				return
			}
			//检查自我介绍
			if (this.selfIntro == "") {
				this.warn("请填写自我介绍");
				return
			}
			//检查学习进度
			if (this.progress == "") {
				this.warn("请填写学习进度");
				return
			}

			if (this.button_word == "修改报名信息") {
				await this.del_application();
			}

			let data = {
				"title": this.title,
				"self_introduction": this.selfIntro,
				"learn_progress": this.progress,
			}
			console.log(data);
			let url = `${BASE_URL}/appointment`
			uni.request({
				url: url,
				method: 'POST',
				data: data,
				header: {
					'Authorization': `Bearer ${this.token}`
				},
				success: res => {
					console.log(res);
					if (res.statusCode == 200) {
						this.success("报名成功");
						this.button_word = "修改报名信息";
					} else {
						this.error("报名失败：" + res.statusCode + res.data.detail);
					}
				},
				fail: (res) => {
					this.error("报名失败：" + res.statusCode + res.data.detail);
				},
				complete: () => { }
			});
		},
		get_application() {
			let url = `${BASE_URL}/appointment`
			uni.request({
				url: url,
				method: 'GET',
				header: {
					'Authorization': `Bearer ${this.token}`
				},
				success: res => {
					console.log(res);
					if (res.statusCode == 200) {
						let table = {
							"frontend": '前端',
							"backend": '后台',
							"android": '安卓',
							"bigdata": '大数据',
							"blockchain": '区块链',
						}
						this.title = res.data.title;
						this.choose_way = table[res.data.title]
						this.selfIntro = res.data.self_introduction;
						this.progress = res.data.learn_progress;
						this.button_word = "修改报名信息";
					} else {
						// this.error("获取失败：" + res.statusCode + res.data.detail);
					}
				},
				fail: (res) => {
					this.error("获取失败：" + res.statusCode + res.data.detail);
				},
				complete: () => { }
			});
		},
		//面试
		session_click(name) {
			console.log(name);
			this.session_click_name = name;
			this.$refs.modal.open();
		},
		session_register() {
			console.log(this.session_click_name)
			let url = `${BASE_URL}/interview/register` + `?session_name=${this.session_click_name}`
			let data = {
				"session_name": this.session_click_name
			}
			uni.request({
				url: url,
				method: 'GET',
				header: {
					'Authorization': `Bearer ${this.token}`
				},
				success: res => {
					console.log(res);
					if (res.statusCode == 200) {
						this.success("报名成功");
						this.get_my_session();
					} else {
						this.error("报名失败：" + res.statusCode + res.data.detail);
					}
				},
				fail: (res) => {
					this.error("报名失败：" + res.statusCode + res.data.detail);
				},
			});

		},
		get_session() {
			let url = `${BASE_URL}/interview`
			uni.request({
				url: url,
				method: 'GET',
				header: {
					'Authorization': `Bearer ${this.token}`
				},
				success: res => {
					console.log(res);
					if (res.statusCode == 200) {
						this.sessions = res.data;
					} else {
						this.error("获取失败：" + res.statusCode + res.data.detail);
					}
				},
				fail: (res) => {
					this.error("获取失败：" + res.statusCode + res.data.detail);
				},
				complete: () => { }
			});
		},
		get_my_session() {
			let url = `${BASE_URL}/interview/by_username`;
			uni.request({
				url: url,
				method: 'GET',
				header: {
					'Authorization': `Bearer ${this.token}`
				},
				success: res => {
					console.log(res);
					if (res.statusCode == 200) {
						this.registered_session = res.data
					} else {
						this.error("获取失败：" + res.statusCode + res.data.detail);
					}
				},
				fail: (res) => {
					this.error("获取失败：" + res.statusCode + res.data.detail);
				},
				complete: () => { }
			});


		},

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