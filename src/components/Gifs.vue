<template>
<v-row class="my-3 mx-1 content" dense>
    <v-col v-for="(item,index) in list" :key="item.gif_name+index" xs="12" sm="4" md="3" lg="2" xl='2' cols="6" justify="center" dense>
        <v-hover v-slot="{ hover }">
            <v-card>
                <v-overlay absolute v-show="hover">
                    <GifInfoDialog :list='item.data' :config="item.config" :folder="item.saveFolder" />
                    <v-btn class="mx-2" fab dark small color="cyan" @click="open_file(item.gif[0].path)">
                        <v-icon dark>
                            mdi-magnify-scan
                        </v-icon>
                    </v-btn>
                    <DelGifBtn :item="item"/>
                </v-overlay>
                <v-img :src="'data:image/png;base64,'+item.gif[0].data" :aspect-ratio="16/9" contain>
                    <v-icon x-large v-if="!item.gif[0].data" class="image-off">mdi-image-off</v-icon>
                </v-img>
            </v-card>
        </v-hover>
        <div class="img-name text-center text-no-wrap text-truncate">{{item.gif[0].name}}</div>
    </v-col>
</v-row>
</template>

<script>
import {
    mapMutations
} from 'vuex'
import GifInfoDialog from '@/components/GifInfoDialog'
import DelGifBtn from '@/components/Button/DelGifBtn'
export default {
    components: {
        GifInfoDialog,
        DelGifBtn
    },
    props: {
        list: Array,
        delBtn: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    },
    methods: {
        ...mapMutations('api', ['open_file', "open_folder"])
    },
}
</script>

<style lang="scss" scoped>
.image-off {
    width: 100%;
    height: 100%;
}
</style>
