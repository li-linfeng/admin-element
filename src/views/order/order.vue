<template>
  <div class="app-container">
    <QueryCol :status="statusOptions"
              :cols="cols"
              :filter_col="listQuery.filter_col"
              :filter_status="listQuery.filter_status"
              :filter_val="listQuery.filter_val"
              @handleFilter="handleFilter" />

    <el-table :data="list"
              border
              fit
              highlight-current-row
              :span-method="arraySpanMethod"
              style="width: 100%; max-width: 1600px;margin-top: 25px;">

      <el-table-column label="订单编号"
                       align="center"
                       width="190">
        <template slot-scope="{row}">
          <span>{{row.order.order_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单总价"
                       align="center"
                       width="130">
        <template slot-scope="{row}">
          <span>{{row.order.total_pay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总预付款"
                       align="center"
                       width="130">
        <template slot-scope="{row}">
          <span>{{row.order.total_pre_pay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="需求编号"
                       align="center"
                       width="190">
        <template slot-scope="{row}">
          <span>{{row.sale_num}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品类型"
                       align="center"
                       width="80">
        <template slot-scope="{row}">
          <span>{{row.sale_request.product_type}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称"
                       align="center"
                       width="150">
        <template slot-scope="{row}">
          <span>{{row.product_type}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品单价"
                       align="center"
                       width="130">
        <template slot-scope="{row}">
          <span>{{row.product_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="单套预付款"
                       align="center"
                       width="130">
        <template slot-scope="{row}">
          <span>{{row.pre_pay}}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量"
                       align="center"
                       width="80">
        <template slot-scope="{row}">
          <span>{{row.amount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品货期"
                       align="center"
                       width="80">
        <template slot-scope="{row}">
          <span>{{row.product_date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人"
                       align="center"
                       width="80">
        <template slot-scope="{row}">
          <span>{{row.user.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理人"
                       align="center"
                       width="80">
        <template slot-scope="{row}">
          <span></span>
        </template>
      </el-table-column>
      <el-table-column label="附件"
                       align="center"
                       width="200">
        <template slot-scope="{row}">
          <div v-for="item in row.order.uploads"
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
      <el-table-column label="备注"
                       align="center"
                       width="200">
        <template slot-scope="{row}">
          <span>{{row.order.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态"
                       width="200"
                       align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusMap">
            {{ row.order.status_cn }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini"
                     type="success"
                     v-if="row.status == 'open'"
                     @click="finishItem(row)">
            处理
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :per_page.sync="listQuery.per_page"
                @pagination="getList" />

  </div>
</template>

<script>
import { getOrderList, finishOrderItem } from '@/api/order'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import QueryCol from '@/components/QueryCol'

export default {
  name: 'OrderIndex',
  components: { Pagination, QueryCol },
  filters: {
    statusMap: (status) => { // msg表示要过滤的数据，a表示传入的参数
      var sta = {
        open: 'warning',
        finish: 'success'
      }
      return sta[status]
    }
  },
  data () {
    return {
      list: null,
      description: "",
      total: 0,
      dialogFormVisible: false,
      dialogAction: "add",
      statusOptions: [
        {
          name: "待处理",
          key: "open",
        },
        {
          name: "完成",
          key: "finish",
        },
      ],
      cols: [
        {
          "key": "order_num",
          "name": "订单编号",
        },
        {
          "key": "orderItems.sale_num",
          "name": "需求编号",
        },
        {
          "key": "orderItems.filter_username",
          "name": "创建人",
        },
        {
          "key": "orderItems.filter_handler",
          "name": "处理人",
        },
      ],
      listQuery: {
        page: 1,
        per_page: 10,
        filter_col: "",
        filter_val: "",
        filter_status: "",
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
  created () {
    this.getList()
  },
  methods: {
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 2 || (columnIndex >= 12 & columnIndex <= 14)) {
        if (row.is_start) {
          return [row.order.order_items_count, 1];
        } else {
          return [0, 0]
        }
      }
    },
    getList () {
      return getOrderList(this.listQuery).then(response => {
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
    finishItem (row) {
      finishOrderItem(row.id).then(res => {
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