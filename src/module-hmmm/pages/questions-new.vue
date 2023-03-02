<template>
  <div class='container'>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
   <el-form-item label="学科" prop="region">
    <el-select v-model="ruleForm.subjectID" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="目录" prop="region">
    <el-select v-model="ruleForm.catalogID" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="企业" prop="region">
    <el-select v-model="ruleForm.enterpriseID" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="城市" prop="region">
    <el-select v-model="ruleForm.province" placeholder="城市">
      <el-option label="区域一" value="shanghai"></el-option>
    </el-select>
     <el-select v-model="ruleForm.city" placeholder="地区">
      <el-option label="区域一" value="shanghai"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="方向" prop="region">
    <el-select v-model="ruleForm.direction" placeholder="请选择方向">
      <el-option label="区域一" value="shanghai"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="题型" prop="resource">
    <el-radio-group v-model="ruleForm.questionType">
      <el-radio   label="单选"></el-radio>
      <el-radio   label="多选"></el-radio>
       <el-radio  label="简答"></el-radio>
    </el-radio-group>
    </el-form-item>
     <el-form-item label="难度" prop="resource">
    <el-radio-group v-model="ruleForm.difficulty">
      <el-radio label="简单"></el-radio>
      <el-radio label="一般"></el-radio>
       <el-radio label="困难"></el-radio>
    </el-radio-group>
  </el-form-item>
    <el-form-item>
<richtext></richtext>
  </el-form-item>
<!-- 单选 -->
<el-form-item v-if="ruleForm.questionType==='单选'" class="input_bottom" label="选项" prop="resource" style="margin-top:100px; margin-left:10px;" >
<el-radio-group v-model="ruleForm.question"  style="margin-left:5px; margin-top:10px;" >
     <el-radio :label="item" v-for="item in Options" :key="item"  >
      <span>{{item}}:</span>
     <el-input style="width:300px;margin-left:10px;" v-model="ruleForm.region"></el-input>
    <uploadImg  style="display: inline-block;margin-left:5px; "></uploadImg>
     </el-radio>
 <el-button type="danger" disabled class="el_button">增加选项与答案</el-button>
    </el-radio-group>
</el-form-item>

<!-- 多选 -->
<el-form-item v-else-if="ruleForm.questionType==='多选'" class="input_bottom" label="选项" prop="resource" style="margin-top:100px; margin-left:10px;">
<el-radio-group v-model="ruleForm.question"  style="margin-left:5px; margin-top:10px; display:flex; flex-direction:column"  >

      <el-checkbox :label="item" v-for="item in Options" :key="item" name="type" v-model=""  >
         <span>{{item}}:</span>
     <el-input  style="width:300px;margin-left:10px;" v-model="ruleForm.region"></el-input>
    <uploadImg  style="display: inline-block;margin-left:5px;"></uploadImg>
      </el-checkbox>

 <el-button type="danger" @click="addOptions"  class="el_button">增加选项与答案</el-button>
    </el-radio-group>
</el-form-item>
<!-- 简答 -->
 <el-form-item label="解析视频" style="margin-top:100px">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <!--  富文本 -->
<el-form-item  >
<richtext ref="text"></richtext>
</el-form-item>

 <el-form-item label="题目备注" style="margin-top:100px">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
     <el-form-item label="试题标签" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
    </el-select>
     </el-form-item>
     <el-form-item style="height:100px">
    <el-button type="primary" @click="onSubmit" >确认提交</el-button>

  </el-form-item>
</el-form>
  </div>

</template>

<script>
import richtext from '@/module-hmmm/components/richtext'
// import newImg from '@/module-hmmm/components/questions-new-img'

export default {
  components: {
    richtext
    // newImg
  },

  data () {
    return {
      ruleForm: {
        subjectID: '', // 学科
        catalogID: '', // 目录
        enterpriseID: '', // 企业
        province: '', // 城市
        city: '', // 地区
        direction: '',
        questionType: '单选', // 题型
        difficulty: '', // 难度
        question: '', // 题干
        options: [], // 选项
        videoURL: '', // 解析
        answer: '', // 答案解析
        remarks: '', // 题目备注
        tags: '', // 试题标签
        isRight: false
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },

      // 判断单选多选
      select: 1,
      Options: ['A', 'B', 'C', 'D'],
      code: 68,
      option: {

      }
    }
  },
  methods: {
    // submitForm (formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    addOptions () {
      this.Options.push(String.fromCharCode(++this.code))
    }

  },
  onSubmit () {}
}
</script>
<style scoped>
.container{
background-color: white;
}
.el_button{
  width: 130px;
  text-align: center;
}
 ::v-deep .el-radio{
        display: block;
       margin:10px 0;
    }
</style>
