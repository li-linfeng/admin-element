<template lang="">
   <el-dialog title="新增"
               @close="closeA"
               :visible.sync="preSaleDialogFormVisible">
      <el-form ref="dataForm"
               :model="pre_sale_item"
               :rules="tmp_rules"
               label-position="left"
               label-width="140px"
               style="width:1200px; height:500px;margin-left:50px;">
        <el-form-item label="产品类型"
                      prop="category">
          <el-select v-model="pre_sale_item.category"
                     placeholder="请选择">
            <el-option v-for="item in categories"
                       :key="item.key"
                       :label="item.key"
                       :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品型号"
                      prop="product_type">
          <el-input v-model="pre_sale_item.product_type"
                    class="small_input" />
        </el-form-item>

        <el-form-item label="产品单价"
                      prop="product_price">
          <el-input v-model="pre_sale_item.product_price"
                    class="small_input"
                    v-money:2 />
        </el-form-item>
        <el-form-item label="产品货期"
                      prop="product_date">
          <el-input v-model="pre_sale_item.product_date"
                    class="small_input" />
        </el-form-item>

        <div style="width: 400px;margin-bottom: 20px;">
          <el-form-item label="附件">
            <el-upload class="upload-demo"
                       action="uploadFile"
                       :before-upload="(file) => beforeUpload(file, 'pre_sale')"
                       :on-remove="handleRemove"
                       :file-list="pre_sale_item.fileList">
              <el-button size="small"
                         type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>
      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="addToPreSale">
          确认
        </el-button>
      </div>
    </el-dialog>
</template>
<script>

export default {
  name: 'PreSaleDialog',
  data () {
    return {

    }
  },
  created () {
    this.localWeather()
  },
  computed: {
    getIcon () {
      this.icon = false
      if (this.weather == '晴') {
        return 'el-icon-sunny'
      } else if (this.weather == '多云') {
        return 'el-icon-cloudy-and-sunny'
      } else if (this.weather == '阴') {
        return 'el-icon-partly-cloudy'
      } else if (this.weather.indexOf('雨')) {
        return 'el-icon-heavy-rain'
      } else if (this.weather.indexOf('雪')) {
        return 'el-icon-light-rain'
      }
      this.icon = true
    }
  },
  methods: {
    localWeather () {
      getWeather().then(res => {
        console.log(res)
        let lives = res.data.lives[0]
        this.address = lives.city
        this.temperature = lives.temperature
        this.weather = lives.weather
        this.winddirection = lives.winddirection
        this.windpower = lives.windpower
        this.humidity = lives.humidity
        this.reporttime = lives.reporttime
      })
    }
  }
}
</script>
