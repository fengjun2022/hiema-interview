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
        <template #publishState="{data}">
          {{ data.publishState=='0'?'待上传':'已上传' }}
        </template>
        <template #chkState="{data}">
          {{ data.chkState=='0'?'待审核':('1'?'已审核':'已拒绝') }}
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
    <el-dialog v-if="isShow1==true" :visible.sync="isShow1" :before-close="Dialogcancle" title="审核">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-radio-group v-model="form.chkState">
            <el-radio label="通过" :value="1" />
            <el-radio label="拒绝" :value="2" />
          </el-radio-group>
        </el-form-item>
        <el-form-item
          prop="chkRemarks"
        >
          <el-input v-model="form.chkRemarks" required type="textarea" placeholder="请输入审核意见" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Dialogcancle">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import searchComp from '@/components/searchComp'
import { getChoiceInfo, deleteBaseInfo, togglePublishState, getBaseById, changeChkState } from '@/api/hmmm/questions'
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
      form: {
        chkState: '通过',
        chkRemarks: '',
        id: ''
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
        { columnType: true, label: '审核状态', prop: 'chkState', width: '180', slotName: 'chkState' },
        { columnType: false, label: '审核意见', prop: 'chkRemarks', width: '180' },
        { columnType: false, label: '审核人', prop: 'chkUser', width: '180' },
        { columnType: true, label: '发布状态', prop: 'publishState', width: '180', slotName: 'publishState' },
        { columnType: true, label: '操作', width: '200px', slotName: 'handle', position: 'right' }
      ],
      paginationShow: true,
      isShow: false,
      isShow1: false,
      // 标签页数据
      activeName: '',
      // 预览数据
      previewDate: {}
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
    async Preview(data) {
      this.isShow = true
      const res = await getBaseById(data.id)
      this.previewDate = res.data
    },
    PreviewChk(data) {
      this.form.id = data.id
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
    },
    Dialogcancle() {
      this.$refs.form.resetFields()
      this.isShow1 = false
    },
    async submit() {
      try {
        this.form.chkState = this.form.chkState === '通过' ? 1 : 2
        console.log(this.form)
        await this.$confirm('是否确认修改')
        await changeChkState(this.form)
        this.$message.success('审核成功')
        this.Dialogcancle()
        this.getChoiceInfo()
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
  .el-row {
    margin-bottom: 20px;
  }
</style>
