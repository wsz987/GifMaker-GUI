<template>
<v-row class="my-3 mx-1 content" dense>
    <v-col v-for="(item,index) in list" :key="item.name+index" xs="12" sm="4" md="3" lg="2" xl='2' cols="6" justify="center" dense>
        <v-hover v-slot="{ hover }">
            <v-card>
                <v-overlay absolute v-show="hover">
                    <v-btn class="left insert" icon dark small @click="choiceImg(index)" v-if="insert">
                        <v-icon dark>
                            mdi-arrow-bottom-left-bold-outline
                        </v-icon>
                    </v-btn>
                   <div class="control">
                        <v-btn class="mx-2" fab dark small color="cyan" @click="open_file(item.path)">
                        <v-icon dark>
                            mdi-magnify-scan
                        </v-icon>
                    </v-btn>
                    <v-btn class="mx-2" fab dark small color="blue-grey" @click="open_folder(handleFolderPath(item.path))" v-if="folder">
                        <v-icon dark>
                            mdi-folder-outline
                        </v-icon>
                    </v-btn>
                    <v-btn class="mx-2" fab dark small color="pink" @click="removeImg(item)" v-if="delBtn">
                        <v-icon dark>
                            mdi-delete-outline
                        </v-icon>
                    </v-btn>
                   </div>
                    <v-btn class="right insert" icon dark small @click="choiceImg(index+1)" v-if="insert">
                        <v-icon dark>
                            mdi-arrow-bottom-right-bold-outline
                        </v-icon>
                    </v-btn>
                </v-overlay>
                <v-img :src="'data:image/png;base64,'+item.data" :aspect-ratio="16/9" contain>
                    <v-icon x-large v-if="!item.data" class="image-off">mdi-image-off</v-icon>
                </v-img>
            </v-card>
        </v-hover>
        <div class="img-name text-center text-no-wrap text-truncate">{{item.name}}</div>
    </v-col>
</v-row>
</template>

<script>
import {
    mapMutations,
    mapActions
} from 'vuex'
export default {
    props: {
        list: Array,
        delBtn: {
            type: Boolean,
            default: false
        },
        folder: {
            type: Boolean,
            default: false
        },
        insert: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        ...mapMutations('api', ['open_file', 'open_folder', 'removeImg']),
        ...mapActions('api', ['choiceImg']),
        handleFolderPath(path) {
            return path.substring(0, path.lastIndexOf("/"));
        }
    },
}
</script>

<style lang="scss" scoped>
.image-off {
    width: 100%;
    height: 100%;
}

::v-deep .v-overlay__content {
    height: 100%;
    width: 100%;
    // position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .insert {
        position: absolute;
        bottom: 0;
    }

    .left {
        float: left;
        left: 0;
    }

    .right {
        float: right;
        right: 0;
    }
}


</style>
