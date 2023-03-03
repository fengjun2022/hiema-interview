
<template>
  <div class="dialog-search">
    <el-form ref="ruleForm" :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item v-for="(item,index) in formOptions" :key="index" :label="item.label">
        <!-- 普通输入框 -->
        <el-input v-if="item.type=='input'" v-model="formData[item.param]" :placeholder="item.placeholder" style="margin-right:10px;width:80%" />
        <el-select v-if="item.type=='select'" v-model="formData[item.param]" :placeholder="item.placeholder" style="margin-right:10px" @change="handleChange">
          <el-option v-for="(item2,index2) in item.selectOptions" :key="index2" :label="item2" :value="item2" />
        </el-select>
        <el-select v-if="item.type=='selectNormal'" v-model="formData[item.param]" :placeholder="item.placeholder" style="margin-right:10px">
          <el-option v-for="(item2,index2) in item.selectOptions" :key="index2" :label="item2.value" :value="item2.id" />
        </el-select>
      </el-form-item>
      <el-form-item style="width:12rem">
        <el-button @click="resetForm('ruleForm')">清除</el-button>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <slot name="btn" />
  </div>
</template>

<script>
export default {
  name: 'BaseSearch',
  props: {
    emitSearch: {
      type: Boolean,
      default: false
    },
    formOptions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const formData = {}
    for (const obj of this.formOptions) {
      formData[obj.param] = obj.defaultSelect || ''
    }
    return {
      formData
    }
  },
  watch: {
    emitSearch(newVal, oldVal) {
      // 是否立即触发搜索 弹窗中异步请求下拉框后或给下拉框赋值默认值后
      if (newVal) {
        console.log('此时触发--立即执行搜索')
        this.$emit('search', this.formData)
      }
    },
    formOptions: {
      handler(newVal, oldVal) {
        for (const obj of this.formOptions) {
          if (obj.defaultSelect) {
            this.formData[obj.param] = obj.defaultSelect
          }
        }
      },
      deep: true
    }
  },
  methods: {
    onSubmit() {
      this.$emit('search', this.formData)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      const formData = {}
      for (const obj of this.formOptions) {
        formData[obj.param] = ''
      }
      this.formData = formData
      this.$emit('reset')
    },
    handleChange(currentItem) {
      this.$emit('handleChange', currentItem)
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
