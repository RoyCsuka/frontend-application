<template>
    <div>
        <div class="descriptionOfPage" :class="{red:turnRed}">
            <h1><b>Maskers</b> van toen</h1>
            <p>
                Op deze site kun je een verzameling van
                alle maskers zien die de onderstaande museums
                bezitten.
            </p>
            <button @click="toggle('Red')">bekijk de collage</button>

        </div>

        <nav>
            <ul>
                <li>Sorteer alfabetisch op:</li>
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
