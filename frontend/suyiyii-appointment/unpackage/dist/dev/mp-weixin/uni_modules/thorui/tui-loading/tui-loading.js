"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../app.js");
const _sfc_main = {
  name: "tuiLoading",
  props: {
    text: {
      type: String,
      default: "正在加载..."
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.text)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-528a3bd9"], ["__file", "C:/Users/suyiiyii/gitee/suyiyii-appointment/fronted/suyiyii-appointment/uni_modules/thorui/tui-loading/tui-loading.vue"]]);
wx.createComponent(Component);
