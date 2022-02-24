<template>
<div>
    <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" class="ma-0">
                <v-icon>mdi-close-octagon-outline</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                是否关闭？
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="darken-1" text @click="dialog = false">
                    取消
                </v-btn>
                <v-btn color="cyan darken-1" text @click="destroy_window">
                    关闭
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
        }
    },
    methods: {
        destroy_window(){
            $api.btn_handle('destroy')
        }
    }
}
</script>

<style lang='scss' scoped>
</style>
