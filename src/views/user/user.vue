<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.filter_name"
                placeholder="名称"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleFilter" />
      <el-button class="filter-item"
                 type="primary"
                 icon="el-icon-search"
                 @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item"
                 style="margin-left: 10px;"
                 type="primary"
                 icon="el-icon-edit"
                 @click="showAddDialog">
        增加
      </el-button>
    </div>

    <el-table :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%; max-width: 1600px;">
      <el-table-column label="编号"
                       align="center"
                       width="80">
        <template slot-scope="{row}">
          <span>{{row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称"
                       align="center"
                       width="80">
        <template slot-scope="{row}">
          <span>{{row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关联角色"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <el-tag type="success"
                  v-for="item in row.roles"
                  :key="item.name"
                  style="margin-right:3px;">
            {{ item.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini"
                     type="success"
                     @click="showEditDialog(row)">
            编辑
          </el-button>
          <el-button size="mini"
                     type="danger"
                     @click="deleteData(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :per_page.sync="listQuery.per_page"
                @pagination="getList" />

    <el-dialog :title="dialogAction == 'add' ? '增加' :'编辑'"
               :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"
               :rules="rules"
               :model="tmp"
               label-position="left"
               label-width="70px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="tmp.username" />
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="tmp.email" />
        </el-form-item>
        <el-form-item :label="dialogAction == 'add'?'密码':'新密码'"
                      prop="password">
          <el-input v-model="tmp.password"
                    type="password" />
        </el-form-item>
        <el-form-item label="角色"
                      prop="roles">
          <el-select v-model="tmp.roles"
                     multiple
                     placeholder="请选择">
            <el-option v-for="item in role_options"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="dialogAction =='add' ? addData() :editData()">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getUserList, createUser, updateUser, deleteUser } from '@/api/user'
import { getRoleList } from '@/api/role'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'UserIndex',
  components: { Pagination },
  data () {
    return {
      list: null,
      total: 0,
      dialogFormVisible: false,
      dialogAction: "add",
      role_options: [],
      listQuery: {
        page: 1,
        per_page: 10,
        filter_name: "",
      },
      tmp: {
        email: "",
        username: '',
        password: "",
        roles: [],
      },
      rules: {
        email: [{ required: true, message: '请填写邮箱', trigger: 'blur' }],
        username: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }],
      },
    }
  },
  created () {
    this.getList()
    getRoleList().then(res => {
      this.role_options = res.data
    })
  },
  methods: {
    getList () {
      return getUserList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
      })
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    showAddDialog () {
      this.dialogFormVisible = true
      this.dialogAction = "add"
      this.tmp = {
        email: "",
        username: '',
        password: "",
        roles: [],
      }
    },
    showEditDialog (row) {
      this.dialogFormVisible = true
      this.dialogAction = "edit"
      this.tmp = JSON.parse(JSON.stringify(row))
      var ids = []
      for (var i in row.roles) {
        ids.push(row.roles[i].id)
      }
      this.tmp.roles = ids
    },
    addData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createUser(this.tmp).then(() => {
            this.retrieve()
          })
        }
      })
    },
    editData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateUser(this.tmp.id, this.tmp).then(() => {
            this.retrieve()
          })
        }
      })
    },
    deleteData (row) {
      deleteUser(row.id).then(res => {
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
</style>