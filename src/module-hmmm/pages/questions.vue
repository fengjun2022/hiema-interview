<template>
<div style="background-color:white">
<searchComp></searchComp>
<div class="table">
  <el-alert
    title="消息提示的文案"
    type="info"
    show-icon>
  </el-alert>
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">

    <el-table-column
      prop="name"
      label="试题编号"
      width="180">
    </el-table-column>
        <el-table-column
      prop="subjectID"
      label="学科"
      width="180">
    </el-table-column>
        <el-table-column
      prop="name"
      label="目录"
      width="180">
    </el-table-column>
        <el-table-column
      prop="name"
      label="题型"
      width="180">
    </el-table-column>
        <el-table-column
      prop="name"
      label="题干"
      width="220">
    </el-table-column>
        <el-table-column
      prop="name"
      label="录入时间"
      width="180">
    </el-table-column>
        <el-table-column
      prop="name"
      label="难度"
      width="180">
    </el-table-column>
        <el-table-column
      prop="name"
      label="录入人"
      width="180">
    </el-table-column>
        <el-table-column
      prop="name"
      label="操作"
      width="200">
        <template>
        <el-button type="primary" icon="el-icon-view" circle title="预览"></el-button>
        <el-button type="success" icon="el-icon-edit" circle title="编辑"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle title="删除"></el-button>
        <el-button type="warning" icon="el-icon-check" circle title="加入精选"></el-button>
      </template>
    </el-table-column>
  </el-table>
</div>

  </div>
</template>

<script>
import searchComp from '@/components/searchComp'
export default {
  components: {
    searchComp
  },
  data () {
    return {
      tableData: [{
        subjectID: '123456',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      }],
      form: {
      }
    }
  },
  methods: {
    resetDateFilter () {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column.property
      return row[property] === value
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
<style scoped>
  .table{
    margin: 10px;
    background-color: white;
    padding: 0 20px;
  }
</style>
