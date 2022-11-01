<template>
  <div class="app-container">
    <QueryCol :status="statusOptions"
              :cols="cols"
              :filter_col="listQuery.filter_col"
              :filter_status="listQuery.filter_status"
              :filter_val="listQuery.filter_val"
              @handleFilter="handleFilter" />
    <el-button :loading="downloadLoading"
               style="margin:0 0 20px 20px;"
               type="primary"
               icon="el-icon-document"
               @click="handleDownload">
      导出excel
    </el-button>
    <el-button class="filter-item"
               style="margin-left: 10px; margin-bottom: 25px;"
               type="primary"
               icon="el-icon-edit"
               @click="showOrder">
      创建订单
    </el-button>

    <el-table :data="list"
              border
              stripe
              fit
              highlight-current-row
              :span-method="arraySpanMethod"
              style="width: 100%; max-width: 1600px;">
      <!-- @selection-change="handleItemsChange" -->

      <el-table-column label="序号"
                       align="center"
                       width="100">
        <template slot-scope="{row}">
          <el-radio v-model="selectRow"
                    @change="handleItemsChange"
                    :label="row">
            {{row.id}}
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column label="项目编号"
                       align="center"
                       width="130">
        <template slot-scope="{row}">
          <router-link :to="{path:'/sale_request/saleRequest', query: { source_id: row.project_no }}">{{row.project_no }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="客户名称"
                       align="center"
                       width="120">
        <template slot-scope="{row}">
          <span>{{row.customer_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人"
                       align="center"
                       width="70">
        <template slot-scope="{row}">
          <span>{{row.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理人"
                       align="center"
                       width="70">
        <template slot-scope="{row}">
          <span>{{row.handler_name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品类型"
                       align="center"
                       width="80">
        <template slot-scope="{row}">
          <span>{{row.category }}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品型号"
                       align="left"
                       width="400">
        <template slot-scope="{row}">
          <span>{{row.product_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品单价"
                       align="center"
                       width="120">
        <template slot-scope="{row}">
          <span>{{row.product_price }}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品货期"
                       align="center"
                       width="85">
        <template slot-scope="{row}">
          <span>{{row.product_date }}</span>
        </template>
      </el-table-column>

      <el-table-column label="附件"
                       align="center"
                       width="80">
        <template slot-scope="{row}">
          <div v-for="item in row.uploads"
               :key="item.name">
            <span>{{item.name}}</span>
            <el-link :underline="false"
                     icon="el-icon-download"
                     :href="item.url"
                     type="primary"
                     download>下载</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="274"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini"
                     type="info"
                     @click="showTmpDialog(row)"
                     v-if="row.status == 'published'">
            处理
          </el-button>
          <el-button size="mini"
                     type="danger"
                     @click="showReturn(row)"
                     v-if="row.status == 'published'">
            退回
          </el-button>
          <el-button size="mini"
                     type="success"
                     @click="finishRequest(row.id)"
                     v-if="row.status == 'published'">
            完成
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态"
                       width="70"
                       align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusMap">
            {{ row.status_cn }}
          </el-tag>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :per_page.sync="listQuery.per_page"
                @pagination="getList" />

    <el-dialog title="新增"
               :visible.sync="preSaleDialogFormVisible"
               style="width:700px">
      <el-form ref="dataForm"
               :model="pre_sale_item"
               :rules="tmp_rules"
               label-position="left"
               label-width="140px"
               style="width:1200px; height:500px;margin-left:50px;">
        <el-form-item label="产品类型"
                      prop="category">
          <el-select v-model="pre_sale_item.category"
                     placeholder="请选择">
            <el-option v-for="item in categories"
                       :key="item.key"
                       :label="item.key"
                       :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品型号"
                      prop="product_name">
          <el-input v-model="pre_sale_item.product_name"
                    class="small_input" />
        </el-form-item>

        <el-form-item label="产品单价"
                      prop="product_price">
          <el-input v-model="pre_sale_item.product_price"
                    class="small_input"
                    v-money:2 />
        </el-form-item>
        <el-form-item label="产品货期"
                      prop="product_date">
          <el-input v-model="pre_sale_item.product_date"
                    class="small_input" />
        </el-form-item>

        <div style="width: 400px;margin-bottom: 20px;">
          <el-form-item label="附件">
            <el-upload class="upload-demo"
                       action="uploadFile"
                       :before-upload="(file) => beforeUpload(file, 'pre_sale')"
                       :on-remove="handleRemove"
                       :file-list="pre_sale_item.fileList">
              <el-button size="small"
                         type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>
      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="preSaleDialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="addToPreSale">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="处理"
               :visible.sync="dialogFormVisible">

      <el-button size="mini"
                 type="primary"
                 style="float:right;margin-bottom:5px"
                 @click="openAddPreSale">
        新增
      </el-button>
      <el-table :data="pre_sale_tmp"
                ref="preData"
                border
                stripe
                fit
                style="width: 100%; max-width: 1600px;">

        <el-table-column label="产品类型"
                         align="center"
                         width="187">
          <template slot-scope="{row}">
            <span>{{row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品型号"
                         align="center"
                         width="220">
          <template slot-scope="{row}">
            <span>{{row.product_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品货期"
                         align="center"
                         width="150">
          <template slot-scope="{row}">
            <span>{{row.product_date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="附件"
                         align="center"
                         width="260">
          <template slot-scope="{row}">
            <div v-for="item in row.fileList"
                 :key="item.filename">
              <span>{{item.filename}}</span>
              <el-link :underline="false"
                       icon="el-icon-download"
                       :href="item.url"
                       type="primary"
                       download>下载</el-link>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作"
                         align="center"
                         width="100">
          <template slot-scope="{row}">
            <el-button size="mini"
                       type="info"
                       @click="delPreSaleTmp(row)">
              删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="submitPreSale">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增订单"
               :visible.sync="showOrderDialog">
      <el-form ref="orderForm"
               :rules="order_rules"
               :model="order"
               label-position="left"
               label-width="80px"
               style="width: 600px; margin-left:50px;">
        <el-form-item label="订单编号"
                      prop="order_num">
          <el-input v-model="order.order_num"
                    class="small_input" />
        </el-form-item>
        <el-form-item v-for="item in order.items"
                      label="序号"
                      :key="item.pre_sale_id">
          <span style="padding:10px">{{item.product_name}}</span>
          <el-input-number v-model="item.count"
                           :min="1"
                           label="数量"></el-input-number>
        </el-form-item>
        <el-form-item label="产品总价"
                      prop="total_pay">
          <el-input v-model="order.total_pay"
                    v-money:2 />
        </el-form-item>
        <el-form-item label="总预付款"
                      prop="total_pay">
          <el-input v-model="order.total_pre_pay"
                    v-money:2 />
        </el-form-item>

        <el-form-item label="附件">
          <el-upload action="uploadFile"
                     :before-upload="(file) => beforeUpload(file, 'order')"
                     :on-remove="handleRemoveFile"
                     :file-list="orderList">
            <el-button size="small"
                       type="primary"
                       :disabled="dialogAction =='detail'">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注"
                      prop="remark">
          <el-input v-model="order.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="()=>{showOrderDialog = false}">
          取消
        </el-button>
        <el-button type="primary"
                   @click="addOrder()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="退回原因"
               :visible.sync="showReturnReasonDialog"
               width="30%">
      <el-form ref="closeForm"
               :model="closeForm"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="退回原因">
          <el-input v-model="closeForm.return_reason"
                    type="textarea"
                    :disabled="showReturnReasonAction !='add'"
                    :rows="4" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="showReturnReasonDialog = false">
          取消
        </el-button>
        <el-button type="primary"
                   v-if="showReturnReasonAction =='add'"
                   @click="modifyStatus(return_row)">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getPreSaleList, bindSale, ReturnSaleRequest, FinishSaleRequest, exportPreSales } from '@/api/preSale'
import { uploadFile } from '@/api/upload'
import { getOrderNum, createOrder } from '@/api/order'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import QueryCol from '@/components/QueryCol' // secondary package based on el-pagination
import { downloadBlob } from '@/utils/help'


export default {
  name: 'PreSaleIndex',
  components: { Pagination, QueryCol },
  directives: {
    money: {
      // 指令的定义
      inserted: function (el, binding) {
        // 指令作用在 element-input 节点，对应原生 div.el-input (真实input节点的父节点)
        if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
          el = el.getElementsByTagName('input')[0]
        }
        //带¥符号、保留2位小数+千分位
        // el.value = (Number(el.value)).toLocaleString('zh', {style:'currency', currency: 'CNY', minimumFractionDigits: 2});
        //保留2位小数+千分位
        el.value = parseFloat(el.value).toLocaleString('zh', { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 });
        el.onblur = (e) => {
          let a = el.value.replace(/,/g, '');  //去除‘，’
          if (a) {
            var r = parseFloat(a).toLocaleString('zh', { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 });
            el.value = r
          }
        }
      },
    }
  },
  filters: {
    statusMap: (status) => { // msg表示要过滤的数据，a表示传入的参数
      var sta = {
        change: "warning",
        published: 'info',
        return: 'danger',
        finish: 'success',
      }
      return sta[status]
    }
  },
  data () {
    return {
      selectRow: 0,
      list: null,
      sale_tm_id: 0,
      pre_sale_tmp: [],
      pre_sale_t: [],
      pre_sale_t_count: 0,
      description: "",
      downloadLoading: false,
      total: 0,
      select: null,
      dialogFormVisible: false,
      showApplication: false,
      showOrderDialog: false,
      showReturnReasonDialog: false,
      showReturnReasonAction: 'add',
      preSaleDialogFormVisible: false,
      dialogAction: "update",
      categories: null,
      statusOptions: [
        {
          name: "需求变更",
          key: "change",
        },
        {
          name: "处理",
          key: "published",
        },
        {
          name: "退回",
          key: "return",
        },
        {
          name: "完成",
          key: "finish",
        },
      ],
      cols: [
        {
          "key": "project_no",
          "name": "项目编号",
        },
        {
          "key": "customer_name",
          "name": "客户名称",
        },
        {
          "key": "product_type",
          "name": "产品类型",
        },
        {
          "key": "user.filter_name",
          "name": "创建人",
        },
        {
          "key": "handler.filter_name",
          "name": "处理人",
        },
      ],
      orderList: [],
      listQuery: {
        page: 1,
        per_page: 10,
        filter_col: "",
        filter_val: "",
        filter_status: "",
      },
      pre_sale_item: {
        category: "",
        product_name: "",
        product_price: 0,
        product_date: "",
        fileList: [],
      },
      closeForm: {
        return_reason: ""
      },
      return_row: 0,
      order: {
        project_no: "",
        order_num: "",
        customer_name: "",
        total_pay: 0,
        total_pre_pay: 0,
        items: [],
        remark: "",
      },
      tmp_rules: {
        category: [{ required: true, message: '请选择产品类型', trigger: 'blur' }],
        product_name: [{ required: true, message: '请输入产品型号', trigger: 'blur' }],
        product_price: [{ required: true, message: '请输入产品单价', trigger: 'blur' }],
        product_date: [{ required: true, message: '请输入产品货期', trigger: 'blur' }],
      },
      order_rules: {
        order_num: [{ required: true, message: '请填写名称', trigger: 'blur' }],
        items: [{ required: true, message: '请选择一个销售需求', trigger: 'blur' }],
        total_pay: [{ required: true, message: '请输入产品总价', trigger: 'blur' }],
        total_pre_pay: [{ required: true, message: '请输入预付款', trigger: 'blur' }],
      },
    }
  },
  created () {

    if (this.$route.query.source_id) {
      this.listQuery.filter_col = 'project_no'
      this.listQuery.filter_val = this.$route.query.source_id
    }
    this.getList()
  },
  watch: {
    'order.items': {
      handler (newVal, oldVal) {
        var total = 0
        var i
        for (i = 0; i < this.order.items.length; i++) {
          if (this.order.items[i].count) {
            var price, pre
            price = this.order.items[i].product_price.replace(/,/g, '');
            total = total + this.order.items[i].count * price
          }
        }
        this.order.total_pay = parseFloat(total).toLocaleString('zh', { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 })
      }, 'deep': true
    },
    'pre_sale_t_count': {
      handler (newVal, oldVal) {
        if (newVal != oldVal) {
          // console.log(this.pre_sale_t)
          this.pre_sale_tmp = this.pre_sale_t
        }
      }
    }
  },
  methods: {
    openAddPreSale () { //打开新增产品弹窗
      this.preSaleDialogFormVisible = true
      this.pre_sale_item = {
        category: "",
        product_type: "",
        product_price: 0,
        product_date: "",
        fileList: [],
      }
    },
    addToPreSale () {
      this.pre_sale_t.push(this.pre_sale_item)
      this.pre_sale_t_count = this.pre_sale_t.length
      this.preSaleDialogFormVisible = false
    },
    delPreSaleTmp (row) {
      var index = this.pre_sale_tmp.map(e => e.index).indexOf(row.index)
      this.pre_sale_tmp.splice(index, 1)
    },
    submitPreSale () {
      var data = {
        'pre_sales': this.pre_sale_tmp
      }
      bindSale(this.sale_tm_id, data).then(res => {
        this.retrieve()
      })
    },
    handleDownload () {
      this.downloadLoading = true
      exportPreSales(this.listQuery).then((res) => {
        const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const name = `售前处理列表${Date.now()}.xlsx`;
        downloadBlob(res, type, name);
      })
        .finally(() => {
          this.downloadLoading = false
        });
    },
    getList () {
      return getPreSaleList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.tmp = {
          sale_num: "",
        }
      })
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 4 || columnIndex >= 10) {
        if (row.is_start) {
          return [row.pre_sale_count, 1];
        } else {
          return [0, 0]
        }
      }
    },
    modifyStatus (row_id) {
      var data = { 'return_reason': this.closeForm.return_reason }
      ReturnSaleRequest(row_id, data).then(res => {
        this.showReturnReasonDialog = false;
        this.retrieve()
      })
    },
    finishRequest (row_id) {
      FinishSaleRequest(row_id).then(
        this.retrieve()
      )
    },
    canBeSelect (row) {
      return row.status == 'finish'
    },
    handleItemsChange (val) {
      this.order.items = val.pre_sales
      this.order.project_no = val.project_no
    },
    createOrderNum () {
      getOrderNum().then(res => {
        this.order.order_num = res.data.uuid
      })
    },
    handleFilter (params) {
      this.listQuery.page = 1
      this.listQuery.filter_col = params.col ? params.col : ""
      this.listQuery.filter_val = params.val ? params.val : ""
      this.listQuery.filter_status = params.sta ? params.sta : ""
      this.getList()
    },
    showOrder () {
      this.showOrderDialog = true
      this.$nextTick(() => {
        this.$refs['orderForm'].resetFields()
        this.orderList = []
      })
    },
    showTmpDialog (row) {
      this.dialogFormVisible = true
      this.pre_sale_tmp = row.pre_sales
      this.pre_sale_t = row.pre_sales
      this.sale_tm_id = row.id
      this.categories = row.categories
    },
    handleRemove (file, fileList) {
      this.fileList = fileList
    },
    handleRemoveFile (file, fileList) {
      this.orderList = fileList
    },
    beforeUpload (file, type) {
      let fd = new FormData();
      fd.append('file', file);//传文件
      fd.append('type', 'file');//传文件
      fd.append('source_type', type);//传文件
      uploadFile(fd).then(res => {
        if (type == "order") {
          this.orderList.push(res.data)
        } else {
          this.pre_sale_item.fileList.push(res.data)
        }
      })
    },
    addOrder () {
      this.$refs['orderForm'].validate((valid) => {
        if (valid) {
          let ids = []
          for (let i = 0; i < this.orderList.length; i++) {
            ids.push(this.orderList[i].id)
          }
          this.order.upload_ids = ids.join()
          createOrder(this.order).then(res => {
            this.$refs['orderForm'].resetFields();
            this.showOrderDialog = false
          })
        }
      })
    },
    retrieve () {
      this.getList().then(res => {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    showReturn (row) {
      this.showReturnReasonDialog = true;
      this.$nextTick(() => {
        this.$refs['closeForm'].resetFields()
        this.return_row = row.id
      })
    },
  }
}
</script>

<style>
.el-dialog {
  width: 700px;
}
.filter-container {
  margin-bottom: 20px;
}
.filter-item {
  margin-left: 5px;
  margin-right: 15px;
}
.small_input {
  float: left;
  width: 43%;
}
.small_input_right {
  margin-left: 15px;
}
.input_val {
  width: 50% !important;
}

.el-table--striped
  .el-table__body
  tr.el-table__row--striped.el-table__row--striped.el-table__row--striped
  td {
  background-color: #f0f9eb; /*替换为你需要的颜色，觉得优先级不够就加!important*/
}
</style>