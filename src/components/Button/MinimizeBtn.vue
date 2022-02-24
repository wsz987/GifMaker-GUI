<template>
<v-btn icon @click="minihandle">
    <v-icon>mdi-minus</v-icon>
</v-btn>
</template>
<script>
export default {
    methods: {
        minihandle(){
            $api.btn_handle('minimize')
        }
    }
}
</script>
