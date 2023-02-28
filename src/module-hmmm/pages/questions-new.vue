<template>
  <div class='container'>试题录入

  </div>

</template>

<script>
export default {

  data () {
    return {
      isShow: false,
      reque: {},
      form: {
        name: '123',
        region: '456'

      }
    }
  },

  methods: {
    submit () {
      this.$message.success('提交成功')
      console.log()
    }
  }

}

</script>

<style scoped lang='less'></style>
