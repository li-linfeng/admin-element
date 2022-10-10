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
              @selection-change="handleItemsChange"
              style="width: 100%; max-width: 1600px;">
      <el-table-column type="selection"
                       :selectable="canBeSelect"
                       width="55">
      </el-table-column>

      <el-table-column label="需求编号"
                       align="center"
                       width="200">
        <template slot-scope="{row}">
          <span>{{row.sale_request.sale_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目编号"
                       align="center"
                       width="100">
        <template slot-scope="{row}">
          <span>{{row.sale_request.project_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户名称"
                       align="center"
                       width="120">
        <template slot-scope="{row}">
          <span>{{row.sale_request.customer_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品类型"
                       align="center"
                       width="120">
        <template slot-scope="{row}">
          <span>{{row.sale_request.product_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应用条件"
                       align="center"
                       width="120">
        <template slot-scope="{row}">
          <el-button size="mini"
                     type="success"
                     @click="showApplicationDetail(row)">
            查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="创建人"
                       align="center"
                       width="100">
        <template slot-scope="{row}">
          <span>{{row.user.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间"
                       align="center"
                       width="100">
        <template slot-scope="{row}">
          <span>{{row.sale_request.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="希望货期"
                       align="center"
                       width="100">
        <template slot-scope="{row}">
          <span>{{row.sale_request.expect_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理人"
                       align="center"
                       width="100">
        <template slot-scope="{row}">
          <span>{{row.handler ? row.handler.username:""}}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品型号"
                       align="center"
                       width="150">
        <template slot-scope="{row}">
          <span>{{row.product_type }}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品单价"
                       align="center"
                       width="120">
        <template slot-scope="{row}">
          <span>{{row.product_price }}</span>
        </template>
      </el-table-column>

      <el-table-column label="需预付款"
                       align="center"
                       width="120">
        <template slot-scope="{row}">
          <span>{{row.pre_pay }}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品货期"
                       align="center"
                       width="120">
        <template slot-scope="{row}">
          <span>{{row.product_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格有效期"
                       align="center"
                       width="120">
        <template slot-scope="{row}">
          <span>{{row.expired_at }}</span>
        </template>

      </el-table-column>
      <el-table-column label="附件"
                       align="center"
                       width="200">
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
      <el-table-column label="状态"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusMap">
            {{ row.status_cn }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       width="250"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini"
                     type="info"
                     @click="showReturn('detail',row)"
                     v-if="row.status == 'return'">
            退回原因
          </el-button>
          <el-button size="mini"
                     type="info"
                     @click="showTmpDialog(row)"
                     v-if="row.status == 'published'">
            处理
          </el-button>
          <el-button size="mini"
                     type="danger"
                     @click="showReturn('add',row)"
                     v-if="row.status == 'published'">
            退回
          </el-button>
          <el-button size="mini"
                     type="success"
                     @click="modifyStatus('finish',row.id)"
                     v-if="row.status == 'published'">
            完成
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :per_page.sync="listQuery.per_page"
                @pagination="getList" />

    <el-dialog title="处理"
               :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"
               :model="tmp"
               :rules="tmp_rules"
               label-position="left"
               label-width="140px"
               style="width:1200px; height:500px;margin-left:50px;">
        <el-form-item label="需求编号"
                      prop="sale_num">
          <el-input v-model="tmp.sale_num"
                    class="small_input"
                    disabled />
        </el-form-item>

        <el-form-item label="产品型号"
                      prop="product_type">
          <el-input v-model="tmp.product_type"
                    class="small_input" />
        </el-form-item>

        <el-form-item label="产品单价"
                      prop="product_price">
          <el-input v-model="tmp.product_price"
                    class="small_input"
                    v-money:2 />
        </el-form-item>
        <el-form-item label="需预付款"
                      prop="pre_pay">
          <el-input v-model="tmp.pre_pay"
                    class="small_input"
                    v-money:2 />
        </el-form-item>
        <el-form-item label="产品货期"
                      prop="product_date">
          <el-input v-model="tmp.product_date"
                    class="small_input" />
        </el-form-item>
        <el-form-item label="价格有效期"
                      prop="expired_at">

          <el-date-picker v-model="tmp.expired_at"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <div style="width: 400px;margin-bottom: 20px;">
          <el-form-item label="附件">
            <el-upload class="upload-demo"
                       action="uploadFile"
                       :before-upload="(file) => beforeUpload(file, 'pre_sale')"
                       :on-remove="handleRemove"
                       :file-list="fileList">
              <el-button size="small"
                         type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注"
                        prop="remark">
            <el-input v-model="tmp.remark"
                      type="textarea"
                      style="width:80%" />
          </el-form-item>
        </div>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="submit">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="应用条件"
               :visible.sync="showApplication">
      <el-form ref="dataForm"
               :model="application_detail"
               label-position="left"
               label-width="140px"
               style="width:1200px; height:800px;margin-left:50px;">
        <el-form-item label="需求编号"
                      prop="sale_num">
          <el-input v-model="application_detail.sale_num"
                    class="small_input"
                    disabled />
        </el-form-item>

        <el-form-item label="产品类型"
                      prop="product_type">
          <el-input v-model="application_detail.product_type"
                    class="small_input"
                    disabled />
        </el-form-item>

        <el-form-item label="客户名称"
                      prop="customer_type">
          <el-input v-model="application_detail.customer_type"
                    class="small_input"
                    disabled />
        </el-form-item>

        <el-form-item label="希望货期"
                      prop="expect_time">
          <el-input v-model="application_detail.expect_time"
                    class="small_input"
                    disabled />
        </el-form-item>

        <label class="el-form-item__label"
               style="width:700px;font-size: 20px;margin-bottom: 10px;display: block;">应用条件:</label>

        <div style="height:400px">
          <el-form-item label="设备名称"
                        prop="device_name"
                        class="small_input">
            <el-input v-model="application_detail.device_name"
                      class="input_val"
                      disabled />
          </el-form-item>
          <el-form-item label="轴1直径及公差"
                        prop="shaft_one_diameter_tolerance"
                        class="small_input small_input_right">
            <el-input v-model="application_detail.shaft_one_diameter_tolerance"
                      class="input_val"
                      disabled />
          </el-form-item>
          <el-form-item label="驱动类型"
                        prop="driver_type"
                        class="small_input ">
            <el-input v-model="application_detail.driver_type"
                      class="input_val"
                      disabled />
          </el-form-item>
          <el-form-item label="轴2直径及公差"
                        prop="shaft_two_diameter_tolerance"
                        class="small_input  small_input_right">
            <el-input v-model="application_detail.shaft_two_diameter_tolerance"
                      class="input_val"
                      disabled />
          </el-form-item>
          <el-form-item label="驱动功率"
                        prop="driver_power"
                        class="small_input ">
            <el-input v-model="application_detail.driver_power"
                      class="input_val"
                      disabled />
          </el-form-item>
          <el-form-item label="轴1配合段长度"
                        prop="shaft_one_match_distance"
                        class="small_input small_input_right">
            <el-input v-model="application_detail.shaft_one_match_distance"
                      class="input_val"
                      disabled />
          </el-form-item>
          <el-form-item label="使用转速"
                        prop="rpm"
                        class="small_input">
            <el-input v-model="application_detail.rpm"
                      class="input_val"
                      disabled />
          </el-form-item>
          <el-form-item label="轴2配合段长度"
                        prop="shaft_two_match_distance"
                        class="small_input small_input_right">
            <el-input v-model="application_detail.shaft_two_match_distance"
                      class="input_val"
                      disabled />
          </el-form-item>
          <el-form-item label="设定扭矩"
                        prop="torque"
                        class="small_input">
            <el-input v-model="application_detail.torque"
                      class="input_val"
                      disabled />
          </el-form-item>

          <el-form-item label="轴端面间距"
                        prop="shaft_space_distance"
                        class="small_input small_input_right">
            <el-input v-model="application_detail.shaft_space_distance"
                      class="input_val"
                      disabled />
          </el-form-item>
        </div>
        <div style="width:400px;margin-bottom: 20px;">
          <el-form-item label="附件">
            <template>
              <div v-for=" item
                      in
                      application_detail_files"
                   :key="item.name">
                <span>{{item.name}}</span>
                <el-link :underline="false"
                         icon="el-icon-download"
                         :href="item.url"
                         type="primary"
                         download>下载</el-link>
              </div>
            </template>
          </el-form-item>

          <el-form-item label="备注"
                        prop="remark">
            <el-input v-model="application_detail.remark"
                      type="textarea"
                      style="width:80%"
                      disabled />
          </el-form-item>
        </div>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="showApplication = false">
          取消
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
          <el-button type="primary"
                     @click="createOrderNum"
                     style="float:left; margin-left:20px ;">获取编码</el-button>
        </el-form-item>
        <el-form-item label="客户名称"
                      prop="customer_name">
          <el-input v-model="order.customer_name" />
        </el-form-item>
        <el-form-item v-for="item in order.items"
                      label="编号"
                      :key="item.id">
          <span style="padding:10px">{{item.sale_num}}</span>
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
                   @click="modifyStatus('return', return_row)">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getPreSaleList, updatePreSale, modifyPreSaleStatus, exportPreSales } from '@/api/preSale'
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
      list: null,
      description: "",
      downloadLoading: false,
      total: 0,
      select: null,
      dialogFormVisible: false,
      showApplication: false,
      showOrderDialog: false,
      showReturnReasonDialog: false,
      showReturnReasonAction: 'add',
      dialogAction: "update",
      application_detail: {
        sale_num: ""
      },
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
          "key": "sale_num",
          "name": "需求编号",
        },
        {
          "key": "saleRequest.filter_customer_type",
          "name": "客户名称",
        },
        {
          "key": "saleRequest.filter_product_type",
          "name": "产品性质",
        },
        {
          "key": "product_type",
          "name": "产品型号",
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
      application_detail_files: [],
      fileList: [],
      orderList: [],
      listQuery: {
        page: 1,
        per_page: 10,
        filter_col: "",
        filter_val: "",
        filter_status: "",
      },
      tmp: {
        sale_num: "",
        product_price: 0,
        expired_at: "",
      },
      closeForm: {
        return_reason: ""
      },
      return_row: 0,
      order: {
        order_num: "",
        customer_name: "",
        total_pay: 0,
        total_pre_pay: 0,
        items: [],
        remark: "",
      },
      tmp_rules: {
        product_type: [{ required: true, message: '请输入产品型号', trigger: 'blur' }],
        product_price: [{ required: true, message: '请输入产品单价', trigger: 'blur' }],
        pre_pay: [{ required: true, message: '请输入预付款', trigger: 'blur' }],
        product_date: [{ required: true, message: '请输入产品货期', trigger: 'blur' }],
      },
      order_rules: {
        order_num: [{ required: true, message: '请填写名称', trigger: 'change' }],
        customer_name: [{ required: true, message: '请填写客户名称', trigger: 'blur' }],
        items: [{ required: true, message: '请选择一个销售需求', trigger: 'blur' }],
        total_pay: [{ required: true, message: '请输入产品总价', trigger: 'blur' }],
        total_pre_pay: [{ required: true, message: '请输入预付款', trigger: 'blur' }],
      },
    }
  },
  created () {

    if (this.$route.query.source_id) {
      this.listQuery.filter_col = 'sale_num'
      this.listQuery.filter_val = this.$route.query.source_id
    }
    this.getList()
  },
  watch: {
    'order.items': {
      handler (newVal, oldVal) {
        var total = 0
        var total_pre = 0
        var i
        for (i = 0; i < this.order.items.length; i++) {
          if (this.order.items[i].count) {
            var price, pre
            price = this.order.items[i].product_price.replace(/,/g, '');
            pre = this.order.items[i].pre_pay.replace(/,/g, '');
            total = total + this.order.items[i].count * price
            total_pre = total_pre + this.order.items[i].count * pre
          }
        }
        this.order.total_pay = parseFloat(total).toLocaleString('zh', { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 })
        this.order.total_pre_pay = parseFloat(total_pre).toLocaleString('zh', { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 })
      }, 'deep': true
    },
  },
  methods: {
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
    modifyStatus (status, row_id) {
      var data = { 'status': status, 'return_reason': this.closeForm.return_reason }
      modifyPreSaleStatus(row_id, data).then(res => {
        this.showReturnReasonDialog = false;
        this.retrieve()
      })
    },
    canBeSelect (row) {
      return row.status == 'finish'
    },
    handleItemsChange (val) {
      this.order.items = val
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
    showApplicationDetail (row) {
      this.showApplication = true
      this.application_detail = row.sale_request
      this.application_detail_files = row.sale_request.uploads
    },
    showTmpDialog (row) {
      this.dialogFormVisible = true
      this.dialogAction = 'update'
      this.$nextTick(() => {
        this.tmp = JSON.parse(JSON.stringify(row))
        this.tmp.product_price = this.tmp.product_price ? this.tmp.product_price : 0
        this.fileList = JSON.parse(JSON.stringify(row.uploads))
      })
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
          this.fileList.push(res.data)
        }
      })
    },
    submit () {
      this.editData()
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
    editData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let ids = []
          for (let i = 0; i < this.fileList.length; i++) {
            ids.push(this.fileList[i].id)
          }
          this.tmp.upload_ids = ids.join()
          updatePreSale(this.tmp.id, this.tmp).then(() => {
            this.retrieve()
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
    showReturn (action, row) {
      this.showReturnReasonDialog = true;
      this.showReturnReasonAction = action;
      this.$nextTick(() => {
        this.$refs['closeForm'].resetFields()
        if (action == "detail") {
          this.closeForm.return_reason = row.return_reason
        } else {
          this.return_row = row.id
        }
      })
    },
  }
}
</script>

<style>
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