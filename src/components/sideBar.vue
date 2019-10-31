<template>
    <div>
        <div class="descriptionOfPage">
            <h1><b>Maskers</b> van toen</h1>
            <p>
                Op deze site vind je een verzameling van
                alle maskers die de onderstaande museums
                bezitten. Dit is een inspiratiebron voor
                de mensen die in maskers geïnteresseerd zijn.
            </p>
            <img src="../assets/afrika-logo.png" alt="">
            <img src="../assets/wereld-logo.png" alt="">
            <img src="../assets/tropen-logo.png" alt="">
            <img src="../assets/volkenkunde-logo.png" alt="">
            <button @click="toggle('Red')">bekijk de collage</button>

        </div>

        <nav>
            <ul>
                <li>Sorteer op landen:</li>
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
    created: function () {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed: function () {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../style.scss';

nav {
    display: block;
    position: absolute;
    background-color: white;
    right: 0;
    width: 70vw;
    bottom: 0;
    height: 60px;
    ul {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 0 50px;
        box-sizing: border-box;
        margin: 0;
        border-bottom: 2px solid $main-color;

        li {
            list-style-type: none;
            display: inline-block;
            font-family: 'Playfair Display', serif;
            a {
                color: $main-color;
                text-decoration: none;
                padding: 20px 40px;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}

.moveToSide {
    .descriptionOfPage {
        position: fixed;
        width: 22.5vw;
        margin-left: 2.5vw;
        margin-top: 80px;

        h1 {
            font-size: 2.8vw;
            &::after {
                height: 3px;
            }
        }

        img {
            display: block;
            max-height: 80px;
            margin-bottom: 10px;
        }

        p {
            display: inline-block;
        }

        button {
            display: none;
        }
    }
}

.descriptionOfPage {
    width: 80vw;
    margin-left: 15vw;
    margin-top: 100px;
    position: absolute;
    color: white;

    &::before {
        content: "";
        display: block;
        background-image: url('../assets/bg_masks.jpg');
        background-position: top 70px center;
        background-repeat: no-repeat;
        width: 100vw;
        background-color: black;
        height: 100vh;
        background-size: cover;
        top: 0;
        left: 0;
        position: fixed;
        z-index: -1;
    }

    h1 {
        font-size: 75px;
        color: rgba(255, 255, 255, 0.8);
        b {
            color: white;
            font-weight: 700;
        }
        &::after {
            background-color: white;
            opacity: 1;
            height: 5px;
            width: 80px;
        }
    }

    button {
        display: block;
        background-color: rgba(255, 255, 255, 0.8);
        font-size: 15px;
        font-weight: 500;
        margin-top: 50px;
        color: rgba(0, 0, 0, 0.7);
        border-radius: 2px;
        padding: 10px 25px;
        cursor: pointer;
        position: relative;

        &::before {
            content: "";
            display: block;
            position: absolute;
            width: calc(100% + 8px);
            height: calc(100% + 8px);
            padding: 0;
            left: -6px;
            border: 2px solid rgba(255, 255, 255, 0.6);
            top: -6px;
            border-radius: 5px;
        }
    }

    p,
    img {
        color: white;
        display: none;
    }
}

</style>
