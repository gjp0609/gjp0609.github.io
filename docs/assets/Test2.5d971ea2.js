import{s as t,D as e}from"./index.8afcbf22.js";import{p as s,a,r as o,o as n,b as c,e as d,w as i,d as u,t as r,v as l}from"./vendor.fac4ffae.js";const f={name:"Test",data:()=>({test:1}),computed:{count:()=>t.state.count},mounted(){this.test=t.state.count},methods:{decreaseCount(){t.commit(e)},index(){console.log("test action"),this.$router.push("/index/home")}}};s("data-v-9e6d0c54");const m={class:"index"},p=l("to index"),x=l("decrease");a(),f.render=function(t,e,s,a,l,f){const C=o("el-button");return n(),c("div",m,[d(C,{onClick:f.index},{default:i((()=>[p])),_:1},8,["onClick"]),d(C,{onClick:f.decreaseCount},{default:i((()=>[x])),_:1},8,["onClick"]),u("span",null,r(f.count),1)])},f.__scopeId="data-v-9e6d0c54";export{f as default};
