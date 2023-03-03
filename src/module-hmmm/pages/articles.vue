<template>
  <div class="container">
    <el-card>
      <Search :form-item-list="formItemList" :emit-search="emitSearch" @search="search">
        <template #btn>
          <el-row>
            <el-button class="btn" size="medium" type="primary" @click="edit">
              <i class="el-icon-edit" />
              新增加技巧</el-button>
          </el-row>
        </template>
      </Search>
      <PkgTable :page-info="pageInfo" :pagination-show="paginationShow" :table-data="tableData" :table-column-options="tableColumnOptions" @changeCurrentPage="handleCurrentChange" @changeSize="handleSizeChange">
        <!-- 自定义操作结构 -->
        <template #btn="{data}">
          <el-button icon="el-icon-zoom-in" circle @click="preview(data)" />
          <el-button :type="data.state===1?'warning':'success'" :icon="data.state===1?'el-icon-close':'el-icon-check'" circle @click="changeState({...data,state:+!data.state})" />
          <el-button :disabled="data.state===1?false:true" type="primary" icon="el-icon-edit" circle @click="remove(data)" />
          <el-button :disabled="data.state===1?false:true" type="danger" icon="el-icon-delete" circle @click="del(data)" />
        </template>
        <!-- 格式化日期 -->
        <template #date="{data}">
          {{ data.createTime | formatDate }}
        </template>
        <!-- 格式化状态 -->
        <template #state="{data}">
          <el-switch ref="switch" :value="+data.state === 1" />
        </template>
      </PkgTable>
      <!-- 弹窗 -->
      <Dialog ref="DialogRef" :show-dialog="showDialog" @edit="addedit" />
      <!-- 弹窗2 -->
      <Preview ref="PreviewRef" :prew-show-dialog="prewShowDialog" @remove="removett" />
    </el-card>
  </div>
</template>

<script>
import { list, remove, changeState } from '@/api/hmmm/articles.js'
import Dialog from '../components/articles-add.vue'
import Preview from '../components/articles-preview.vue'
import Search from '../components/articles-search.vue'
export default {
  components: { Dialog, Preview, Search },
  data() {
    return {
      dialogVisible: false,
      emitSearch: false,
      showDialog: false,
      prewShowDialog: false,
      wangValue: '',
      wangDisabled: false,
      formItemList: [
        { label: '关键词', type: 'input', param: 'title', placeholder: '根据文章标题搜索' },
        { label: '状态', type: 'select', selectOptions: [{ name: '启动', value: '1' }, { name: '禁止使用', value: '0' }], param: 'state', placeholder: '请选择' }
      ],
      pageInfo: {
        page: 1,
        pagesize: 5,
        counts: 5,
        keyword: ''
      },
      paginationShow: true,
      tableData: [],
      tableColumnOptions: [
        { columnType: false, label: '文章标题', prop: 'title', width: '200px' },
        { columnType: false, label: '阅读数', prop: 'visits', width: '200px' },
        { columnType: false, label: '录入人', prop: 'username', width: '200px' },
        { columnType: true, label: '录入时间', prop: 'createTime', width: '200px', slotName: 'date' },
        { columnType: true, label: '状态', prop: 'state', width: '100px', slotName: 'state' },
        { columnType: true, label: '操作', width: '300px', slotName: 'btn' }

      ]
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    // 搜索条件改变时重新渲染数据
    search(params) {
      console.log(params)
      this.getArticleList({ keyword: params.title })
    },

    // 添加技巧
    edit() {
      this.showDialog = true
    },
    addedit() {
      this.showDialog = false
      this.getArticleList()
    },
    async preview(data) {
      await this.$refs.PreviewRef.detail(data.id)
      this.prewShowDialog = true
    },
    removett() {
      this.prewShowDialog = false
    },
    async remove(data) {
      await this.$refs.DialogRef.detail(data.id)
      this.showDialog = true
    },
    // 获取数据
    async getArticleList(obj) {
      const { data } = await list({ ...this.pageInfo, ...obj })
      this.tableData = data.items
      this.pageInfo.counts = data.counts
      this.pageInfo.pages = data.items.pages
      this.pageInfo.state = data.items.state
    },
    // 当前页数
    handleCurrentChange(currentPage) {
      this.pageInfo.page = currentPage
      this.getArticleList()
    },
    // 当前页数大小
    handleSizeChange(size) {
      this.pageInfo.pagesize = size
      this.getArticleList()
    },
    async del(data) {
      try {
        await this.$confirm('您确定删除吗?')
        await remove(data)
        this.getArticleList()
        if (this.tableData.length === 1 && this.pageInfo.page !== 1) {
          this.pageInfo.page--
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 启用禁用
    async changeState(data) {
      await changeState(data)
      this.getArticleList()
    }

  }

}
</script>

<style scoped lang='scss'>
.el-card{
  margin: 20px;
  color:#303133;
}
.btn{
   position: absolute;
   right: 10px;
   bottom: 25px;
   background-color: #67c23a;
   border: none;
   color: #fff;
   width: 120px;
   height: 35px;

  }
  .el-alert{
   margin-bottom: 20px;
  }

</style>
