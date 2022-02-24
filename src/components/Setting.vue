<template>
<div class="text-center">
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-app-bar-nav-icon v-bind="attrs" v-on="on"></v-app-bar-nav-icon>
        </template>

        <v-card>
            <v-card-title class="text-h8">
                呀！被发现了，然而这里什么都没有(￣y▽￣)╭ 
            </v-card-title>
            <v-card-text>
                <p>这个制作器时我闲暇之余学 python 码的。</p>
                <p>初衷的功能很简单，刚好来满足我简单制作GIF的小需求，但写着写着强迫症上来，就给加了 GUI。</p>
                <p>整体设计秉承着我一贯的<span class="text-decoration-line-through">简约风格</span>。</p>
                <p>制作器很单一现在，其实可以做得再完善些，再加好多功能，可想想也没啥人会用，遂简简单单打磨一下下。</p>
                <p class="font-weight-black">当然你们给我 提建议/BUG 我会很开心的哈哈~~</p>
                <p class="font-weight-bold mb-0">最后，欢迎各位右上角 来我 GitHub 点颗小⭐⭐</p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="color +' darken-1 '" text @click="dialog = false">
                    Agree
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import config from '@/config'
export default {
    data() {
        return {
            dialog: false,
            color: config.color
        }
    },
    methods: {}
}
</script>

<style lang='scss' scoped>
</style>
