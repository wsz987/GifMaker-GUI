<template>
<v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-2" fab dark small color="pink" v-bind="attrs" v-on="on" @click="dialog = true">
            <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
    </template>
    <v-card>
        <v-card-title>
            是否删除？
        </v-card-title>
        <v-card-text>仅删除此GIF的制作配置</v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" text @click="dialog = false">
                取消
            </v-btn>
            <v-btn color="error darken-1" text @click="del_gif_config(item)">
                删除
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>


<!-- <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-2" fab dark small color="pink" @click.stop="del_gif_config(item)" v-bind="attrs" v-on="on">
            <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
    </template>
    <span>仅删除此GIF的制作配置</span>
</v-tooltip> -->
</template>

<script>
import {
    mapActions
} from 'vuex'
export default {
    props: {
        item: Array | Object
    },
    data() {
        return {
            dialog: false,
        }
    },
    methods: {
        ...mapActions('api', ['del_gif_config'])
    }
}
</script>
