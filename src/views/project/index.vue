<template>
  <div class="app-container">
    <!-- <div class="filter-container">
      <el-input v-model="listQuery.filter_name" placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.filter_status" placeholder="状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in status" :key="item.key" :label="item.name" :value="item.key" />
      </el-select>
      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click=" dialogFormVisible = true">
        增加
      </el-button>
    </div> -->
    <QueryCol :status="status" :clos="cols" :filter_col="listQuery.filter_col" :filter_status="listQuery.filter_status" :filter_val="listQuery.filter_val" @handleFilter="handleFilter" />

    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%; max-width: 1600px;"
    >
      <el-table-column label="编号" prop="id"  align="center" width="80" >
        <template slot-scope="{row}">
          <span>{{row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" width="150" align="center">
        <template slot-scope="{row}">
          <span class="link-type" >{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户名" width="150" align="center">
        <template slot-scope="{row}">
          <span class="link-type" >{{ row.customer_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目节点" width="170" align="center">
        <template slot-scope="{row}">
            <span class="link-type" >{{ row.project_duration}} </span>
        </template>
      </el-table-column>
      <el-table-column label="需求产品" width="200" align="center">
        <template slot-scope="{row}">
          <span class="link-type" >{{ row.product_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目预估金额" width="150" align="center">
        <template slot-scope="{row}">
          <span class="link-type" >{{ row.cost }}</span>
        </template>
      </el-table-column>
      <el-table-column label="需求创建时间" width="160" align="center">
        <template slot-scope="{row}">
          <span>{{ row.created_at}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建者" width="120" align="center">
        <template slot-scope="{row}">
          <span>{{ row.user.username ? row.user.username: "" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态"  width="120" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusMap">
            {{ row.status_cn }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}" >
        <span  v-if="row.status =='continue'" style="margin-right:10px">
            <el-button type="primary" size="mini"  @click="showCloseDialog(row)">
              关闭丢单 
            </el-button>
            <el-button v-if="row.status!='published'" size="mini" type="success"   @click="handleModifyStatus(row.id,'finish')">
              关闭拿单
            </el-button>
        </span>
          <el-button  size="mini" type="danger"    @click="deleteData(row)">
            删除
        </el-button>
        </template> 
      </el-table-column>
  </el-table>

  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :per_page.sync="listQuery.per_page" @pagination="getList" />

  <el-dialog title="新增项目" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="tmp" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="tmp.name" />
        </el-form-item>
        <el-form-item label="客户名" prop="customer_name">
          <el-input v-model="tmp.customer_name" />
        </el-form-item>
        <el-form-item label="需求产品" prop="product_name">
          <el-input v-model="tmp.product_name" />
        </el-form-item>
        <el-form-item label="项目节点" prop="product_time">
          <el-date-picker
          v-model="tmp.project_time" 
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份" 
          value-format="yyyy-MM"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目预估金额" prop="cost">
          <el-input v-model="tmp.cost" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createData()">
          确认
        </el-button>
      </div>
  </el-dialog>

  <el-dialog title="关闭丢单原因" :visible.sync="showCloseReasonDialog" width="30%">
    <el-form  ref="closeForm" :model="closeForm" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="丢单原因" >
          <el-input v-model="closeForm.close_reason"  type="textarea"   :rows="4"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCloseReasonDialog">
          取消
        </el-button>
        <el-button type="primary" @click="handleModifyStatus(close_row_id, 'cancel')">
          确认
        </el-button>
      </div>
  </el-dialog>
  </div>
</template>

<script>
import { getProjectList, addProject, updateProjectsStatus, deleteProjects } from '@/api/project'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import QueryCol from '@/components/QueryCol' // secondary package based on el-pagination

export default {
  name: 'ProjectIndex',
  components: { Pagination, QueryCol },
  filters :{
    statusMap: (status) => { // msg表示要过滤的数据，a表示传入的参数
        var sta = {
            continue: 'success',
            cancel: 'danger',
            finish: 'info'
        }
        return sta.status
    }
  },  
  data() {
    return {
      list: null,
      total: 0,
      showCloseReasonDialog: false,
      closeForm : {
        close_reason:""
      },
      close_row_id: 0,
      cols :[
        {
          "key" : "id",
          "name": "编号",
        },
        {
          "key" : "customer_name",
          "name": "客户名称",
        },
     ],
      status:[
        {
            "key" :"continue",
            "name" :"进行中"
        },
        {
            "key" :"cancel",
            "name" :"关闭丢单"
        },
        {
            "key" :"finish",
            "name" :"关闭拿单"
        },
      ],
      listQuery: {
        page: 1,
        per_page: 10,
        filter_name:"",
        filter_status:"",
      },
      tmp: {
        name: "",
        product_name: '',
        customer_name: '',
        project_time: [],
        cost: '',
      },
      dialogFormVisible: false,
      rules: {
        name         : [{ required: true, message: '请填写项目名称', trigger: 'change' }],
        product_name : [{ required: true, message: '请填写需求产品', trigger: 'change' }],
        customer_name: [{ required: true, message: '请填写客户名称', trigger: 'change' }],
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      return getProjectList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(id, status) {
     var data ={"status":status, "close_reason": this.closeForm.close_reason}
     updateProjectsStatus(id, data).then(res =>{
        if (status == 'cancel'){
          this.$refs['closeForm'].resetFields()
          this.showCloseReasonDialog = false
        }
        this.retrieve()
     })  
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addProject(this.tmp).then(() => {
            this.getList().then(res=>{
                this.dialogFormVisible = false
                this.$refs['dataForm'].resetFields()
                this.retrieve()
            })
          })
        }
      })
    },
    deleteData(row){
      deleteProjects(row.id).then(res=>{
        this.retrieve()
      })
    },
    showCloseDialog(row){
      this.close_row_id =  row.id
      this.showCloseReasonDialog = true
    },
    cancelCloseReasonDialog(){
      this.close_row_id = 0
      this.showCloseReasonDialog = false
      this.$refs['closeForm'].resetFields()
    },
    retrieve(){
      this.getList().then(res=>{
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
    .filter-container{
        margin-bottom: 20px;
    }

   .filter-item {
        margin-right: 15px;
    }

    .description {
        font-size: 16px;
    }
</style>