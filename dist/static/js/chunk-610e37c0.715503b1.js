(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-610e37c0"],{"0317":function(t,e,a){"use strict";a("5747")},"163b":function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("9861");function n(t,e,a){var n=e||"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",o=a||"".concat(Date.now(),".xlsx"),i=new Blob([t],{type:n}),l=document.createElement("a"),r=window.URL.createObjectURL(i);l.href=r,l.download=o,document.body.appendChild(l),l.click(),document.body.removeChild(l),window.URL.revokeObjectURL(r)}},"333d":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[a("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},o=[];a("a9e3");Math.easeInOutQuad=function(t,e,a,n){return t/=n/2,t<1?a/2*t*t+e:(t--,-a/2*(t*(t-2)-1)+e)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function l(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(t,e,a){var n=r(),o=t-n,s=20,c=0;e="undefined"===typeof e?500:e;var u=function t(){c+=s;var r=Math.easeInOutQuad(c,n,o,e);l(r),c<e?i(t):a&&"function"===typeof a&&a()};u()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},per_page:{type:Number,default:10},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.per_page},set:function(t){this.$emit("update:per_page",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,per_page:t}),this.autoScroll&&s(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,per_page:this.pageSize}),this.autoScroll&&s(0,800)}}},u=c,d=(a("ef8b"),a("2877")),p=Object(d["a"])(u,n,o,!1,null,"29d0d71e",null);e["a"]=p.exports},5747:function(t,e,a){},"622d":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"filter-container",staticStyle:{display:"inline"}},[a("el-select",{staticClass:"filter-item",staticStyle:{width:"130px","margin-right":"10px"},attrs:{placeholder:"搜索字段",clearable:""},model:{value:t.col,callback:function(e){t.col=e},expression:"col"}},t._l(t.cols,(function(t){return a("el-option",{key:t.key,attrs:{label:t.name,value:t.key}})})),1),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-right":"10px"},attrs:{placeholder:"输入搜索内容"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.val,callback:function(e){t.val=e},expression:"val"}}),t.status.length>0?a("el-select",{staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{placeholder:"状态",clearable:""},model:{value:t.sta,callback:function(e){t.sta=e},expression:"sta"}},t._l(t.status,(function(t){return a("el-option",{key:t.key,attrs:{label:t.name,value:t.key}})})),1):t._e(),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v(" 搜索 ")])],1)},o=[],i={name:"QueryCol",props:{filter_col:{type:String},filter_val:{type:String},filter_status:{type:String},cols:{type:Array,default:function(){return[]}},status:{type:Array,default:function(){return[]}}},data:function(){return{col:this.filter_col,val:this.filter_val,sta:this.filter_status}},created:function(){},methods:{search:function(){var t={col:this.col,val:this.val,sta:this.sta};this.$emit("handleFilter",t)}}},l=i,r=(a("0317"),a("2877")),s=Object(r["a"])(l,n,o,!1,null,null,null);e["a"]=s.exports},"707c":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("QueryCol",{attrs:{status:t.status,cols:t.cols,filter_col:t.listQuery.filter_col,filter_status:t.listQuery.filter_status,filter_val:t.listQuery.filter_val},on:{handleFilter:t.handleFilter}}),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px","margin-bottom":"25px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.openDialogForm}},[t._v(" 增加 ")]),a("el-button",{staticStyle:{margin:"0 0 20px 20px"},attrs:{loading:t.downloadLoading,type:"primary",icon:"el-icon-document"},on:{click:t.handleDownload}},[t._v(" 导出excel ")]),a("el-table",{staticStyle:{width:"100%","max-width":"1600px"},attrs:{data:t.list,border:"",fit:"",stripe:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"序号",prop:"id",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",[t._v(t._s(n.id))])]}}])}),a("el-table-column",{attrs:{label:"项目编号",prop:"id",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",[t._v(t._s(n.project_no))])]}}])}),a("el-table-column",{attrs:{label:"项目名称",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",{staticClass:"link-type"},[t._v(t._s(n.name))])]}}])}),a("el-table-column",{attrs:{label:"客户名",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",{staticClass:"link-type"},[t._v(t._s(n.customer_name))])]}}])}),a("el-table-column",{attrs:{label:"需求产品",width:"200",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",{staticClass:"link-type"},[t._v(t._s(n.product_name))])]}}])}),a("el-table-column",{attrs:{label:"创建人",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",[t._v(t._s(n.user.username?n.user.username:""))])]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return["continue"==n.status?a("span",{staticStyle:{"margin-right":"10px"}},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.showDetailDialog(n)}}},[t._v(" 详情 ")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.showCloseDialog("add",n)}}},[t._v(" 关闭丢单 ")]),"published"!=n.status?a("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(e){return t.handleModifyStatus(n.id,"finish")}}},[t._v(" 关闭拿单 ")]):t._e()],1):t._e(),"cancel"==n.status?a("el-button",{attrs:{size:"mini",type:"info"},on:{click:function(e){return t.showCloseDialog("detail",n)}}},[t._v(" 丢单原因 ")]):t._e(),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(e){return t.deleteData(n)}}},[t._v(" 删除 ")])]}}])}),a("el-table-column",{attrs:{label:"状态",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("el-tag",{attrs:{type:t._f("statusMap")(n.status)}},[t._v(" "+t._s(n.status_cn)+" ")])]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,per_page:t.listQuery.per_page},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:per_page":function(e){return t.$set(t.listQuery,"per_page",e)},pagination:t.getList}}),a("el-dialog",{attrs:{title:"detail"==t.action?"详情":"新增项目",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:t.rules,model:t.tmp,"label-position":"left","label-width":"110px"}},[a("el-form-item",{attrs:{label:"项目编号",prop:"project_no"}},[a("el-input",{attrs:{disabled:"detail"==t.action},model:{value:t.tmp.project_no,callback:function(e){t.$set(t.tmp,"project_no",e)},expression:"tmp.project_no"}})],1),a("el-form-item",{attrs:{label:"项目名称",prop:"name"}},[a("el-input",{attrs:{disabled:"detail"==t.action},model:{value:t.tmp.name,callback:function(e){t.$set(t.tmp,"name",e)},expression:"tmp.name"}})],1),a("el-form-item",{attrs:{label:"客户名",prop:"customer_name"}},[a("el-input",{attrs:{disabled:"detail"==t.action},model:{value:t.tmp.customer_name,callback:function(e){t.$set(t.tmp,"customer_name",e)},expression:"tmp.customer_name"}})],1),a("el-form-item",{attrs:{label:"需求产品",prop:"product_name"}},[a("el-input",{attrs:{disabled:"detail"==t.action},model:{value:t.tmp.product_name,callback:function(e){t.$set(t.tmp,"product_name",e)},expression:"tmp.product_name"}})],1),a("el-form-item",{attrs:{label:"项目节点",prop:"product_time"}},[a("el-date-picker",{attrs:{type:"monthrange","range-separator":"至","start-placeholder":"开始月份","end-placeholder":"结束月份","value-format":"yyyy-MM",disabled:"detail"==t.action},model:{value:t.tmp.project_time,callback:function(e){t.$set(t.tmp,"project_time",e)},expression:"tmp.project_time"}})],1),a("el-form-item",{attrs:{label:"项目预估金额",prop:"cost"}},[a("el-input",{attrs:{disabled:"detail"==t.action},model:{value:t.tmp.cost,callback:function(e){t.$set(t.tmp,"cost",e)},expression:"tmp.cost"}})],1),a("el-form-item",{attrs:{label:"竞品信息"}},[a("el-input",{attrs:{type:"textarea",rows:4,disabled:"detail"==t.action},model:{value:t.tmp.compare_info,callback:function(e){t.$set(t.tmp,"compare_info",e)},expression:"tmp.compare_info"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v(" 取消 ")]),a("el-button",{attrs:{type:"primary",disabled:"detail"==t.action},on:{click:function(e){return t.createData()}}},[t._v(" 确认 ")])],1)],1),a("el-dialog",{attrs:{title:"关闭丢单原因",visible:t.showCloseReasonDialog,width:"30%"},on:{"update:visible":function(e){t.showCloseReasonDialog=e}}},[a("el-form",{ref:"closeForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{model:t.closeForm,"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"丢单原因"}},[a("el-input",{attrs:{disabled:"detail"==t.showCloseReasonAction,type:"textarea",rows:4},model:{value:t.closeForm.close_reason,callback:function(e){t.$set(t.closeForm,"close_reason",e)},expression:"closeForm.close_reason"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cancelCloseReasonDialog}},[t._v(" 取消 ")]),a("el-button",{attrs:{type:"primary",disabled:"detail"==t.showCloseReasonAction},on:{click:function(e){return t.handleModifyStatus(t.close_row_id,"cancel")}}},[t._v(" 确认 ")])],1)],1)],1)},o=[],i=(a("d3b7"),a("e9c4"),a("b775"));function l(t){return Object(i["a"])({url:"/api/projects",method:"get",params:t})}function r(t){return Object(i["a"])({url:"/api/projects",method:"post",data:t})}function s(t,e){return Object(i["a"])({url:"/api/projects/".concat(t,"/status"),method:"patch",data:e})}function c(t){return Object(i["a"])({url:"/api/projects/".concat(t),method:"delete"})}function u(t){return Object(i["a"])({url:"/api/projects/download",method:"get",params:t,responseType:"blob"})}var d=a("333d"),p=a("622d"),m=a("163b"),f={name:"ProjectIndex",components:{Pagination:d["a"],QueryCol:p["a"]},filters:{statusMap:function(t){var e={continue:"success",cancel:"danger",finish:"info"};return e[t]}},data:function(){return{list:null,total:0,action:"add",downloadLoading:!1,showCloseReasonDialog:!1,showCloseReasonAction:"add",closeForm:{close_reason:""},close_row_id:0,cols:[{key:"id",name:"编号"},{key:"name",name:"项目名称"},{key:"customer_name",name:"客户名"},{key:"product_name",name:"需求产品"},{key:"user.filter_name",name:"创建人"}],status:[{key:"continue",name:"进行中"},{key:"cancel",name:"关闭丢单"},{key:"finish",name:"关闭拿单"}],listQuery:{page:1,per_page:10,filter_status:"",filter_col:"",filter_val:""},tmp:{name:"",product_name:"",customer_name:"",project_time:[],cost:"",compare_info:"",project_no:""},dialogFormVisible:!1,rules:{project_no:[{required:!0,message:"请填写项目编号",trigger:"blur"}],name:[{required:!0,message:"请填写项目名称",trigger:"blur"}],product_name:[{required:!0,message:"请填写需求产品",trigger:"blur"}],customer_name:[{required:!0,message:"请填写客户名称",trigger:"blur"}]}}},created:function(){this.getList()},methods:{handleDownload:function(){var t=this;this.downloadLoading=!0,u(this.listQuery).then((function(t){var e="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",a="项目列表".concat(Date.now(),".xlsx");Object(m["a"])(t,e,a)})).finally((function(){t.downloadLoading=!1}))},getList:function(){var t=this;return l(this.listQuery).then((function(e){t.list=e.data,t.total=e.total}))},handleFilter:function(t){this.listQuery.page=1,this.listQuery.filter_col=t.col?t.col:"",this.listQuery.filter_val=t.val?t.val:"",this.listQuery.filter_status=t.sta?t.sta:"",this.getList()},openDialogForm:function(){var t=this;this.dialogFormVisible=!0,this.action="add",this.$nextTick((function(){t.tmp={name:"",product_name:"",customer_name:"",project_time:[],cost:"",compare_info:"",project_no:""}}))},handleModifyStatus:function(t,e){var a=this,n={status:e,close_reason:this.closeForm.close_reason};s(t,n).then((function(t){"cancel"==e&&(a.$refs["closeForm"].resetFields(),a.showCloseReasonAction="add",a.showCloseReasonDialog=!1),a.retrieve()}))},createData:function(){var t=this;this.$refs["dataForm"].validate((function(e){e&&r(t.tmp).then((function(){t.getList().then((function(e){t.dialogFormVisible=!1,t.$refs["dataForm"].resetFields(),t.retrieve()}))}))}))},deleteData:function(t){var e=this;c(t.id).then((function(t){e.retrieve()}))},showDetailDialog:function(t){var e=this;this.dialogFormVisible=!0,this.action="detail",this.$nextTick((function(){e.tmp=JSON.parse(JSON.stringify(t))}))},showCloseDialog:function(t,e){this.close_row_id=e.id,this.showCloseReasonDialog=!0,this.showCloseReasonAction=t,this.closeForm.close_reason="detail"==t?e.close_reason:""},cancelCloseReasonDialog:function(){this.close_row_id=0,this.showCloseReasonDialog=!1,this.$refs["closeForm"].resetFields()},retrieve:function(){var t=this;this.getList().then((function(e){t.dialogFormVisible=!1,t.$notify({title:"Success",message:"操作成功",type:"success",duration:2e3})}))}}},h=f,g=(a("7c88"),a("2877")),_=Object(g["a"])(h,n,o,!1,null,null,null);e["default"]=_.exports},"7c88":function(t,e,a){"use strict";a("aab3")},aab3:function(t,e,a){},e9c4:function(t,e,a){var n=a("23e7"),o=a("d066"),i=a("d039"),l=o("JSON","stringify"),r=/[\uD800-\uDFFF]/g,s=/^[\uD800-\uDBFF]$/,c=/^[\uDC00-\uDFFF]$/,u=function(t,e,a){var n=a.charAt(e-1),o=a.charAt(e+1);return s.test(t)&&!c.test(o)||c.test(t)&&!s.test(n)?"\\u"+t.charCodeAt(0).toString(16):t},d=i((function(){return'"\\udf06\\ud834"'!==l("\udf06\ud834")||'"\\udead"'!==l("\udead")}));l&&n({target:"JSON",stat:!0,forced:d},{stringify:function(t,e,a){var n=l.apply(null,arguments);return"string"==typeof n?n.replace(r,u):n}})},ef8b:function(t,e,a){"use strict";a("f943")},f943:function(t,e,a){}}]);