(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e4510a2"],{"0317":function(t,e,n){"use strict";n("5747")},"163b":function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),n("9861");function a(t,e,n){var a=e||"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",r=n||"".concat(Date.now(),".xlsx"),o=new Blob([t],{type:a}),i=document.createElement("a"),l=window.URL.createObjectURL(o);i.href=l,i.download=r,document.body.appendChild(i),i.click(),document.body.removeChild(i),window.URL.revokeObjectURL(l)}},"333d":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[n("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},r=[];n("a9e3");Math.easeInOutQuad=function(t,e,n,a){return t/=a/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var o=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function i(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function l(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(t,e,n){var a=l(),r=t-a,s=20,u=0;e="undefined"===typeof e?500:e;var c=function t(){u+=s;var l=Math.easeInOutQuad(u,a,r,e);i(l),u<e?o(t):n&&"function"===typeof n&&n()};c()}var u={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},per_page:{type:Number,default:10},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.per_page},set:function(t){this.$emit("update:per_page",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,per_page:t}),this.autoScroll&&s(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,per_page:this.pageSize}),this.autoScroll&&s(0,800)}}},c=u,d=(n("ef8b"),n("2877")),p=Object(d["a"])(c,a,r,!1,null,"29d0d71e",null);e["a"]=p.exports},"45cc":function(t,e,n){},5747:function(t,e,n){},"622d":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"filter-container",staticStyle:{display:"inline"}},[n("el-select",{staticClass:"filter-item",staticStyle:{width:"130px","margin-right":"10px"},attrs:{placeholder:"搜索字段",clearable:""},model:{value:t.col,callback:function(e){t.col=e},expression:"col"}},t._l(t.cols,(function(t){return n("el-option",{key:t.key,attrs:{label:t.name,value:t.key}})})),1),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-right":"10px"},attrs:{placeholder:"输入搜索内容"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.val,callback:function(e){t.val=e},expression:"val"}}),t.status.length>0?n("el-select",{staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{placeholder:"状态",clearable:""},model:{value:t.sta,callback:function(e){t.sta=e},expression:"sta"}},t._l(t.status,(function(t){return n("el-option",{key:t.key,attrs:{label:t.name,value:t.key}})})),1):t._e(),n("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v(" 搜索 ")])],1)},r=[],o={name:"QueryCol",props:{filter_col:{type:String},filter_val:{type:String},filter_status:{type:String},cols:{type:Array,default:function(){return[]}},status:{type:Array,default:function(){return[]}}},data:function(){return{col:this.filter_col,val:this.filter_val,sta:this.filter_status}},created:function(){},methods:{search:function(){var t={col:this.col,val:this.val,sta:this.sta};this.$emit("handleFilter",t)}}},i=o,l=(n("0317"),n("2877")),s=Object(l["a"])(i,a,r,!1,null,null,null);e["a"]=s.exports},7915:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("QueryCol",{attrs:{status:t.statusOptions,cols:t.cols,filter_col:t.listQuery.filter_col,filter_status:t.listQuery.filter_status,filter_val:t.listQuery.filter_val},on:{handleFilter:t.handleFilter}}),n("el-button",{staticStyle:{margin:"0 0 20px 20px"},attrs:{loading:t.orderDownloadLoading,type:"primary",icon:"el-icon-document"},on:{click:t.handleOrderDownload}},[t._v(" 导出excel ")]),n("el-table",{staticStyle:{width:"100%","max-width":"1600px","margin-top":"25px"},attrs:{data:t.list,border:"",stripe:"",fit:"","highlight-current-row":"","span-method":t.arraySpanMethod}},[n("el-table-column",{attrs:{label:"序号",align:"center",width:"190"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.order.id))])]}}])}),n("el-table-column",{attrs:{label:"订单编号",align:"center",width:"190"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.order.order_num))])]}}])}),n("el-table-column",{attrs:{label:"创建时间",align:"center",width:"190"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.order.created_at))])]}}])}),n("el-table-column",{attrs:{label:"创建人",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.user.username))])]}}])}),n("el-table-column",{attrs:{label:"处理人",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(" "+t._s(a.handler?a.handler.username:"")+" ")])]}}])}),n("el-table-column",{attrs:{label:"项目编号",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(" "+t._s(a.project_no)+" ")])]}}])}),n("el-table-column",{attrs:{label:"产品类型",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.category_name))])]}}])}),n("el-table-column",{attrs:{label:"产品型号",align:"center",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.product_name))])]}}])}),n("el-table-column",{attrs:{label:"产品单价",align:"center",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.product_price))])]}}])}),n("el-table-column",{attrs:{label:"产品货期",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.product_date))])]}}])}),n("el-table-column",{attrs:{label:"数量",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.amount))])]}}])}),n("el-table-column",{attrs:{label:"订单总价",align:"center",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.order.total_pay))])]}}])}),n("el-table-column",{attrs:{label:"订单总预付款",align:"center",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.order.total_pre_pay))])]}}])}),n("el-table-column",{attrs:{label:"附件",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return t._l(a.order.uploads,(function(e){return n("div",{key:e.name},[n("span",[t._v(t._s(e.name))]),n("el-link",{attrs:{underline:!1,icon:"el-icon-download",href:e.url,type:"primary",download:""}},[t._v("下载")])],1)}))}}])}),n("el-table-column",{attrs:{label:"备注",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.order.remark))])]}}])}),n("el-table-column",{attrs:{label:"物料编号",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.material_number))])]}}])}),n("el-table-column",{attrs:{label:"Boom&图纸",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("el-button",{staticStyle:{margin:"0 0 20px 20px"},attrs:{loading:t.downloadLoading,size:"mini",type:"primary",disabled:""==a.material_number,icon:"el-icon-document"},on:{click:function(e){return t.handleDownload(a)}}},[t._v(" 下载 ")])]}}])}),n("el-table-column",{attrs:{label:"操作",align:"center",width:"250","class-name":"small-padding "},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return["open"==a.status?n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.search(a)}}},[t._v(" 查询 ")]):t._e(),"open"==a.status?n("el-button",{attrs:{size:"mini",type:"info"},on:{click:function(e){return t.bindMaterial(a)}}},[t._v(" 处理 ")]):t._e(),"open"==a.status?n("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(e){return t.finishItem(a)}}},[t._v(" 完成 ")]):t._e()]}}])}),n("el-table-column",{attrs:{label:"状态",width:"200",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("el-tag",{attrs:{type:t._f("statusMap")(a.status)}},[t._v(" "+t._s(a.status_cn)+" ")])]}}])})],1),n("el-dialog",{attrs:{title:"物料编号",visible:t.showNumberDialog,width:"30%"},on:{"update:visible":function(e){t.showNumberDialog=e}}},[n("el-form",{ref:"numForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{model:t.numForm,"label-position":"left","label-width":"100px"}},[n("el-form-item",{attrs:{label:"物料编号"}},[n("el-input",{staticClass:"small_input",model:{value:t.numForm.material_number,callback:function(e){t.$set(t.numForm,"material_number",e)},expression:"numForm.material_number"}})],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.showNumberDialog=!1}}},[t._v(" 取消 ")]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addNumber()}}},[t._v(" 确认 ")])],1)],1),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,per_page:t.listQuery.per_page},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:per_page":function(e){return t.$set(t.listQuery,"per_page",e)},pagination:t.getList}})],1)},r=[],o=(n("d3b7"),n("f8b7")),i=n("333d"),l=n("622d"),s=n("163b"),u={name:"OrderIndex",components:{Pagination:i["a"],QueryCol:l["a"]},filters:{statusMap:function(t){var e={open:"warning",finish:"success"};return e[t]}},data:function(){return{list:null,description:"",orderDownloadLoading:!1,total:0,dialogFormVisible:!1,downloadLoading:!1,showNumberDialog:!1,dialogAction:"add",statusOptions:[{name:"待处理",key:"open"},{name:"完成",key:"finish"}],cols:[{key:"order_num",name:"订单编号"},{key:"project_no",name:"项目编号"},{key:"orderItems.filter_username",name:"创建人"},{key:"orderItems.filter_handler",name:"处理人"}],listQuery:{page:1,per_page:10,filter_col:"",filter_val:"",filter_status:""},tmp:{name:"",description:""},numForm:{item_id:0,material_number:""},rules:{name:[{required:!0,message:"请填写名称",trigger:"change"}],description:[{required:!0,message:"请填写描述",trigger:"blur"}]}}},created:function(){this.$route.query.source_id&&(this.listQuery.filter_col="project_no",this.listQuery.filter_val=this.$route.query.source_id),this.getList()},methods:{handleOrderDownload:function(){var t=this;this.orderDownloadLoading=!0,Object(o["d"])(this.listQuery).then((function(t){var e="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",n="订单列表".concat(Date.now(),".xlsx");Object(s["a"])(t,e,n)})).finally((function(){t.downloadLoading=!1}))},bindMaterial:function(t){this.showNumberDialog=!0,this.numForm.material_number="",this.numForm.item_id=t.id},arraySpanMethod:function(t){var e=t.row,n=(t.column,t.rowIndex,t.columnIndex);if(n<=5||n>=11&n<=14)return e.is_start?[e.order.order_items_count,1]:[0,0]},getList:function(){var t=this;return Object(o["f"])(this.listQuery).then((function(e){t.list=e.data,t.total=e.total}))},handleFilter:function(t){this.listQuery.page=1,this.listQuery.page=1,this.listQuery.filter_col=t.col?t.col:"",this.listQuery.filter_val=t.val?t.val:"",this.listQuery.filter_status=t.sta?t.sta:"",this.getList()},finishItem:function(t){var e=this;Object(o["e"])(t.id).then((function(t){e.retrieve()}))},search:function(t){var e=this.$router.resolve({path:"/material/category",query:{category_name:t.category_name}});window.open(e.href,"_blank")},handleDownload:function(t){var e=this;this.downloadLoading=!0,Object(o["c"])(t.id).then((function(e){var n="application/zip",a="".concat(t.material_number,".zip");Object(s["a"])(e,n,a)})).finally((function(){e.downloadLoading=!1}))},addNumber:function(){var t=this;Object(o["a"])(this.numForm.item_id,this.numForm).then((function(e){t.showNumberDialog=!1,t.retrieve()}))},retrieve:function(){var t=this;this.getList().then((function(e){t.dialogFormVisible=!1,t.$notify({title:"Success",message:"操作成功",type:"success",duration:2e3})}))}}},c=u,d=(n("b3f2"),n("2877")),p=Object(d["a"])(c,a,r,!1,null,null,null);e["default"]=p.exports},b3f2:function(t,e,n){"use strict";n("45cc")},ef8b:function(t,e,n){"use strict";n("f943")},f8b7:function(t,e,n){"use strict";n.d(e,"g",(function(){return r})),n.d(e,"f",(function(){return o})),n.d(e,"b",(function(){return i})),n.d(e,"e",(function(){return l})),n.d(e,"a",(function(){return s})),n.d(e,"c",(function(){return u})),n.d(e,"d",(function(){return c}));var a=n("b775");function r(){return Object(a["a"])({url:"/api/order_num",method:"get"})}function o(t){return Object(a["a"])({url:"/api/orders",method:"get",params:t})}function i(t){return Object(a["a"])({url:"/api/orders",method:"post",data:t})}function l(t){return Object(a["a"])({url:"/api/order_items/".concat(t,"/finish"),method:"post"})}function s(t,e){return Object(a["a"])({url:"/api/order_items/".concat(t,"/bind"),method:"post",data:e})}function u(t){return Object(a["a"])({url:"/api/order_items/".concat(t,"/download"),method:"get",responseType:"blob"})}function c(t){return Object(a["a"])({url:"/api/orders/download",method:"get",params:t,responseType:"blob"})}},f943:function(t,e,n){}}]);