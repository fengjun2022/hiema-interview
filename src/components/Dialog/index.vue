<template>
  <div>

<el-dialog
  :title="title"
  :visible="isShow"
 :width="dialog_width"
  @close="cancel"
  >
  <slot>请传入slot</slot>
  <span slot="footer" class="dialog-footer">
    <el-button v-if="btn" type="primary" @click="cancel">关闭</el-button>
    <el-button v-if="!btn"  @click="cancel">取 消</el-button>
    <el-button v-if="!btn"  type="primary" @click="determine">确 定</el-button>

  </span>
</el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    // 组件是否显示
    isShow: {
      type: Boolean,
      required: true
    },
    // 标题
    title: {
      type: String,
      default: '提示'
    },
    // 动态设置宽度
    dialog_width: {
      type: String,
      default: '30%'
    },
    form: [Array, Object, String],
    btn: {
      type: Boolean,
      default: false
    }

  },

  data () {
    return {

    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    cancel () {
      this.$emit('update:isShow', false)
      this.$emit('update:form', this.resets(this.form))
    },
    async determine () {
      try {
        await this.$confirm('您确定提交吗？')
        await this.$emit('submit')
        this.$emit('update:isShow', false)
        this.$emit('update:form', this.resets(this.form))
      } catch (err) { return err }
    },

    resets (data) {
      if (!data) return
      if (data.constructor === Object) {
        Object.keys(data).forEach(item => { data[item] = '' })
      } else if (data.constructor === Array) {
        return []
      } else if (data.constructor === String) {
        return ''
      }
    }

  }
}
</script>
<style scoped>

</style>
