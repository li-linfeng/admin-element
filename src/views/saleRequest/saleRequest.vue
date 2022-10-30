<template>
  <div class="app-container">
    <QueryCol :status="statusOptions"
              :cols="cols"
              :filter_col="listQuery.filter_col"
              :filter_status="listQuery.filter_status"
              :filter_val="listQuery.filter_val"
              @handleFilter="handleFilter" />
    <el-button class="filter-item"
               style="margin-left: 10px; margin-bottom: 25px;"
               type="primary"
               icon="el-icon-edit"
               @click="showDialog('add')">
      增加
    </el-button>

    <el-button :loading="downloadLoading"
               style="margin:0 0 20px 20px;"
               type="primary"
               icon="el-icon-document"
               @click="handleDownload">
      导出excel
    </el-button>

    <el-table :data="list"
              border
              fit
              stripe
              highlight-current-row
              style="width: 100%; max-width: 1600px;">

      <el-table-column label="序号"
                       align="center"
                       width="100">
        <template slot-scope="{row}">
          <span>{{row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目编号"
                       align="center"
                       width="200">
        <template slot-scope="{row}">
          <span>{{row.project_no }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户名称"
                       align="center"
                       width="120">
        <template slot-scope="{row}">
          <span>{{row.customer_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品类型"
                       align="center"
                       width="120">
        <template slot-scope="{row}">
          <span v-for="item in row.product_type_arr"
                :key="item"
                style="display: block;">{{item}}</span>
        </template>
      </el-table-column>
      <el-table-column label="希望货期"
                       align="center"
                       width="120">
        <template slot-scope="{row}">
          <span>{{row.expect_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="附件"
                       align="center"
                       width="220">
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
      <el-table-column label="创建人"
                       align="center"
                       width="120">
        <template slot-scope="{row}">
          <span>{{row.user.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间"
                       align="center"
                       width="160">
        <template slot-scope="{row}">
          <span>{{row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应用条件"
                       align="center"
                       width="80">
        <template slot-scope="{row}">
          <el-button size="mini"
                     type="success"
                     @click="showDialog('detail',row)">
            查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="处理人"
                       align="center"
                       width="90">
        <template slot-scope="{row}">
          <span>{{row.handler.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini"
                     type="danger"
                     v-if="row.status == 'open' || row.status=='return' "
                     @click="publish(row)">
            发布
          </el-button>
          <el-button size="mini"
                     type="primary"
                     v-if="row.status == 'open' || row.status=='return' "
                     @click="showDialog('update',row)">
            修改
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态"
                       width="90"
                       align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusMap"
                  @click="showStatus(row)">
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

    <el-dialog :title="actions[dialogAction]"
               :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"
               :model="tmp"
               label-position="left"
               label-width="140px"
               style="width:1200px;min-width: 1200px; height:800px;margin-left:50px;"
               :rules="rules">
        <el-form-item label="项目编号"
                      prop="project_no">
          <el-input v-model="tmp.project_no"
                    class="small_input"
                    :disabled="editable[dialogAction]" />
        </el-form-item>
        <el-form-item label="产品类型"
                      prop="product_type">
          <el-select v-model="tmp.product_type"
                     multiple
                     :disabled="editable[dialogAction]"
                     placeholder="请选择">
            <el-option v-for="item in product_types"
                       :key="item.key"
                       :label="item.key"
                       :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="希望货期"
                      prop="expect_time">
          <el-input v-model="tmp.expect_time"
                    class="small_input"
                    :disabled="editable[dialogAction]" />
        </el-form-item>

        <label class="el-form-item__label"
               style="width:700px;font-size: 20px;margin-bottom: 10px;display: block;">应用条件:</label>

        <div style="height:400px;width: 800px;">
          <el-form-item label="设备名称"
                        prop="device_name"
                        class="small_input">
            <el-input v-model="tmp.device_name"
                      class="input_val"
                      :disabled="editable[dialogAction]" />
          </el-form-item>
          <el-form-item label="轴1直径及公差"
                        prop="shaft_one_diameter_tolerance"
                        class="small_input small_input_right">
            <el-input v-model="tmp.shaft_one_diameter_tolerance"
                      class="input_val"
                      :disabled="editable[dialogAction]" />
          </el-form-item>
          <el-form-item label="驱动类型"
                        prop="driver_type"
                        class="small_input ">
            <el-input v-model="tmp.driver_type"
                      class="input_val"
                      :disabled="editable[dialogAction]" />
          </el-form-item>
          <el-form-item label="轴2直径及公差"
                        prop="shaft_two_diameter_tolerance"
                        class="small_input  small_input_right">
            <el-input v-model="tmp.shaft_two_diameter_tolerance"
                      class="input_val"
                      :disabled="editable[dialogAction]" />
          </el-form-item>
          <el-form-item label="驱动功率"
                        prop="driver_power"
                        class="small_input ">
            <el-input v-model="tmp.driver_power"
                      class="input_val"
                      :disabled="editable[dialogAction]" />
          </el-form-item>
          <el-form-item label="轴1配合段长度"
                        prop="shaft_one_match_distance"
                        class="small_input small_input_right">
            <el-input v-model="tmp.shaft_one_match_distance"
                      class="input_val"
                      :disabled="editable[dialogAction]" />
          </el-form-item>
          <el-form-item label="使用转速"
                        prop="rpm"
                        class="small_input">
            <el-input v-model="tmp.rpm"
                      class="input_val"
                      :disabled="editable[dialogAction]" />
          </el-form-item>
          <el-form-item label="轴2配合段长度"
                        prop="shaft_two_match_distance"
                        class="small_input small_input_right">
            <el-input v-model="tmp.shaft_two_match_distance"
                      class="input_val"
                      :disabled="editable[dialogAction]" />
          </el-form-item>
          <el-form-item label="设定扭矩"
                        prop="torque"
                        class="small_input">
            <el-input v-model="tmp.torque"
                      class="input_val"
                      :disabled="editable[dialogAction]" />
          </el-form-item>

          <el-form-item label="轴端面间距"
                        prop="shaft_space_distance"
                        class="small_input small_input_right">
            <el-input v-model="tmp.shaft_space_distance"
                      class="input_val"
                      :disabled="editable[dialogAction]" />
          </el-form-item>
        </div>
        <div style="width: 400px;margin-bottom: 20px;">
          <el-form-item label="附件">
            <el-upload class="upload-demo"
                       action="uploadFile"
                       :disabled="editable[dialogAction]"
                       :before-upload="beforeUpload"
                       :on-remove="handleRemove"
                       :file-list="fileList">
              <el-button size="small"
                         type="primary"
                         :disabled="editable[dialogAction]">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注"
                        prop="remark">
            <el-input v-model="tmp.remark"
                      type="textarea"
                      style="width:80%"
                      :disabled="editable[dialogAction]" />
          </el-form-item>
        </div>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="submit"
                   :disabled="editable[dialogAction]">
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
                    disabled
                    :rows="4" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="showReturnReasonDialog = false">
          取消
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getSaleRequestList, createSaleRequest, updateSaleRequest, deleteSaleRequest, getSaleRequestNum, publishSaleRequest, exportSaleRequest } from '@/api/saleRequest'
import { uploadFile } from '@/api/upload'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import QueryCol from '@/components/QueryCol' // secondary package based on el-pagination
import { downloadBlob } from '@/utils/help'

export default {
  name: 'SaleRequestIndex',
  components: { Pagination, QueryCol },
  filters: {
    statusMap: (status) => { // msg表示要过滤的数据，a表示传入的参数
      var sta = {
        open: 'info',
        published: 'primary',
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
      showReturnReasonDialog: false,
      closeForm: {
        return_reason: ""
      },
      total: 0,
      actions: {
        'add': '+新需求',
        'detail': '详情',
        'update': '编辑',
      },
      editable: {
        'add': false,
        'detail': true,
        'update': false,
      },
      dialogFormVisible: false,
      dialogAction: "add",
      statusOptions: [
        {
          name: "占用",
          key: "open",
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
      product_types: [
        { "key": "HNCTL", "val": "HNCTL" },
        { "key": "HNCGD", "val": "HNCGD" },
        { "key": "HNCFE", "val": "HNCFE" },
        { "key": "HNCGR", "val": "HNCGR" },
        { "key": "HNCWD", "val": "HNCWD" },
      ],
      fileList: [],
      listQuery: {
        page: 1,
        per_page: 10,
        filter_col: "",
        filter_val: "",
        filter_status: "",
      },
      tmp: {
        project_no: "",
        product_type: [],
        expect_time: "",
        device_name: "",
        shaft_one_diameter_tolerance: "",
        driver_type: "",
        shaft_two_diameter_tolerance: "",
        driver_power: "",
        shaft_one_match_distance: "",
        rpm: "",
        shaft_two_match_distance: "",
        torque: "",
        shaft_space_distance: "",
        remark: "",
      },
      rules: {
        project_no: [{ required: true, message: '请填写项目编号', trigger: 'blur' }],
        product_type: [{ required: true, message: '请填写产品性质', trigger: 'blur' }],
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
  methods: {
    showStatus (row) {
      if (row.status == 'return') {
        this.closeForm.return_reason = row.return_reason
        this.showReturnReasonDialog = true
      }
    },
    handleDownload () {
      this.downloadLoading = true
      exportSaleRequest(this.listQuery).then((res) => {
        const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const name = `销售需求列表${Date.now()}.xlsx`;
        downloadBlob(res, type, name);
      })
        .finally(() => {
          this.downloadLoading = false
        });
    },
    getList () {
      return getSaleRequestList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
      })
    },
    handleFilter (params) {
      this.listQuery.page = 1
      this.listQuery.page = 1
      this.listQuery.filter_col = params.col ? params.col : ""
      this.listQuery.filter_val = params.val ? params.val : ""
      this.listQuery.filter_status = params.sta ? params.sta : ""
      this.getList()
    },
    showDialog (action, row) {
      this.dialogFormVisible = true
      this.dialogAction = action
      this.$nextTick(() => {
        if (action == "add") {
          this.$refs['dataForm'].resetFields()
          this.fileList = []
        } else {
          this.tmp = JSON.parse(JSON.stringify(row))
          this.tmp.product_type = row.product_type_arr
          this.fileList = JSON.parse(JSON.stringify(row.uploads))
        }
      })
    },
    getSaleNum () {
      getSaleRequestNum().then(res => {
        this.tmp.sale_num = res.data.uuid
      })
    },
    handleRemove (file, fileList) {
      this.fileList = fileList
    },
    beforeUpload (file, fileList) {
      let fd = new FormData();
      fd.append('file', file);//传文件
      fd.append('type', 'file');//传文件
      fd.append('source_type', 'sale_request');//传文件
      uploadFile(fd).then(res => {
        this.fileList.push(res.data)
      })
    },
    submit () {
      if (this.dialogAction == "add") {
        this.handleData(createSaleRequest)
      } else {
        this.handleData(updateSaleRequest)
      }
    },
    handleData (fn) {
      let ids = []
      for (let i = 0; i < this.fileList.length; i++) {
        ids.push(this.fileList[i].id)
      }
      this.tmp.upload_ids = ids.join()
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          fn(this.tmp, this.tmp.id).then(() => {
            this.retrieve()
          })
        }
      })
    },
    publish (row) {
      publishSaleRequest(row.id).then(res => {
        this.retrieve()
      })
    },
    deleteData (row) {
      deleteSaleRequest(row.id).then(res => {
        this.retrieve()
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