<template>
  <div class="main">
    <div class="header">
     <div class="text">说明:当前支持学科和关键字条件筛选</div>
      <el-button style="float:right" type="success" @click="clearFilter" icon="el-icon-edit" size="small">新增试题</el-button>
    </div>
  <el-form ref="form" :model="form" label-width="auto" :inline="true" class="demo-form-inline">
  <el-form-item label="学科">
    <el-select class="width" v-model="form.region" placeholder="请选择活动区域" >
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="二级目录">
    <el-select class="width" v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="标签">
    <el-select class="width" v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="关键字">
    <el-input class="width"></el-input>
  </el-form-item>
  <el-form-item label="试题类型">
    <el-select class="width" v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="难度">
    <el-select class="width" v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="方向">
    <el-select class="width" v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="录入人">
    <el-select class="width" v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="题目备注">
    <el-input class="width"></el-input>
  </el-form-item>
  <el-form-item label="企业简称">
    <el-input class="width"></el-input>
  </el-form-item>
   <el-form-item label="城市">
    <el-select style="width:160px" v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
    <el-select style="width:160px ; margin-left:20px" v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item style="float:right ; margin-right:28px">
    <el-button size="small">清除</el-button>
    <el-button type="primary" @click="onSubmit" size="small">搜索</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        subjectID: '123456',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      }],
      form: {
      }
    }
  },
  methods: {
    resetDateFilter () {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column.property
      return row[property] === value
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>
  .main{
    margin: 10px;
    background-color: white;
    overflow:hidden;
    padding-left: 30px;
  }
  .header{
    display: flex;
    justify-content: space-between;
    margin: 20px 28px 20px 0px;
  }
  .text{
    color:rgba(249, 0, 42, 0.3);
    font-size: 12px;
  }
  .width{
    width: 340px;
  }
</style>
