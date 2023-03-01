<template>
  <div class="main">
    <div class="header">
     <div class="text">说明:当前支持学科和关键字条件筛选</div>
      <el-button style="float:right" type="success" icon="el-icon-edit" size="small" @click="$router.push('new')">新增试题</el-button>
    </div>
  <el-form ref="form" :model="form" label-width="auto" :inline="true" class="demo-form-inline">
  <el-form-item label="学科" prop="value">
    <el-select class="width" v-model="form.value" placeholder="请选择活动区域">
      <el-option :label="item.subjectName" :value="item.id" v-for="item in subjects" :key="item.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="二级目录" prop="subjectID">
    <el-select class="width" v-model="form.subjectID" placeholder="请选择活动区域" >
      <el-option :label="item.tagName" :value="item.subjectID" v-for="item in twoSubjects" :key="item.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="标签" prop="tags">
    <el-select class="width" v-model="form.tags" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="关键字" prop="keyword">
    <el-input class="width" v-model="form.keyword"></el-input>
  </el-form-item>
  <el-form-item label="试题类型" prop="questionType">
    <el-select class="width" v-model="form.questionType" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="难度" prop="difficulty">
    <el-select class="width" v-model="form.difficulty" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="方向" prop="direction">
    <el-select class="width" v-model="form.direction" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="录入人" prop="creatorID">
    <el-select class="width" v-model="form.creatorID" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="题目备注" prop="remarks">
    <el-input class="width" v-model="form.remarks"></el-input>
  </el-form-item>
  <el-form-item label="企业简称" prop="shortName">
    <el-input class="width" v-model="form.shortName"></el-input>
  </el-form-item>
   <el-form-item label="城市" prop="province">
    <el-select style="width:160px" v-model="form.province" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item prop="city">
    <el-select style="width:160px " v-model="form.city" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item style="float:right ; margin-right:28px">
    <el-button size="small" @click="clearForm">清除</el-button>
    <el-button type="primary" @click="onSubmit" size="small">搜索</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { getSubjectsList, getTwoList } from '@/api/hmmm/subjects'
export default {
  data () {
    return {
      form: {
      },
      page: {
        page: 1,
        pagesize: 50
      },
      // 学科数据
      subjects: [],
      twoSubjects: []
    }
  },
  created () {
    this.getSubjectsList()
  },
  methods: {
    clearForm () {
      this.$refs.form.resetFields()
    },
    onSubmit () {
      console.log(this.form)
    },
    async getSubjectsList () {
      const res = await getSubjectsList(this.page)
      this.subjects = res.data.items
      console.log()
    }
  },
  watch: {
    'form.value': {
      async  handler (newVal, oldVal) {
        console.log(newVal, oldVal)
        const res = await getTwoList({ ...this.page, subjectID: newVal })
        this.twoSubjects = res.data.items
        console.log(this.twoSubjects)
      }
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
