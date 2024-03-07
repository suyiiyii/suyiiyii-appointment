"use strict";const t=require("../../../../common/vendor.js"),e=require("../../../uv-ui-tools/libs/mixin/mpMixin.js"),i=require("../../../uv-ui-tools/libs/mixin/mixin.js");require("../../../uv-ui-tools/libs/function/index.js"),require("../../../uv-ui-tools/libs/function/test.js"),require("../../../uv-ui-tools/libs/function/digit.js"),require("../../../uv-ui-tools/libs/util/route.js"),require("../../../uv-ui-tools/libs/function/debounce.js"),require("../../../uv-ui-tools/libs/function/throttle.js");const o={name:"uv-list-item",mixins:[e.mpMixin,i.mixin],emits:["click","switchChange"],props:{direction:{type:String,default:"row"},title:{type:String,default:""},note:{type:String,default:""},ellipsis:{type:[Number,String],default:0},disabled:{type:[Boolean,String],default:!1},clickable:{type:Boolean,default:!1},showArrow:{type:[Boolean,String],default:!1},link:{type:[Boolean,String],default:!1},to:{type:String,default:""},showSwitch:{type:[Boolean,String],default:!1},switchChecked:{type:[Boolean,String],default:!1},showBadge:{type:[Boolean,String],default:!1},badge:{type:Object,default:()=>({})},rightText:{type:String,default:""},thumb:{type:String,default:""},thumbSize:{type:String,default:"base"},showExtraIcon:{type:[Boolean,String],default:!1},extraIcon:{type:Object,default:()=>({name:"",color:"#000000",size:20,customPrefix:""})},border:{type:Boolean,default:!1},customStyle:{type:Object,default:()=>({padding:"",backgroundColor:"#FFFFFF"})},keepScrollPosition:{type:Boolean,default:!1}},computed:{directionData(){return this.direction?this.direction:this.parentData.direction?this.parentData.direction:"row"}},watch:{"customStyle.padding":{handler(t){t&&this.setPadding(t)},immediate:!0}},data:()=>({isFirstChild:!1,padding:{top:"",right:"",bottom:"",left:""},parentData:{direction:"row",padding:0}}),created(){this.updateParentData()},mounted(){this.init(),this.list=this.getForm(),this.list&&(this.list.firstChildAppend||(this.list.firstChildAppend=!0,this.isFirstChild=!0))},methods:{init(){this.parent||this.$uv.error("uv-list-item必须搭配uv-list组件使用"),this.$nextTick((()=>{this.padding.top||this.padding.right||this.padding.bottom||this.padding.left||this.setPadding(this.parentData.padding)}))},updateParentData(){this.getParentData("uv-list")},setPadding(t){"number"==typeof t&&(t+="");let e=t.split(" ");if(1===e.length){const t=e[0];this.padding={top:t,right:t,bottom:t,left:t}}else if(2===e.length){const[t,i]=e;this.padding={top:t,right:i,bottom:t,left:i}}else if(4===e.length){const[t,i,o,n]=e;this.padding={top:t,right:i,bottom:o,left:n}}},getForm(t="uniList"){let e=this.$parent,i=e.$options.name;for(;i!==t;){if(e=e.$parent,!e)return!1;i=e.$options.name}return e},onClick(){""===this.to?(this.clickable||this.link)&&this.$emit("click",{data:{}}):this.openPage()},onSwitchChange(t){this.$emit("switchChange",t)},openPage(){-1!==["navigateTo","redirectTo","reLaunch","switchTab"].indexOf(this.link)?this.pageApi(this.link):this.pageApi("navigateTo")},pageApi(e){let i={url:this.to,success:t=>{this.$emit("click",{data:t})},fail:t=>{this.$emit("click",{data:t})}};switch(e){case"navigateTo":default:t.index.navigateTo(i);break;case"redirectTo":t.index.redirectTo(i);break;case"reLaunch":t.index.reLaunch(i);break;case"switchTab":t.index.switchTab(i)}}}};if(!Array){(t.resolveComponent("uv-icon")+t.resolveComponent("uv-badge")+t.resolveComponent("uv-switch"))()}Math||((()=>"../../../uv-icon/components/uv-icon/uv-icon.js")+(()=>"../../../uv-badge/components/uv-badge/uv-badge.js")+(()=>"../../../uv-switch/components/uv-switch/uv-switch.js"))();const n=t._export_sfc(o,[["render",function(e,i,o,n,s,a){return t.e({a:!s.isFirstChild},s.isFirstChild?{}:{b:o.border?1:""},{c:o.thumb},o.thumb?{d:o.thumb,e:t.n("uv-list--"+o.thumbSize)}:o.showExtraIcon?{g:t.p({name:o.extraIcon.icon,customPrefix:o.extraIcon.customPrefix,color:o.extraIcon.color,size:o.extraIcon.size})}:{},{f:o.showExtraIcon,h:o.title},o.title?{i:t.t(o.title),j:t.n(o.ellipsis&&`uv-line-${o.ellipsis}`)}:{},{k:o.note},o.note?{l:t.t(o.note)}:{},{m:o.thumb||o.showExtraIcon||o.showBadge||o.showSwitch?1:"",n:o.rightText||o.showBadge||o.showSwitch},o.rightText||o.showBadge||o.showSwitch?t.e({o:o.rightText},o.rightText?{p:t.t(o.rightText)}:{},{q:o.showBadge},o.showBadge?{r:t.p({show:!!(o.badge.show||o.badge.isDot||o.badge.value),isDot:o.badge.isDot,value:o.badge.value,max:o.badge.max,type:o.badge.type,showZero:o.badge.showZero,bgColor:o.badge.bgColor,color:o.badge.color,shape:o.badge.shape,numberType:o.badge.numberType,inverted:o.badge.inverted,customStyle:"margin-left: 4px;"})}:{},{s:o.showSwitch},o.showSwitch?{t:t.o(a.onSwitchChange),v:t.p({value:o.switchChecked,disabled:o.disabled})}:{},{w:"column"===a.directionData?1:""}):{},{x:o.showArrow||o.link?1:"",y:"column"===a.directionData?1:"",z:s.padding.top,A:s.padding.left,B:s.padding.right,C:s.padding.bottom,D:o.showArrow||o.link},o.showArrow||o.link?{E:t.p({size:"34rpx",color:"#bbb",name:"arrow-right"})}:{},{F:o.disabled?1:"",G:t.s(e.$uv.addStyle(o.customStyle)),H:t.s({"background-color":o.customStyle.backgroundColor?o.customStyle.backgroundColor:"#fff"}),I:!o.clickable&&!o.link||o.disabled||o.showSwitch?"":"uv-list-item--hover",J:t.o(((...t)=>a.onClick&&a.onClick(...t)))})}],["__scopeId","data-v-b0795907"]]);wx.createComponent(n);