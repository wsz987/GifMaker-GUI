<template>
<v-card flat class="pa-3">
    <BetterScroll :trim="12">
        <Gifs :list="gifData" />
    </BetterScroll>
</v-card>
</template>

<script>
import BetterScroll from '@/components/BetterScroll'
import Gifs from '@/components/Gifs'
import {
    mapGetters
} from 'vuex'
export default {
    components: {
        Gifs,
        BetterScroll
    },
    data() {
        return {}
    },
    computed: {
        ...mapGetters('api', ['gifData'])
    },
}
</script>

<style lang="scss" scoped>
</style>
