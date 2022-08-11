<template>
<div  class="cate-div">
  <div class="filter-container" style = "margin-bottom: 20px;">
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"  @click="dialogFormVisible=true">
      添加分类
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

    <el-table-column
     align="center"
      prop="id"
      label="编号"
      sortable
      width="300">
    </el-table-column>

    <el-table-column
      align="center"
      label="分类名"
      width="300">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper" >
            <el-tag size="medium">{{ scope.row.label}}</el-tag>
          </div>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="是否存在子分类"
      width="300">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper" >
            <el-tag v-if="scope.row.has_child >0 " size="medium"> 是</el-tag>
          </div>
      </template>
    </el-table-column>

    <el-table-column label="操作" align="center"  class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button  size="mini" type="success" @click="add(row)">
            添加子分类
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="remove(row)">
           删除
          </el-button>
        </template>
      </el-table-column>
  </el-table>

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
  name:"CategoryIndex",
  data() {
    return {
      data : [],
      dialogFormVisible: false,
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
      },
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
      var  child = this.node ? this.node.has_child : 1
      if(child == 0 ){
        this.$message({
          type: 'error',
          message: `此节点不允许添加子分类`
        });
        return true;
      }
      this.$refs['temp'].validate((valid) => {
          if (valid) {
            temp.parent_id = this.node ?this.node.id :0
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
      if (node.children_count >0) {
          this.$alert('此分类具有子分类，确认删除吗', '删除分类', {
          confirmButtonText: '确定',
          callback: action => {
             if (action != "cancel") {
              this.delCate(node.data.id)
            }   
          }
        });
      }else{
          this.delCate(node.id)
      }
    },
    getList() {
      return getCategoryTreeList().then(response => {
        if (response.tree.length > 0){
          this.data= response.tree
        }else{
            this.data =[]
        }
      })
    },
    delCate(id) {
      deleteCategory(id).then(response => {
        this.getList().then(res =>{
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
.cate-div{
  max-width:1200px;
  margin:100px  auto;
}
</style>