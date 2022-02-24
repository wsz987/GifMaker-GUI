<template>
<v-dialog transition="dialog-bottom-transition" max-width="70%">
    <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-2" fab dark small color="cyan" v-bind="attrs" v-on="on" @click="getImgs(list)">
            <v-icon dark>
                mdi-content-save-cog
            </v-icon>
        </v-btn>
    </template>
    <template v-slot:default="dialog">
        <div>
            <v-card :color="color" dark v-if="loading">
                <v-card-text>
                    Please stand by
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
            <v-card v-else>
                <v-card-title class="pa-0">
                    <v-toolbar :color="color" dark>详细 / {{config.mode.toUpperCase()}} - {{config[config.mode]}}
                        <v-spacer></v-spacer>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon @click="import2Make(imglist,config,dialog)" v-bind="attrs" v-on="on">
                                    <v-icon>mdi-import</v-icon>
                                </v-btn>
                            </template>
                            <span>导入到制作页</span>
                        </v-tooltip>
                        <OpenBtn type="folder" icon :path="folder">
                            <v-icon>mdi-folder-outline</v-icon>
                        </OpenBtn>
                        <v-btn icon dark @click="dialog.value = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-card-title>
                <v-card-text :style="{'height':height}" class="overflow-auto">
                    <Imgs :list="imglist" folder />
                </v-card-text>
            </v-card>
        </div>
    </template>
</v-dialog>
</template>

<script>
import {
    mapMutations
} from 'vuex'
import config from '@/config'
import Imgs from '@/components/Imgs'
import BetterScroll from '@/components/BetterScroll'
import OpenBtn from '@/components/Button/OpenBtn'
export default {
    props: {
        list: {
            type: Array,
            default: []
        },
        config: {
            type: Object,
            default: {}
        },
        folder: {
            type: String,
            default: ''
        }
    },
    components: {
        Imgs,
        OpenBtn,
        BetterScroll
    },
    data() {
        return {
            dialog: false,
            color: config.color,
            imglist: [],
            height: null,
            loading: true
        }
    },
    mounted() {
        window.addEventListener('resize', () => {
            this.resizeHeight()
        })
    },
    methods: {
        ...mapMutations('api', ['edit_gif_config']),
        getImgs(path) {
            if (path.length == 0) return this.loading = false
            if (path[0] && typeof (path[0]) !== "string") return this.resizeHeight()
            $api.handleImg(path).then(data => {
                this.imglist = data
                this.loading = false
                this.resizeHeight()
            })
        },
        import2Make(data, config, dialog) {
            dialog.value = false
            this.edit_gif_config({
                data,
                config
            })
        },
        resizeHeight() {
            if (!this.dialog && this.loading) return
            let contentClass = ".v-dialog__content.v-dialog__content--active .v-card__text"
            let dialog = document.querySelector(".v-dialog__content.v-dialog__content--active .v-dialog--active").clientHeight
            let title = document.querySelector(".v-dialog__content.v-dialog__content--active .v-card__title")
            let content = document.querySelector(contentClass)
            if(dialog)
                if (!title || !content) return setTimeout(() => {
                    this.resizeHeight()
                }, 100);
            title = title.clientHeight
            content = content.scrollHeight
            this.$nextTick(() => {
                if (dialog - title - content <= -100)
                    this.height = (dialog - title) + 'px'
                else this.height = null
            })
        }
    }
}
</script>

<style lang='scss' scoped>
</style>
