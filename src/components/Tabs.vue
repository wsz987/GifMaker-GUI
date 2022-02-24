<template>
<v-tabs :value="actionTab" align-with-title @change="handleTab">
    <v-tabs-slider color="yellow"></v-tabs-slider>

    <v-tab v-for="item in tabs" :key="item">
        {{ item }}
    </v-tab>
</v-tabs>
</template>

<script>
import {
    mapGetters,
    mapMutations
} from 'vuex'
import config from '@/config'
export default {
    data() {
        return {
            // tab: config.defaultTabAction,
            tabs: config.tabs
        }
    },
    methods: {
        ...mapMutations('api', ['setActionTab']),
        handleTab(index) {
            this.setActionTab(index)
        }
    },
    computed: {
        ...mapGetters('api', ['actionTab', 'gifData'])
    },
    watch: {
        actionTab(val,oval) {
            if (val == 1 && this.gifData.length == 0) {
                this.$eventBus.$emit('tip',"请选择文件夹读取")
                setTimeout(() => this.setActionTab(2), 700);
            }
        }
    }
}
</script>

<style lang='scss' scoped>
</style>
