<template>
  <div class="filter-container">
      <el-form-item label="搜索字段"  class="filter-item" >
        <el-select v-model="filter_col" placeholder="字段" clearable  style="width: 130px">
          <el-option v-for="item in cols" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-input v-model="filter_val" placeholder="输入搜索内容" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="filter_status" placeholder="状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in status" :key="item.key" :label="item.name" :value="item.key" />
      </el-select>

      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div> 
</template>

<script>
export default {
  name: 'QueryCol',
  props: {
    filter_col: {
      type:String
    },
    filter_val: {
      type:String
    },
    filter_status: {
      type:String
    },
    cols :{
      type:Array,
      default() {
        return [
        ]
      }
    },
    status :{
      type:Array,
      default() {
        return [
        ]
      }
    },
  },
  created(){
    console.log(123)
  },
  methods:{
    handleFilter() {
      this.$emit('handleFilter')
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
