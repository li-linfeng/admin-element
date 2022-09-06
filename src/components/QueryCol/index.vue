<template>
  <div class="filter-container" style="display: inline; margin-bottom: 15px;">
      <el-select v-model="col" placeholder="搜索字段" clearable  class="filter-item" style="width: 130px">
        <el-option v-for="item in cols" :key="item.key" :label="item.name" :value="item.key" />
      </el-select>
      <el-input v-model="val" placeholder="输入搜索内容" style="width:200px;" class="filter-item" @keyup.enter.native="search" />
      <el-select v-model="sta" placeholder="状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in status" :key="item.key" :label="item.name" :value="item.key" />
      </el-select>

      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="search">
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
  data(){
    return {
      col: this.filter_col,
      val: this.filter_val,
      sta: this.filter_status,
    }
  },
  created(){

  },
  methods:{
    search() {
      var  data = {
        col: this.col,
        val: this.val,
        sta: this.sta,
      }
      this.$emit('handleFilter',data)
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
  .filter_item{
    margin-right: 10px;
  }
</style>
