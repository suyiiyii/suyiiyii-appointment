"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "session_card",
  props: {
    item: Object
  },
  data() {
    return {};
  },
  methods: {
    formatTimestamp(timestamp) {
      if (timestamp < 1e10) {
        timestamp *= 1e3;
      }
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hour = ("0" + date.getHours()).slice(-2);
      const minute = ("0" + date.getMinutes()).slice(-2);
      return `${year}年${month}月${day}日 ${hour}:${minute}`;
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($options.formatTimestamp($props.item.start_time)),
    b: common_vendor.t($options.formatTimestamp($props.item.end_time)),
    c: common_vendor.t($props.item.location),
    d: common_vendor.t($props.item.tips),
    e: common_vendor.p({
      title: $props.item.name,
      thumbnail: "",
      extra: `${$props.item.registered}/${$props.item.capacity}`,
      note: "Tips"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/suyiiyii/gitee/suyiyii-appointment/fronted/suyiyii-appointment/components/session_card/session_card.vue"]]);
wx.createComponent(Component);
