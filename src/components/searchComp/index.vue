<template>
  <div class="main">
    <div class="header">
      <div class="text">说明:当前支持学科和关键字条件筛选</div>
      <el-button style="float:right" type="success" icon="el-icon-edit" size="small" @click="$router.push('new')">新增试题</el-button>
    </div>
    <el-form ref="form" :model="form" label-width="auto" :inline="true" class="demo-form-inline">
      <el-form-item label="学科" prop="subjectID">
        <el-select v-model="form.subjectID" class="width" placeholder="请选择活动区域" @change="changeSubjectId">
          <el-option v-for="item in subjects" :key="item.id" :label="item.subjectName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级目录" prop="catalogID">
        <el-select v-model="form.catalogID" class="width" placeholder="请选择活动区域">
          <el-option v-for="item in twoSubjects" :key="item.id" :label="item.tagName" :value="item.subjectID" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select v-model="form.tags" class="width" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="form.keyword" class="width" />
      </el-form-item>
      <el-form-item label="试题类型" prop="questionType">
        <el-select v-model="form.questionType" class="width" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty">
        <el-select v-model="form.difficulty" class="width" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="方向" prop="direction">
        <el-select v-model="form.direction" class="width" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="录入人" prop="creatorID">
        <el-select v-model="form.creatorID" class="width" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="题目备注" prop="remarks">
        <el-input v-model="form.remarks" class="width" />
      </el-form-item>
      <el-form-item label="企业简称" prop="shortName">
        <el-input v-model="form.shortName" class="width" />
      </el-form-item>
      <el-form-item label="城市" prop="province">
        <el-select v-model="form.province" style="width:160px" placeholder="请选择活动区域" @change="changeProvince">
          <el-option v-for="province in provinces" :key="province" :label="province" :value="province" />
        </el-select>
      </el-form-item>
      <el-form-item prop="city">
        <el-select v-model="form.city" style="width:160px " placeholder="请选择活动区域">
          <el-option v-for="city in citys" :key="city" :label="city" :value="city" />
        </el-select>
      </el-form-item>
      <el-form-item style="float:right ; margin-right:28px">
        <el-button size="small" @click="clearForm">清除</el-button>
        <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSubjectsList, getTwoList } from '@/api/hmmm/subjects'
import { provinces, citys } from '@/api/hmmm/citys'
export default {
  props: {
    flag: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      form: {
      },
      page: {
        page: 1,
        pagesize: 50
      },
      // 学科数据
      subjects: [],
      twoSubjects: [],
      tableDate: [],
      provinces: [],
      citys: []
    }
  },
  created() {
    this.getSubjectsList()
    const res = provinces()
    this.provinces = res
  },
  methods: {
    clearForm() {
      this.$refs.form.resetFields()
    },
    async onSubmit() {
      console.log(this.form)
      if (this.flag === 1) {
        await this.$parent.getBaseInfo(this.form)
      } else {
        this.$parent.getChoiceInfo(this.form)
      }
    },
    // 修改城市触发事件获取下级城市
    changeProvince() {
      console.log(this.form.province)
      const res = citys(this.form.province)
      this.citys = res
    },
    // 修改触发事件获取学科城市
    async changeSubjectId() {
      const res = await getTwoList({ ...this.page, subjectID: this.form.subjectID })
      this.twoSubjects = res.data.items
    },
    async getSubjectsList() {
      const res = await getSubjectsList(this.page)
      this.subjects = res.data.items
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
