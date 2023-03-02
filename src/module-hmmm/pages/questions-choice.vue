<template>
  <div>
    <searchComp :flag="2" />
    <div class="table">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="1" />
        <el-tab-pane label="待审核" name="2" />
        <el-tab-pane label="已审核" name="3" />
        <el-tab-pane label="已拒绝" name="4" />
      </el-tabs>
      <el-alert
        title="消息提示的文案"
        type="info"
        show-icon
        style="margin-bottom:20px"
      />
      <PkgTable :table-data="tableData" :pagination-show="paginationShow" :table-column-options="tableColumnOptions" :page-info="pageInfo" @changeCurrentPage="handleChangePage">
        <template #date="{data}">
          {{ data.addDate | formatDate }}
        </template>
        <template #question="{data}">
          {{ data.question | html2Text }}
        </template>
        <template #handle="{data}">
          <el-button type="text" size="small" @click="Preview(data)">预览</el-button>
          <el-button type="text" size="small" :disabled="data.chkState===1" @click="PreviewChk(data)">审核</el-button>
          <el-button type="text" size="small" :disabled="data.publishState!==0" @click="$router.push({path:'new',query:{id:data.id}})">修改</el-button>
          <el-button type="text" size="small" @click="handleShelf(data)">{{ data.publishState==0?'上架':'下架' }}</el-button>
          <el-button type="text" size="small" :disabled="data.publishState!==0" @click="handleDelete(data.id)">删除</el-button>
        </template>
      </PkgTable>
    </div>
    <Dialog :is-show.sync="isShow">
      <textarea>nmsl</textarea>
    </Dialog>
    <Dialog :is-show.sync="isShow1">
      <el-radio v-model="radio" label="1">通过</el-radio>
      <el-radio v-model="radio" label="2">拒绝</el-radio>
      <el-input type="textarea" />
    </Dialog>
  </div>
</template>

<script>
import searchComp from '@/components/searchComp'
import { getChoiceInfo, deleteBaseInfo, togglePublishState } from '@/api/hmmm/questions'
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
      radio: '',
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
        { columnType: false, label: '审核状态', prop: 'chkState', width: '180' },
        { columnType: false, label: '审核意见', prop: 'chkRemarks', width: '180' },
        { columnType: false, label: '审核人', prop: 'chkUser', width: '180' },
        { columnType: false, label: '发布状态', prop: 'publishState', width: '180' },
        { columnType: true, label: '操作', width: '200px', slotName: 'handle', position: 'right' }
      ],
      paginationShow: true,
      isShow: false,
      isShow1: false,
      activeName: ''
    }
  },
  created() {
    this.getChoiceInfo()
  },
  methods: {
    async getChoiceInfo(data) {
      const res = await getChoiceInfo({ ...this.pageInfo, ...data })
      this.tableData = res.data.items
      this.pageInfo.counts = res.data.counts
    },
    async handleDelete(id) {
      try {
        await this.$confirm('请问确认删除吗')
        await deleteBaseInfo(id)
        this.$message.success('删除成功')
        this.getChoiceInfo()
      } catch (error) {
        console.log(error)
      }
    },
    Preview(data) {
      console.log(data)
      this.isShow = true
    },
    PreviewChk(data) {
      console.log(data)
      this.isShow1 = true
    },
    handleChangePage(val) {
      console.log(val)
      this.pageInfo.page = val
      this.getChoiceInfo(this.pageInfo)
    },
    handleClick() {
      switch (this.activeName) {
        case '1':
          this.getChoiceInfo()
          break
        case '2':
          this.getChoiceInfo({ chkState: 0 })
          break
        case '3':
          this.getChoiceInfo({ chkState: 1 })
          break
        case '4':
          this.getChoiceInfo({ chkState: 2 })
          break
        default:
          break
      }
    },
    async handleShelf(data) {
      try {
        await this.$confirm(`确认要${data.publishState === 0 ? '上架' : '下架'}这道题目吗`)
        data.publishState = data.publishState === 0 ? 1 : 0
        await togglePublishState({ id: data.id, publishState: data.publishState })
        this.$message.success('操作成功')
      } catch (error) {
        console.log(error)
      }
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
