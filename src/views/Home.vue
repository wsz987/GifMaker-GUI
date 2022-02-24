<template>
<v-tabs-items :value="actionTab">
    <v-tab-item>
        <Maker />
    </v-tab-item>
    <v-tab-item>
        <ConfigManage/>
    </v-tab-item>
    <v-tab-item>
        <FolderManage />
    </v-tab-item>
</v-tabs-items>
</template>

<script>
import {
    mapGetters,
} from 'vuex'
import config from '@/config'
import Maker from './Tabs/Maker'
import ConfigManage from './Tabs/ConfigManage.vue'
import FolderManage from './Tabs/FolderManage.vue'
export default {
    name: 'Home',
    data() {
        return {
            tabList: config.tabs
        }
    },
    components: {
        Maker,
        ConfigManage,
        FolderManage
    },
    computed: {
        ...mapGetters('api', ['actionTab'])
    },
}
</script>
<style lang="scss">
.v-tabs-items{
    height: 100%;
}
</style>
