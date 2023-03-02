<template>
  <div>
    <searchComp :flag="1" />
    <div class="table">
      <el-alert
        :title="`总共${pageInfo.counts}条数据`"
        type="info"
        show-icon
        style="margin-bottom:20px"
      />
      <PkgTable :table-data="tableData" :pagination-show="paginationShow" :table-column-options="tableColumnOptions" :page-info="pageInfo">
        <template #date="{data}">
          {{ data.addDate | formatDate }}
        </template>
        <template #question="{data}">
          {{ data.question | html2Text }}
        </template>
        <template #handle="{data}">
          <el-button type="primary" icon="el-icon-view" circle title="预览" @click="Preview(data)" />
          <el-button type="success" icon="el-icon-edit" circle title="编辑" @click="$router.push({path:'new',query:{id:data.id}})" />
          <el-button type="danger" icon="el-icon-delete" circle title="删除" @click="handleDelete(data.id)" />
          <el-button type="warning" icon="el-icon-check" circle title="加入精选" @click="addChoiceState(data)" />
        </template>
      </PkgTable>
    </div>
    <Dialog :is-show.sync="isShow" />
  </div>
</template>

<script>
import searchComp from '@/components/searchComp'
import { getBaseInfo, deleteBaseInfo, toggleChoiceState } from '@/api/hmmm/questions'
export default {
  components: {
    searchComp
  },
  data() {
    return {
      pageInfo: {
        page: 1,
        pagesize: 5,
        counts: 0
      },
      tableData: [],
      tableColumnOptions: [
        { columnType: false, label: '试题编号', prop: 'number', width: '180' },
        { columnType: false, label: '学科', prop: 'subject', width: '180' },
        { columnType: false, label: '目录', prop: 'catalog', width: '180' },
        { columnType: false, label: '题型', prop: 'questionType', width: '180' },
        { columnType: true, label: '题干', prop: 'question', width: '220', slotName: 'question' },
        { columnType: true, label: '录入时间', prop: 'addDate', width: '180', slotName: 'date' },
        { columnType: false, label: '难度', prop: 'difficulty', width: '180' },
        { columnType: false, label: '录入人', prop: 'creator', width: '180' },
        { columnType: true, label: '操作', width: '200px', slotName: 'handle', position: 'right' }
      ],
      paginationShow: true,
      isShow: false

    }
  },
  created() {
    this.getBaseInfo()
  },
  methods: {
    async getBaseInfo(value) {
      const res = await getBaseInfo({ ...this.pageInfo, ...value })
      const { items } = res.data
      this.pageInfo.counts = res.data.counts
      this.tableData = items
    },
    Preview(val) {
      console.log(val)
      this.isShow = true
    },
    async handleDelete(id) {
      try {
        await this.$confirm('请问确认删除吗')
        await deleteBaseInfo(id)
        this.$message.success('删除成功')
        this.getBaseInfo()
      } catch (error) {
        console.log(error)
      }
    },
    async addChoiceState(data) {
      try {
        await this.$confirm('请问确认加入精选吗')
        await toggleChoiceState({ id: data.id, choiceState: 1 })
        this.$message.success('删除成功')
        this.getBaseInfo()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
 .table{
    margin: 10px;
    background-color: white;
  }
</style>
