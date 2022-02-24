<template>
<v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
        <v-btn icon @click="fullhandle" v-bind="attrs" v-on="on">
            <v-icon v-if="!full">mdi-overscan</v-icon>
            <v-icon v-else>mdi-arrow-collapse-all</v-icon>
        </v-btn>
    </template>
    <span>全屏</span>
</v-tooltip>
</template>

<script>
export default {
    data() {
        return {
            full: false
        }
    },
    methods: {
        fullhandle() {
            $api.btn_handle('fullscreen')
            this.full = !this.full
        }
    }
}
</script>
