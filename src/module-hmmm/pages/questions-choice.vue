<template>
<div style="background-color:white">
  <searchComp></searchComp>
  <div class="table">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="全部" name="first"></el-tab-pane>
    <el-tab-pane label="待审核" name="second"></el-tab-pane>
    <el-tab-pane label="已审核" name="third"></el-tab-pane>
    <el-tab-pane label="已拒绝" name="fourth"></el-tab-pane>
    </el-tabs>
    <el-alert
    title="消息提示的文案"
    type="info"
    show-icon
    style="margin-bottom:20px">
    </el-alert>
    <el-table
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
      label="审核状态"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="审核意见"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="审核人"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="发布状态"
      width="180">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="220"
      align="center">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          预览
        </el-button>
         <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          审核
        </el-button>
         <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          修改
        </el-button>
         <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          上架
        </el-button>
         <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      align="right"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="5"
      layout=" sizes, prev, pager, next, jumper"
      :total="200">
    </el-pagination>
</div>
</div>
</template>

<script>
import searchComp from '@/components/searchComp'
export default {
  components: {
    searchComp
  },
  methods: {
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    handleClick () {
      console.log(this.activeName)
    },
    handleCurrentChange () {},
    handleSizeChange () {}
  },
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      activeName: 'first',
      currentpage: 1,
      pagesize: 5

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
