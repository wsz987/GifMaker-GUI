<template>
<v-btn :loading="loading" color="info" @click="handle(item)">
    加载
</v-btn>
</template>

<script>
import {
    mapActions
} from 'vuex'
export default {
    props: ['item'],
    data() {
        return {
            loading: false
        }
    },
    methods: {
        ...mapActions('api', ['load_config']),
        handle(item) {
            this.loading = true
            this.load_config(item).then(() => this.loading = false)
        }
    }
}
</script>

<style lang='scss' scoped>
</style>
