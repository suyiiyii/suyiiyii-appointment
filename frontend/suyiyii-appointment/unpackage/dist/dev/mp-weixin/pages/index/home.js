"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      old_password: "",
      password: ""
    };
  },
  methods: {
    logout() {
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    },
    personal_info(e) {
      this.$refs.toast.show({
        type: "default",
        title: "默认主题",
        message: "暂时不支持保存个人信息"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uv_popup2 = common_vendor.resolveComponent("uv-popup");
  const _easycom_uv_toast2 = common_vendor.resolveComponent("uv-toast");
  (_easycom_uni_card2 + _easycom_uni_easyinput2 + _easycom_uv_popup2 + _easycom_uv_toast2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uv_popup = () => "../../uni_modules/uv-popup/components/uv-popup/uv-popup.js";
const _easycom_uv_toast = () => "../../uni_modules/uv-toast/components/uv-toast/uv-toast.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_easyinput + _easycom_uv_popup + _easycom_uv_toast)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => {
      this.$refs.popup.open();
    }),
    b: common_vendor.o(($event) => $data.old_password = $event),
    c: common_vendor.p({
      placeholder: "请输入旧密码",
      type: "password",
      passwordIcon: true,
      modelValue: $data.old_password
    }),
    d: common_vendor.o(($event) => $data.password = $event),
    e: common_vendor.p({
      placeholder: "请输入新密码",
      type: "password",
      passwordIcon: true,
      modelValue: $data.password
    }),
    f: common_vendor.sr("popup", "3b60e3da-1"),
    g: common_vendor.p({
      mode: "center",
      round: "20"
    }),
    h: common_vendor.o(($event) => $options.personal_info()),
    i: common_vendor.sr("toast", "3b60e3da-5"),
    j: common_vendor.o(($event) => $options.logout())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/suyiiyii/gitee/suyiyii-appointment/fronted/suyiyii-appointment/pages/index/home.vue"]]);
wx.createPage(MiniProgramPage);
