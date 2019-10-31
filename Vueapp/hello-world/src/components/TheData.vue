<template>
    <div>
        <sideBar/>
        <div class="content">
            <button @click="sortAndToggle()" v-bind:class="{ abc: sort }">Land</button>
            <article v-for="item in results"> <!-- Loop de article voor elk resultaat -->

                <!--Achtergrond afbeelding inladen via v-bind:style-->
                <!-- <div v-bind:style="{ 'background-image': 'url(' + item.img.value + ')' }"></div> -->
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
            sort: false
        }
    },

    // FETCH THE DATA
    mounted () {
    // roept scroll functie aan voor infinite scrolling
    this.scroll(this.maskerItems);

    // Mijn endpoint
    const url = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-14/sparql"

    // een const waar mijn SPARQL code in verwerkt zit.
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
            FILTER langMatches(lang(?title), "ned") # alleen Nederlandstalige cho's
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
        LIMIT 50
    `

    this.runQuery(url, query)
    },
    methods :{
        runQuery(url, query) {
            fetch(url)
            this.busy = true;

            fetch(url+"?query="+ encodeURIComponent(query) +"&format=json")
            .then(res => res.json())
            .then(json => {
                this.results = json.results.bindings;
                var results = this.results;

                 // zorgt ervoor dat alle afbeelding https voor de link krijgen
                results.forEach(function(i) {
                    i.img.value = i.img.value.replace("http", "https");
                })
            })
        },

        // console log als onderkant van de pagina is bereikt begin van infinite scorlling
        scroll (maskerItems) { // functie
            window.onscroll = () => { // spreek de window on scroll aan
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight; // formule om de onderkant van de pagina te berekenen
                if (bottomOfWindow) { // als de formule overeen komt
                    console.log('onderkant pagina'); // console log
                }
            }
        },

        sortAndToggle () {
            this.sort = !this.sort;

            let sorteerData = this.results;

            if (this.sort === true) {
                sorteerData.sort((a, b) => (a.placeName.value < b.placeName.value) ? 1 : -1)
                console.log('True')
            } else if (this.sort === false) {
                sorteerData.sort((a, b) => (a.placeName.value > b.placeName.value) ? 1 : -1)
                console.log('False')
            }
        }
    }
}


</script>


<style>

</style>
