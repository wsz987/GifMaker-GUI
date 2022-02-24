<template>
  <v-snackbar v-model="snackbar">
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="pink"
             text
             v-bind="attrs"
             @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  data () {
    return {
      snackbar: false,
      text: 'success'
    }
  },
  mounted () {
    this.$eventBus.$on('tip', (ctx,timeout=1500) => {
      this.snackbar = true
      this.text = ctx
      setTimeout(() => { this.snackbar = false }, timeout)
    })
    // Window.Tip = (msg) => this.$eventBus.$emit('tip', msg)
  },
  methods: {
  }
}
</script>
<style lang='scss' scoped>
</style>

