<template>
<!-- @click="() => append(data)"> -->
  <div class="custom-tree-container">
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="dialogFormVisible = true">
            新增
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>

    
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="分类名称">
          <el-input v-model="temp.label" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="是否拥有子分类">
           <el-radio v-model="temp.has_child" label="1">是</el-radio>
           <el-radio v-model="temp.has_child" label="0">否</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="() => append(temp)">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCategoryTreeList , addCategory} from '@/api/category'

export default {
  data() {
    const data = [];
    return {
      data: JSON.parse(JSON.stringify(data)),
      dialogFormVisible: false,
      temp:{
        id:0,
        label: "",
        has_child: 0,
        parent_id: 0,
        children :[],
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    append(temp) {

      temp.parent_id = this.data[0].id
      console.log(this.data[0].id, temp.parent_id)
      addCategory(temp).then(response => {
          console.log(this.data)
        this.data.children.push(response.data);
      })
    },
    remove(node, data) {
      alert(123)
    //   const parent = node.parent;
    //   const children = parent.data.children || parent.data;
    //   const index = children.findIndex(d => d.id === data.id);
    //   children.splice(index, 1);
    },
    getList() {
      getCategoryTreeList().then(response => {
        this.data = response.tree
      })
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
            <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
          </span>
        </span>);
    }
  }
}
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
