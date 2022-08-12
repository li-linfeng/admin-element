<template>
  <div class="custom-tree-container">
     <!-- default-expand-all -->
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
     
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => add(data)">
            新增
          </el-button>
          <el-button
            v-if=" node.data.id  >0"
            type="text"
            size="mini"
            @click="() => remove(node)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>

    <!-- 添加分类 -->
    <el-dialog title="添加分类"  :visible.sync="dialogFormVisible">
      <el-form ref="temp" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="label">
          <el-input v-model="temp.label" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="是否有子分类"  prop="has_child">
           <el-radio v-model="temp.has_child" label="1">是</el-radio>
           <el-radio v-model="temp.has_child" label="0" checked="checked">否</el-radio>
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
import { getCategoryTreeList , addCategory, deleteCategory} from '@/api/category'

export default {
  data() {
    const data = [
       {
        "label" : "全部",
        "children": [],
        "has_child" : 1,
        "parent_id" :0,
        "id" :0,
       },
    ];
    return {
      data: data,
      dialogFormVisible: false,
      node: null,
      temp:{
        id:0,
        label: "",
        has_child: '0',
        parent_id: 0,
        children :[],
      },
      rules:{
        label:[{ required: true, message: '请输入分类名称', trigger: 'blur' },],
        has_child:[{required: true, message: '请选择是否有子分类', trigger: 'change' },]
      }
    }
  },
  created() {
    this.getList() 
  },
  methods: {
    add(data){
       this.dialogFormVisible = true
       this.node = data
    },
    append(temp) {
      this.$refs['temp'].validate((valid) => {
          if (valid) {
            temp.parent_id = this.node ?this.node.id :0
            var  child = this.node ? this.node.has_child : 1
            if(child == 0 ){
              this.$message({
                type: 'error',
                message: `此节点不允许添加子分类`
              });
              return true;
            }
            addCategory(temp).then(response => {
              this.getList().then(res=>{
                  this.dialogFormVisible = false;
              }) 
            })
          } else {
            return false;
          }
        });
     
    },
    remove(node) {
      if (node.data.children_count >0) {
          this.$alert('此分类具有子分类，确认删除吗', '删除分类', {
          confirmButtonText: '确定',
          callback: action => {
            if (action != "cancel") {
              this.delCate(node.data.id)
            }    
          }
        });
      }else{
          this.delCate(node.data.id)
      }
      
    },
    getList() {
      return getCategoryTreeList().then(response => {
        if (response.data.length > 0){
           this.data[0].children.push(response.data[0])
        }else{
          this.data[0].children = []
        }
      })
    },
    delCate(id) {
      deleteCategory(id).then(response => {
        this.getList().then(res=>{
          this.$message({
            type: 'info',
            message: `删除成功`
          });
        })
      })   
    },
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
