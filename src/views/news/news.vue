<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.filter_status"
                 v-if="status.length >0"
                 placeholder="状态"
                 clearable
                 class="filter-item"
                 style="width: 130px">
        <el-option v-for="item in status"
                   :key="item.key"
                   :label="item.name"
                   :value="item.key" />
      </el-select>
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
                       width="50">
        <template slot-scope="{row}">
          <span>{{row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标题"
                       width="600"
                       align="center">
        <template slot-scope="{row}">
          <span>{{row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间"
                       width="120"
                       align="center">
        <template slot-scope="{row}">
          <span>{{row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态"
                       width="100"
                       align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusMap">
            {{ row.status_cn }}
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
               :model="tmp"
               label-position="left"
               label-width="70px"
               style="width:600px; margin-left:50px;">
        <el-form-item label="标题"
                      prop="name">
          <el-input v-model="tmp.title" />
        </el-form-item>
        <el-form-item class="editor-wapper "
                      label="内容">
          <mavon-editor style="height:600px"
                        v-model="tmp.md_content"
                        ref="md"
                        :toolbars="markdownOption" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button @click="()=> dialogAction =='add' ? addData('finish') :editData('finish')">发布</el-button>
        <el-button @click="()=> dialogAction =='add' ? addData('edit') :editData('edit')">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getNewsList, createNews, updateNews, deleteNews } from '@/api/news'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'NewsIndex',
  components: { Pagination },
  filters: {
    statusMap: (status) => { // msg表示要过滤的数据，a表示传入的参数
      var sta = {
        edit: 'info',
        finish: 'success',
      }
      return sta.status
    }
  },
  data () {
    return {
      list: null,
      total: 0,
      dialogFormVisible: false,
      dialogAction: "add",
      listQuery: {
        page: 1,
        per_page: 10,
        filter_status: "",
      },
      status: [
        {
          name: "编辑中",
          key: "edit",
        },
        {
          name: "已发布",
          key: "finish",
        },
      ],
      tmp: {
        id: '',
        title: "",
        content: '',
        md_content: '',
      },
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        // save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      loading: false,
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      return getNewsList(this.listQuery).then(response => {
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
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.tmp = {
          id: '',
          title: "",
          content: '',
          md_content: '',
        }
      })
    },
    showEditDialog (row) {
      this.dialogFormVisible = true
      this.dialogAction = "edit"
      this.$nextTick(() => {
        this.tmp = JSON.parse(JSON.stringify(row))
      })

    },
    addData (status) {
      this.tmp.content = this.$refs.md.d_render
      this.tmp.status = status
      createNews(this.tmp).then(() => {
        this.retrieve()
      })
    },
    editData (status) {
      this.tmp.content = this.$refs.md.d_render
      this.tmp.status = status
      updateNews(this.tmp.id, this.tmp).then(() => {
        this.retrieve()
      })
    },
    deleteData (row) {
      deleteNews(row.id).then(res => {
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

textarea,
#editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}
textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}
code {
  color: #f66;
}
.paginator {
  margin-bottom: 0px;
}
</style>