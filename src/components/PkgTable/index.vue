<template>
  <div>
    <!-- 表格 -->
    <el-table max-height="500px" class="table" :data="tableData" border stripe highlight-current-row>
      <!-- index -->
      <!-- 其他 -->
      <template v-for="item in tableColumnOptions">
        <!-- 插槽列 -->
        <el-table-column
          v-if="item.columnType"
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :header-align="item.headerAlign || 'center'"
          :align="item.align || 'center'"
          :fixed='item.position'
        >
          <template #default="{ row }">
            <slot :name="item.slotName" :data="row"></slot>
          </template>
        </el-table-column>
        <!-- 非插槽列 -->
        <el-table-column
          v-else
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :header-align="item.headerAlign || 'center'"
          :align="item.align || 'center'"
          :fixed='item.position'
        >
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页器 -->
      <el-row type="flex" justify="center" style="margin-top: 20px">
        <el-pagination
        background
        :hide-on-single-page="isShowPagination"
        :page-sizes="[5,10,20,50]"
        :current-page="pageInfo.page"
        :page-size="pageInfo.pagesize"
        :total="pageInfo.pages*pageInfo.pagesize"
        layout="sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        center
      >
      </el-pagination>
      </el-row>
  </div>
</template>
<script>
export default {
  name: 'PkgTable',
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 父组件配置项
    tableColumnOptions: {
      type: Array,
      require: true,
      default: () => []
    },
    // 分页数据 ---- page:当前页 pagesize：每页数量
    pageInfo: {
      type: Object,
      default: () => {}
    },
    // 是否显示分页器
    paginationShow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 计算是否显示分页器
    isShowPagination () {
      const isShow = this.pageInfo.pages === 0
      return isShow
    }
  },
  methods: {
    // 修改当前页
    handleCurrentChange (currentPage) {
      this.$emit('changeCurrentPage', currentPage)
    },
    // 修改每页数量
    handleSizeChange (size) {
      this.$emit('changeSize', size)
    }
  }
}
</script>
<style  scoped lang = 'scss'>
</style>
