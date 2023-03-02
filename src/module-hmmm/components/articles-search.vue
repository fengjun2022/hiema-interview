
<template>
    <div class="dialog-search">
        <el-form :inline="true" ref="ruleForm" :model="formInline" class="demo-form-inline">
             <el-form-item v-for="(item,index) in formItemList" :key="index" :label="item.label">
               <el-input v-if="item.type=='input'" v-model="formInline[item.param]"  :placeholder="item.placeholder" style="margin-right:10px;width:80%"></el-input>
                <el-select v-if="item.type=='select'" v-model="formInline[item.param]" :placeholder="item.placeholder"  style="margin-right:10px">
                    <el-option v-for="(item2,index2) in item.selectOptions" :key="index2" :label="item2.name" :value="item2.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="width:12rem">
              <el-button @click="resetForm('ruleForm')">清除</el-button>
                <el-button type="primary"  @click="onSubmit">搜索</el-button>
            </el-form-item>
        </el-form>
        <slot name="btn">

        </slot>
    </div>
</template>

<script>
export default {
  name: 'BaseSearch',
  props: {
    emitSearch: { // 是否立即执行搜索
      type: Boolean,
      default: false
    },
    formItemList: {
      type: Array,
      default: () => []

    }
  },
  data () {
    const formInline = {}
    for (const obj of this.formItemList) {
      formInline[obj.param] = obj.defaultSelect || ''
    }
    return {
      formInline
    }
  },
  watch: {
    emitSearch (newVal, oldVal) {
      // 是否立即触发搜索  用在弹窗中异步请求下拉框后  或者给下拉框赋值默认值后  需要用到这个方法
      if (newVal) {
        console.log('此时触发--立即执行搜索')
        this.$emit('search', this.formInline)
      }
    },
    formItemList: {
      handler (newVal, oldVal) {
        for (const obj of this.formItemList) {
          if (obj.defaultSelect) {
            this.formInline[obj.param] = obj.defaultSelect
          }
        }
      },
      deep: true
    }
  },
  methods: {
    onSubmit () {
      this.$emit('search', this.formInline)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      const formInline = {}
      for (const obj of this.formItemList) {
        // 所有筛选条件清空
        formInline[obj.param] = ''
      }
      this.formInline = formInline

      this.$emit('search', this.formInline)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-search{
    margin: 0 1rem;
    text-align: left;
    .el-form-item__content{
        width: 16rem;
        .el-input{
            width: 16rem;
        }
        .el-select{
            .el-input__inner{
                // height: 3.2rem;
                width: 16rem;
            }
        }
    }
}
</style>
