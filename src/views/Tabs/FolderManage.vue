<template>
<v-card class="mx-3 pa-2">
    <v-btn color="blue-grey" class="ma-2 white--text" @click="add_folder">
        添加目录
        <v-icon right dark>
            mdi-plus
        </v-icon>
    </v-btn>
    <v-simple-table fixed-header :height="height">
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">
                        文件夹名
                    </th>
                    <th class="text-left">
                        路径
                    </th>
                    <th class="text-center">
                        操作
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in folderList" :key="item">
                    <td class="text">{{ folderName(item) }}</td>
                    <td class="text">{{ item }}</td>
                    <td class="d-flex justify-center">
                        <OpenBtn class="ma-1" color="secondary" text="打开" :path="item" />
                        <OpenBtn class="ma-1" color="secondary" type="folder" text="GIF目录" :path="item+'\\GIF'" />
                        <LoadGifsBtn class="ma-1" :item="item" />
                        <v-btn class="ma-1" depressed color="error" @click="del_folder(item)">
                            <v-icon left dark>
                                mdi-trash-can-outline
                            </v-icon>
                            删除
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</v-card>
</template>

<script>
import {
    mapActions,
    mapGetters,
} from 'vuex'
import OpenBtn from '@/components/Button/OpenBtn'
import LoadGifsBtn from '@/components/Button/LoadGifsBtn'
export default {
    components: {
        OpenBtn,
        LoadGifsBtn
    },
    data() {
        return {
            height: null
        }
    },
    mounted() {
        this.resizeHeight()
        window.addEventListener('resize', () => {
            this.resizeHeight()
        })
        document.querySelector("tbody").addEventListener('DOMNodeInserted', () => {
            this.resizeHeight()
        })
    },
    methods: {
        ...mapActions('api', ['add_folder', 'del_folder', 'getFolderList']),
        resizeHeight() {
            let app = document.querySelector(".v-application").clientHeight
            let appBar = document.querySelector(".v-app-bar").clientHeight
            let last_tr = document.querySelector("tbody > tr:last-child").offsetTop
            if (app - appBar - last_tr < 130)
                this.$nextTick(() => {
                    this.height = (app - appBar - 85) + 'px'
                })
            else this.height = null
        }
    },
    computed: {
        ...mapGetters('api', ['folderList']),
        folderName() {
            return name => {
                const arr = name.split('\\')
                return arr[arr.length - 1]
            }
        }
    },
}
</script>

<style lang="scss" scoped>
</style>
