<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.filter_name" placeholder="项目名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.filter_status" placeholder="状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in status" :key="item.key" :label="item.name" :value="item.key" />
      </el-select>
      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click=" dialogFormVisible = true">
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
     <el-table-column label="编号" prop="id"  align="center" width="80" >
        <template slot-scope="{row}">
          <span>{{row.id }}</span>
        </template>
      </el-table-column>
     <el-table-column label="名称" width="300" align="center">
        <template slot-scope="{row}">
          <span class="link-type" >{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建者" width="200" align="center">
        <template slot-scope="{row}">
          <span>{{ row.user.name ?row.user.name:"" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态"  width="200" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusMap">
            {{ row.status_cn }}
          </el-tag>
        </template>
      </el-table-column>
     <el-table-column label="描述"  width="200" align="center">
        <template slot-scope="{row}">
          <el-button  size="mini" type="success"   @click="showDescription(row)">
            查看
          </el-button>
        </template>
    </el-table-column>
    <el-table-column label="创建时间" width="300" align="center">
        <template slot-scope="{row}">
          <span>{{ row.created_at}} {{row.status =='continue'}}</span>
        </template>
      </el-table-column>
    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}" >
         <span  v-if="row.status =='continue'" style="margin-right:10px">
            <el-button type="primary" size="mini"  @click="handleModifyStatus(row, 'cancel')">
            取消 
            </el-button>
            <el-button v-if="row.status!='published'" size="mini" type="success"   @click="handleModifyStatus(row,'finish')">
                结束
            </el-button>
         </span>
          <el-button v-if="row.status!='published'" size="mini" type="success"   @click="deleteData(row)">
            删除
        </el-button>
        </template> 
     </el-table-column>
  </el-table>
  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :per_page.sync="listQuery.per_page" @pagination="getList" />

  <el-dialog title="新增" :visible.sync="dialogFormVisible">
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
        <el-button type="primary" @click="createData()">
          确认
        </el-button>
      </div>
  </el-dialog>


   <el-dialog title="项目描述" :visible.sync="dialogDescriptionVisible">
     <p class="description">
        {{description}}
     </p>
  </el-dialog>

  </div>
</template>

<script>
import { getProjectList, addProject, updateProjectsStatus, deleteProjects } from '@/api/project'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ProjectIndex',
  components: { Pagination },
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
      description: "",
      total: 0,
      dialogDescriptionVisible: false,
      status:[
        {
            "key" :"continue",
            "name" :"进行中"
        },
        {
            "key" :"cancel",
            "name" :"已取消"
        },
        {
            "key" :"finish",
            "name" :"已完成"
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
        description: '',
      },
      dialogFormVisible: false,
      rules: {
        name: [{ required: true, message: '请填写名称', trigger: 'change' }],
        description: [{ type: 'date', required: true, message: '请填写描述', trigger: 'blur' }],
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
    showDescription(row) {
        this.description = row.description
        this.dialogDescriptionVisible= true
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
     updateProjectsStatus(row.id)
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addProject(this.tmp).then(() => {
            this.getList().then(res=>{
                this.dialogFormVisible = false
                this.$notify({
                    title: 'Success',
                    message: 'Created Successfully',
                    type: 'success',
                    duration: 2000
                })
            })
          })
        }
      })
    },
    deleteData(row){

    }
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