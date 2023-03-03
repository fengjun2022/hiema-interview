<template>
  <div class='container'>111</div>
</template>

<script>
import { provinces, citys } from '@/api/hmmm/citys.js'
import { list, remove, disabled } from '@/api/hmmm/companys.js'
import CompanysEnum from '@/api/base/baseApi.js'
import CompanysAdd from '@/module-hmmm/components/companys-add'
export default {
  name: 'CompanysView',
  components: {
    CompanysAdd
  },
  data() {
    return {
      isShowDialog: false,
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
      ],
      formOptions: [
        { label: '标签名称', type: 'input', param: 'tags', placeholder: '请输入' },
        { label: '城市', type: 'select', param: 'province', placeholder: '请选择', selectOptions: provinces() },
        { label: '地区', type: 'select', param: 'city', placeholder: '请选择', selectOptions: citys },
        { label: '企业简称', type: 'input', param: 'shortName', placeholder: '请输入' },
        { label: '状态', type: 'selectNormal', param: 'state', placeholder: '请选择', selectOptions: CompanysEnum.status }
      ]
    }
  },
  mounted() {
    this.getCompanysList()
  },
  methods: {
    async getCompanysList(formData) {
      const { data: { page, pagesize, counts, items }} = await list({ ...this.pageInfo, ...formData })
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
    async del(id) {
      try {
        await this.$confirm('您确定删除吗?')
        await remove(id)
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
    },
    search(formData) {
      this.getCompanysList(formData)
    },
    handleChange(currentItem, id) {
      this.formOptions[2].selectOptions = citys(currentItem)
      this.$refs.Search.defaultCity(citys(currentItem)[0])
    },
    addUser() {
      this.isShowDialog = true
    },
    async edit(id) {
      this.isShowDialog = true
      await this.$refs.CompanysAdd.editData(id)
    }
  }
}
</script>

<style scoped>
</style>
