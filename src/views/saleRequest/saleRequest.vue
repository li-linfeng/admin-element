<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.filter_name" placeholder="名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="showAddDialog">
        增加
      </el-button>
    </div>

  <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%; max-width: 1600px;"
  >
     <el-table-column label="需求编号"  align="center" width="180" >
        <template slot-scope="{row}">
          <span>{{row.sale_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户类型"  align="center" width="80" >
        <template slot-scope="{row}">
          <span>{{row.customer_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品性质"  align="center" width="80" >
        <template slot-scope="{row}">
          <span>{{row.product_type }}</span>
        </template>
      </el-table-column>
     <el-table-column label="附件"  align="center" width="200" >
        <template slot-scope="{row}">
          <span>{{row.upload_filename}}</span>  <el-link :underline="false" icon="el-icon-download" :href="row.upload_url"  type="primary">下载</el-link>
        </template>
      </el-table-column>
      <el-table-column label="应用条件"  align="center" width="80" >
        <template slot-scope="{row}">
           <el-button  size="mini" type="success"   @click="showDetailDialog(row)">
            查看
          </el-button>
        </template>
      </el-table-column>
     <el-table-column label="备注"  align="center" width="200" >
        <template slot-scope="{row}">
          <span>{{row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态"  width="200" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusMap">
            {{ row.status_cn }}
          </el-tag>
        </template>
      </el-table-column>
    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}" >
        <el-button  size="mini" type="success"   @click="showDetailDialog(row)">
            查看详情
        </el-button>
        <el-button  size="mini" type="danger"   @click="deleteData(row)">
            删除
        </el-button>
        </template> 
     </el-table-column>
  </el-table>

  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :per_page.sync="listQuery.per_page" @pagination="getList" />

  <el-dialog :title="dialogAction == 'add' ? '增加' :'详情'" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :model="tmp" label-position="left" label-width="140px" style="width:1200px; height:800px;margin-left:50px;">
        <el-form-item label="需求编号" prop="sale_num" >
          <el-input v-model="tmp.sale_num"  class ="small_input" /> 
          <el-button :if:="dialogAction == 'add'" type="primary" @click="getSaleNum" style="float:left; margin-left:20px ;">获取编码</el-button>
        </el-form-item>
       
        <el-form-item label="产品类型" prop="product_type">
          <el-select v-model="tmp.product_type" :disabled="dialogAction == 'add' ? false :true" placeholder="请选择">
            <el-option
              v-for="item in product_types"
              :key="item.key"
              :label="item.key"
              :value="item.val">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="客户性质" prop="customer_type">
          <el-select v-model="tmp.customer_type" :disabled="dialogAction == 'add' ? false :true" placeholder="请选择">
            <el-option
              v-for="item in custom_types"
              :key="item.key"
              :label="item.key"
              :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <label class="el-form-item__label" style="width:700px;font-size: 20px;margin-bottom: 10px;display: block;">应用条件:</label>
      
        <div style="height:400px">
          <el-form-item label="设备名称" prop="device_name"  class ="small_input" >
              <el-input v-model="tmp.device_name"  class="input_val"/>
          </el-form-item>
          <el-form-item label="轴1直径及公差" prop="shaft_one_diameter_tolerance" class ="small_input small_input_right">
              <el-input v-model="tmp.shaft_one_diameter_tolerance"  class="input_val" />
          </el-form-item>
          <el-form-item label="驱动类型" prop="driver_type"  class ="small_input " >
              <el-input v-model="tmp.driver_type"  class="input_val" />
          </el-form-item>
          <el-form-item label="轴2直径及公差" prop="shaft_two_diameter_tolerance" class ="small_input  small_input_right">
              <el-input v-model="tmp.shaft_two_diameter_tolerance"  class="input_val" /> 
          </el-form-item>
          <el-form-item label="驱动功率" prop="driver_power"  class ="small_input " >
              <el-input v-model="tmp.driver_power"  class="input_val" />
          </el-form-item>
          <el-form-item label="轴1配合段长度" prop="shaft_one_match_distance" class ="small_input small_input_right">
              <el-input v-model="tmp.shaft_one_match_distance"   class="input_val" /> 
          </el-form-item>
          <el-form-item label="使用转速" prop="rpm"  class ="small_input" >
              <el-input v-model="tmp.rpm"  class="input_val" />
          </el-form-item>
          <el-form-item label="轴2配合段长度" prop="shaft_two_match_distance" class ="small_input small_input_right">
              <el-input v-model="tmp.shaft_two_match_distance"   class="input_val" /> 
          </el-form-item>
          <el-form-item label="设定扭矩" prop="torque"  class ="small_input" >
              <el-input v-model="tmp.torque"   class="input_val"/>
          </el-form-item>
      
          <el-form-item label="轴端面间距" prop="shaft_space_distance" class ="small_input small_input_right">
              <el-input v-model="tmp.shaft_space_distance" class="input_val" /> 
          </el-form-item>
        </div>
        <div style="width: 400px;margin-bottom: 20px;">
          <el-form-item label="附件" >
              <el-upload
                class="upload-demo"
                action="uploadFile"
                :on-change="handleChange"
                :before-upload="beforeUpload"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
         </el-form-item>
        <el-form-item label="备注" prop="remark" >
            <el-input v-model="tmp.remark"  type ="textarea"  style="width:80%" /> 
        </el-form-item>
        </div>
       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="submit">
          确认
        </el-button>
      </div>
  </el-dialog>

  </div>
</template>

<script>
import { getSaleRequestList, createSaleRequest, updateSaleRequest, deleteSaleRequest, getSaleRequestNum  } from '@/api/saleRequest'
import { uploadFile  } from '@/api/upload'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'SaleRequestIndex',
  components: { Pagination },
  filters :{
    statusMap: (status) => { // msg表示要过滤的数据，a表示传入的参数
        var sta = {
            open: 'success',
            handle: 'primary',
            finish: 'info',
            cancel: 'error',
        }
        return sta.status
    }
  },  
  data() {
    return {
      list: null,
      description: "",
      total: 0,
      dialogFormVisible: false,
      dialogAction: "add",
      product_types :[
        {"key" :"TL", "val" :"TL"},
        {"key" :"GRID", "val" :"GRID"},
        {"key" :"GEAR", "val" :"GEAR"},
        {"key" :"ELAS", "val" :"ELAS"},
      ],
      custom_types :[
        {"key" :"E", "val" :"E"},
        {"key" :"G", "val" :"G"},
        {"key" :"C", "val" :"C"},
        {"key" :"B", "val" :"B"},
      ],
      fileList:[],
      listQuery: {
        page: 1,
        per_page: 10,
        filter_name:"",
      },
      tmp: {
        sale_num: "",
        description: '',
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      return getSaleRequestList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.tmp = {
          sale_num:"",
        }
      })
    },
    handleChange(file, fileList) {
      console.log(123)
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    showAddDialog(){
      this.dialogFormVisible = true
      this.dialogAction = "add"
    },
    showDetailDialog(row){
      this.dialogFormVisible = true
      this.dialogAction = "detail"
      this.tmp = row
    },
    getSaleNum(){
      getSaleRequestNum().then(res=>{
         this.tmp.sale_num = res.data.uuid
      })
    },
    beforeUpload(file, fileList){
      let fd = new FormData();
      fd.append('file',file);//传文件
      fd.append('type','file');//传文件
      uploadFile(fd).then(res=>{
        this.fileList.push(res.data)
        console.log(this.fileList)
      })
    },
    submit(){
      if (this.dialogAction == "add"){
        this.addData()
      }else{
        this.editData()
      }
    },
    addData() {
      let ids = []
      for (let i=0; i< this.fileList.length; i++){
          ids.push(this.fileList[i].id)
      }
      this.tmp.upload_ids = ids.join()
      createSaleRequest(this.tmp).then(() => {
        this.retrieve()
      })
    },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        if(valid) {
          updateSaleRequest(this.tmp.id, this.tmp).then(() => {
            this.retrieve()
          })
        }
      })
    },
    deleteData(row){
      deleteSaleRequest(row.id).then(res=>{
        this.retrieve()
      })
    },
    retrieve(){
      this.getList().then(res=>{
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
    .small_input{
        float:left; 
        width:43%;
    }
    .small_input_right{
      margin-left: 15px; 
    }
    .input_val{
      width:50% !important;
    }
</style>