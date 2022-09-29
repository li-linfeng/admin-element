<template>
  <div class="custom-tree-container">
    <!-- 添加分类 -->
    <el-dialog :visible="visible"
               append-to-body
               @close="handleClose">
      <el-form ref="materialForm"
               :rules="rules"
               :model="material"
               label-position="left"
               label-width="120px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="物料类型"
                      prop="type">
          <el-select v-model="material.type"
                     placeholder="请选择">
            <el-option v-for="item in material_types[dialogType]"
                       class="el-item"
                       :key="item.key"
                       :label="item.key"
                       :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="物料编号"
                      prop="label">
          <el-input v-model="material.label"
                    :disabled="true"
                    class="small_input" />
          <el-button type="primary"
                     class="el-item"
                     @click="getMaterialSeqNum"
                     style="float:left; margin-left:20px ;">获取编码</el-button>
        </el-form-item>

        <el-form-item label="是否有子分类"
                      v-if="dialogType != 'component'"
                      prop="has_child">
          <el-radio v-model="material.has_child"
                    label="1">是</el-radio>
          <el-radio v-model="material.has_child"
                    label="0"
                    checked="checked">否</el-radio>
        </el-form-item>

        <el-form-item label="描述"
                      prop="description">
          <el-input v-model="material.description"
                    type="textarea"
                    :rows="4"
                    class="small_input el-item" />

        </el-form-item>

        <el-form-item label="附件">
          <el-upload class="upload-demo"
                     action="uploadFile"
                     :before-upload="beforeUpload"
                     :on-remove="handleRemove"
                     :file-list="fileList">
            <el-button size="small"
                       type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary"
                   @click="() => addMaterial()">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { addMaterial, getMaterialSeq } from '@/api/material'
import { uploadFile } from '@/api/upload'

export default {
  name: 'Material',
  props: {
    need_refresh: {
      type: Boolean,
      default: false,
    },
    category_id: {
      type: Number,
      default: 0
    },
    visible: {
      type: Boolean,
    },
    dialogType: {
      type: String,
      default: "category",
    }
  },
  data () {
    return {
      refresh: false,
      dialogFormVisible: false,
      fileList: [],
      material_types: {
        'category': [
          { "key": "装配体", "val": "assembly" },
        ],
        'assembly': [
          { "key": "子装配体", "val": "sub-assembly" },
          { "key": "零件", "val": "component" },
        ],
        'sub-assembly': [
          { "key": "零件", "val": "component" },
        ],
        'component': [
          { "key": "公用零件", "val": "single-component" },
        ]
      },
      material: {
        parent_id: 0,
        category_id: 0,
        type: '',
        seq: "",
        label: "",
        has_child: '0',
        amount: 1,
        file_ids: '',
        children: [],
      },
      rules: {
        type: [{ required: true, message: '请先选择物料类型', trigger: 'blur' },],
        label: [{ required: true, message: '请获取物料编码', trigger: 'blur' },],
        has_child: [{ required: true, message: '请选择是否有子分类', trigger: 'change' },],
      }
    }
  },
  methods: {
    handleClose () {
      //使用update:visible对应的是:visible.sync="dialogTestVisible"，也可以替换成使用@closeDialog来进行对弹窗的关闭
      this.$emit("update:visible", false);
      this.$emit("update:need_refresh", true);
      this.material = {
        parent_id: 0,
        category_id: 0,
        type: '',
        seq: "",
        label: "",
        has_child: '0',
        amount: 1,
        file_ids: "",
        children: [],
      }
    },
    addMaterial () {
      this.material.category_id = this.category_id
      //获取上传文件id
      let ids = []
      for (let i = 0; i < this.fileList.length; i++) {
        ids.push(this.fileList[i].id)
      }
      this.material.file_ids = ids.join()
      this.$nextTick(() => {
        this.$refs['materialForm'].validate((valid) => {
          if (valid) {
            addMaterial(this.material.id, this.material).then(response => {
              this.handleClose()
            })
          }
        });
      })

    },
    getMaterialSeqNum () {
      var data = {
        category_id: this.category_id,
        type: this.material.type,
      }
      if (this.category_id == 0 || this.material.type == '') {
        this.$message({
          showClose: true,
          message: '请先选择物料类型',
          type: 'error'
        });
        return
      }
      getMaterialSeq(data).then(res => {
        this.material.seq = res.data.seq
        this.material.label = res.data.label
        this.material.id = res.data.id
      })
    },
    handleRemove (file, fileList) {
      this.fileList = fileList
    },
    beforeUpload (file, fileList) {
      let fd = new FormData();
      fd.append('file', file);//传文件
      fd.append('type', 'file');//传文件
      fd.append('source_type', 'material');//传文件
      uploadFile(fd).then(res => {
        this.fileList.push(res.data)
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
