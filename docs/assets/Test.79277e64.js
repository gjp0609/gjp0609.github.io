import{s as t,I as e}from"./index.8afcbf22.js";import{p as n,a as o,r as s,o as a,b as c,e as i,w as d,d as u,t as r,v as m}from"./vendor.fac4ffae.js";const l={name:"Test",data:()=>({test:1}),computed:{count:()=>t.state.count},mounted(){this.test=t.state.count},methods:{incrementCount(){t.commit(e)},index(){console.log("test action"),this.$router.push("/index/home")}}};n("data-v-4e125646");const f={class:"index"},p=m("to index"),x=m("increment");o(),l.render=function(t,e,n,o,m,l){const C=s("el-button");return a(),c("div",f,[i(C,{onClick:l.index},{default:d((()=>[p])),_:1},8,["onClick"]),i(C,{onClick:l.incrementCount},{default:d((()=>[x])),_:1},8,["onClick"]),u("span",null,r(l.count),1)])},l.__scopeId="data-v-4e125646";export{l as default};