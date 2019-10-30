<template>
    <div>
        <div class="descriptionOfPage" :class="{red:turnRed}">
            <h1><b>Maskers</b> van toen</h1>
            <p>
                Op deze site kun je een verzameling van
                alle maskers zien die de onderstaande museums
                bezitten.
            </p>
            <button @click="toggle('Red')" href="">bekijk de collage</button>

        </div>

        <nav>
            <ul>
                <li><a href="">Eerste onderwerp</a></li>
                <li><a href="">Tweede onderwerp</a></li>
                <li><a href="">Onderwerp drie</a></li>
                <li><a href="">Onderwerp vier</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'sideBar',
    props: {
        msg: String
    },
    data () {
        return {
            turnRed: false
        }
    },
    // testen van true or false onclick in Vuejs https://stackoverflow.com/questions/42971081/use-arrow-function-in-vue-computed-does-not-work
    methods :{
        toggle (color) {
            this[`turn${color}`] = !this[`turn${color}`];
        },
    },
    created: function () {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed: function () {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
