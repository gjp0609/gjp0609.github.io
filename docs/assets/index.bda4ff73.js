import{c as e,p as t,a,h as o,r as n,o as i,b as s,d as l,e as r,w as c,t as m,f as d,n as p,F as h,g as u,i as _,j as f,k as y,l as C,m as k,q as E}from"./vendor.fac4ffae.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const P={},g=function(e,t){return t&&0!==t.length?Promise.all(t.map((e=>{if((e=`./${e}`)in P)return;P[e]=!0;const t=e.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const o=document.createElement("link");return o.rel=t?"stylesheet":"modulepreload",t||(o.as="script",o.crossOrigin=""),o.href=e,document.head.appendChild(o),t?new Promise(((e,t)=>{o.addEventListener("load",e),o.addEventListener("error",t)})):void 0}))).then((()=>e())):e()};const v=Symbol(),T="INCREMENT_COUNT",b="DECREASE_COUNT",I="SET_TOKEN",x=e({state:()=>({count:0,token:""}),mutations:{INCREMENT_COUNT(e){e.count++},DECREASE_COUNT(e){e.count--},SET_TOKEN(e,t){e.token=t.token}}});const D={name:"Layout",data:()=>({screenWidth:document.body.clientWidth,isCollapse:"1"===localStorage.getItem("menuIsCollapse")||!1,routerMap:M,defaultActive:"/",isDark:"1"===localStorage.getItem("themeIsDark")||!1,time:""}),computed:{themeColor(){return this.isDark?{activeTextColor:"#ffd04b",backgroundColor:"#545c64",textColor:"#ffffff"}:{activeTextColor:"#3685d6",backgroundColor:"#dddddd",textColor:"#000000"}},isMobile(){return this.screenWidth<1024}},mounted(){let e=this,t="/index/home";console.log(this.$router.currentRoute.value.fullPath),this.$router.currentRoute.value.fullPath!==t&&(e.defaultActive=this.$router.currentRoute.value.fullPath),this.$router.beforeEach(((a,o,n)=>{e.defaultActive=a.path,a.path===t&&(e.defaultActive="/"),n()})),setInterval((()=>{e.time=o().format("YYYY-MM-DD HH:mm:ss")}),500),window.onresize=()=>(window.screenWidth=document.body.clientWidth,e.screenWidth=window.screenWidth,void console.log(e.screenWidth))},methods:{menuCollapseChange(){this.isCollapse=!this.isCollapse,localStorage.setItem("menuIsCollapse",this.isCollapse?"1":"0")},handleThemeChange(){this.isDark=!this.isDark,localStorage.setItem("themeIsDark",this.isDark?"1":"0")},async copy(){let e=new Blob([this.time],{type:"text/plain"}),t=new ClipboardItem({"text/plain":e});navigator.clipboard.write([t])}}};t("data-v-ffd94f8a");const O={key:0,class:"material-icons"},A={key:0,class:"material-icons"},L={key:0,class:"material-icons"},N={key:0,class:"operations"},R={class:"main"},j={key:0},w=l("span",null,"OnySakura.fun",-1);a(),D.render=function(e,t,a,o,y,C){const k=n("el-menu-item"),E=n("el-sub-menu"),P=n("el-menu"),g=n("router-view");return i(),s("div",{class:p([y.isDark?"dark":"light","layout"])},[l("aside",{class:p([y.isCollapse?"is-collapse":"not-collapse","menu"])},[r(P,{mode:C.isMobile?"horizontal":"vertical",collapse:y.isCollapse,"collapse-transition":!0,"default-active":y.defaultActive,router:!0,"unique-opened":!0,"active-text-color":C.themeColor.activeTextColor,"background-color":C.themeColor.backgroundColor,"text-color":C.themeColor.textColor},{default:c((()=>[(i(!0),s(h,null,u(y.routerMap,(e=>(i(),s(h,null,[e.meta.hidden?d("",!0):(i(),s(h,{key:0},[e.children?(i(),_(E,{key:0,index:e.realPath},{title:c((()=>[e.meta.icon?(i(),s(h,{key:0},["material-icons"===e.meta.icon.type?(i(),s("i",O,m(e.meta.icon.name),1)):d("",!0),"element-ui"===e.meta.icon.type?(i(),s("i",{key:1,class:p(e.meta.icon.name)},null,2)):d("",!0),"element-plus"===e.meta.icon.type?(i(),_(f(e.meta.icon.name),{key:2})):d("",!0)],64)):d("",!0),l("span",null,m(e.meta.name),1)])),default:c((()=>[(i(!0),s(h,null,u(e.children,(t=>(i(),_(k,{key:t.realPath,index:e.realPath+"/"+t.realPath},{default:c((()=>[t.meta.hidden?d("",!0):(i(),s(h,{key:0},[t.meta.icon?(i(),s(h,{key:0},["material-icons"===t.meta.icon.type?(i(),s("i",A,m(t.meta.icon.name),1)):d("",!0),"element-ui"===t.meta.icon.type?(i(),s("i",{key:1,class:p(t.meta.icon.name)},null,2)):d("",!0),"element-plus"===t.meta.icon.type?(i(),_(f(t.meta.icon.name),{key:2})):d("",!0)],64)):d("",!0),l("span",null,m(t.meta.name),1)],64))])),_:2},1032,["index"])))),128))])),_:2},1032,["index"])):(i(),_(k,{key:1,index:e.realPath},{default:c((()=>[e.meta.icon?(i(),s(h,{key:0},["material-icons"===e.meta.icon.type?(i(),s("i",L,m(e.meta.icon.name),1)):d("",!0),"element-ui"===e.meta.icon.type?(i(),s("i",{key:1,class:p(e.meta.icon.name)},null,2)):d("",!0),"element-plus"===e.meta.icon.type?(i(),_(f(e.meta.icon.name),{key:2})):d("",!0)],64)):d("",!0),l("span",null,m(e.meta.name),1)])),_:2},1032,["index"]))],64))],64)))),256))])),_:1},8,["mode","collapse","default-active","active-text-color","background-color","text-color"]),C.isMobile?d("",!0):(i(),s("div",N,[l("i",{class:"material-icons",onClick:t[0]||(t[0]=(...e)=>C.menuCollapseChange&&C.menuCollapseChange(...e))},m(y.isCollapse?"last_page":"first_page"),1),l("i",{class:"material-icons",onClick:t[1]||(t[1]=(...e)=>C.handleThemeChange&&C.handleThemeChange(...e))},m(y.isDark?"brightness_4":"brightness_7"),1)]))],2),l("div",R,[C.isMobile?d("",!0):(i(),s("header",j,[w,l("pre",{class:"time",onClick:t[2]||(t[2]=(...e)=>C.copy&&C.copy(...e))},m(y.time),1)])),l("section",null,[r(g)])])],2)},D.__scopeId="data-v-ffd94f8a";const M=[{path:"/",realPath:"/",component:D,redirect:"/index/home",meta:{name:"Index",icon:{type:"material-icons",name:"home"}}},{path:"/test",realPath:"/test",component:D,meta:{name:"Test",icon:{type:"material-icons",name:"help_outline"}},children:[{path:"notes/:pathMatch(.*)*",realPath:"notes/",component:()=>g((()=>import("./Notes.be4745c4.js")),["assets/Notes.be4745c4.js","assets/Notes.9e8a01d7.css","assets/pangu.5908f136.js","assets/pangu.bfe8b2ab.css","assets/vendor.fac4ffae.js","assets/md5.213c55ad.js"]),meta:{name:"Notes",icon:{type:"element-plus",name:"Notebook"}}},{path:"test",realPath:"test/",component:()=>g((()=>import("./Test.119d5bc0.js")),["assets/Test.119d5bc0.js","assets/Test.62a30d70.css","assets/vendor.fac4ffae.js"]),meta:{name:"TestPage",icon:{type:"material-icons",name:"check_circle_outline"}}},{path:"test2",realPath:"test2/",component:()=>g((()=>import("./Test2.095956d1.js")),["assets/Test2.095956d1.js","assets/Test2.aeece79c.css","assets/vendor.fac4ffae.js"]),meta:{name:"TestPage2",icon:{type:"material-icons",name:"check_circle_outline"}}}]},{path:"/tools",realPath:"/tools",component:D,meta:{name:"Tools",icon:{type:"element-ui",name:"el-icon-s-cooperation"}},children:[{path:"encode",realPath:"encode/",component:()=>g((()=>import("./Encode.7f0035e7.js")),["assets/Encode.7f0035e7.js","assets/Encode.e07c81fb.css","assets/md5.213c55ad.js","assets/vendor.fac4ffae.js","assets/base64.04d59941.js"]),meta:{name:"Encode",icon:{type:"material-icons",name:"font_download"}}},{path:"xml",realPath:"xml/",component:()=>g((()=>import("./Xml.4108005f.js")),["assets/Xml.4108005f.js","assets/Xml.d222515f.css","assets/vendor.fac4ffae.js"]),meta:{name:"Xml",icon:{type:"material-icons",name:"code"}}},{path:"json",realPath:"json/",component:()=>g((()=>import("./Json.ad5280a3.js")),["assets/Json.ad5280a3.js","assets/Json.69ce1c65.css","assets/vendor.fac4ffae.js"]),meta:{name:"Json",icon:{type:"material-icons",name:"code"}}},{path:"pasteBin",realPath:"pasteBin/",component:()=>g((()=>import("./PasteBin.672af88c.js")),["assets/PasteBin.672af88c.js","assets/PasteBin.14641ae2.css","assets/md5.213c55ad.js","assets/vendor.fac4ffae.js","assets/base64.04d59941.js"]),meta:{name:"PasteBin",icon:{type:"element-ui",name:"el-icon-document-copy"}}},{path:"QrCode",realPath:"QrCode/",component:()=>g((()=>import("./QrCode.f6327994.js")),["assets/QrCode.f6327994.js","assets/QrCode.df680f1d.css","assets/vendor.fac4ffae.js"]),meta:{name:"QrCode",icon:{type:"element-ui",name:"el-icon-camera-solid"}}},{path:"ECharts",realPath:"ECharts/",component:()=>g((()=>import("./ECharts.85c4f9f1.js")),["assets/ECharts.85c4f9f1.js","assets/ECharts.f3ffc488.css","assets/vendor.fac4ffae.js"]),meta:{name:"ECharts",icon:{type:"element-ui",name:"el-icon-pie-chart"}}},{path:"notes/:pathMatch(.*)*",realPath:"notes/",component:()=>g((()=>import("./Notes.fd876784.js")),["assets/Notes.fd876784.js","assets/Notes.980f95ee.css","assets/pangu.5908f136.js","assets/pangu.bfe8b2ab.css","assets/vendor.fac4ffae.js","assets/base64.04d59941.js"]),meta:{name:"Notes",icon:{type:"element-plus",name:"Notebook"}}}]}],S=[...M,{path:"/index",component:D,children:[{path:"home",component:()=>g((()=>import("./Home.13ef8b5d.js")),["assets/Home.13ef8b5d.js","assets/Home.0311f7c0.css","assets/vendor.fac4ffae.js"])}]},{path:"/404",component:()=>g((()=>import("./404.78f0b0f0.js")),["assets/404.78f0b0f0.js","assets/404.a752af48.css","assets/vendor.fac4ffae.js"])},{path:"/:pathMatch(.*)*",redirect:"/404"}],V=y({history:C(),routes:S});const W={};t("data-v-8ba2a8f4");const $={class:"index"};a(),W.render=function(e,t){const a=n("router-view");return i(),s("div",$,[r(a)])},W.__scopeId="data-v-8ba2a8f4";const B=g((()=>import("./index.00bea636.js")),["assets/index.00bea636.js","assets/vendor.fac4ffae.js"]),q=k(W),Q=["Notebook"];q.use(E),q.use(x,v),q.use(V),console.log(B),B.then((e=>{console.log(e);for(const t of Q)q.component(t,e[t])})),q.mount("#app");export{b as D,T as I,I as S,x as s};
