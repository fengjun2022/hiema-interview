<template>
  <div style="display:flex" >

</div>
</template>
<script>

export default {
  components: {

  },

  props: {
    letter: {
      type: Array
    }
  },

  data () {
    return {
      form: {
        resource: '',
        str: '1123'
      }

    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    fn (i) {
      console.log(i)
    }
  }
}
</script>
<style scoped>

</style>
