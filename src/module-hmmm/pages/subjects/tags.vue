<template>
  <div class="container">
    <el-card>
      <!-- 搜索栏区域 -->
      <el-row>
        <el-col :span="18">
          <!-- 搜索框 -->
          <el-form :inline="true" label-width="80px">
            <el-form-item label="标签名称">
              <el-input
                v-model="inputList.directoryName"
                class="inputCol"
              ></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="inputList.state" placeholder="请选择">
                <el-option label="已启用" :value="1"> </el-option>
                <el-option label="已禁用" :value="0"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
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
            </el-form-item>
          </el-form>
        </el-col>
        <el-form>
          <el-col :span="6">
            <el-button
              class="colright"
              size="mini"
              type="success"
              icon="el-icon-edit"
              @click="newBtn"
              >新增标签</el-button
            >
          </el-col>
        </el-form>
      </el-row>

      <!-- 消息文案 -->
      <el-alert
        :title="`数据一共 ${counts} 条`"
        :closable="false"
        type="info"
        show-icon
      >
      </el-alert>

      <!-- 表格区域 -->
      <el-table :data="directoryList" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="subjectName" label="所属学科"> </el-table-column>
        <el-table-column prop="tagName" label="目录名称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="addDate" label="创建日期">
          <template slot-scope="{ row }">
            {{ row.addDate | parseTimeByString }}
          </template>
           </el-table-column>
        <el-table-column prop="state" label="状态">
         <template slot-scope="scope">
            {{ scope.row.state === 1 ? "已启用" : "已禁用" }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="{ row }">
             <el-button type="text" @click="changeState(row.state, row.id)">
              {{ row.state === 1 ? "禁用" : "启用" }}</el-button
            >
            <el-button type="text" :disabled="row.state ? true : false" @click="newBtn2(row.id)">修改</el-button>
            <el-button type="text" :disabled="row.state ? true : false" @click="deleteSub(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
          <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          background
          layout="prev, pager, next,sizes,jumper"
          :page-sizes="[2, 4, 6, 8, 10]"
          :total="total"
          :current-page="queryList.page"
          :page-size="queryList.pagesize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          >
        </el-pagination>
      </el-row>
    </el-card>

    <!-- 添加标签弹框 -->
        <Dialog :title="ruleForm.creatorID ? '修改标签' : '新增标签'" :isShow.sync="showDialog" @submit="submit">
      <el-form
        :model="ruleForm"
        ref="directorysFormRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="所属学科" prop="directoryName">
          <el-select
            v-model="ruleForm.subjectID"
            @focus="handleSelected"
            size="medium"
            style="width: 264px"
          >
            <el-option
              v-for="item in list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录名称" prop="directoryName">
          <el-input v-model="ruleForm.tagName" size="medium"></el-input>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import { simpleSubject } from '@/api/hmmm/subjects.js'
import { list, remove, detail, update, changeState, add } from '@/api/hmmm/tags.js'
export default {
  name: 'Directorys',
  data () {
    return {
      queryList: {
        page: 1,
        pagesize: 10,
        directoryName: '',
        state: null
      },
      total: 0,
      showDialog: false,
      counts: '',
      directoryList: [],
      inputList: {
        directoryName: '',
        state: ''
      },
      list: [],
      ruleForm: {
        subjectID: '',
        tagName: ''
      },
      rules: {
        state: [
          { required: true, message: '请输入目录名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  components: {},
  // 调用请求
  created () {
    this.getTags()
  },
  // 获取地址栏数据
  computed: {
  },
  watch: {},
  methods: {
    async getTags () {
      const res = await list(this.queryList)
      console.log(res)
      this.directoryList = res.data.items
      this.counts = res.data.counts
    },
    handleSizeChange (val) {
      this.queryList.pagesize = val
      this.getTags()
    },
    handleCurrentChange (val) {
      this.queryList.page = val
      this.getTags()
    },
    clearSub () {
      this.queryList.directoryName = ''
      this.queryList.state = ''
    },
    async SearchIn () {
      this.queryList.page = 1
      const res = await list({
        ...this.queryList,
        directoryName: this.inputList.directoryName,
        state: this.inputList.state
      })
      this.directoryList = res.data.items
    },
    newBtn () {
      this.showDialog = true
    },
    async changeState (state, id) {
      if (state) {
        state = 0
      } else {
        state = 1
      }
      await changeState({
        id,
        state
      })
      this.getTags()
    },

    async newBtn2 (id) {
      this.showDialog = true
      const res = await detail(id)
      this.ruleForm = res.data
    },
    // 新增
    async submit () {
      await this.$refs.directorysFormRef.validate()
      try {
        if (this.ruleForm.creatorID) {
          await update(this.ruleForm)
          this.$message.success('修改成功')
        } else {
          await add(this.ruleForm)
          this.$message.success('添加成功')
        }
        this.getTags()
      } catch (error) {
        console.log(error)
      }
    },
    async handleSelected () {
      try {
        const { data } = await simpleSubject(this.directoryList.subjectName)
        console.log(data)
        this.list = data
      } catch (error) {
        console.log(error)
      }
    },
    // 删除
    async deleteSub (id) {
      try {
        const { data } = await remove(id)
        console.log(data)
        await this.$confirm('确认删除吗')
        this.getTags()
        this.$message.success('删除成功')
      } catch (error) {
        this.$message.error('删除失败!')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.left-fot {
  margin-left: 9px;
}
.el-row {
  margin-top: 20px;
}
.colInput {
  height: 35px;
}
.colright {
  float: right;
  height: 35px;
  margin-left: 10px;
}
.el-breadcrumb {
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.inputCol {
  width: 200px;
}
.el-form-item {
  display: inline-block;
}
.el-table {
  margin-top: 10px;
}
.el-pagination {
  float: right;
  margin-top: 20px;
}
.elform {
  width: 100%;
}

.el-form-item__content {
  margin-left: 10px;
}
</style>
