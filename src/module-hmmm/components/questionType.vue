<template>
  <div>
<el-radio-group v-if="questionType==='单选'" v-model="option.isRight"  style="margin-left:5px; margin-top:10px; display:flex; flex-direction:column"  >

     <el-radio :label="item" v-for="item in Options" :key="item" >
      <span>{{item}}:</span>
     <el-input style="width:300px;margin-left:10px;" v-model="option.code"></el-input>

     </el-radio>
    </el-radio-group>

    <el-radio-group v-if="questionType==='多选'" v-model="option.isRight"  style="margin-left:5px; margin-top:10px; display:flex; flex-direction:column"  >

     <el-checkbox :label="item" v-for="item in Options" :key="item" >
      <span>{{item}}:</span>
     <el-input style="width:300px;margin-left:10px;" v-model="option.code"></el-input>

     </el-checkbox>

    </el-radio-group>
  </div>
</template>
<script>
export default {
  props: {
    questionType: String

  },

  data () {
    return {
      select: 1,
      code: 68,
      Options: ['A', 'B', 'C', 'D'],
      option: {
        code: '',
        title: '',
        img: '',
        isRight: [],
        xz: ''

      }
    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    addOptions () {
      this.Options.push(String.fromCharCode(++this.code))
    },
    addOption (value) {
      if (value) {
        console.log(this.option)
      } else {}
    }
  }
}
</script>
<style scoped>

</style>
