(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0389a88c"],{"0317":function(t,e,a){"use strict";a("5747")},"163b":function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("9861");function i(t,e,a){var i=e||"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",l=a||"".concat(Date.now(),".xlsx"),n=new Blob([t],{type:i}),s=document.createElement("a"),r=window.URL.createObjectURL(n);s.href=r,s.download=l,document.body.appendChild(s),s.click(),document.body.removeChild(s),window.URL.revokeObjectURL(r)}},"333d":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[a("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},l=[];a("a9e3");Math.easeInOutQuad=function(t,e,a,i){return t/=i/2,t<1?a/2*t*t+e:(t--,-a/2*(t*(t-2)-1)+e)};var n=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function s(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function o(t,e,a){var i=r(),l=t-i,o=20,c=0;e="undefined"===typeof e?500:e;var u=function t(){c+=o;var r=Math.easeInOutQuad(c,i,l,e);s(r),c<e?n(t):a&&"function"===typeof a&&a()};u()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},per_page:{type:Number,default:10},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.per_page},set:function(t){this.$emit("update:per_page",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,per_page:t}),this.autoScroll&&o(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,per_page:this.pageSize}),this.autoScroll&&o(0,800)}}},u=c,p=(a("ef8b"),a("2877")),d=Object(p["a"])(u,i,l,!1,null,"29d0d71e",null);e["a"]=d.exports},"3e84":function(t,e,a){"use strict";a("55c8")},"4bff":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("QueryCol",{attrs:{status:t.statusOptions,cols:t.cols,filter_col:t.listQuery.filter_col,filter_status:t.listQuery.filter_status,filter_val:t.listQuery.filter_val},on:{handleFilter:t.handleFilter}}),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px","margin-bottom":"25px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:function(e){return t.showDialog("add")}}},[t._v(" 增加 ")]),a("el-button",{staticStyle:{margin:"0 0 20px 20px"},attrs:{loading:t.downloadLoading,type:"primary",icon:"el-icon-document"},on:{click:t.handleDownload}},[t._v(" 导出excel ")]),a("el-table",{staticStyle:{width:"100%","max-width":"1600px"},attrs:{data:t.list,border:"",fit:"",stripe:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"序号",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(i.id))])]}}])}),a("el-table-column",{attrs:{label:"项目编号",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(i.project_no))])]}}])}),a("el-table-column",{attrs:{label:"客户名称",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(i.customer_name))])]}}])}),a("el-table-column",{attrs:{label:"产品类型",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return t._l(i.product_type_arr,(function(e){return a("span",{key:e,staticStyle:{display:"block"}},[t._v(t._s(e))])}))}}])}),a("el-table-column",{attrs:{label:"希望货期",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(i.expect_time))])]}}])}),a("el-table-column",{attrs:{label:"附件",align:"center",width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return t._l(i.uploads,(function(e){return a("div",{key:e.name},[a("span",[t._v(t._s(e.name))]),a("el-link",{attrs:{underline:!1,icon:"el-icon-download",href:e.url,type:"primary",download:""}},[t._v("下载")])],1)}))}}])}),a("el-table-column",{attrs:{label:"创建人",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(i.user.username))])]}}])}),a("el-table-column",{attrs:{label:"创建时间",align:"center",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(i.created_at))])]}}])}),a("el-table-column",{attrs:{label:"应用条件",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(e){return t.showDialog("detail",i)}}},[t._v(" 查看 ")])]}}])}),a("el-table-column",{attrs:{label:"处理人",align:"center",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(i.handler.username))])]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return["open"==i.status||"return"==i.status?a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(e){return t.publish(i)}}},[t._v(" 发布 ")]):t._e(),"open"==i.status||"return"==i.status?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.showDialog("update",i)}}},[t._v(" 修改 ")]):t._e()]}}])}),a("el-table-column",{attrs:{label:"状态",width:"90",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("el-tag",{attrs:{type:t._f("statusMap")(i.status)},on:{click:function(e){return t.showStatus(i)}}},[t._v(" "+t._s(i.status_cn)+" ")])]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,per_page:t.listQuery.per_page},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:per_page":function(e){return t.$set(t.listQuery,"per_page",e)},pagination:t.getList}}),a("el-dialog",{attrs:{title:t.actions[t.dialogAction],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"1200px","min-width":"1200px",height:"800px","margin-left":"50px"},attrs:{model:t.tmp,"label-position":"left","label-width":"140px",rules:t.rules}},[a("el-form-item",{attrs:{label:"项目编号",prop:"project_no"}},[a("el-input",{staticClass:"small_input",attrs:{disabled:t.editable[t.dialogAction]},model:{value:t.tmp.project_no,callback:function(e){t.$set(t.tmp,"project_no",e)},expression:"tmp.project_no"}})],1),a("el-form-item",{attrs:{label:"产品类型",prop:"product_type"}},[a("el-select",{attrs:{multiple:"",disabled:t.editable[t.dialogAction],placeholder:"请选择"},model:{value:t.tmp.product_type,callback:function(e){t.$set(t.tmp,"product_type",e)},expression:"tmp.product_type"}},t._l(t.product_types,(function(t){return a("el-option",{key:t.key,attrs:{label:t.key,value:t.val}})})),1)],1),a("el-form-item",{attrs:{label:"希望货期",prop:"expect_time"}},[a("el-input",{staticClass:"small_input",attrs:{disabled:t.editable[t.dialogAction]},model:{value:t.tmp.expect_time,callback:function(e){t.$set(t.tmp,"expect_time",e)},expression:"tmp.expect_time"}})],1),a("label",{staticClass:"el-form-item__label",staticStyle:{width:"700px","font-size":"20px","margin-bottom":"10px",display:"block"}},[t._v("应用条件:")]),a("div",{staticStyle:{height:"400px",width:"800px"}},[a("el-form-item",{staticClass:"small_input",attrs:{label:"设备名称",prop:"device_name"}},[a("el-input",{staticClass:"input_val",attrs:{disabled:t.editable[t.dialogAction]},model:{value:t.tmp.device_name,callback:function(e){t.$set(t.tmp,"device_name",e)},expression:"tmp.device_name"}})],1),a("el-form-item",{staticClass:"small_input small_input_right",attrs:{label:"轴1直径及公差",prop:"shaft_one_diameter_tolerance"}},[a("el-input",{staticClass:"input_val",attrs:{disabled:t.editable[t.dialogAction]},model:{value:t.tmp.shaft_one_diameter_tolerance,callback:function(e){t.$set(t.tmp,"shaft_one_diameter_tolerance",e)},expression:"tmp.shaft_one_diameter_tolerance"}})],1),a("el-form-item",{staticClass:"small_input ",attrs:{label:"驱动类型",prop:"driver_type"}},[a("el-input",{staticClass:"input_val",attrs:{disabled:t.editable[t.dialogAction]},model:{value:t.tmp.driver_type,callback:function(e){t.$set(t.tmp,"driver_type",e)},expression:"tmp.driver_type"}})],1),a("el-form-item",{staticClass:"small_input  small_input_right",attrs:{label:"轴2直径及公差",prop:"shaft_two_diameter_tolerance"}},[a("el-input",{staticClass:"input_val",attrs:{disabled:t.editable[t.dialogAction]},model:{value:t.tmp.shaft_two_diameter_tolerance,callback:function(e){t.$set(t.tmp,"shaft_two_diameter_tolerance",e)},expression:"tmp.shaft_two_diameter_tolerance"}})],1),a("el-form-item",{staticClass:"small_input ",attrs:{label:"驱动功率",prop:"driver_power"}},[a("el-input",{staticClass:"input_val",attrs:{disabled:t.editable[t.dialogAction]},model:{value:t.tmp.driver_power,callback:function(e){t.$set(t.tmp,"driver_power",e)},expression:"tmp.driver_power"}})],1),a("el-form-item",{staticClass:"small_input small_input_right",attrs:{label:"轴1配合段长度",prop:"shaft_one_match_distance"}},[a("el-input",{staticClass:"input_val",attrs:{disabled:t.editable[t.dialogAction]},model:{value:t.tmp.shaft_one_match_distance,callback:function(e){t.$set(t.tmp,"shaft_one_match_distance",e)},expression:"tmp.shaft_one_match_distance"}})],1),a("el-form-item",{staticClass:"small_input",attrs:{label:"使用转速",prop:"rpm"}},[a("el-input",{staticClass:"input_val",attrs:{disabled:t.editable[t.dialogAction]},model:{value:t.tmp.rpm,callback:function(e){t.$set(t.tmp,"rpm",e)},expression:"tmp.rpm"}})],1),a("el-form-item",{staticClass:"small_input small_input_right",attrs:{label:"轴2配合段长度",prop:"shaft_two_match_distance"}},[a("el-input",{staticClass:"input_val",attrs:{disabled:t.editable[t.dialogAction]},model:{value:t.tmp.shaft_two_match_distance,callback:function(e){t.$set(t.tmp,"shaft_two_match_distance",e)},expression:"tmp.shaft_two_match_distance"}})],1),a("el-form-item",{staticClass:"small_input",attrs:{label:"设定扭矩",prop:"torque"}},[a("el-input",{staticClass:"input_val",attrs:{disabled:t.editable[t.dialogAction]},model:{value:t.tmp.torque,callback:function(e){t.$set(t.tmp,"torque",e)},expression:"tmp.torque"}})],1),a("el-form-item",{staticClass:"small_input small_input_right",attrs:{label:"轴端面间距",prop:"shaft_space_distance"}},[a("el-input",{staticClass:"input_val",attrs:{disabled:t.editable[t.dialogAction]},model:{value:t.tmp.shaft_space_distance,callback:function(e){t.$set(t.tmp,"shaft_space_distance",e)},expression:"tmp.shaft_space_distance"}})],1)],1),a("div",{staticStyle:{width:"400px","margin-bottom":"20px"}},[a("el-form-item",{attrs:{label:"附件"}},[a("el-upload",{staticClass:"upload-demo",attrs:{action:"uploadFile",disabled:t.editable[t.dialogAction],"before-upload":t.beforeUpload,"on-remove":t.handleRemove,"file-list":t.fileList}},[a("el-button",{attrs:{size:"small",type:"primary",disabled:t.editable[t.dialogAction]}},[t._v("点击上传")])],1)],1),a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{staticStyle:{width:"80%"},attrs:{type:"textarea",disabled:t.editable[t.dialogAction]},model:{value:t.tmp.remark,callback:function(e){t.$set(t.tmp,"remark",e)},expression:"tmp.remark"}})],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v(" 取消 ")]),a("el-button",{attrs:{type:"primary",disabled:t.editable[t.dialogAction]},on:{click:t.submit}},[t._v(" 确认 ")])],1)],1),a("el-dialog",{attrs:{title:"退回原因",visible:t.showReturnReasonDialog,width:"30%"},on:{"update:visible":function(e){t.showReturnReasonDialog=e}}},[a("el-form",{ref:"closeForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{model:t.closeForm,"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"退回原因"}},[a("el-input",{attrs:{type:"textarea",disabled:"",rows:4},model:{value:t.closeForm.return_reason,callback:function(e){t.$set(t.closeForm,"return_reason",e)},expression:"closeForm.return_reason"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.showReturnReasonDialog=!1}}},[t._v(" 取消 ")])],1)],1)],1)},l=[],n=(a("d3b7"),a("e9c4"),a("a15b"),a("b775"));function s(t){return Object(n["a"])({url:"/api/sale_requests",method:"get",params:t})}function r(t){return Object(n["a"])({url:"/api/sale_requests",method:"post",data:t})}function o(t,e){return Object(n["a"])({url:"/api/sale_requests/".concat(e),method:"put",data:t})}function c(t){return Object(n["a"])({url:"/api/sale_requests/".concat(t),method:"delete"})}function u(){return Object(n["a"])({url:"/api/sale_request_num",method:"get"})}function p(t){return Object(n["a"])({url:"/api/sale_requests/".concat(t,"/publish"),method:"post"})}function d(t){return Object(n["a"])({url:"/api/sale_requests/download",method:"get",params:t,responseType:"blob"})}var m=a("91b6"),f=a("333d"),_=a("622d"),h=a("163b"),b={name:"SaleRequestIndex",components:{Pagination:f["a"],QueryCol:_["a"]},filters:{statusMap:function(t){var e={open:"info",published:"primary",return:"danger",finish:"success"};return e[t]}},data:function(){return{list:null,description:"",downloadLoading:!1,showReturnReasonDialog:!1,closeForm:{return_reason:""},total:0,actions:{add:"+新需求",detail:"详情",update:"编辑"},editable:{add:!1,detail:!0,update:!1},dialogFormVisible:!1,dialogAction:"add",statusOptions:[{name:"占用",key:"open"},{name:"处理",key:"published"},{name:"退回",key:"return"},{name:"完成",key:"finish"}],cols:[{key:"project_no",name:"项目编号"},{key:"customer_name",name:"客户名称"},{key:"product_type",name:"产品类型"},{key:"user.filter_name",name:"创建人"},{key:"handler.filter_name",name:"处理人"}],product_types:[{key:"HNCTL",val:"HNCTL"},{key:"HNCGD",val:"HNCGD"},{key:"HNCFE",val:"HNCFE"},{key:"HNCGR",val:"HNCGR"},{key:"HNCWD",val:"HNCWD"}],fileList:[],listQuery:{page:1,per_page:10,filter_col:"",filter_val:"",filter_status:""},tmp:{project_no:"",product_type:[],expect_time:"",device_name:"",shaft_one_diameter_tolerance:"",driver_type:"",shaft_two_diameter_tolerance:"",driver_power:"",shaft_one_match_distance:"",rpm:"",shaft_two_match_distance:"",torque:"",shaft_space_distance:"",remark:""},rules:{project_no:[{required:!0,message:"请填写项目编号",trigger:"blur"}],product_type:[{required:!0,message:"请填写产品性质",trigger:"blur"}]}}},created:function(){this.$route.query.source_id&&(this.listQuery.filter_col="project_no",this.listQuery.filter_val=this.$route.query.source_id),this.getList()},methods:{showStatus:function(t){"return"==t.status&&(this.closeForm.return_reason=t.return_reason,this.showReturnReasonDialog=!0)},handleDownload:function(){var t=this;this.downloadLoading=!0,d(this.listQuery).then((function(t){var e="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",a="销售需求列表".concat(Date.now(),".xlsx");Object(h["a"])(t,e,a)})).finally((function(){t.downloadLoading=!1}))},getList:function(){var t=this;return s(this.listQuery).then((function(e){t.list=e.data,t.total=e.total}))},handleFilter:function(t){this.listQuery.page=1,this.listQuery.page=1,this.listQuery.filter_col=t.col?t.col:"",this.listQuery.filter_val=t.val?t.val:"",this.listQuery.filter_status=t.sta?t.sta:"",this.getList()},showDialog:function(t,e){var a=this;this.dialogFormVisible=!0,this.dialogAction=t,this.$nextTick((function(){"add"==t?(a.$refs["dataForm"].resetFields(),a.fileList=[]):(a.tmp=JSON.parse(JSON.stringify(e)),a.tmp.product_type=e.product_type_arr,a.fileList=JSON.parse(JSON.stringify(e.uploads)))}))},getSaleNum:function(){var t=this;u().then((function(e){t.tmp.sale_num=e.data.uuid}))},handleRemove:function(t,e){this.fileList=e},beforeUpload:function(t,e){var a=this,i=new FormData;i.append("file",t),i.append("type","file"),i.append("source_type","sale_request"),Object(m["a"])(i).then((function(t){a.fileList.push(t.data)}))},submit:function(){"add"==this.dialogAction?this.handleData(r):this.handleData(o)},handleData:function(t){for(var e=this,a=[],i=0;i<this.fileList.length;i++)a.push(this.fileList[i].id);this.tmp.upload_ids=a.join(),this.$refs["dataForm"].validate((function(a){a&&t(e.tmp,e.tmp.id).then((function(){e.retrieve()}))}))},publish:function(t){var e=this;p(t.id).then((function(t){e.retrieve()}))},deleteData:function(t){var e=this;c(t.id).then((function(t){e.retrieve()}))},retrieve:function(){var t=this;this.getList().then((function(e){t.dialogFormVisible=!1,t.$notify({title:"Success",message:"操作成功",type:"success",duration:2e3})}))}}},g=b,v=(a("3e84"),a("2877")),y=Object(v["a"])(g,i,l,!1,null,null,null);e["default"]=y.exports},"55c8":function(t,e,a){},5747:function(t,e,a){},"622d":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"filter-container",staticStyle:{display:"inline"}},[a("el-select",{staticClass:"filter-item",staticStyle:{width:"130px","margin-right":"10px"},attrs:{placeholder:"搜索字段",clearable:""},model:{value:t.col,callback:function(e){t.col=e},expression:"col"}},t._l(t.cols,(function(t){return a("el-option",{key:t.key,attrs:{label:t.name,value:t.key}})})),1),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-right":"10px"},attrs:{placeholder:"输入搜索内容"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.val,callback:function(e){t.val=e},expression:"val"}}),t.status.length>0?a("el-select",{staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{placeholder:"状态",clearable:""},model:{value:t.sta,callback:function(e){t.sta=e},expression:"sta"}},t._l(t.status,(function(t){return a("el-option",{key:t.key,attrs:{label:t.name,value:t.key}})})),1):t._e(),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v(" 搜索 ")])],1)},l=[],n={name:"QueryCol",props:{filter_col:{type:String},filter_val:{type:String},filter_status:{type:String},cols:{type:Array,default:function(){return[]}},status:{type:Array,default:function(){return[]}}},data:function(){return{col:this.filter_col,val:this.filter_val,sta:this.filter_status}},created:function(){},methods:{search:function(){var t={col:this.col,val:this.val,sta:this.sta};this.$emit("handleFilter",t)}}},s=n,r=(a("0317"),a("2877")),o=Object(r["a"])(s,i,l,!1,null,null,null);e["a"]=o.exports},"91b6":function(t,e,a){"use strict";a.d(e,"a",(function(){return l}));var i=a("b775");function l(t){return Object(i["a"])({url:"/api/upload",method:"post",data:t})}},a15b:function(t,e,a){"use strict";var i=a("23e7"),l=a("44ad"),n=a("fc6a"),s=a("a640"),r=[].join,o=l!=Object,c=s("join",",");i({target:"Array",proto:!0,forced:o||!c},{join:function(t){return r.call(n(this),void 0===t?",":t)}})},e9c4:function(t,e,a){var i=a("23e7"),l=a("d066"),n=a("d039"),s=l("JSON","stringify"),r=/[\uD800-\uDFFF]/g,o=/^[\uD800-\uDBFF]$/,c=/^[\uDC00-\uDFFF]$/,u=function(t,e,a){var i=a.charAt(e-1),l=a.charAt(e+1);return o.test(t)&&!c.test(l)||c.test(t)&&!o.test(i)?"\\u"+t.charCodeAt(0).toString(16):t},p=n((function(){return'"\\udf06\\ud834"'!==s("\udf06\ud834")||'"\\udead"'!==s("\udead")}));s&&i({target:"JSON",stat:!0,forced:p},{stringify:function(t,e,a){var i=s.apply(null,arguments);return"string"==typeof i?i.replace(r,u):i}})},ef8b:function(t,e,a){"use strict";a("f943")},f943:function(t,e,a){}}]);