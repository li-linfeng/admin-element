<template>
  <div class="cate-div">
    <div class="filter-container"
         style="margin-bottom: 20px;">
      <QueryCol :cols="cols"
                :filter_col="listQuery.filter_col"
                :filter_val="listQuery.filter_val"
                @handleFilter="handleFilter" />

    </div>
    <el-table class="cate-table"
              :data="data"
              style="width: 100%;margin-bottom: 20px;"
              row-key="key"
              border
              stripe
              fit
              highlight-current-row
              default-expand-all
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column align="center"
                       prop="id"
                       label="编号"
                       sortable
                       width="100">
        <template slot-scope="{row}">
          <span>{{row.type =='category' ? row.id : ''  }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="名称"
                       width="200">
        <template slot-scope="{row}">
          <div slot="reference"
               class="name-wrapper">
            <el-tag :type="row.type | colorsMap"
                    size="medium">{{ row.name}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="物料类型"
                       width="200">
        <template slot-scope="{row}">
          {{ row.type | typesMap}}
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="工程处理人"
                       width="100">
        <template slot-scope="{row}">
          {{ row.handler ?  row.handler.username :''}}
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="描述"
                       width="300">
        <template slot-scope="{row}">
          {{ row.description}}
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini"
                     type="warning"
                     v-if="row.code == 'XX'"
                     @click="showAddMaterialDialog('component',row)">
            添加零件
          </el-button>
          <el-button size="mini"
                     type="success"
                     v-if="row.type != 'category' && row.has_child >0"
                     @click="showChoose('assembly',row)">
            选择子组件
          </el-button>
          <el-button size="mini"
                     type="primary"
                     v-if="row.code != 'XX' && row.type == 'category'"
                     @click="showAddMaterialDialog( 'category',row)">
            添加产品
          </el-button>
          <el-button size="mini"
                     type="primary"
                     v-if="row.code != 'XX' && row.type == 'category' && permissions.indexOf('*') !== -1 "
                     @click="showAddHandlerDialog(row)">
            设置处理人
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <material :category="category"
              :dialogType="dialogType"
              :need_refresh.sync="need_refresh"
              :visible.sync="dialogFormVisible"
              ref="material">
    </material>

    <el-dialog :visible="showChooseDialog"
               @close="showChooseDialog = false"
               title="选择子组件">
      <el-container>
        <el-header>
          <el-button type="primary"
                     style="float:right"
                     @click="showAddMaterialDialog('assembly')">
            添加子组件
          </el-button>
        </el-header>
        <el-main>
          <el-form ref="combineForm"
                   :model="combine"
                   label-position="left"
                   label-width="120px"
                   style="width: 400px; margin-left:50px;">
            <el-form-item label="搜索">
              <el-input placeholder="输入关键字进行过滤"
                        v-model="filterText">
              </el-input>
              <el-tree :data="tree"
                       :check-strictly="true"
                       show-checkbox
                       node-key="label"
                       :default-expand-all="true"
                       @check-change="checkChange"
                       :filter-node-method="filterNode"
                       :expand-on-click-node="false"
                       style="margin-top:20px"
                       ref="tree">
                <span class="custom-tree-node"
                      slot-scope="{ node }">
                  <span>{{ node.label }}</span>
                </span>
              </el-tree>
            </el-form-item>
            <div v-if="combine.children.length >0">
              <el-form-item :label="'物料' + (index*1+1) + '数量'"
                            v-for="(node, index) in combine.children"
                            :key="node.label">
                <span style="padding:10px; float: left; line-height: 25px;margin-right:20px;">{{combine.children[index].label}}</span>
                <el-input-number v-model="combine.children[index].amount"
                                 class="small_input el-item">
                </el-input-number>

              </el-form-item>
            </div>
          </el-form>
        </el-main>

      </el-container>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="showChooseDialog = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="bindRel()">
          确认
        </el-button>
      </div>
    </el-dialog>

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
import { getMaterialTreeList, bindMaterial } from '@/api/material'
import { getCategoryList, addHandler } from '@/api/category'
import { searchUserList } from '@/api/user'

import Material from '@/components/Material' // secondary package based on el-pagination
import QueryCol from '@/components/QueryCol' // secondary package based on el-pagination
import { mapGetters } from 'vuex'

export default {
  name: "MaterialIndex",
  components: { Material, QueryCol },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
  },
  filters: {
    typesMap: (type) => { // msg表示要过滤的数据，a表示传入的参数
      var ty = {
        'category': "",
        'assembly': '装配体',
        'sub-assembly': '子装配体',
        'component': '零件',
        'single-component': '公用零件',
      }
      return ty[type]
    },
    colorsMap: (type) => {
      var colors = {
        'category': "success",
        'assembly': 'primary',
        'sub-assembly': 'info',
        'component': 'warning',
        'single-component': 'danger',
      }
      return colors[type]
    }
  },
  data () {
    return {
      options: [],
      loading: false,
      tree: [],
      filterText: '',
      category_id: 0,
      category: null,
      need_refresh: false,
      showChooseDialog: false,
      data: [],
      dialogFormVisible: false,
      handlerDialogVisible: false,
      dialogType: 'category',
      listQuery: {
        page: 1,
        per_page: 10,
        filter_col: "",
        filter_val: "",
      },
      combine: {
        material_id: 0,
        children: [],
      },
      cols: [
        {
          "key": "name",
          "name": "分类名",
        },
        {
          "key": "children.filter_label",
          "name": "物料名称",
        },
        {
          "key": "children.filter_description",
          "name": "物料描述",
        },
      ],
      handlerForm: {
        handler_id: '',
        category_id: 0,
      },
    }
  },
  watch: {
    need_refresh: {
      handler (newVal, oldVal) {
        if (newVal != oldVal) {
          this.getTreeData()
        }
      },
    },
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  created () {
    this.listQuery.page = 1
    if (this.$route.query.category_name) {
      this.listQuery.filter_col = 'name'
      this.listQuery.filter_val = this.$route.query.category_name
    }
    this.getList()
  },
  methods: {
    showAddHandlerDialog (row) {
      this.$nextTick(() => {
        this.handlerForm = {
          handler_id: '',
          category_id: row.id,
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
      addHandler(this.handlerForm.category_id, this.handlerForm).then(res => {
        this.handlerDialogVisible = false
        this.retrieve()
      })

    },
    getTreeData () {
      var params = {
        filter_category_id: this.category_id,
        material_id: this.combine.material_id,
      }
      return getMaterialTreeList(params).then(response => {
        this.tree = response.data.tree
        this.category = response.data.category
      })
    },
    showChoose (type, row) {
      this.showChooseDialog = true
      this.category_id = row.category_id
      this.dialogType = type
      var tmp = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.$refs['combineForm'].resetFields()
        this.combine.material_id = tmp.id
        this.combine.children = tmp.children
        this.getTreeData()
        var keys = []
        for (var i = 0; i < tmp.children.length; i++) {
          keys.push(tmp.children[i].label)
        }
        this.$refs.tree.setCheckedKeys(keys);
      })
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    checkChange (node, checked, c) {
      if (node.id > 0) {
        if (checked) {
          var child = {
            id: node.id,
            label: node.label,
            amount: 1,
          }
          this.combine.children.push(child)
        } else {
          var index = this.combine.children.map(e => e.id).indexOf(node.id)
          this.combine.children.splice(index, 1)
        }
      }
    },
    showAddMaterialDialog (type, row = null) {
      this.dialogType = type
      this.dialogFormVisible = true
      if (row) {
        this.category = JSON.parse(JSON.stringify(row))
      }
    },
    getList () {
      return getCategoryList(this.listQuery).then(response => {
        if (response.data.length > 0) {
          this.data = response.data
        } else {
          this.data = []
        }
      })
    },
    handleFilter (params) {
      this.listQuery.page = 1
      this.listQuery.filter_col = params.col ? params.col : ""
      this.listQuery.filter_val = params.val ? params.val : ""
      this.getList()
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
    bindRel () {
      if (this.combine.children.length == 0) {
        this.$message({
          showClose: true,
          message: '请选择子物料',
          type: 'error'
        });
        return
      }
      bindMaterial(this.combine.material_id, this.combine).then(res => {
        this.showChooseDialog = false
        this.retrieve()
      })
    }
  }
}
</script>

<style>
.cate-div {
  max-width: 1200px;
  margin: 100px auto;
}

.small_input {
  float: left;
  width: 43%;
}
</style>