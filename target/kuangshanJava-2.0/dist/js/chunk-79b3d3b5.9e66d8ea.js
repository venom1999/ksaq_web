(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-79b3d3b5"],{"2b19":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-container",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[i("el-header",{attrs:{height:"48px"}},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",[i("a",{attrs:{href:e.url1}},[e._v("区域风险统计分析")])]),i("el-breadcrumb-item",[i("a",{attrs:{href:e.url2}},[e._v("部门风险对比分析")])]),i("el-breadcrumb-item",[e._v("安全风险管控打印")])],1)],1),i("div",{staticClass:"wrapper"},[i("div",{staticClass:"content"},[i("div",{staticClass:"section"},[i("el-collapse",{attrs:{value:["1","2","3"]}},[i("el-collapse-item",{attrs:{title:"危险源分级管控清单",name:"1"}},[i("el-button",{attrs:{type:"primary"},on:{click:e.exportSectionLevel}},[e._v("导出")])],1),i("el-collapse-item",{attrs:{title:"分公司危险源分级控制点汇总明细表",name:"2"}},[i("el-select",{model:{value:e.section2,callback:function(t){e.section2=t},expression:"section2"}},e._l(e.sectionList,function(e,t){return i("el-option",{key:t,attrs:{value:e.sectionID,label:e.sectionName}})}),1),i("el-button",{staticStyle:{"margin-left":"2em"},attrs:{type:"primary"},on:{click:e.exportSectionToDanger}},[e._v("导出")])],1),i("el-collapse-item",{attrs:{title:"分公司岗位风险辨识与评价表",name:"3"}},[i("el-select",{model:{value:e.section3,callback:function(t){e.section3=t},expression:"section3"}},e._l(e.sectionList,function(e,t){return i("el-option",{key:t,attrs:{value:e.sectionID,label:e.sectionName}})}),1),i("el-button",{staticStyle:{"margin-left":"2em"},attrs:{type:"primary"},on:{click:e.exportSectionToEvaluation}},[e._v("导出")])],1)],1)],1)])])],1)},s=[],o=i("d257"),a={name:"App",data:function(){return{loading:!1,sectionList:[],section2:null,section3:null,url1:o["b"]+"/riskcontrol/RiskAnalysis/RegionalRiskAssessment",url2:o["b"]+"/riskcontrol/RiskAnalysis/DepartmentRiskAssessment"}},computed:{},methods:{exportSectionLevel:function(){o["c"].formSubmit(o["a"].SECTION_PARTITION+"/export-section-level")},exportSectionToDanger:function(){this.section2?o["c"].formSubmit(o["a"].SECTION_PARTITION+"/export-section-to-danger",{sectionID1:this.section2}):this.$message.warning("请先选择要导出的分公司单元")},exportSectionToEvaluation:function(){this.section3?o["c"].formSubmit(o["a"].SECTION_PARTITION+"/export-section-to-evaluation",{sectionID1:this.section3}):this.$message.warning("请先选择要导出的分公司单元")}},created:function(){var e=this;this.loading=!0,o["c"].get(o["a"].SECTION_IDENT+"/all-section").then(function(t){e.loading=!1,e.sectionList=t.list.filter(function(e){return 1===e.level&&!e.archivedTime})})}},l=a,c=(i("7396"),i("2877")),r=Object(c["a"])(l,n,s,!1,null,"36392f32",null);t["default"]=r.exports},7396:function(e,t,i){"use strict";var n=i("ecf5"),s=i.n(n);s.a},ecf5:function(e,t,i){}}]);