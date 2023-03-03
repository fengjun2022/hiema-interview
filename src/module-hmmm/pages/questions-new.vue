<template>
  <div class="container">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="学科" prop="subjectID" :rules="{ required: true, message: '当前选项不能为空', trigger: 'blur' }">
        <el-select v-model="ruleForm.subjectID" placeholder="请选择" @change="subject">
          <el-option v-for="(item,i) in form.List" :key="i" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="目录" prop="catalogID" :rules="{ required: true, message: '当前选项不能为空', trigger: 'blur' }">
        <el-select v-model="ruleForm.catalogID" placeholder="请选择">
          <el-option v-for="(item,i) in form.catalogs" :key="i" :label="item.directoryName" :value="item.creatorID" />
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterpriseID" :rules="{ required: true, message: '当前选项不能为空', trigger: 'blur' }">
        <el-select v-model="ruleForm.enterpriseID" placeholder="请选择">
          <el-option v-for="(item,i) in form.enterprise" :key="i" :label="item.company" :value="item.id" />
        </el-select>
      </el-form-item>

      <div style="display:flex">
        <el-form-item label="城市" prop="province" :rules="{ required: true, message: '当前选项不能为空', trigger: 'blur' }">
          <el-select v-model="ruleForm.province" style="width:160px" placeholder="请选择" @change="changeProvince">
            <el-option v-for="province in provinces" :key="province" :label="province" :value="province" />
          </el-select>
        </el-form-item>
        <el-form-item prop="city" style="margin-left: -80px;">
          <el-select v-model="ruleForm.city" style="width:160px " placeholder="请选择">
            <el-option v-for="city in citys" :key="city" :label="city" :value="city" />
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="方向" prop="direction" :rules="{ required: true, message: '当前选项不能为空', trigger: 'blur' }">
        <el-select v-model="ruleForm.direction" placeholder="请选择">
          <el-option label="o2o" value="o2o" />
          <el-option label="外包服务" value="外包服务" />
          <el-option label="互联网金融" value="互联网金融" />
          <el-option label="企业服务" value="企业服务" />
          <el-option label="企业咨询" value="企业咨询" />
          <el-option label="互联网" value="互联网" />
          <el-option label="电子商务" value="电子商务" />
          <el-option label="其他" value="其他" />

        </el-select>
      </el-form-item>

      <el-form-item label="题型" prop="questionType" :rules="{ required: true, message: '当前选项不能为空', trigger: 'blur' }">
        <el-radio-group v-model="ruleForm.questionType">
          <el-radio label="单选" />
          <el-radio label="多选" />
          <el-radio label="简答" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty" :rules="{ required: true, message: '当前选项不能为空', trigger: 'blur' }">
        <el-radio-group v-model="ruleForm.difficulty">
          <el-radio label="简单" />
          <el-radio label="一般" />
          <el-radio label="困难" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="题干" prop="texts" :rules="{ required: true, message: '当前选项不能为空', trigger: 'blur' }">
        <richtext style="margin-bottom:50px" :content.sync="ruleForm.question" @texts="texts" />
      </el-form-item>
      <!-- 单选 -->
      <el-form-item
        v-if="ruleForm.questionType === '单选'"
        class="input_bottom"
        label="选项"
        prop="resource"
        style="margin-top: 100px; margin-left: 10px"
      >
        <el-radio-group
          v-model="ruleForm.isRig"
          style="margin-left: 5px; margin-top: 10px"
        >
          <el-radio
            v-for="(item, i) in Options"
            :key="item"
            :label="item"
            @change="addOption($event)"
          >
            <span>{{ item }}:</span>
            <el-input
              v-model="inputval[i]"
              style="width: 300px; margin-left: 10px"
              @blur="text($event, item)"
            />

            <uploadImg
              style="display: inline-block; margin-left: 5px"
              @flieurl="flieurl"
            />
          </el-radio>
          <el-button
            type="danger"
            disabled
            class="el_button"
          >增加选项与答案</el-button>
        </el-radio-group>
      </el-form-item>

      <!-- 多选 -->
      <el-form-item
        v-if="ruleForm.questionType === '多选'"
        class="input_bottom"
        label="选项"

        style="margin-top: 100px; margin-left: 10px"
      >
        <el-radio-group
          v-model="option.isRig"
          style="
            margin-left: 5px;
            margin-top: 10px;
            display: flex;
            flex-direction: column;
          "
        >
          <el-checkbox
            v-for="(item, i) in Options"
            :key="item"
            :label="item"
            @change="addOption($event)"
          >
            <span>{{ item }}:</span>
            <el-input
              v-model="inputval[i]"
              style="width: 300px; margin-left: 10px"
              @blur="text($event, item)"
            />

            <uploadImg
              style="display: inline-block; margin-left: 5px"
              @flieurl="flieurl"
            />
          </el-checkbox>
          <el-button
            type="danger"
            class="el_button"
            @click="addOptions()"
          >增加选项与答案</el-button>
        </el-radio-group>
      </el-form-item>
      <!-- 简答 -->
      <el-form-item label="解析视频" style="margin-top: 100px width:200px">

        <el-input v-model="ruleForm.videoURL" style="width:300px" />
      </el-form-item>
      <!--  富文本 -->
      <el-form-item label="答案解析" prop="qTexts" :rules="{ required: true, message: '当前选项不能为空', trigger: 'blur' }">
        <richtext :content.sync="ruleForm.answer" @qTexts="qTexts" />
      </el-form-item>

      <el-form-item label="题目备注" style="margin-top: 100px">
        <el-input v-model="ruleForm.desc" type="textarea" style="width:300px" />
      </el-form-item>
      <el-form-item label="试题标签">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="题1" value="shanghai" />
          <el-option label="题2" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item style="height: 100px">
        <el-button type="primary" @click="onSubmit">确认提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import richtext from '@/module-hmmm/components/richtext'
