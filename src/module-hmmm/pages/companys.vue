<template>
  <div class='container'>
    <el-card shadow='always'>
      <PkgTable :pageInfo='pageInfo' :paginationShow='paginationShow' :tableData='tableData' :tableColumnOptions='tableColumnOptions' @changeCurrentPage='handleCurrentChange' @changeSize='handleSizeChange'>
        <template #handle>
          <el-button type="info" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </template>
        <template #date='{data}'>
          {{data.addDate | formatDate}}
        </template>
      </PkgTable>
    </el-card>
  </div>
</template>

<script>
import { list } from '@/api/hmmm/companys.js'
export default {
  data () {
    return {
      pageInfo: {
        page: 1,
        pagesize: 5,
        pages: 1
      },
      paginationShow: true,
      tableData: [],
      tableColumnOptions: [
        { columnType: true, label: '企业编号', prop: 'number', width: '210px' },
        { columnType: false, label: '企业简称', prop: 'shortName', width: '200px' },
        { columnType: false, label: '标签', prop: 'tags', width: '100px' },
        { columnType: false, label: '创建者', prop: 'creatorID', width: '50px' },
        { columnType: true, label: '创建日期', prop: 'addDate', width: '200px', slotName: 'date' },
        { columnType: false, label: '备注', prop: 'remarks', width: '200px' },
        { columnType: false, label: '状态', prop: 'state', width: '50px' },
        { columnType: true, label: '操作', width: '200px', slotName: 'handle', position: 'right' }
      ]
    }
  },
  mounted () {
    this.getCompanysList()
  },
  methods: {
    async getCompanysList () {
      const { data: { page, pagesize, pages, items } } = await list(this.pageInfo)
      this.tableData = items
      this.pageInfo.page = +page
      this.pageInfo.pagesize = +pagesize
      this.pageInfo.pages = pages
    },
    handleCurrentChange (currentPage) {
      this.pageInfo.page = currentPage
      this.getCompanysList()
    },
    handleSizeChange (size) {
      this.pageInfo.pagesize = size
      this.getCompanysList()
    }
  }
}
</script>

<style scoped>
</style>
