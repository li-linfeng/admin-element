<template>
<el-row >
  <el-col :span="8">
    <el-card shadow="always">
     <category />
    </el-card>
  </el-col>
</el-row>
 
</template>

<script>
import Category from '@/components/Category'

export default {
  name: 'CategoryIndex',
  components: { Category }
}



</script>

<style>
  .cate{
    
    max-width: 300px;
  }
</style>