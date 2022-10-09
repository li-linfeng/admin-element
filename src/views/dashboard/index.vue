<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span>每日要闻</span>
      </div>
      <ul v-for="message in messages"
          :key="message.id"
          class="text item">
        <li>{{message.title }} <span style="float:right">{{message.created_at}}</span></li>
      </ul>
      <pagination v-show="total>0"
                  :total="total"
                  :page.sync="listQuery.page"
                  :per_page.sync="listQuery.per_page"
                  @pagination="getList" />
    </el-card>

    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span>每日要闻</span>
      </div>
      <ul v-for="message in messages"
          :key="message.id"
          class="text item">
        <li>{{message.title }} <span style="float:right">{{message.created_at}}</span></li>
      </ul>
      <pagination v-show="total>0"
                  :total="total"
                  :page.sync="listQuery.page"
                  :per_page.sync="listQuery.per_page"
                  @pagination="getList" />
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNewsList } from '@/api/news'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Dashboard',
  components: { Pagination },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data () {
    return {
      messages: [],
      total: 0,
      listQuery: {
        page: 1,
        per_page: 10,
        filter_status: "finish",
      },
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      return getNewsList(this.listQuery).then(response => {
        this.messages = response.data
        this.total = response.total
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  float: left;
  margin-right: 200px;
  width: 600px;
}
</style>
