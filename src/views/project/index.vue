<template>
  <div class="app-container">
    <QueryCol :status="status"
              :cols="cols"
              :filter_col="listQuery.filter_col"
              :filter_status="listQuery.filter_status"
              :filter_val="listQuery.filter_val"
              @handleFilter="handleFilter" />
    <el-button class="filter-item"
               style="margin-left: 10px; margin-bottom: 25px;"
               type="primary"
               icon="el-icon-edit"
               @click="openDialogForm">
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
                       prop="id"
                       align="center"
                       width="80">
        <template slot-scope="{row}">
          <span>{{row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目编号"
                       prop="id"
                       align="center"
                       width="200">
        <template slot-scope="{row}">
          <span>{{row.project_no }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目名称"
                       width="150"
                       align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户名"
                       width="150"
                       align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.customer_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="需求产品"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.product_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人"
                       width="120"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.user.username ? row.user.username: "" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span v-if="row.status =='continue'"
                style="margin-right:10px">
            <el-button type="primary"
                       size="mini"
                       @click="showDetailDialog(row)">
              详情
            </el-button>
            <el-button type="primary"
                       size="mini"
                       @click="showCloseDialog('add',row)">
              关闭丢单
            </el-button>
            <el-button v-if="row.status!='published'"
                       size="mini"
                       type="success"
                       @click="handleModifyStatus(row.id,'finish')">
              关闭拿单
            </el-button>
          </span>
          <el-button size="mini"
                     type="info"
                     @click="showCloseDialog('detail',row)"
                     v-if="row.status == 'cancel'">
            丢单原因
          </el-button>
          <el-button size="mini"
                     type="danger"
                     @click="deleteData(row)">
            删除
          </el-button>
        </template>

      </el-table-column>
      <el-table-column label="状态"
                       width="120"
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

    <el-dialog :title="action =='detail' ? '详情':'新增项目'"
               :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"
               :rules="rules"
               :model="tmp"
               label-position="left"
               label-width="110px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="项目编号"
                      prop="name">
          <el-input v-model="tmp.project_no"
                    :disabled="action=='detail'" />
        </el-form-item>
        <el-form-item label="项目名称"
                      prop="name">
          <el-input v-model="tmp.name"
                    :disabled="action=='detail'" />
        </el-form-item>
        <el-form-item label="客户名"
                      prop="customer_name">
          <el-input v-model="tmp.customer_name"
                    :disabled="action=='detail'" />
        </el-form-item>
        <el-form-item label="需求产品"
                      prop="product_name">
          <el-input v-model="tmp.product_name"
                    :disabled="action=='detail'" />
        </el-form-item>
        <el-form-item label="项目节点"
                      prop="product_time">
          <el-date-picker v-model="tmp.project_time"
                          type="monthrange"
                          range-separator="至"
                          start-placeholder="开始月份"
                          end-placeholder="结束月份"
                          value-format="yyyy-MM"
                          :disabled="action=='detail'">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目预估金额"
                      prop="cost">
          <el-input v-model="tmp.cost"
                    :disabled="action=='detail'" />
        </el-form-item>
        <el-form-item label="竞品信息">
          <el-input v-model="tmp.compare_info"
                    type="textarea"
                    :rows="4"
                    :disabled="action=='detail'" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="createData()"
                   :disabled="action=='detail'">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="关闭丢单原因"
               :visible.sync="showCloseReasonDialog"
               width="30%">
      <el-form ref="closeForm"
               :model="closeForm"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="丢单原因">
          <el-input v-model="closeForm.close_reason"
                    :disabled="showCloseReasonAction =='detail'"
                    type="textarea"
                    :rows="4" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancelCloseReasonDialog">
          取消
        </el-button>
        <el-button type="primary"
                   :disabled="showCloseReasonAction =='detail'"
                   @click="handleModifyStatus(close_row_id, 'cancel')">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getProjectList, addProject, updateProjectsStatus, deleteProjects, exportProjects } from '@/api/project'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import QueryCol from '@/components/QueryCol' // secondary package based on el-pagination
import { downloadBlob } from '@/utils/help'

export default {
  name: 'ProjectIndex',
  components: { Pagination, QueryCol },
  filters: {
    statusMap: (status) => { // msg表示要过滤的数据，a表示传入的参数
      var sta = {
        'continue': 'success',
        'cancel': 'danger',
        'finish': 'info'
      }
      return sta[status]
    }
  },
  data () {
    return {
      list: null,
      total: 0,
      action: "add",
      downloadLoading: false,
      showCloseReasonDialog: false,
      showCloseReasonAction: 'add',
      closeForm: {
        close_reason: ""
      },
      close_row_id: 0,
      cols: [
        {
          "key": "id",
          "name": "编号",
        },
        {
          "key": "name",
          "name": "项目名称",
        },
        {
          "key": "customer_name",
          "name": "客户名",
        },
        {
          "key": "product_name",
          "name": "需求产品",
        },
        {
          "key": "user.filter_name",
          "name": "创建人",
        },
      ],
      status: [
        {
          "key": "continue",
          "name": "进行中"
        },
        {
          "key": "cancel",
          "name": "关闭丢单"
        },
        {
          "key": "finish",
          "name": "关闭拿单"
        },
      ],
      listQuery: {
        page: 1,
        per_page: 10,
        filter_status: "",
        filter_col: "",
        filter_val: "",
      },
      tmp: {
        name: "",
        product_name: '',
        customer_name: '',
        project_time: [],
        cost: '',
        compare_info: "",
        project_no: "",
      },
      dialogFormVisible: false,
      rules: {
        project_no: [{ required: true, message: '请填写项目编号', trigger: 'change' }],
        name: [{ required: true, message: '请填写项目名称', trigger: 'change' }],
        product_name: [{ required: true, message: '请填写需求产品', trigger: 'change' }],
        customer_name: [{ required: true, message: '请填写客户名称', trigger: 'change' }],
      },
    }
  },
  created () {
    this.getList()
  },
  methods: {
    handleDownload () {
      this.downloadLoading = true
      exportProjects(this.listQuery).then((res) => {
        const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const name = `项目列表${Date.now()}.xlsx`;
        downloadBlob(res, type, name);
      })
        .finally(() => {
          this.downloadLoading = false
        });
    },
    getList () {
      return getProjectList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
      })
    },
    handleFilter (params) {
      this.listQuery.page = 1
      this.listQuery.filter_col = params.col ? params.col : ""
      this.listQuery.filter_val = params.val ? params.val : ""
      this.listQuery.filter_status = params.sta ? params.sta : ""
      this.getList()
    },
    openDialogForm () {
      this.dialogFormVisible = true
      this.action = 'add'
      this.$nextTick(() => {
        this.tmp = {
          name: "",
          product_name: '',
          customer_name: '',
          project_time: [],
          cost: '',
          compare_info: "",
          project_no: "",
        }
      })
    },
    handleModifyStatus (id, status) {
      var data = { "status": status, "close_reason": this.closeForm.close_reason }
      updateProjectsStatus(id, data).then(res => {
        if (status == 'cancel') {
          this.$refs['closeForm'].resetFields()
          this.showCloseReasonAction = 'add'
          this.showCloseReasonDialog = false
        }
        this.retrieve()
      })
    },
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addProject(this.tmp).then(() => {
            this.getList().then(res => {
              this.dialogFormVisible = false
              this.$refs['dataForm'].resetFields()
              this.retrieve()
            })
          })
        }
      })
    },
    deleteData (row) {
      deleteProjects(row.id).then(res => {
        this.retrieve()
      })
    },
    showDetailDialog (row) {
      this.dialogFormVisible = true
      this.action = 'detail'
      this.$nextTick(() => {
        this.tmp = JSON.parse(JSON.stringify(row))
      })
    },
    showCloseDialog (action, row) {
      this.close_row_id = row.id
      this.showCloseReasonDialog = true
      this.showCloseReasonAction = action
      if (action == "detail") {
        this.closeForm.close_reason = row.close_reason
      } else {
        this.closeForm.close_reason = ''
      }
    },
    cancelCloseReasonDialog () {
      this.close_row_id = 0
      this.showCloseReasonDialog = false
      this.$refs['closeForm'].resetFields()
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
  margin-right: 15px;
}

.description {
  font-size: 16px;
}

.el-table--striped
  .el-table__body
  tr.el-table__row--striped.el-table__row--striped.el-table__row--striped
  td {
  background-color: #f0f9eb; /*替换为你需要的颜色，觉得优先级不够就加!important*/
}
</style>