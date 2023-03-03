<template>
  <div>
    <div style="background-color:white;padding:20px">
      <el-form ref="form" :model="form" label-width="auto" :inline="true" class="demo-form-inline">
        <el-form-item label="关键字" prop="keyword">
          <el-input v-model="form.keyword" />
        </el-form-item>
        <el-form-item style="float:right ; margin-right:28px">
          <el-button size="small" @click="clearForm">清除</el-button>
          <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <PkgTable :table-data="tableData" :pagination-show="paginationShow" :table-column-options="tableColumnOptions" :page-info="pageInfo" @changeCurrentPage="handleChangePage" @changeSize="changeSize">
      <template #date="{data}">
        {{ data.addTime | formatDate }}
      </template>
      <template #questionIDs="{data}">
        <el-row v-for="item in data.questionIDs" :key="item.number">
          <el-button type="text" size="small" @click="Preview(item.id)">{{ item.number }}</el-button>
        </el-row>
      </template>
      <template #handle="{data}">
        <el-button type="danger" icon="el-icon-delete" circle title="删除" @click="handleDelete(data.id)" />
      </template>
      <template #questionType="{data}">
        {{ data.questionType | questionType }}
      </template>
    </PkgTable>
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
      <div>【答案解析】：{{ previewDate.answer | html2Text }}</div>
      <el-divider />
      <div>【题目备注】：{{ previewDate.remarks }}</div>
    </Dialog>
  </div>
</template>

<script>
import { getRandomInfo, getBaseById, deleteRandom } from '@/api/hmmm/questions'
export default {
  data() {
    return {
      pageInfo: {
        page: 1,
        pagesize: 5,
        counts: 0
      },
      form: {},
      isShow: false,
      radio: 1,
      // 预览数据
      previewDate: {},
      tableData: [],
      tableColumnOptions: [
        { columnType: false, label: '编号', prop: 'id', width: '180' },
        { columnType: true, label: '题型', prop: 'questionType', width: '180', slotName: 'questionType' },
        { columnType: true, label: '题型编号', prop: 'questionIDs', width: '180', slotName: 'questionIDs' },
        { columnType: true, label: '录入时间', prop: 'addTime', width: '180', slotName: 'date' },
        { columnType: false, label: '答题时间(s)', prop: 'totalSeconds', width: '220' },
        { columnType: false, label: '正确率(%)', prop: 'accuracyRate', width: '180' },
        { columnType: false, label: '录入人', prop: 'userName', width: '180' },
        { columnType: true, label: '操作', width: '200px', slotName: 'handle', position: 'right' }
      ],
      paginationShow: true
    }
  },
  created() {
    this.getRandomInfo()
  },
  methods: {
    async  getRandomInfo(value) {
      const res = await getRandomInfo({ ...this.pageInfo, ...value })
      console.log(res)
      this.tableData = res.data.items
      this.pageInfo.counts = res.data.counts
      console.log(this.tableData)
    },
    handleChangePage(val) {
      console.log(val)
      this.pageInfo.page = val
      this.getChoiceInfo(this.pageInfo)
    },
    async Preview(id) {
      this.isShow = true
      const res = await getBaseById(id)
      this.previewDate = res.data
    },
    onSubmit() {
      this.getRandomInfo(this.form)
    },
    clearForm() {
      this.$refs.form.resetFields()
    },
    changeSize(val) {
      this.pageInfo.pagesize = val
      this.getRandomInfo()
    },
    async handleDelete(id) {
      console.log(id)
      await this.$confirm('是否确认删除')
      await deleteRandom(id)
      this.$message.success('删除成功')
    }

  }
}
</script>

<style scoped lang='less'></style>
