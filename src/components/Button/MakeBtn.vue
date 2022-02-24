<template>
<div class="make">
    <v-btn elevation="2" @click="handle(config)" :color="color" class="white--text">合成</v-btn>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
        <v-card :color="color" dark>
            <v-card-text class="text-center pt-1">
                请稍等
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex'
import config from '@/config'
export default {
    props: {
        config: {
            type: Object,
            default: {}
        },
        color: {
            type: String,
            default: config.color
        }
    },
    data() {
        return {
            dialog: false
        }
    },
    methods: {
        ...mapActions('api', ['make']),
        async handle(config) {
            if (!config[config.mode]) return this.$eventBus.$emit('tip',config.mode + ': 参数错误')
            this.dialog = true
            const status = await this.make(config)
            // setTimeout(() => {
            //     this.dialog = false
            // }, 200)
            this.dialog = false
        },
    }
}
</script>
