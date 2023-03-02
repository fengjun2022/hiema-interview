<template>
  <div class="container">
    <el-card shadow="always">
      <PkgTable :page-info="pageInfo" :pagination-show="paginationShow" :table-data="tableData" :table-column-options="tableColumnOptions" @changeCurrentPage="handleCurrentChange" @changeSize="handleSizeChange">
        <!-- 自定义操作结构 -->
        <template #handle="{data}">
          <el-button :type="data.state===1?'warning':'success'" :icon="data.state===1?'el-icon-close':'el-icon-check'" circle @click="changeState({...data,state:+!data.state})" />
          <el-button :disabled="data.state===1?false:true" type="info" icon="el-icon-edit" circle />
          <el-button :disabled="data.state===1?false:true" type="danger" icon="el-icon-delete" circle @click="del(data)" />
        </template>
        <!-- 格式化日期 -->
        <template #date="{data}">
          {{ data.addDate | formatDate }}
        </template>
        <!-- 格式化状态 -->
        <template #state="{data}">
          <el-switch ref="switch" :value="+data.state === 1" active-color="#53b6f4" inactive-color="#ff4949" />
        </template>
        <!-- 格式化创建者 -->
        <template #creator="{data}">
          {{ creatorName(data.creatorID) }}
        </template>
      </PkgTable>
    </el-card>
  </div>
</template>

<script>
import { list, remove, disabled } from '@/api/hmmm/companys.js'
import CompanysEnum from '@/api/base/baseApi.js'
export default {
  data() {
    return {
      pageInfo: {
        page: 1,
        pagesize: 5,
        counts: 0
      },
      paginationShow: true,
      tableData: [],
      tableColumnOptions: [
        { columnType: true, label: '企业编号', prop: 'number', width: '210px' },
        { columnType: false, label: '企业简称', prop: 'shortName', width: '200px' },
        { columnType: false, label: '标签', prop: 'tags', width: '100px' },
        { columnType: true, label: '创建者', prop: 'creatorID', width: '70px', slotName: 'creator' },
        { columnType: true, label: '创建日期', prop: 'addDate', width: '200px', slotName: 'date' },
        { columnType: false, label: '备注', prop: 'remarks', width: '200px' },
        { columnType: true, label: '状态', prop: 'state', width: '100px', slotName: 'state' },
        { columnType: true, label: '操作', width: '200px', slotName: 'handle', position: 'right' }
      ]
    }
  },
  mounted() {
    this.getCompanysList()
  },
  methods: {
    async getCompanysList() {
      const { data: { page, pagesize, counts, items }} = await list(this.pageInfo)
      this.tableData = items
      this.pageInfo.page = +page
      this.pageInfo.pagesize = +pagesize
      this.pageInfo.counts = counts
    },
    handleCurrentChange(currentPage) {
      this.pageInfo.page = currentPage
      this.getCompanysList()
    },
    handleSizeChange(size) {
      this.pageInfo.pagesize = size
      this.getCompanysList()
    },
    creatorName(creatorID) {
      const obj = CompanysEnum.role.find(item => +item.id === creatorID)
      return obj ? obj.value : '未知人员'
    },
    async changeState(data) {
      const word = data.state === 1 ? '启用' : '禁用'
      await this.$confirm(`是否要切换到${word}状态`)
      await disabled(data)
      this.getCompanysList()
      this.$message.success(`已成功切换到${word}状态`)
    },
    async del(data) {
      try {
        await this.$confirm('您确定删除吗?')
        await remove(data)
        if (this.tableData.length === 1 && this.pageInfo.page !== 1) {
          this.pageInfo.page--
        }
        this.getCompanysList()
        this.$notify({
          message: '删除成功!',
          duration: 1500,
          showClose: false
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
</style>
