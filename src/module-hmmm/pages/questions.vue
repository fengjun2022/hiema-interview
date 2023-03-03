<template>
  <div />
</template>
<script>
import searchComp from '@/components/searchComp'
import { getBaseInfo, deleteBaseInfo, toggleChoiceState, getBaseById } from '@/api/hmmm/questions'
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
      radio: 1,
      tableData: [],
      tableColumnOptions: [
        { columnType: false, label: '试题编号', prop: 'number', width: '180' },
        { columnType: false, label: '学科', prop: 'subject', width: '180' },
        { columnType: false, label: '目录', prop: 'catalog', width: '180' },
        { columnType: true, label: '题型', prop: 'questionType', width: '180', slotName: 'questionType' },
        { columnType: true, label: '题干', prop: 'question', width: '220', slotName: 'question' },
        { columnType: true, label: '录入时间', prop: 'addDate', width: '180', slotName: 'date' },
        { columnType: true, label: '难度', prop: 'difficulty', width: '180', slotName: 'difficulty' },
        { columnType: false, label: '录入人', prop: 'creator', width: '180' },
        { columnType: true, label: '操作', width: '200px', slotName: 'handle', position: 'right' }
      ],
      paginationShow: true,
      isShow: false,
      // 预览数据
      previewDate: {}

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
    async Preview(data) {
      this.isShow = true
      const res = await getBaseById(data.id)
      this.previewDate = res.data
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
    },
    handleChangePage(val) {
      console.log(val)
      this.pageInfo.page = val
      this.getBaseInfo(this.pageInfo)
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
