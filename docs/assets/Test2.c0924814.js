import{s as t,D as e}from"./index.234c0c24.js";import{p as s,a,r as o,o as n,b as c,e as d,w as i,d as u,t as r,v as l}from"./vendor.fac4ffae.js";const m={name:"Test",data:()=>({test:1}),computed:{count:()=>t.state.count},mounted(){this.test=t.state.count},methods:{decreaseCount(){t.commit(e)},index(){console.log("test action"),this.$router.push("/index/home")}}};s("data-v-9e6d0c54");const f={class:"index"},p=l("to index"),x=l("decrease");a(),m.render=function(t,e,s,a,l,m){const C=o("el-button");return n(),c("div",f,[d(C,{onClick:m.index},{default:i((()=>[p])),_:1},8,["onClick"]),d(C,{onClick:m.decreaseCount},{default:i((()=>[x])),_:1},8,["onClick"]),u("span",null,r(m.count),1)])},m.__scopeId="data-v-9e6d0c54";export{m as default};
