<template>
    <div>
        <div class="content">
            <button @click="sortAndToggle()" v-bind:class="{ abc: sort }">abc</button>
            <!-- FILTEREN OP DE OUDE MANIER -->
            <!-- <button v-on:click="userFilterKey = 'all'" :class="{ active: userFilterKey == 'all' }">All</button>
            <button v-on:click="userFilterKey = 'filterAfrika'" :class="{active: userFilterKey == 'filterAfrika' }">Afrika</button> -->


            <select class="" name="" v-model="countrys" >
                <option v-for="item in results" :value="item.placeName.value">{{ item.placeName.value }}</option>
            </select>

            <article v-bind:key="item.id" v-for="item in computed_items"> <!-- Loop de article voor elk resultaat -->
                <!--Achtergrond afbeelding inladen via v-bind:style-->
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

export default {
    data () {
        return {
            title: "Maskers van Toen",
            // --------- FILTEREN OP DE OUDE MANIER
            // userFilterKey: 'all',
            countrys: '',
            results: [],
            sort: false
        }
    },

    // FETCH THE DATA
    mounted () {
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


        // abc: sort
        sortAndToggle() { // functie voor de @click methode
            this.sort = !this.sort; // set dit (sort) element op false of true als functie wordt getriggerd

            let sorteerData = this.results; // een let die de resultaten uit de database haalt

            if (this.sort === true) { // als sort waar is van de functie hierboven order mijn "sorteerData" van A > Z
                // stukje hieronder komt van deze site: https://stackoverflow.com/questions/38744932/how-to-call-multiple-functions-with-click-in-vue Zelf heb ik dit aangepast naar mijn waardes en in een if & else statement gezet
                sorteerData.sort((a, b) => (a.placeName.value < b.placeName.value) ? 1 : -1) // placeName is het land uit SPARQL
            } else if (this.sort === false) { // als sort waar is van de functie hierboven order mijn "sorteerData" van Z > A
                sorteerData.sort((a, b) => (a.placeName.value > b.placeName.value) ? 1 : -1) // placeName is het land uit SPARQL
            }
        }
    },

    // Code heb ik hiervan daan en mijn eigen gemaakt: https://jsfiddle.net/1f9ytasb/
    computed: {

        // Dynamische filter optie naar mijn eigen gemaakt: https://stackoverflow.com/questions/49521851/how-to-filter-list-from-multiple-select-options-dropdowns-using-vuejs
        computed_items: function () {
            let filterType= this.countrys

            return this.results.filter(function(results) {
                let filtered = true
                if(filterType && filterType.length > 0){
                    filtered = results.placeName.value == filterType
                }
                return filtered
            })
        }
    }
}




</script>


<style lang="scss" scoped>
@import '../style.scss';

.content {
    display: inline-flex;
    flex-wrap: wrap;
    width: 70vw;
    margin-left: 30vw;
    margin-top: 100vh;
    background-color: white;
    position: relative;

    // Sorteer knop
    button:first-of-type {
        left: 195px;
        background-color: #01aa9e;
        &::after {
            content: "";
            display: inline-block;
            background-image: url('../assets/arrow.svg');
            background-size: cover;
            background-repeat: no-repeat;
            width: 8px;
            height: 19px;
            margin-bottom: -5px;
            margin-left: 5px;
            margin-top: -10px;
            transition: all 0.2s ease-in-out;
            transform: rotate(-180deg);
        }
        &.abc {
            &::after {
                transform: rotate(0);
            }
        }
    }

    select {
        position: absolute;
        left: 455px;
        top: -50px;
        background-color: #01aa9e;
        padding: 8px 20px;
        margin: 0;
        font-size: 15px;
        border-radius: 4px;
        -webkit-box-shadow: 0 3px 0 rgba(1, 170, 158, 0.51), 0 -1px rgba(1, 170, 158, 0.8) inset;
        box-shadow: 0 3px 0 rgba(1, 170, 158, 0.51), 0 -1px rgba(1, 170, 158, 0.8) inset;
        background: #01aa9e;
        color: #fff;
        border: none;
        outline: none;
        display: inline-block;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        cursor: pointer;
    }

    /* Targetting Webkit browsers only. FF will show the dropdown arrow with so much padding. */
    @media screen and (-webkit-min-device-pixel-ratio:0) {
        select {padding-right:18px}
    }

    option {position:relative}
    option:after {
        content:'<>';
        font:11px "Consolas", monospace;
        color:#aaa;
        -webkit-transform:rotate(90deg);
        -moz-transform:rotate(90deg);
        -ms-transform:rotate(90deg);
        transform:rotate(90deg);
        right:8px; top:2px;
        padding:0 0 2px;
        border-bottom:1px solid #ddd;
        position:absolute;
        pointer-events:none;
    }
    option:before {
        content:'';
        right:6px; top:0px;
        width:20px; height:20px;
        background:#f8f8f8;
        position:absolute;
        pointer-events:none;
        display:block;
    }

    // Sorteer en filter knop
    button {
        position: absolute;
        top: -37px;
        color: white;
        border: 2px solid;
        padding: 10px;
        margin-top: -15px;
        font-size: 15px;
        text-transform: uppercase;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
    }

    article {
        text-align: left;
        display: inline-flex;
        align-items: center;
        flex-direction: row;
        background-color: white;
        width: 100%;
        padding: 50px 60px;

        &:nth-of-type(2n) {
            flex-direction: row-reverse;
            footer {
                padding-left: 0;
                padding-right: 60px;
            }
        }

        &:first-of-type {
            padding: 10vh 60px 50px;
        }

        > div { //afbeelding
            background-size: cover;
            background-position: center center;
            width: 100%;
            height: 35vw;
            display: block;
        }

        footer {
            display: block;
            padding-left: 30px;
            max-width: 40%;

            h3 {
                margin-bottom: 5px;
                font-size: 30px;
            }
            p {
                margin: 7px 0;
                color: $txt-color;
                font-weight: 200;
                font-size: 17px;
                span {
                    font-weight: 500;
                    display: block;
                }
            }
        }
    }
}

</style>
