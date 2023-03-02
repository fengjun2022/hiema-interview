<template>
  <div>

<el-dialog

  :title="title"
  :visible="isShow"
 :width="dialog_width"
  @close="cancel"
  >
  <el-form :ref="Formname" :model="Formname" label-width="80px">
  <slot>请传入slot</slot>
  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button v-if="btn" type="primary" @click="cancel">关闭</el-button>
 <div v-if="!btn">
     <el-button   @click="cancel">取 消</el-button>
    <el-button   type="primary" @click="determine">确 定</el-button>
 </div>

  </span>
</el-dialog>
  </div>
</template>
<script>
//  弹窗组件返回一个submit提交回调函数,可以在父组件中定义,你提交之后要做什么
// submit 该回调函数 中还有三个参数,第一个是个函数可以调用,返回,第二个是当前组件实例,(这个submit中的回调用不用都行是用来做自定义表单验证的)
// 如果自定义请传入true,bu

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
    // 当前form表单值,该参数推荐当前不是表单时做清空传值
    form: [Array, Object, String],
    // 自定义 按钮 true显示关闭隐藏取消确定

    btn: {
      type: Boolean,
      default: false
    },
    // 必传值，动态设置表单名 ref，该参数接收你所定义的表单对象
    Formname: {
      type: Object,
      required: true

    }

  },

  data () {
    return {

    }
  },
  mounted () {
    console.log(this.Formname)
  },
  computed: {

  },
  methods: {
    cancel () {
      this.$emit('update:isShow', false)
      this.$refs[this.Formname].resetFields()
      this.$emit('update:form', this.resets(this.form))
    },
    async determine () {
      try {
        await this.$confirm('您确定提交吗？')
        await this.$emit('submit', this.submitForm, this.$refs[this.Formname])
        if (!this.$refs[this.Formname].validate(rej => rej)) return
        console.log(123)
        this.$emit('update:isShow', false)
        this.$refs[this.Formname].resetFields()
        this.$emit('update:form', this.resets(this.form && this.Formname))
      } catch (err) { return err }
    },

    resets (data) {
      if (!data && data !== {}) return

      if (data.constructor === Object) {
        Object.keys(data).forEach(item => { data[item] = '' })
      } else if (data.constructor === Array) {
        return []
      } else if (data.constructor === String) {
        return ''
      }
    },
    async submitForm (Formname) {
      return Formname.validate(rej => rej)
    }

  }
}
</script>
<style scoped>

</style>
