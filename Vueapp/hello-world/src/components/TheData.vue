<template>
    <div>
        <sideBar/>
         <!-- <img v-bind:src="results.img.value" alt=""> -->
        <div class="content">
            <article v-for="item in results"> <!-- Loop de article voor elk resultaat -->
                <!-- <suvery-answer v-bind:results="results" /> -->
                <div v-bind:style="{ 'background-image': 'url(' + item.img.value + ')' }"></div>
                <footer>
                    <h3>
                        {{ item.title.value }}
                    </h3>
                    <p>
                        <span>{{ item.placeName.value }}</span>
                    </p>
                    <p>
                        {{ item.desc.value }}
                    </p>
                </footer>
            </article>
        </div>
    </div>
</template>


<script>

import sideBar from './sideBar.vue'


export default {
    components: {
        sideBar
    },
    data () {
        return {
            title: "Maskers van Toen",
            results: [],
            maskerItems: []
        }
    },

    // FETCH THE DATA
    mounted () {
    this.scroll(this.maskerItems);

    const url = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-14/sparql"

    //Note that the query is wrapped in es6 template strings to allow for easy copy pasting
    const query = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        PREFIX dct: <http://purl.org/dc/terms/>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX edm: <http://www.europeana.eu/schemas/edm/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        SELECT ?img ?title ?placeName ?place ?obj ?objLabel ?desc WHERE {
            ?cho dc:title ?title .

            OPTIONAL { ?cho dc:description ?desc } .
            FILTER (CONTAINS (?title, "maskers") OR
                    CONTAINS (?title, "masker") OR
                    CONTAINS (?title, "mask")
            )
            ?cho edm:isShownBy ?img .

            ?cho dct:spatial ?place .
            ?place skos:broader ?stad .
            ?stad skos:broader ?regio .
            ?regio skos:broader ?provincie .
            ?provincie skos:broader ?land .
            ?land skos:prefLabel ?placeName .

            ?cho dc:description ?desc .

            ?cho dc:subject ?obj .
            ?obj skos:prefLabel ?objLabel .
        }
        LIMIT 10
    `

    this.runQuery(url, query)
    },
    methods :{
        runQuery(url, query) {
            fetch(url)

            fetch(url+"?query="+ encodeURIComponent(query) +"&format=json")
            .then(res => res.json())
            .then(json => {
                this.results = json.results.bindings;
                var results = this.results;

                results.forEach(function(i) {
                    i.img.value = i.img.value.replace("http", "https");
                })
            })
        },
        scroll (maskerItems) {
            window.onscroll = () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    console.log('onderkant pagina');
                }
            }
        }
    }
}

</script>

<style>

</style>
