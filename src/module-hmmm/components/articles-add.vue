<template>
  <el-dialog :visible="showDialog" :title="`${form.id ? '修改' : '新建'}文章`" width="70%" @close="btnCancel">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="margin-left:80px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title" placeholder="输入面经标题" style="width:80%" />
      </el-form-item>
      <!-- 富文本编辑器 -->
      <el-form-item label="文章内容" prop="articleBody">
        <quill-editor v-model="form.articleBody" style="width:80%;height:200px;margin-bottom:90px" @blur="$refs.form.validateField('articleBody')" />
      </el-form-item>
      <el-form-item label="视频地址" prop="radio">
        <el-input v-model="form.radio" placeholder="请输入视频地址" style="width:80%" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="end">
      <el-col :span="6">
        <el-button @click="btnCancel">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { add, detail } from '@/api/hmmm/articles.js'
export default {
  components: { quillEditor },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        title: '',
        articleBody: '',
        videoURL: '',
        id: '',
        createTime: ''
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        articleBody: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async submit() {
      this.$refs.form.validate()
      try {
        await add(this.form)
        this.$emit('edit')
        this.form = {
          title: '',
          articleBody: '',
          videoURL: ''
        }
        this.$message.success('添加成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 取消
    btnCancel() {
      this.form = {
        title: '',
        articleBody: '',
        videoURL: ''
      }
      this.$emit('edit')
    },
    // 编辑
    async detail(id) {
      const { data } = await detail(id)
      this.form = data
      console.log(this.form)
    }
  }
}

</script>

<style scoped lang='scss'>
</style>
