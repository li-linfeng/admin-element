(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5e12eaa2"],{"333d":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},r=[];a("a9e3");Math.easeInOutQuad=function(e,t,a,n){return e/=n/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function l(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function o(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(e,t,a){var n=o(),r=e-n,s=20,u=0;t="undefined"===typeof t?500:t;var c=function e(){u+=s;var o=Math.easeInOutQuad(u,n,r,t);l(o),u<t?i(e):a&&"function"===typeof a&&a()};c()}var u={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},per_page:{type:Number,default:10},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.per_page},set:function(e){this.$emit("update:per_page",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,per_page:e}),this.autoScroll&&s(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,per_page:this.pageSize}),this.autoScroll&&s(0,800)}}},c=u,d=(a("ef8b"),a("2877")),p=Object(d["a"])(c,n,r,!1,null,"29d0d71e",null);t["a"]=p.exports},a2e1:function(e,t,a){},a9e3:function(e,t,a){"use strict";var n=a("83ab"),r=a("da84"),i=a("94ca"),l=a("6eeb"),o=a("5135"),s=a("c6b6"),u=a("7156"),c=a("c04e"),d=a("d039"),p=a("7c73"),f=a("241c").f,h=a("06cf").f,g=a("9bf2").f,m=a("58a8").trim,b="Number",y=r[b],_=y.prototype,v=s(p(_))==b,w=function(e){var t,a,n,r,i,l,o,s,u=c(e,!1);if("string"==typeof u&&u.length>2)if(u=m(u),t=u.charCodeAt(0),43===t||45===t){if(a=u.charCodeAt(2),88===a||120===a)return NaN}else if(48===t){switch(u.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+u}for(i=u.slice(2),l=i.length,o=0;o<l;o++)if(s=i.charCodeAt(o),s<48||s>r)return NaN;return parseInt(i,n)}return+u};if(i(b,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var N,k=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof k&&(v?d((function(){_.valueOf.call(a)})):s(a)!=b)?u(new y(w(t)),a,k):w(t)},S=n?f(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),C=0;S.length>C;C++)o(y,N=S[C])&&!o(k,N)&&g(k,N,h(y,N));k.prototype=_,_.constructor=k,l(r,b,k)}},e93f:function(e,t,a){"use strict";a("a2e1")},ef8b:function(e,t,a){"use strict";a("f943")},f06c:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-select",{staticStyle:{"margin-right":"5px"},attrs:{clearable:"",placeholder:"请选择模块"},model:{value:e.listQuery.filter_module,callback:function(t){e.$set(e.listQuery,"filter_module",t)},expression:"listQuery.filter_module"}},e._l(e.module_options,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),a("el-select",{attrs:{clearable:"",placeholder:"请选择产品类型"},model:{value:e.listQuery.filter_type,callback:function(t){e.$set(e.listQuery,"filter_type",t)},expression:"listQuery.filter_type"}},e._l(e.type_options,(function(e,t){return a("el-option",{key:t,attrs:{label:e.key,value:e.val}})})),1),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(" 搜索 ")])],1),a("el-table",{staticStyle:{width:"100%","max-width":"1600px"},attrs:{data:e.list,border:"",stripe:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"编号",align:"center",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.id))])]}}])}),a("el-table-column",{attrs:{label:"模块",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.module_cn))])]}}])}),a("el-table-column",{attrs:{label:"产品种类",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.product_type))])]}}])}),a("el-table-column",{attrs:{label:"处理人",width:"200",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.user.username))])]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.showAddHandlerDialog(n)}}},[e._v(" 设置 ")])]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,per_page:e.listQuery.per_page},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:per_page":function(t){return e.$set(e.listQuery,"per_page",t)},pagination:e.getList}}),a("el-dialog",{attrs:{title:"处理人",visible:e.handlerDialogVisible,width:"30%"},on:{"update:visible":function(t){e.handlerDialogVisible=t}}},[a("el-form",{ref:"handlerForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{model:e.handlerForm,"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"处理人"}},[a("el-select",{attrs:{filterable:"",remote:"","reserve-keyword":"",placeholder:"请输入邮箱或者用户名","remote-method":e.searchUser,loading:e.loading},model:{value:e.handlerForm.handler_id,callback:function(t){e.$set(e.handlerForm,"handler_id",t)},expression:"handlerForm.handler_id"}},e._l(e.options,(function(e){return a("el-option",{key:e.id,attrs:{label:e.username,value:e.id}})})),1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.handlerDialogVisible=!1}}},[e._v(" 取消 ")]),a("el-button",{attrs:{type:"primary"},on:{click:e.bindHandler}},[e._v(" 确认 ")])],1)],1)],1)},r=[],i=a("c24f"),l=a("b775");function o(e){return Object(l["a"])({url:"/api/handlers",method:"get",params:e})}function s(e,t){return Object(l["a"])({url:"/api/handlers/".concat(e,"/user"),method:"put",data:t})}var u=a("333d"),c={name:"HandlerIndex",components:{Pagination:u["a"]},data:function(){return{module_options:[{value:"api.sale_requests",label:"销售需求"},{value:"api.preSales",label:"售前处理"},{value:"api.order",label:"订单"}],type_options:[{key:"HNCTL",val:"HNCTL"},{key:"HNCGD",val:"HNCGD"},{key:"HNCFE",val:"HNCFE"},{key:"HNCGR",val:"HNCGR"},{key:"HNCWD",val:"HNCWD"}],options:[],loading:!1,list:null,total:0,handlerDialogVisible:!1,listQuery:{page:1,per_page:10,filter_module:"",filter_type:""},handlerForm:{module:"",product_type:"",user_id:""}}},created:function(){this.getList()},methods:{showAddHandlerDialog:function(e){var t=this;this.$nextTick((function(){t.handlerForm={id:e.id,handler_id:""},t.handlerDialogVisible=!0,t.searchUser()}))},searchUser:function(e){var t=this;Object(i["g"])({keyword:e}).then((function(e){t.options=e.data}))},bindHandler:function(){var e=this;s(this.handlerForm.id,this.handlerForm).then((function(t){e.handlerDialogVisible=!1,e.retrieve()}))},getList:function(){var e=this;return o(this.listQuery).then((function(t){e.list=t.data,e.total=t.total}))},handleFilter:function(){this.listQuery.page=1,this.getList()},retrieve:function(){var e=this;this.getList().then((function(t){e.handlerDialogVisible=!1,e.$notify({title:"Success",message:"操作成功",type:"success",duration:2e3})}))}}},d=c,p=(a("e93f"),a("2877")),f=Object(p["a"])(d,n,r,!1,null,null,null);t["default"]=f.exports},f943:function(e,t,a){}}]);