import{p as t,a,o as s,b as e,d as r,t as n,v as o}from"./vendor.b010e58d.js";const d={name:"Wrapper",data:()=>({url:void 0}),watch:{$route(){this.get()}},mounted(){this.get()},methods:{get(){let t=this.$route.path,a=location.href;a=a.substr(0,a.indexOf("#")),0===t.indexOf("/")&&a.lastIndexOf("/")===a.length-1&&(t=t.substr(1)),this.url=a+t}}};t("data-v-4b52b908");const l={class:"single-wrapper"},i={class:"nav"},u=o(" Click to open in new tab: "),c=["href"],h=["src"];a(),d.render=function(t,a,o,d,b,f){return s(),e("div",l,[r("div",i,[u,r("a",{href:b.url,target:"_blank"},n(b.url),9,c)]),r("iframe",{class:"shadow",src:b.url},null,8,h)])},d.__scopeId="data-v-4b52b908";export{d as default};