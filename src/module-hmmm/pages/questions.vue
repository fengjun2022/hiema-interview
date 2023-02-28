<template>
<div style="background-color:white">
<searchComp></searchComp>
<div class="table">
  <el-alert
    title="消息提示的文案"
    type="info"
    show-icon
    style="margin-bottom:20px">
  </el-alert>
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">

    <el-table-column
      prop="number"
      label="试题编号"
      width="180">
    </el-table-column>
        <el-table-column
      prop="subject"
      label="学科"
      width="180">
    </el-table-column>
        <el-table-column
      prop="catalog"
      label="目录"
      width="180">
    </el-table-column>
      <el-table-column
      prop="questionType"
      label="题型"
      width="180">
    </el-table-column>
        <el-table-column
      prop="question"
      label="题干"
      width="220">
    </el-table-column>
        <el-table-column
      prop="addDate"
      label="录入时间"
      width="180">
    </el-table-column>
        <el-table-column
      prop="difficulty"
      label="难度"
      width="180">
    </el-table-column>
        <el-table-column
      prop="creator"
      label="录入人"
      width="180">
    </el-table-column>
        <el-table-column
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
      <el-pagination
      align="right"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.page"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="page.pagesize"
      layout=" sizes, prev, pager, next, jumper"
      :total="200">
    </el-pagination>
</div>

  </div>
</template>

<script>
import searchComp from '@/components/searchComp'
import { getBaseInfo } from '@/api/hmmm/questions'
export default {
  components: {
    searchComp
  },
  data () {
    return {
      tableData: [{
        // addDate: '',
        // answer: '',
        // catalogId: ' ',
        // catalog: '',
        // city: '',
        // creator: '',
        // creatorID: '',
        // difficulty:'',
        // direction:'',
        // enterprise:'',
        // enterpriseID:'',
        // id:'',
        // number:'',
      }],
      page: {
        page: 1,
        pagesize: 5
      },
      form: {
      }
    }
  },
  created () {
    this.getBaseInfo()
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
    },
    handleSizeChange () {},
    handleCurrentChange () {},
    async getBaseInfo () {
      const res = await getBaseInfo(this.page)
      const { items } = res.data
      this.tableData = items
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
