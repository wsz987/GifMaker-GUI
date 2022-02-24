<template>
<v-card flat class="pa-3">
    <v-row>
        <v-col md="9" lg="10" xl="10" cols="8">
            <BetterScroll>
                <v-overlay absolute :opacity="0.3" v-if="loadImg">
                    <v-progress-circular :size="50" :width="4" :color="color" indeterminate></v-progress-circular>
                </v-overlay>
                <Imgs :list="imgList" delBtn insert />
            </BetterScroll>
        </v-col>
        <v-col md="3" lg="2" xl="2" cols="4">
            <v-card class="pa-3">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field label="保存至" :value="config.savePath" :placeholder="placeholder" v-bind="attrs" v-on="on" @click="setSavePath" clearable class="pt-0"></v-text-field>
                    </template>
                    <!-- <p class="mb-0">非必须</p> -->
                    <p class="mb-0">默认生成在最后一张图片的GIF目录下</p>
                    <p class="mb-0">{{placeholder}}</p>
                </v-tooltip>

                <!-- <v-radio-group v-model="config.resizeType" label="调整 ：" dense>
                    <v-radio v-for="item in resizeTypes" :key="item" :label="item" :value="item" dense></v-radio>
                </v-radio-group> -->
                <div @mousedown="handleSlider('duration')">
                     <v-text-field label="间隔(s)" v-model="config.duration" class="pt-0" :disabled="config.mode!='duration'" ></v-text-field>
                </div>
                <div @mousedown="handleSlider('fps')">
                    <v-slider dense label="FPS :" :max="24" :min="1" v-model="config.fps" thumb-label :disabled="config.mode!='fps'" thumbLabel="always" thumb-size="18"></v-slider>
                </div>
                <v-select :items="doneEvent" label="完成后" dense v-model="config.doneEvent" item-text="label" item-value="value"></v-select>
                <v-btn color="error" block @click="clearAllImg">
                    清空
                </v-btn>
                <div class="btn-group pa-3 d-flex justify-space-around">
                    <v-btn elevation="2" @click="handle_choiceImg">选择图片</v-btn>
                    <MakeBtn :config="config" />
                </div>
            </v-card>
        </v-col>
    </v-row>
</v-card>
</template>

<script>
import {
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex'
import {
    color
} from '@/config'
import Imgs from '@/components/Imgs'
import BetterScroll from '@/components/BetterScroll'
import MakeBtn from '@/components/Button/MakeBtn'
export default {
    components: {
        Imgs,
        BetterScroll,
        MakeBtn
    },
    data() {
        return {
            resizeTypes: ["无"],
            placeholder: '',
            doneEvent: [{
                label: '打开GIF',
                value: 'file'
            }, {
                label: '打开文件夹',
                value: 'folder'
            }, {
                label: '无',
                value: 'none'
            }],
            loadImg: false,
            color: color,
            config: {
                // mode: 'fps',
                // fps: 3,
                // resizeType: '无',
                // duration: 0.35,
                // savePath: '',
                // open: true
            }
        }
    },
    methods: {
        ...mapMutations('api', ['open_folder', 'clearAllImg']),
        ...mapActions('api', ['choiceImg', 'make']),
        handleSlider(mode) {
            if (this.config.mode != mode) return this.config.mode = mode
        },
        async handle_choiceImg() {
            this.loadImg = true
            await this.choiceImg()
            this.loadImg = false
        },
        setSavePath(){
            $api.save_foler_dialog().then(path=>{
                this.config.savePath=path
            })
        }
    },
    computed: {
        ...mapGetters('api', ['imgList', 'makeConfig']),
    },
    watch: {
        makeConfig(val) {
            this.config = val
        },
        imgList(val) {
            let length = val.length
            if (length == 0) return this.placeholder = ''
            if(this.config.savePath.trim()!='') return
            let path = val[length - 1].path
            path = path.split('\\')
            path.pop()
            this.placeholder = path.join('/') + '/GIF'
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
