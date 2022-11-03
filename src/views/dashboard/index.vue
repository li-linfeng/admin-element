<template>
  <div class="dashboard-container">
    <el-card class="box-card-news">
      <div slot="header"
           class="clearfix">
        <span>每日要闻</span>
      </div>
      <ul class="news-content">
        <li v-for="message in messages"
            class="text item"
            :key="message.id">{{message.title }} <button size="mini"
                  type="primary"
                  style="float:right;margin: 0 0 0 10px;font-size:8px; background-color:rgb(222,222,222);border:none; cursor:pointer"
                  @click="showNews(message)">查看</button><span style="float:right;">{{message.created_at}}</span></li>
      </ul>
      <pagination v-show="total>0"
                  :total="total"
                  :page.sync="listQuery.page"
                  :per_page.sync="listQuery.per_page"
                  @pagination="getList" />
    </el-card>

    <Weather></Weather>

    <el-card class="box-card"
             style="height:750px">
      <div slot="header"
           class="clearfix">
        <span>每日待办</span>
        <el-button type="primary"
                   round
                   size="mini"
                   @click="readAllTodo"
                   style="float:right">全部设为已读</el-button>
      </div>
      <el-tabs type="border-card"
               @tab-click="handleClick"
               v-model="activeName"
               style="height:650px">
        <el-tab-pane v-for="(name, type) in todo_map"
                     :key="type"
                     :label="name"
                     :name="type">
          <span slot="label"><i class="el-icon-date"></i> {{name}}</span>
          <ul class="news-content">
            <li v-for="todo in todo_list"
                class="text item"
                :key="todo.id"
                style="word-break: break-all; word-wrap: break-word;line-height: 24px; margin-bottom: 15px;">
              {{todo.content }}
              <a @click="jumpToPage(todo)"
                 style="color:blue;float: right;">
                点击查看
              </a>
            </li>
          </ul>

        </el-tab-pane>

      </el-tabs>
      <pagination v-show="todo_total>0"
                  style="margin-bottom: 15px;"
                  :total="todo_total"
                  :page.sync="todoQuery.page"
                  :per_page.sync="todoQuery.per_page"
                  @pagination="toDo" />
    </el-card>

    <el-dialog title="要闻详情"
               :visible.sync="newsVisible"
               id="news_dia">
      <div style="width:800px;height:300px"
           class="dialog-header">
        <div v-html="content"
             style="line-height:16px"
             id="news_content"></div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="newsVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getNewsList, getToDoList, readTodo, readAll } from '@/api/news'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Weather from '@/components/Weather' // secondary package based on el-pagination
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: { Pagination, Weather },
  data () {
    return {
      messages: [],
      newsVisible: false,
      content: '',
      total: 0,
      todo_total: 0,
      todo_list: [],
      activeName: "pre_sale",
      todo_map: {
        "sale_request": "销售需求",
        "pre_sale": "售前处理",
        "order": "订单",
      },
      todo_link: {
        "sale_request": "/sale_request/saleRequest",
        "pre_sale": "/pre_sale/preSale",
        "order": "/order/order",
      },
      listQuery: {
        page: 1,
        per_page: 10,
        filter_status: "finish",
      },
      todoQuery: {
        page: 1,
        per_page: 10,
        type: "pre_sale",
      },
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created () {
    this.getList()
    this.toDo()
  },
  methods: {
    showNews (mes) {
      this.newsVisible = true
      this.content = mes.content
    },
    readAllTodo () {
      readAll().then(res => {
        this.activeName = 'pre_sale'
        this.todoQuery.type = this.activeName
        this.todoQuery.page = 1
        this.toDo()
      })
    },
    jumpToPage (todo) {
      readTodo(todo.id).then(res => {
        this.toDo().then(res => {
          let routeData = this.$router.resolve({ path: this.todo_link[todo.type], query: { source_id: todo.source_id } });
          window.open(routeData.href, '_blank');
        })
      })
    },
    getList () {
      return getNewsList(this.listQuery).then(response => {
        this.messages = response.data
        this.total = response.total
      })
    },
    toDo () {
      return getToDoList(this.todoQuery).then(response => {
        this.todo_list = response.data
        this.todo_total = response.total
      })
    },
    handleClick (tab, event) {
      this.todoQuery.type = this.activeName
      this.todoQuery.page = 1
      this.toDo()
    },
  }
}
</script>

<style lang="scss">
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.el-dialog {
  width: 800px !important;
}

.news-content {
  height: 251px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card-news {
  float: left;
  margin-right: 2%;
  margin-bottom: 20px;
  width: 48%;
  height: 409px;
}

.box-card-2 {
  float: left;
  margin-right: 0;
  margin-bottom: 20px;
  width: 50%;
  height: 409px;
}

.box-card {
  float: left;
  margin-right: 2%;
  margin-bottom: 20px;
  width: 48%;
  height: 409px;
}

#news_content > p {
  width: 700px;
}
#news_content > p img {
  width: 500px;
}
</style>
