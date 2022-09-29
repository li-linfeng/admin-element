<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.filter_module"
                 clearable
                 style="margin-right:5px"
                 placeholder="请选择模块">
        <el-option v-for="item in module_options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="listQuery.filter_type"
                 clearable
                 placeholder="请选择产品类型">
        <el-option v-for="(item,index) in type_options"
                   :key="index"
                   :label="item.key"
                   :value="item.val">
        </el-option>
      </el-select>

      <el-button class="filter-item"
                 type="primary"
                 icon="el-icon-search"
                 @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%; max-width: 1600px;">
      <el-table-column label="编号"
                       align="center"
                       width="100">
        <template slot-scope="{row}">
          <span>{{row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模块"
                       align="center"
                       width="200">
        <template slot-scope="{row}">
          <span>{{row.module_cn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品种类"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{row.product_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理人"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <span>{{row.user.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini"
                     type="danger"
                     @click="showAddHandlerDialog(row)">
            设置
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :per_page.sync="listQuery.per_page"
                @pagination="getList" />

    <el-dialog title="处理人"
               :visible.sync="handlerDialogVisible"
               width="30%">
      <el-form ref="handlerForm"
               :model="handlerForm"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="处理人">
          <el-select v-model="handlerForm.handler_id"
                     filterable
                     remote
                     reserve-keyword
                     placeholder="请输入邮箱或者用户名"
                     :remote-method="searchUser"
                     :loading="loading">
            <el-option v-for="item in options"
                       :key="item.id"
                       :label="item.username"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="handlerDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="bindHandler">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { searchUserList } from '@/api/user'
import { getHandlerList, setHandler } from '@/api/handler'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'HandlerIndex',
  components: { Pagination },
  data () {
    return {
      module_options: [
        {
          value: "api.sale_requests",
          label: "销售需求"
        },
        {
          value: "api.preSales",
          label: "售前处理"
        },
        {
          value: "api.order",
          label: "订单"
        },
      ],
      type_options: [
        { "key": "HNCGD", "val": "HNCGD" },
        { "key": "HNCGR", "val": "HNCGR" },
        { "key": "HNCTL", "val": "HNCTL" },
        { "key": "HNCJW", "val": "HNCJW" },
        { "key": "HNCFE", "val": "HNCFE" },
        { "key": "HNCHB", "val": "HNCHB" },
        { "key": "HNCTE", "val": "HNCTE" },
        { "key": "HNCWD", "val": "HNCWD" },
        { "key": "HNCCE", "val": "HNCCE" },
        { "key": "HNCRB", "val": "HNCRB" },
        { "key": "HNCDC", "val": "HNCDC" },
        { "key": "HNGTL", "val": "HNGTL" },
        { "key": "HNGGD", "val": "HNGGD" },
        { "key": "HNGGR", "val": "HNGGR" },
        { "key": "HNGDC", "val": "HNGDC" },
        { "key": "HNGJW", "val": "HNGDC" },
        { "key": "HNGFE", "val": "HNGDC" },
        { "key": "HNGHB", "val": "HNGDC" },
        { "key": "HNGTE", "val": "HNGDC" },
        { "key": "HNGWD", "val": "HNGDC" },
        { "key": "HNGCE", "val": "HNGDC" },
        { "key": "HNGRB", "val": "HNGDC" },
        { "key": "HNSTL", "val": "HNGDC" },
        { "key": "HNSGD", "val": "HNGDC" },
        { "key": "HNSGR", "val": "HNGDC" },
        { "key": "HNSDC", "val": "HNGDC" },
        { "key": "HNSJW", "val": "HNGDC" },
        { "key": "HNSFE", "val": "HNGDC" },
        { "key": "HNSHB", "val": "HNGDC" },
        { "key": "HNSTE", "val": "HNGDC" },
        { "key": "HNSWD", "val": "HNGDC" },
        { "key": "HNSCE", "val": "HNGDC" },
        { "key": "HNSRB", "val": "HNGDC" },
      ],
      options: [],
      loading: false,
      list: null,
      total: 0,
      handlerDialogVisible: false,
      listQuery: {
        page: 1,
        per_page: 10,
        filter_module: "",
        filter_type: "",
      },
      handlerForm: {
        module: "",
        product_type: '',
        user_id: "",
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    showAddHandlerDialog (row) {
      this.$nextTick(() => {
        this.handlerForm = {
          id: row.id,
          handler_id: '',
        }
        this.handlerDialogVisible = true
        this.searchUser()
      })
    },
    searchUser (query) {
      searchUserList({ keyword: query }).then(res => {
        this.options = res.data
      })
    },
    bindHandler () {
      setHandler(this.handlerForm.id, this.handlerForm).then(res => {
        this.handlerDialogVisible = false
        this.retrieve()
      })
    },
    getList () {
      return getHandlerList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
      })
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    retrieve () {
      this.getList().then(res => {
        this.handlerDialogVisible = false
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