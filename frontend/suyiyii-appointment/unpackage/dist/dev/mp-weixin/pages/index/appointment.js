"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 标签栏
      tabBars: [
        {
          name: "快来报名",
          id: "register",
          isActive: true
        },
        {
          name: "预约面试",
          id: "appointment",
          isActive: false
        },
        {
          name: "面试签到",
          id: "checkin",
          isActive: false
        },
        {
          name: "进度查看",
          id: "progress",
          isActive: false
        }
      ],
      //报名
      scrollInto: "register",
      selfIntro: "",
      progress: "",
      choose_way: "选择方向",
      candidates: [
        ["前端", "后台", "安卓", "大数据", "区块链"]
      ],
      //面试报名
      sessions: [{
        "id": 323,
        "name": "XXX面试",
        "start_time": 1709617812,
        "end_time": 1709619812,
        "capacity": 100,
        "registered": 99,
        "location": "lllllocation",
        "tips": "这是注释"
      }, {
        "id": 323,
        "name": "XXX面试2222",
        "start_time": 1701617812,
        "end_time": 1709119812,
        "capacity": 1e5,
        "registered": 99,
        "location": "llllfasjfoijdsioflocation",
        "tips": "这是注释"
      }],
      session_click_id: -1,
      //面试签到
      registered_session: {
        "id": 323,
        "name": "XXX面试2222",
        "start_time": 1701617812,
        "end_time": 1709119812,
        "capacity": 1e5,
        "registered": 99,
        "location": "llllfasjfoijdsioflocation",
        "tips": "这是注释"
      },
      session_status: "待开始",
      people_in_line: "未入队",
      //进度
      progess_show: [{
        title: "预约面试",
        desc: "2018-11-11"
      }, {
        title: "正式面试",
        desc: "2018-11-12"
      }, {
        title: "第二次面试",
        desc: "2018-11-13"
      }, {
        title: "评审",
        desc: "2018-11-14"
      }]
    };
  },
  methods: {
    //报名
    switchTab(e) {
      console.log(e);
      this.scrollInto = e.id;
    },
    pickerConfirm(e) {
      console.log(e);
      this.choose_way = e.value[0];
    },
    //面试
    session_click(id) {
      console.log(id);
      this.session_click_id = id;
      this.$refs.modal.open();
    },
    session_register() {
      console.log(this.session_click_id);
    }
  }
};
if (!Array) {
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_uv_picker2 = common_vendor.resolveComponent("uv-picker");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uv_modal2 = common_vendor.resolveComponent("uv-modal");
  const _easycom_session_card2 = common_vendor.resolveComponent("session_card");
  const _easycom_uni_steps2 = common_vendor.resolveComponent("uni-steps");
  (_easycom_uv_tabs2 + _easycom_uv_line2 + _easycom_uv_picker2 + _easycom_uni_card2 + _easycom_uv_modal2 + _easycom_session_card2 + _easycom_uni_steps2)();
}
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_line = () => "../../uni_modules/uv-line/components/uv-line/uv-line.js";
const _easycom_uv_picker = () => "../../uni_modules/uv-picker/components/uv-picker/uv-picker.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uv_modal = () => "../../uni_modules/uv-modal/components/uv-modal/uv-modal.js";
const _easycom_session_card = () => "../../components/session_card/session_card.js";
const _easycom_uni_steps = () => "../../uni_modules/uni-steps/components/uni-steps/uni-steps.js";
if (!Math) {
  (_easycom_uv_tabs + _easycom_uv_line + _easycom_uv_picker + _easycom_uni_card + _easycom_uv_modal + _easycom_session_card + _easycom_uni_steps)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.switchTab),
    b: common_vendor.p({
      list: $data.tabBars
    }),
    c: common_vendor.sr("picker", "5a163dca-2"),
    d: common_vendor.o($options.pickerConfirm),
    e: common_vendor.p({
      columns: $data.candidates
    }),
    f: $data.scrollInto == "register"
  }, $data.scrollInto == "register" ? {
    g: common_vendor.t($data.choose_way),
    h: common_vendor.o(($event) => {
      this.$refs.picker.open();
    }),
    i: $data.selfIntro,
    j: common_vendor.o(($event) => $data.selfIntro = $event.detail.value),
    k: common_vendor.p({
      title: "自我介绍"
    }),
    l: $data.progress,
    m: common_vendor.o(($event) => $data.progress = $event.detail.value),
    n: common_vendor.p({
      title: "学习进度"
    })
  } : {}, {
    o: $data.scrollInto == "appointment"
  }, $data.scrollInto == "appointment" ? {
    p: common_vendor.sr("modal", "5a163dca-6"),
    q: common_vendor.o($options.session_register),
    r: common_vendor.p({
      title: "预约确认",
      content: "你要预约这一场面试吗",
      showCancelButton: true
    }),
    s: common_vendor.f($data.sessions, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.session_click(item.id), index),
        b: "5a163dca-7-" + i0,
        c: common_vendor.p({
          item
        }),
        d: index
      };
    })
  } : {}, {
    t: $data.scrollInto == "checkin"
  }, $data.scrollInto == "checkin" ? {
    v: common_vendor.p({
      item: $data.registered_session
    }),
    w: common_vendor.t($data.session_status),
    x: common_vendor.t($data.people_in_line)
  } : {}, {
    y: $data.scrollInto == "progress"
  }, $data.scrollInto == "progress" ? {
    z: common_vendor.p({
      options: $data.progess_show,
      direction: "column",
      active: 0
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/suyiiyii/gitee/suyiyii-appointment/fronted/suyiyii-appointment/pages/index/appointment.vue"]]);
wx.createPage(MiniProgramPage);
