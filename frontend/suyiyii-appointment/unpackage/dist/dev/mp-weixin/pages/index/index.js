"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
const _sfc_main = {
  data() {
    return {
      hello: "",
      token: "",
      decodedToken: "",
      notification: {
        "content": "23123"
      }
    };
  },
  onShow() {
    this.hello = this.getGreeting();
    this.read_token();
    this.get_notification();
  },
  methods: {
    read_token() {
      try {
        let token = common_vendor.index.getStorageSync("token");
        if (token) {
          this.token = token;
          let base64Url = token.split(".")[1];
          let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          let jsonPayload = decodeURIComponent(this.atob(base64).split("").map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(""));
          this.decodedToken = JSON.parse(jsonPayload);
          console.log(jsonPayload);
          console.log(this.decodedToken);
          if (this.decodedToken.exp < Date.now() / 1e3) {
            this.redirectToLogin();
          }
          console.log("检测到有效token");
        } else {
          this.redirectToLogin();
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    getGreeting() {
      const currentHour = (/* @__PURE__ */ new Date()).getHours();
      if (currentHour < 12) {
        return "早上好";
      } else if (currentHour < 18) {
        return "下午好";
      } else {
        return "晚上好";
      }
    },
    atob(input) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      let str = String(input).replace(/=+$/, "");
      let output = "";
      if (str.length % 4 == 1) {
        throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
      }
      for (let bc = 0, bs, buffer, idx = 0; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
        buffer = chars.indexOf(buffer);
      }
      return output;
    },
    redirectToLogin() {
      console.log("token检查失败，跳转到登录页");
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    },
    get_notification() {
      let url = `${config.BASE_URL}/notifications`;
      common_vendor.index.request({
        url,
        method: "GET",
        dataType: "json",
        header: {
          "Authorization": `Bearer ${this.token}`
        },
        success: (res) => {
          console.log(res);
          if (res.statusCode == 200) {
            console.log(res);
            this.notification = res.data[0];
          } else {
            this.notification = {
              "content": "获取通知失败"
            };
          }
        },
        fail: (e) => {
          console.log("ERROR");
          console.log(e);
          this.notification = {
            "content": e.errMsg
          };
        }
      });
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
    a: common_vendor.t($data.hello),
    b: common_vendor.t($data.decodedToken.sub),
    c: common_vendor.t($data.notification.content),
    d: common_vendor.p({
      title: "通知",
      thumbnail: "",
      extra: "",
      note: "Tips"
    }),
    e: common_vendor.p({
      title: "INFOS ABOUT INTERVIEW",
      thumbnail: "",
      extra: "",
      note: "Tips"
    }),
    f: common_vendor.p({
      title: "MORE INFO ABOUT DIRECTION",
      thumbnail: "",
      extra: "",
      note: "Tips"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/suyiiyii/gitee/suyiyii-appointment/fronted/suyiyii-appointment/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
