"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
const common_assets = require("../../common/assets.js");
const tuiLoading = () => "../../uni_modules/thorui/tui-loading/tui-loading.js";
const _sfc_main = {
  components: {
    tuiLoading
  },
  data() {
    return {
      username: "",
      password: "",
      failmsg: "",
      token: "",
      loading: false
    };
  },
  methods: {
    redirect() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    login(username, password) {
      if (username == "" || password == "") {
        this.failmsg = "请输入用户名和密码";
        this.$refs.input_empty_popup.open("top");
        return;
      }
      let url = `${config.BASE_URL}/users/login`;
      let data = {
        username,
        password
      };
      this.loading = true;
      common_vendor.index.request({
        url,
        method: "POST",
        data,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: (res) => {
          console.log(res);
          if (res.statusCode == 200) {
            common_vendor.index.setStorage({
              key: "token",
              data: res.data.access_token
            });
            this.redirect();
          } else {
            this.failmsg = `登录失败：${res.data.detail}`;
            this.$refs.loginfail_popup.open("top");
          }
          this.loading = false;
        },
        fail: (e) => {
          console.log("ERROR");
          console.log(e);
          this.failmsg = e.errMsg;
          this.$refs.loginfail_popup.open("top");
          this.loading = false;
        }
      });
    },
    register(username, password) {
      if (username == "" || password == "") {
        this.failmsg = "请输入用户名和密码";
        this.$refs.input_empty_popup.open("top");
        return;
      }
      let url = `${config.BASE_URL}/users/register`;
      let data = {
        username,
        password
      };
      this.loading = true;
      common_vendor.index.request({
        url,
        method: "POST",
        dataType: "json",
        data,
        success: (res) => {
          console.log(res);
          if (res.statusCode == 200) {
            this.login(username, password);
          } else {
            this.failmsg = `注册失败：${res.data.detail}`;
            this.$refs.loginfail_popup.open("top");
          }
          this.loading = false;
        },
        fail: (e) => {
          console.log("ERROR");
          console.log(e);
          this.failmsg = e.errMsg;
          this.$refs.loginfail_popup.open("top");
          this.loading = false;
        }
      });
    },
    check_token() {
      common_vendor.index.getStorage({
        key: "token",
        success: ({
          data
        }) => {
          this.token = data;
          console.log(data);
          this.redirect();
        },
        fail: (error) => {
          this.token = "";
        }
      });
    }
  },
  onLoad() {
    this.check_token();
    if (this.token != "") {
      this.redirect();
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_tui_loading2 = common_vendor.resolveComponent("tui-loading");
  (_easycom_uni_easyinput2 + _easycom_uv_button2 + _easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_tui_loading2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_tui_loading = () => "../../uni_modules/thorui/tui-loading/tui-loading.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uv_button + _easycom_uni_popup_message + _easycom_uni_popup + _easycom_tui_loading)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0,
    b: common_vendor.o(($event) => $data.username = $event),
    c: common_vendor.p({
      placeholder: "username",
      modelValue: $data.username
    }),
    d: common_vendor.o(($event) => $data.password = $event),
    e: common_vendor.p({
      placeholder: "passowrd",
      type: "password",
      passwordIcon: true,
      modelValue: $data.password
    }),
    f: common_vendor.o(($event) => {
      $options.login($data.username, $data.password);
    }),
    g: common_vendor.p({
      type: "primary",
      disabled: $data.loading
    }),
    h: common_vendor.o(($event) => {
      $options.register($data.username, $data.password);
    }),
    i: common_vendor.p({
      type: "error",
      message: $data.failmsg,
      duration: 2e3
    }),
    j: common_vendor.sr("loginfail_popup", "e3505e88-4"),
    k: common_vendor.p({
      type: "message"
    }),
    l: common_vendor.p({
      type: "warn",
      message: $data.failmsg,
      duration: 2e3
    }),
    m: common_vendor.sr("input_empty_popup", "e3505e88-6"),
    n: common_vendor.p({
      type: "message"
    }),
    o: $data.loading
  }, $data.loading ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/suyiiyii/gitee/suyiyii-appointment/fronted/suyiyii-appointment/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
