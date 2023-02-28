<template>
  <div class="container">
    <!-- 卡片主体区域 -->
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-row :gutter="10">
        <el-col :span="18">
          <el-col :span="6">
            <el-form label-width="80px">
              <el-form-item label="学科名称">
                <el-input style="height: 32px"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="18">
            <el-button size="small" class="colInput" plain>清除</el-button>
            <el-button size="small" class="colInput" type="primary"
              >搜索</el-button
            >
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-button
            class="colright"
            size="mini"
            type="success"
            icon="el-icon-edit"
            >新增学科</el-button
          >
        </el-col>

        <el-alert
          :title="`数据一共${counts}条`"
          :closable="false"
          type="info"
          show-icon
        >
        </el-alert>
      </el-row>
      <!-- 表格区域 -->
      <template>
        <el-table style="width: 100%" :data="subjectList">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="subjectName" label="学科名称">
          </el-table-column>
          <el-table-column prop="username" label="创建者"> </el-table-column>
          <el-table-column prop="addDate" label="创建日期"> </el-table-column>
          <el-table-column prop="isFrontDisplay" label="前台是否显示">
          </el-table-column>
          <el-table-column prop="twoLevelDirectory" label="二级目录">
          </el-table-column>
          <el-table-column prop="tags" label="标签"> </el-table-column>
          <el-table-column prop="totals" label="题目数量"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="text"
                @click="
                  $router.push(
                    `directorys?id=${scope.row.id}&name=${scope.row.subjectName}`
                  )
                "
                >学科分类</el-button
              >
              <el-button
                size="small"
                type="text"
                @click="
                  $router.push(
                    `tags?id=${scope.row.id}&name=${scope.row.subjectName}`
                  )
                "
                >学科标签</el-button
              >
              <el-button
                size="small"
                type="text"
                @click="editSubList(scope.row)"
                >修改</el-button
              >
              <el-button size="small" type="text" @click="deleteSub(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 分页区域 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          background
           layout="prev, pager, next,sizes,jumper"
          :page-sizes="[2, 4, 6, 8, 10]"
          :total="counts"
          :current-page="paginationInfo.page"
          :page-size="paginationInfo.pagesize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getsubjects } from '@/api/hmmm/subjects.js'
export default {
  name: 'Subjects',
  data () {
    return {
      paginationInfo: {
        page: 1,
        size: 10
      },
      total: 0,
      subjectList: []
    }
  },
  components: {},
  created () {
    this.getsubjects()
  },
  computed: {},
  methods: {
    async getsubjects () {
      const res = await getsubjects(this.paginationInfo)
      console.log(res)
      this.subjectList = res.data.items
      this.counts = res.data.counts
    },
    handleSizeChange (val) {
      this.paginationInfo.pagesize = val
      this.getsubjects()
    },
    handleCurrentChange (val) {
      this.paginationInfo.page = val
      this.getsubjects()
    }
  }
}
</script>

<style scoped lang='scss'>
.container {
  .colInput {
    height: 35px;
  }
  .colright {
    float: right;
    height: 35px;
  }
  .subspan {
    font-size: 14px;
    font-weight: 700;
    margin-right: 10px;
    margin-left: 10px;
  }
  .el-alert {
    margin-bottom: 20px;
  }
  .el-pagination {
    float: right;
    margin-top: 20px;
  }
}
</style>
