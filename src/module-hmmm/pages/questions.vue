<template>
  <div>
    <searchComp :flag="1" />
    <div class="table">
      <PkgTable :table-data="tableData" :pagination-show="paginationShow" :table-column-options="tableColumnOptions" :page-info="pageInfo" @changeCurrentPage="handleChangePage">
        <template #date="{data}">
          {{ data.addDate | formatDate }}
        </template>
        <template #question="{data}">
          {{ data.question | html2Text }}
        </template>
        <template #questionType="{data}">
          {{ data.questionType | questionType }}
        </template>
        <template #difficulty="{data}">
          {{ data.difficulty | difficulty }}
        </template>
        <template #handle="{data}">
          <el-button type="primary" icon="el-icon-view" circle title="预览" @click="Preview(data)" />
          <el-button type="success" icon="el-icon-edit" circle title="编辑" @click="$router.push({path:'new',query:{id:data.id}})" />
          <el-button type="danger" icon="el-icon-delete" circle title="删除" @click="handleDelete(data.id)" />
          <el-button type="warning" icon="el-icon-check" circle title="加入精选" @click="addChoiceState(data)" />
        </template>
      </PkgTable>
    </div>
    <Dialog :is-show.sync="isShow" :dialog_width="'45%'">
      <el-row>
        <el-col :span="6"><div>【题型】:{{ previewDate.questionType }}</div></el-col>
        <el-col :span="6"><div>【编号】:{{ previewDate.id }}</div></el-col>
        <el-col :span="6"><div>【难度】:{{ previewDate.difficulty }}</div></el-col>
        <el-col :span="6"><div>【标签】:{{ previewDate.tags }}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><div>【学科】:{{ previewDate.subjectName }}</div></el-col>
        <el-col :span="6"><div>【目录】:{{ previewDate.directoryName }}</div></el-col>
        <el-col :span="6"><div>【方向】:{{ previewDate.direction }}</div></el-col>
      </el-row>
      <el-divider />
      <el-row>
        <div>【题干】</div>
        <div style="margin-top:10px ;color:blue">{{ previewDate.answer | html2Text }}</div>
        <div style="margin-top:10px">
          <div v-if="previewDate.questionType!=3">
            <div>{{ previewDate.questionType }} 选项：（以下选中的选项为正确答案）</div>
            <div v-if="previewDate.questionType==1">
              <div v-for="item in previewDate.options" :key="item.id" style="margin-top:20px">
                <el-radio :value="radio" :label="item.isRight">{{ item.title }}</el-radio>
              </div>
            </div>
            <div v-else>
              <div v-for="item in previewDate.options" :key="item.id" style="margin-top:20px">
                <el-radio :value="radio" :label="item.isRight">{{ item.title }}</el-radio>
              </div>
            </div>
          </div>
          <div v-else>
            <div>简答题</div>
          </div>
        </div>
      </el-row>
      <el-divider />
      <div>【参考答案】： <el-button type="danger">视频答案预览</el-button>
      </div>
      <el-divider />
      <div>【答案解析】：{{ previewDate.answer }}</div>
      <el-divider />
      <div>【题目备注】：{{ previewDate.remarks }}</div>
    </Dialog>
  </div>
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
