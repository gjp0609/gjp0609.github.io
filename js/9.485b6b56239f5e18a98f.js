(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"4iuk":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._v("\n    "+t._s(t.text)+"\n    "),s("el-input",{model:{value:t.param,callback:function(e){t.param=e},expression:"param"}}),t._v(" "),s("el-button",{on:{click:t.testFunc}},[t._v("Test")]),t._v(" "),s("el-button",{on:{click:t.go}},[t._v("go")]),t._v(" "),s("el-timeline",t._l(t.axis,(function(e,i){return s("el-timeline-item",{key:i,attrs:{icon:e.icon,type:e.type,color:e.color,size:e.size,timestamp:e.time}},[t._v("\n      "+t._s(e.content)+"\n    ")])})),1)],1)};i._withStripped=!0;var n=axios.create({baseURL:"https://www.onysakura.com",timeout:5e3});class o{constructor(t,e,s){this.time=t,this.princess=e,this.remark=s}setColor(t){return this.color=t,this}}var c={name:"Xml",data:()=>({param:"",text:"",axis:[]}),computed:{},mounted(){},methods:{testFunc(){let t=this;n.get("/test/get?s="+t.param).then(e=>{t.text=e})},go(){let t=[];t.push(new o("1:06","xxx","click")),t.push(new o("1:03","xxx","click")),this.axis=t,console.log(JSON.stringify(t))}}},a=s("KHd+"),r=Object(a.a)(c,i,[],!1,null,"08b85461",null);r.options.__file="src/views/tools/Pcr.vue";e.default=r.exports}}]);