// import newImg from '@/module-hmmm/components/questions-new-img'
// import QuestionType from '@/module-hmmm/components/questionType'
import { provinces, citys } from '@/api/hmmm/citys'
import { getQuestionDetail, getsubjectIDList, getCatalogIDList, getCompanysList, addQuestions } from '@/api/hmmm/questions.js'
export default {
  components: {
    richtext
    // newImg
  },
  data() {
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
        options: [
          {
            isRight: false,
            code: 'A',
            title: '',
            img: ''
          },
          {
            isRight: false,
            code: 'B',
            title: '',
            img: ''
          },
          {
            isRight: false,
            code: 'C',
            title: '',
            img: ''
          },
          {
            isRight: false,
            code: 'D',
            title: '',
            img: ''
          }
        ], // 选项
        videoURL: '', // 解析
        answer: '', // 答案解析
        remarks: '', // 题目备注
        tags: '' // 试题标签
      },
      rules: {
        name: [
          { required: true, message: '当前选项不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      },
      form: {
        enterprise: [],
        List: [],
        catalogs: []
      },

      // 判断单选多选
      select: 1,
      code: 68,
      Options: ['A', 'B', 'C', 'D'],

      option: {
        isRight: false,
        code: '',
        title: '',
        img: '',
        isRig: [],
        xz: ''
      },
      inputval: ['', '', '', ''],
      textarr: [],
      citys: [],
      provinces: []
    }
  },
  created() {
    this.echo()

    this.getQuestionDetail(this.$route.query.id)

    const res = provinces()
    this.provinces = res
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
    async getQuestionDetail(id) {
      if (id) {
        try {
          const { data } = await getQuestionDetail({ id: id })
          this.ruleForm = data
          this.ruleForm.options.forEach((item) => { if (item.isRight) { item.isRight = true } else { item.isRight = false } })
        } catch (err) { return err }
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    addOptions() {
      this.Options.push(String.fromCharCode(++this.code))
      this.inputval.push('')
    },
    addOption(value) {
      this.option.isRight = value
      if (value) {
        delete this.option.isRig
        delete this.option.xz

        console.log(this.ruleForm.options)
        this.ruleForm.options.push(this.option)

        this.option = {
          isRight: false,
          code: '',
          title: '',
          img: '',
          isRig: [],
          xz: ''
        }
      } else {
        this.ruleForm.options.forEach((item) => {
          this.ruleForm.options = this.ruleForm.options.filter(
            (key) => item.title !== key.title
          )
        })
      }
    },
    text(e, item) {
      this.option.code = e.target.value
      this.option.title = item
    },
    flieurl(url) {
      this.option.img = url
    },
    // 修改城市触发事件获取下级城市
    changeProvince() {
      const res = citys(this.ruleForm.province)
      this.citys = res
    },
    texts(text) {
      this.ruleForm.question = text
    },
    qTexts(text) {
      this.ruleForm.answer = text
    },
    async  echo() {
      const res = await getCompanysList()
      console.log(res)
      this.form.enterprise = res.data.items
      const res2 = await getsubjectIDList()
      console.log(res2)
      this.form.List = res2.data
    },
    async  onSubmit() {
      this.ruleForm.options.forEach((item) => { if (item.isRight === 1 || item.isRight === true) { item.isRight = true } else { item.isRight = false } })
      if (this.ruleForm.questionType === '单选') {
        this.ruleForm.questionType = '1'
      } else if (this.ruleForm.questionType === '多选') {
        this.ruleForm.questionType = '2'
      } else {
        this.ruleForm.questionType = '2'
      }
      if (this.ruleForm.difficulty === '简单') {
        this.ruleForm.difficulty = '1'
      } else if (this.ruleForm.difficulty === '一般') {
        this.ruleForm.difficulty = '2'
      } else {
        this.ruleForm.difficulty = '2'
      }

      await addQuestions(this.ruleForm)
      console.log(this.ruleForm)
      this.$routes.push({ path: 'choice' })
    },
    async subject(val) {
      const res3 = await getCatalogIDList({ id: val })

      console.log(res3.data.items)
      this.form.catalogs = res3.data.items
    }

  }

}
</script>
<style scoped>
.container {
  background-color: white;
}
.el_button {
  width: 130px;
  text-align: center;
}
::v-deep .el-radio {
  display: block;
  margin: 10px 0;
}
</style>
