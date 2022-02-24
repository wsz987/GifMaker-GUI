<template>
<v-btn :color="icon ? 'white' :color" @click="handle(type,path)" :class="{'white--text':white}" :icon="icon">
    {{text}}
    <slot></slot>
</v-btn>
</template>

<script>
import config from '@/config'
export default {
    props: {
        type: {
            type: String,
            default: 'file'
        },
        text: {
            type: String,
            default: ''
        },
        path: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: config.color
        },
        white: {
            type: Boolean,
            default: false
        },
        icon: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    },
    methods: {
        handle(type, path) {
            if(path == '') return this.$eventBus.$emit('tip', '路径为空')
            type == 'file' && $api.open_file(path)
            type == 'folder' && $api.open_folder(path)
        }
    }
}
</script>
