<template>
  <div class="cate-div">
    <div class="filter-container"
         style="margin-bottom: 20px;">
      <span>产品名称</span>
      <el-input v-model="listQuery.filter_val"
                placeholder="输入搜索内容"
                style="width:100px; margin-left:10px ;margin-right: 10px;"
                class="filter-item"
                @keyup.enter.native="search" />

      <el-button class="filter-item"
                 type="primary"
                 icon="el-icon-search"
                 @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table class="cate-table"
              :data="data"
              style="width: 100%;margin-bottom: 20px;"
              row-key="id"
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
                       width="300">
      </el-table-column>

      <el-table-column align="center"
                       label="分类名"
                       width="300">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="描述"
                       width="300">
        <template slot-scope="scope">
          {{ scope.row.description}}
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini"
                     type="success"
                     @click="showAddMaterialDialog(row)">
            添加产品
          </el-button>
          <el-button size="mini"
                     type="danger"
                     v-if="row.parent_id >0"
                     @click="remove(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="material"
               :rules="rules"
               :model="material"
               label-position="left"
               label-width="120px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="物料类型"
                      prop="type">
          <el-select v-model="material.type"
                     placeholder="请选择">
            <el-option v-for="item in material_types"
                       :key="item.key"
                       :label="item.key"
                       :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="物料编号"
                      prop="label">
          <el-input v-model="material.label"
                    class="small_input" />
          <el-button type="primary"
                     @click="getMaterialLabel"
                     style="float:left; margin-left:20px ;">获取编码</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="() => add()">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getMaterialTreeList, addMaterial, deleteMaterial, getMaterialSeq } from '@/api/material'
import { getCategoryList } from '@/api/category'
export default {
  name: "MaterialIndex",
  data () {
    return {
      data: [],
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        per_page: 10,
        filter_col: "",
        filter_val: "",
      },
      material_types: [
        { "key": "sub-assembly", "val": "assembly" },
        { "key": "component", "val": "component" },
        { "key": "assembly", "val": "assembly" },
      ],
      material: {
        category_id: 0,
        type: '',
        seq: "",
        label: "",
      },
      rules: {},
    }
  },
  created () {
    this.getList()
  },
  methods: {
    showAddMaterialDialog (row) {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['material'].resetFields()
        this.material.category_id = row.id
      })
    },
    getMaterialLabel () {
      var data = {
        'category_id': this.category_id
      }
      getMaterialSeq(data).then(res => {
        this.material.label = res.data.label
        this.material.seq = res.data.seq
        this.material.id = res.data.id
      })
    },
    addMaterial () {
      this.$refs['category'].validate((valid) => {
        if (valid) {
          addMaterial(this.category).then(response => {
            this.retrieve()
          })
        }
      });

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
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    delCate (id) {
      deleteMaterial(id).then(response => {
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
.cate-div {
  max-width: 1200px;
  margin: 100px auto;
}
</style>