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
                <el-input
                  v-model="inputList.subjectName"
                  style="height: 32px"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="18">
            <el-button size="small" class="colInput" plain @click="clearSub"
              >清除</el-button
            >
            <el-button
              size="small"
              class="colInput"
              type="primary"
              @click="SearchIn"
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
            @click="newBtn"
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
          <el-table-column prop="addDate" label="创建日期">
             <template slot-scope="{ row }">
            {{ row.addDate | parseTimeByString }}
          </template>
          </el-table-column>
          <el-table-column prop="isFrontDisplay" label="前台是否显示">
            <template slot-scope="scope">
              {{ scope.row.isFrontDisplay === 1 ? "是" : "否" }}
            </template>
          </el-table-column>
          <el-table-column prop="twoLevelDirectory" label="二级目录">
          </el-table-column>
          <el-table-column prop="tags" label="标签"> </el-table-column>
          <el-table-column prop="totals" label="题目数量"> </el-table-column>
          <el-table-column label="操作" width="280">
            <template slot-scope="{ row }">
              <el-button
                size="small"
                type="text"
                @click="
                  $router.push(
                    `directorys?id=${row.id}&name=${row.subjectName}`
                  )
                "
                >学科分类</el-button
              >
              <el-button
                size="small"
                type="text"
                @click="
                  $router.push(`tags?id=${row.id}&name=${row.subjectName}`)
                "
                >学科标签</el-button
              >
              <el-button size="small" type="text" @click="newBtn2(row.id)"
                >修改</el-button
              >
              <el-button size="small" type="text" @click="deleteSub(row.id)"
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
          :total="total"
          :current-page="paginationInfo.page"
          :page-size="paginationInfo.pagesize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          >
        </el-pagination>
      </el-row>
    </el-card>
    <Dialog
      :title="inputList.creatorID ? '修改学科' : '新增学科'"
      :isShow.sync="showDialog"
      @submit="submit"
    >
      <el-row>
        <el-col>
          <el-form
            :model="inputList"
            :rules="addSubjectsFromRules"
            ref="inputListRef"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item label="学科名称" prop="subjectName">
              <el-input
                v-model="inputList.subjectName"
                placeholder="请输入学科名称"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <span class="subspan">是否显示</span>
        <el-switch
          v-model="isFrontDisplay"
          :active-value="1"
          :inactive-value="0"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-row>
    </Dialog>
  </div>
</template>

<script>
import {
  getsubjects,
  addsubjects,
  editsubjects,
  deletesubjects,
  getsubject
} from '@/api/hmmm/subjects.js'
export default {
  name: 'Subjects',
  data () {
    return {
      paginationInfo: {
        page: 1,
        size: 10
      },
      total: 0,
      subjectList: [],
      inputList: {
        subjectName: '',
        isFrontDisplay: '1'
      },
      counts: '',
      showDialog: false,
      isFrontDisplay: true,
      addSubjectsFromRules: {
        subjectName: [
          { required: true, message: '请输入学科名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  components: {},
  created () {
    this.getsubjects()
  },
  computed: {},
  methods: {
    // 获取列表内容
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
    },
    // 清除
    clearSub () {
      this.inputList.subjectName = ''
    },
    async SearchIn () {
      this.paginationInfo.page = 1
      const res = await getsubjects({
        ...this.paginationInfo,
        subjectName: this.inputList.subjectName
      })
      this.subjectList = res.data.items
    },
    newBtn () {
      this.showDialog = true
    },
    async newBtn2 (id) {
      this.showDialog = true
      const res = await getsubject(id)
      this.inputList = res.data
    },
    async submit () {
      await this.$refs.inputListRef.validate()
      try {
        if (this.inputList.creatorID) {
          await editsubjects(this.inputList)
          this.$message.success('修改学科成功')
        } else {
          await addsubjects(this.inputList)
          this.$message.success('新增学科成功')
        }
        this.inputList = {
          subjectName: '',
          isFrontDisplay: '1'
        }
        this.getsubjects()
      } catch (error) {
        console.log(error)
      }
    },
    async deleteSub (id) {
      try {
        await this.$confirm('确认删除吗')
        await deletesubjects(id)
        this.getsubjects()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
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
