<template>
  <el-dialog :visible="prewShowDialog" title="预览文章" width="70%" @close="btnCancel">
    <div class="article-preview">
      <h2>{{ form.title }}</h2>
      <span>{{ form.createTime | formatDate }}</span>
      <span>管理员</span>
      <span class="el-icon-view" />
      <span>{{ form.visits }}</span>
      <div v-html="form.articleBody" />
    </div>
  </el-dialog>
</template>

<script>
import { detail } from '@/api/hmmm/articles.js'
export default {
  props: {
    prewShowDialog: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: {
        title: '',
        articleBody: '',
        videoURL: '',
        id: '',
        createTime: '',
        visits: ''

      }
    }
  },
  created() {
    this.detail()
  },
  methods: {
    btnCancel() {
      this.$emit('remove')
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
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
