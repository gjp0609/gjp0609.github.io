import{_ as c,d,s as t,D as r,b as _,c as i,g as s,w as n,i as u,t as l,a as p,u as a}from"./index.7610d15f.js";const m=d({name:"Test",data(){return{test:1}},computed:{count(){return t.state.count}},mounted(){this.test=t.state.count},methods:{decreaseCount(){t.commit(r)},index(){console.log("test action"),this.$router.push("/index/home")}}}),C={class:"index"},h=a("to index"),f=a("decrease");function x(e,v,k,T,$,b){const o=p("el-button");return _(),i("div",C,[s(o,{onClick:e.index},{default:n(()=>[h]),_:1},8,["onClick"]),s(o,{onClick:e.decreaseCount},{default:n(()=>[f]),_:1},8,["onClick"]),u("span",null,l(e.count),1)])}var E=c(m,[["render",x],["__scopeId","data-v-326b8946"]]);export{E as default};
