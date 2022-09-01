<template>
  <div class="app-container">
    <div class="filter-container">
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
     <el-table-column label="编号"  align="center" width="80" >
        <template slot-scope="{row}">
          <span>{{row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称"  width="200" align="center">
        <template slot-scope="{row}">
          <span>{{row.name }}</span>
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

  <el-dialog :title="dialogAction == 'add' ? '增加' :'编辑'" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="tmp" label-position="left" label-width="85px" style="width: 400px; margin-left:50px;">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="tmp.name" />
        </el-form-item>
        <el-form-item label="权限" prop="permissions">
          <el-tree
            :data="permissions"
            show-checkbox
            node-key="value"
            ref="tree"
            :expand-on-click-node="false">
          </el-tree>
        </el-form-item>
       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogAction =='add' ? addData() :editData()">
          确认
        </el-button>
      </div>
  </el-dialog>

  </div>
</template>

<script>
import { getRoleList, createRole, updateRole, deleteRole  } from '@/api/role'
import { getPermissions } from '@/api/permission'

export default {
  name: 'RoleIndex',
  data() {
    return {
      list: null,
      permissions:[],
      dialogFormVisible: false,
      dialogAction: "add",
      listQuery: {
        filter_name:"",
      },
      tmp: {
        name: "",
        permissions: [],
      },
      rules: {
        name: [{ required: true, message: '请填写名称', trigger: 'change' }],
        permissions: [{ required: true, message: '请选择权限', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.getList()
    getPermissions().then(res=>{
      this.permissions = res.data
    })
  },
  methods: {
    getList() {
      return getRoleList(this.listQuery).then(response => {
        this.list = response.data
      })
    },
    handleFilter() {
      this.getList()
    },
    showAddDialog(){
      this.dialogFormVisible = true
      this.dialogAction = "add"
      this.$nextTick(()=>{
        this.$refs.tree.setCheckedKeys([])
        this.tmp ={
          name: "",
          permissions: [],
        }
      })  
    },
    showEditDialog(row){
      //清空原来选中的节点
      this.dialogFormVisible = true
      this.dialogAction = "edit"  
      this.$nextTick(()=>{
        this.$refs.tree.setCheckedNodes([])
        this.tmp = row
        var checked = []
        for (var index in row.permissions){
          checked.push(row.permissions[index].permission)
        }
        this.$refs.tree.setCheckedKeys(checked)
      })
    },
    addData() {
      this.tmp.permissions = this.$refs.tree.getCheckedNodes()
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createRole(this.tmp).then(() => {
            this.retrieve()
          })
        }
      })
    },
    editData() {
      this.tmp.permissions = this.$refs.tree.getCheckedNodes()
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateRole(this.tmp.id, this.tmp).then(() => {
            this.retrieve()
          })
        }
      })
    },
    deleteData(row){
      deleteRole(row.id).then(res=>{
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