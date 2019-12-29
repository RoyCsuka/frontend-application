
<template>
    <div id="app">
        <sideBar ref="sidebar"></sideBar>
        <TheData></TheData>
    </div>
</template>

<script>

import sideBar from './components/sideBar.vue'
import TheData from './components/TheData.vue'

export default {
    name: 'app',
    components: {
        sideBar,
        TheData
    },
    mounted() {

        window.addEventListener('scroll', this.onScroll);
    },
    methods: {
        onScroll() {
            if (document.documentElement.scrollTop >= 340) {
                this.$refs.sidebar.$el.classList.add("moveToSide")
            } else if (document.documentElement.scrollTop < 340) {
                this.$refs.sidebar.$el.classList.remove("moveToSide")
            }
        }
    }
}


</script>

<style>

</style>
