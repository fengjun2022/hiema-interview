<template>
  <div>

    <el-dialog
      v-if="isShow"
      :title="title"
      :visible="isShow"
      :width="dialog_width"
      @close="cancel"
    >

      <slot>请传入slot</slot>

      <span slot="footer" class="dialog-footer">
        <el-button v-if="btn" type="primary" @click="cancel">关闭</el-button>
        <div v-if="!btn">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </div>

      </span>
    </el-dialog>
  </div>
</template>
<script>
// submit 该组件返回一个提交回调函数在父组件接收
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
    // 当前form表单值
    form: [Array, Object, String],
    // 自定义 按钮 true显示关闭隐藏取消确定

    btn: {
      type: Boolean,
      default: false
    }

  },

  data() {
    return {

    }
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    cancel() {
      this.$emit('update:isShow', false)
      this.$emit('update:form', this.resets(this.form))
    },
    async determine() {
      this.$confirm('您确定提交吗？').then(async _ => {
        this.$emit('submit', submit)
        function submit(fn) {
          return fn()
        }
        this.$emit('update:isShow', false)

        this.$emit('update:form', this.resets(this.form))
      })
    },

    resets(data) {
      if (!data && data !== {}) return

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
