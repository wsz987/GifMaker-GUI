<template>
<div ref="wrapper" class="wrapper" :style="{'height':height}" :key="key" @click="initScroll">
    <slot></slot>
</div>
</template>

<script>
import Bscroll from 'better-scroll'

export default {
    props:{
        trim:{
            type:Number,
            default:24
        },
        h:{
            type:Number,
            default: 0
        }
    },
    data() {
        return {
            wrapper: null,
            height: '300px',
            paddingBottom: 30,
            key: 0
        }
    },
    mounted() {
        !this.h && this.resizeHeight()
        !this.h && window.addEventListener('resize', () => {
            setTimeout(()=>this.resizeHeight(),200)
        })
        document.querySelector(".wrapper").addEventListener('DOMNodeInserted', () => {
            this.initScroll()
        })
    },
    methods: {
        initScroll() {
            this.$nextTick(() => {
                if (this.wrapper) return this.wrapper.refresh();
                this.wrapper = new Bscroll(this.$refs.wrapper, {
                    click: true,
                    mouseWheel: true,
                    disableTouch: false,
                    disableMouse: false
                })
            })
        },
        resizeHeight() {
            let app = document.querySelector(".v-application").clientHeight
            let appBar = document.querySelector(".v-app-bar").clientHeight
            this.$nextTick(() => {
                this.height = (app - appBar - this.getTrim) + "px"
                this.initScroll()
            })
        }
    },
    computed:{
        getTrim(){
            return this.trim
        }
    },
    watch:{
        h(val){
            if(!val) return
            this.$nextTick(() => {
                this.height = h
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    overflow: hidden;
    width: 100%;
    position: relative;
    border-radius: 5px;
    height: 100%;
}

</style>
