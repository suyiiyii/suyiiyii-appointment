import{A as t,B as e,C as o,q as n,o as i,c as s,w as a,i as r,a as l,b as c,t as d,r as f,z as h}from"./index-263af25a.js";import{_ as g}from"./uni-card.36441325.js";import{_ as p,r as u}from"./uni-app.es.486b01af.js";import{B as T}from"./config.dccd11fd.js";const m=p({data:()=>({hello:"",token:"",decodedToken:"",notification:{content:"23123"}}),onShow(){this.hello=this.getGreeting(),this.read_token(),this.get_notification()},methods:{read_token(){try{let e=t("token");if(e){this.token=e;let t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),o=decodeURIComponent(this.atob(t).split("").map((function(t){return"%"+("00"+t.charCodeAt(0).toString(16)).slice(-2)})).join(""));this.decodedToken=JSON.parse(o),console.log(o),console.log(this.decodedToken),this.decodedToken.exp<Date.now()/1e3&&this.redirectToLogin(),console.log("检测到有效token")}else this.redirectToLogin()}catch(e){throw console.log(e),e}},getGreeting(){const t=(new Date).getHours();return t<12?"早上好":t<18?"下午好":"晚上好"},atob(t){let e=String(t).replace(/=+$/,""),o="";if(e.length%4==1)throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");for(let n,i,s=0,a=0;i=e.charAt(a++);~i&&(n=s%4?64*n+i:i,s++%4)?o+=String.fromCharCode(255&n>>(-2*s&6)):0)i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(i);return o},redirectToLogin(){console.log("token检查失败，跳转到登录页"),e("token"),o({url:"/pages/login/login"})},get_notification(){n({url:`${T}/notifications`,method:"GET",dataType:"json",header:{Authorization:`Bearer ${this.token}`},success:t=>{console.log(t),200==t.statusCode?(console.log(t),this.notification=t.data[0]):this.notification={content:"获取通知失败"}},fail:t=>{console.log("ERROR"),console.log(t),this.notification={content:t.errMsg}}})}}},[["render",function(t,e,o,n,p,T){const m=r,_=u(f("uni-card"),g),k=h;return i(),s(m,{class:"content"},{default:a((()=>[l(m,{class:"hello"},{default:a((()=>[l(m,{style:{"font-size":"60rpx","text-align":"left"}},{default:a((()=>[c(d(p.hello),1)])),_:1}),l(m,{style:{"font-size":"40rpx"}},{default:a((()=>[c(d(p.decodedToken.sub),1)])),_:1})])),_:1}),l(_,{class:"card",title:"通知",thumbnail:"",extra:"",note:"Tips"},{default:a((()=>[c(d(p.notification.content),1)])),_:1}),l(_,{class:"card",title:"INFOS ABOUT INTERVIEW",thumbnail:"",extra:"",note:"Tips"},{default:a((()=>[l(k,{src:"https://via.placeholder.com/150x150.png/3c9cff/fff"})])),_:1}),l(_,{class:"card",title:"MORE INFO ABOUT DIRECTION",thumbnail:"",extra:"",note:"Tips"},{default:a((()=>[c(" 内容主体，可自定义内容及样式 ")])),_:1})])),_:1})}],["__scopeId","data-v-0183ff32"]]);export{m as default};