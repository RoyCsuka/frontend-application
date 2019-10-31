
<template>
    <div id="app">
        <img src="assets/logo.png" alt="">
        <TheData ref="sidebar"></TheData>
    </div>
</template>

<script>

import TheData from './components/TheData.vue'

export default {
    name: 'app',
    components: {
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
