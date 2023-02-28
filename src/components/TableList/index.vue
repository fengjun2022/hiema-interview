<template>
  <el-table :data="tableData">
    <el-table-column label="日期">
       <template #default = '{row}'>
        <span>{{row}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
       <template #default>
        <el-button></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {

}
</script>

<style>

</style>
