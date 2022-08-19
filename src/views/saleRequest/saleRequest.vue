<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.filter_name" placeholder="名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="showAddDialog">
        增加
      </el-button>
    </div>

  <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%; max-width: 1600px;"
  >
     <el-table-column label="需求编号"  align="center" width="180" >
        <template slot-scope="{row}">
          <span>{{row.sale_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户类型"  align="center" width="80" >
        <template slot-scope="{row}">
          <span>{{row.customer_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品性质"  align="center" width="80" >
        <template slot-scope="{row}">
          <span>{{row.product_type }}</span>
        </template>
      </el-table-column>
     <el-table-column label="附件"  align="center" width="200" >
        <template slot-scope="{row}">
          <span>{{row.upload_filename}}</span>  <el-link :underline="false" icon="el-icon-download" :href="row.upload_url"  type="primary">下载</el-link>
        </template>
      </el-table-column>
      <el-table-column label="应用条件"  align="center" width="80" >
        <template slot-scope="{row}">
           <el-button  size="mini" type="success"   @click="showCondition(row)">
            查看
          </el-button>
        </template>
      </el-table-column>
     <el-table-column label="备注"  align="center" width="200" >
        <template slot-scope="{row}">
          <span>{{row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态"  width="200" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusMap">
            {{ row.status_cn }}
          </el-tag>
        </template>
      </el-table-column>
    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}" >
        <el-button  size="mini" type="success"   @click="showEditDialog(row)">
            编辑
        </el-button>
        <el-button  size="mini" type="danger"   @click="deleteData(row)">
            删除
        </el-button>
        </template> 
     </el-table-column>
  </el-table>

  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :per_page.sync="listQuery.per_page" @pagination="getList" />

  <el-dialog :title="dialogAction == 'add' ? '增加' :'编辑'" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="tmp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="tmp.name" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="tmp.description" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"  />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogAction =='add' ? addData :editData">
          确认
        </el-button>
      </div>
  </el-dialog>

  </div>
</template>

<script>
import { getSaleRequestList, createSaleRequest, updateSaleRequest, deleteSaleRequest  } from '@/api/saleRequest'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'SaleRequestIndex',
  components: { Pagination },
  filters :{
    statusMap: (status) => { // msg表示要过滤的数据，a表示传入的参数
        var sta = {
            open: 'success',
            handle: 'primary',
            finish: 'info',
            cancel: 'error',
        }
        return sta.status
    }
  },  
  data() {
    return {
      list: null,
      description: "",
      total: 0,
      dialogFormVisible: false,
      dialogAction: "add",
      listQuery: {
        page: 1,
        per_page: 10,
        filter_name:"",
      },
      tmp: {
        name: "",
        description: '',
      },
      rules: {
        name: [{ required: true, message: '请填写名称', trigger: 'change' }],
        description: [{ required: true, message: '请填写描述', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      return getSaleRequestList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    showAddDialog(){
      this.dialogFormVisible = true
      this.dialogAction = "add"
    },
    showEditDialog(row){
      this.dialogFormVisible = true
      this.dialogAction = "edit"
      this.tmp = row
    },
    addData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createSaleRequest(this.tmp).then(() => {
            this.retrieve()
          })
        }
      })
    },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateSaleRequest(this.tmp.id, this.tmp).then(() => {
            this.retrieve()
          })
        }
      })
    },
    deleteData(row){
      deleteSaleRequest(row.id).then(res=>{
        this.retrieve()
      })
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
    .filter-container {
        margin-bottom: 20px;
    }
   .filter-item {
        margin-left: 5px;
        margin-right: 15px;
    }
</style>