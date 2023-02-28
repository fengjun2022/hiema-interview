<template>
  <div class="container">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>学科管理</el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
        <el-breadcrumb-item>目录管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索nav栏 -->
      <el-row>
        <el-col :span="18">
          <!-- 搜索框 -->
          <el-col :span="10">
            <el-form ref="subjectFrom" label-width="80px">
              <el-form-item label="目录名称">
                <el-input class="inputCol"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select placeholder="请选择">
                  <el-option label="已启用" :value="1"> </el-option>
                  <el-option label="已禁用" :value="0"> </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12" class="left-fot">
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
            >新增目录</el-button
          >
          <el-button type="text" class="colright" icon="el-icon-back"
            >返回学科</el-button
          >
        </el-col>
      </el-row>
      <!-- 消息文案 -->
      <el-alert
        :title="`数据一共 100 条`"
        :closable="false"
        type="info"
        show-icon
      >
      </el-alert>

      <!-- 表格区域 -->
      <el-table :data="directoryList" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="subjectName" label="所属学科"> </el-table-column>
        <el-table-column prop="directoryName" label="目录名称">
        </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="addDate" label="创建日期"> </el-table-column>
        <el-table-column prop="totals" label="面试数量"> </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            {{ scope.row.state === 1 ? "已启用" : "已禁用" }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作"> </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <pagination-add
        :page="queryList.page"
        :pagesize="queryList.pagesize"
        :counts="counts"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
    </el-card>

    <!-- 添加目录弹框 -->
    <el-dialog
      title="新增目录"
      :visible.sync="addDialogVisible"
      width="20%"
      @close="restDir"
    >
      <!-- 主体区域 -->
      <el-row>
        <el-col>
          <el-form
            ref="directorysFormRef"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item class="elform" label="所属学科">
              <el-select placeholder="请选择" style="width: 100%">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in addFrom"
                  :key="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="elform" label="目录名称" prop="directoryName">
              <el-input
                placeholder="请输入目录名称"
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDirForm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改目录弹框 -->
    <el-dialog
      title="修改目录"
      :visible.sync="editDialogVisible"
      width="20%"
      @close="restDir"
    >
      <!-- 主体区域 -->
      <el-row>
        <el-col>
          <el-form
            ref="directorysFormRef"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item class="elform" label="所属学科">
              <el-select placeholder="请选择" style="width: 100%">
                <el-option> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="elform" label="目录名称" prop="directoryName">
              <el-input
                placeholder="请输入目录名称"
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Directorys',
  data () {
    return {
      queryList: {
        page: 1,
        pagesize: 10
      },
      directoryList: []
    }
  },

  components: {},

  // 调用请求
  created () {
    this.loadDirectory()
  },

  // 获取地址栏数据
  computed: {},

  // 侦听地址栏数据
  watch: {
  },
  methods: {
  }
}
</script>

<style scoped lang='scss'>
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
