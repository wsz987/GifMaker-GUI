<template>
<v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
        <v-btn icon @click="maxhandle" v-bind="attrs" v-on="on">
            <v-icon v-if="!max">mdi-fullscreen</v-icon>
            <v-icon v-else>mdi-fullscreen-exit</v-icon>
        </v-btn>
    </template>
    <span>目前仅支持主屏幕最大化</span>
</v-tooltip>
</template>

<script>
export default {
    data() {
        return {
            max: false
        }
    },
    methods: {
        maxhandle() {
            $api.btn_handle('maximize')
            this.max = !this.max
        }
    }
}
</script>

<style lang='less' scoped>
</style>
