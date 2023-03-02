<template>
  <div class='container'>
  <el-card>
<Search :formItemList="formItemList" :emitSearch="emitSearch"  @search="search">
<template #btn>
<el-row>
  <el-button class="btn" size="medium" type="primary" @click="edit">
    <i class="el-icon-edit"></i>
    新增加技巧</el-button>
</el-row>
 </template>
</Search>
 <el-alert
    title="数据统一()条"
    type="info"
    show-icon>
  </el-alert>
  <Table :pageInfo='pageInfo' :paginationShow='paginationShow' :tableData='tableData' :tableColumnOptions='tableColumnOptions'></Table>
  </el-card>
  </div>
</template>

<script>
import Search from '../components/articles-search'
import Table from '../components/index.vue'
import { list } from '@/api/hmmm/articles.js'
export default {
  components: {
    Search,
    Table
  },
  data () {
    return {
      dialogVisible: false,
      emitSearch: false,
      formItemList: [
        { label: '关键词', type: 'input', param: 'title', placeholder: '根据文章标题搜索' },
        { label: '关键词', type: 'input', param: 'title', placeholder: '根据文章标题搜索' },
        { label: '状态', type: 'select', selectOptions: [{ name: '启动', value: '1' }, { name: '禁止使用', value: '0' }], param: 'state', placeholder: '请选择' },
        { label: '状态', type: 'select', selectOptions: [{ name: '启动', value: '1' }, { name: '禁止使用', value: '0' }], param: 'state', placeholder: '请选择' }

      ],
      pageInfo: {
        page: 1,
        pagesize: 50,
        pages: 0,
        state: 1,
        keyword: ''
      },
      paginationShow: true,
      tableData: [],
      tableColumnOptions: [
        { columnType: false, label: '文章标题', prop: 'title', width: '200px' },
        { columnType: false, label: '阅读数', prop: 'visits', width: '200px' },
        { columnType: false, label: '录入人', prop: 'username', width: '200px' },
        { columnType: false, label: '录入时间', prop: 'createTime', width: '200px' },
        { columnType: false, label: '状态', prop: 'state', width: '200px' },
        { columnType: false, label: '操作', prop: 'tags', width: '200px' }

      ]

    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 搜索条件改变时重新渲染数据
    search (params) {
      this.getList({ keyword: params.title })
    },

    // 添加技巧
    edit () {
      console.log(1111)
    },
    // 获取数据
    async getList (res) {
      const { data } = await list(res)
      this.tableData = data.items
      console.log(this.tableData)
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
