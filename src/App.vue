<template>
<v-app>
    <v-app-bar app :color="config.color" dark class="pywebview-drag-region">
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
        <Setting />
        <v-toolbar-title>GIF Maker</v-toolbar-title>
        <v-spacer></v-spacer>

        <GithubBtn />
        <FullscreenBtn/>
        <MinimizeBtn />
        <MaximizeBtn />
        <CloseBtn />

        <template v-slot:extension>
            <Tabs />
        </template>
    </v-app-bar>

    <v-main>
        <router-view />
    </v-main>
    <Tips />
</v-app>
</template>

<script>
import config from '@/config'
import Setting from '@/components/Setting'
import GithubBtn from '@/components/Button/GithubBtn'
import MinimizeBtn from '@/components/Button/MinimizeBtn'
import MaximizeBtn from '@/components/Button/MaximizeBtn'
import FullscreenBtn from '@/components/Button/FullscreenBtn'
import CloseBtn from '@/components/Button/CloseBtn'
import Tips from '@/components/Tips'
import Tabs from '@/components/Tabs'
export default {
    name: 'App',
    components: {
        Setting,
        MinimizeBtn,
        MaximizeBtn,
        FullscreenBtn,
        CloseBtn,
        GithubBtn,
        Tabs,
        Tips
    },
    data: () => ({
        config
    }),
    methods: {
        open_folder(path) {
            pywebview.api.open_folder(path)
        },
    }
};
</script>

<style lang="scss">
.v-application {
    max-height: 100vh !important;

}

body {
    background-color: '#3E3E3E' !important;
}
</style>
