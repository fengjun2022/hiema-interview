<template>
  <div id="Wrap">
    <!-- 表格 -->
    <el-table max-height="500px" class="table" :data="tableData" border>
      <!-- index -->
     <el-table-column type="index" header-align="center" align="center" width="80" label="序号"> </el-table-column>
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
        >
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页器 -->
    <div class="pagination" v-if="paginationShow">
      <el-pagination
        :hide-on-single-page="isShowPagination"
        :page-sizes="[5,10,20,25]"
        :current-page="pageInfo.page"
        :page-size="pageInfo.pagesize"
        :total="pageInfo.pages"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
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
    // 分页数据 ---- page:当前页 pagesize：每页数量 pages:总页数
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
