<template>
  <div class="tz-gallery">
    <div class="row">
        <div v-for="(pokemon,index) in pokemons" :key="index" class="col-sm-12 col-md-4">
                <div class="lightbox"  @click="passPokemonUrl(pokemon.url)">
                    <div class="card"
                    :class="{'grass': pokemon.type =='grass',
                              'fire': pokemon.type =='fire',  
                              'water': pokemon.type =='water',  
                              'bug': pokemon.type =='bug', 
                              'normal': pokemon.type =='normal', 
                              'poison': pokemon.type =='poison', 
                              'electric': pokemon.type =='electric', 
                              'ground': pokemon.type =='ground', 
                              'fairy': pokemon.type == 'fairy',
                              'fighting': pokemon.type == 'fighting',
                              'psychic': pokemon.type == 'psychic',
                              'rock': pokemon.type == 'rock',
                              'ghost': pokemon.type == 'ghost',
                              'ice': pokemon.type == 'ice',
                              'dragon': pokemon.type == 'dragon',
                }">
                    <img class="card-img-top" :src="imageUrl+pokemon.id+'.png'" alt="Card image cap">
                    <div class="card-body">
                        <div class="pokemon-details">
                            <h3 class="pokemon-name"><strong>{{ pokemon.name }}</strong></h3>
                            <p>#{{ pokemon.idNumber }}</p>
                            <div class="pokemon-bio">
                                <p class="pokemon-bio-details" ><strong>Height:</strong> {{ pokemon.height}} m</p>
                                <p class="pokemon-bio-details" ><strong>Weight: </strong> {{ pokemon.weight }} kg</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

    </div>
    <div class="col-md-12 text-center">
    <button v-if="total<151" class="btn btn-primary" @click.prevent="loadMore()">Load More</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import VueAxios from 'vue-axios';
import Swal from 'sweetalert2'
export default {
    props: [
        'apiUrl',
        'imageUrl'
    ],

    data: () => {
        return {
            pokemons: [],
            offset:0,
            limit:30,
            total:0,
        }
    },
    
    methods: {
        getPokemon(limit='30',offset='') {
            let vm  = this
            axios.get(this.apiUrl+'?limit=' +limit + '&?offset=' +offset)
            .then(data => {

                let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                
                });

                this.pokemons  = data.data.results
                this.total = this.pokemons.length
                this.pokemons.forEach(pokemon => {
                    pokemon.id = pokemon.url.split('/').filter(function(part) {return !!part }).pop();
                    pokemon.idNumber = pokemon.id.toString().padStart(3, '0')   

                axios.get(pokemon.url)
                 .then(data => {
                    pokemon.height = data.data.height / 10
                    pokemon.weight = data.data.weight / 10
                    pokemon.type = data.data.types[0].type.name
                   })
                })

                setTimeout(() => {
                    loader.hide()
                }, 1000)
            })


        },

        passPokemonUrl(url) {
            this.$emit('passPokemonUrl',url);
        },

        loadMore() {
            let offset = this.offset += 15
            let limit;
            if(this.total == 150 ) {
                 limit = this.limit += 1
                 Swal.fire(
                'Trivia',
                'Mew was one of the orginal 1st gen pokemon to be ever created  but only accesible through a glitch, thats why I included him, he might get sad lol',
                'Info'
                )
            }else {
                 limit = this.limit += 15
            }
            this.getPokemon(limit,offset);


        }
    },

    created() {
        this.getPokemon();


    }
  }
</script>

<style scoped>
.dragon {
    background: linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%) !important;
}
.ground {
    background: radial-gradient(1091px at 106.5% 111.5%, rgb(250, 246, 213) 0.1%, rgb(218, 147, 93) 42.2%, rgb(137, 86, 67) 74.3%, rgb(67, 39, 39) 100.2%)!important;
}
.grass {
    background: linear-gradient(to top, #9be15d 0%, #00e3ae 100%) !important;
}

.fire {
    background: radial-gradient(circle at 10% 20%, rgb(255, 197, 118) 0%, rgb(254, 106, 103) 47.7%, rgb(240, 23, 23) 92.3%)!important;
}

.water {
    background: radial-gradient(circle at 0.7% 1%, rgb(215, 248, 247) 0%, rgb(102, 188, 239) 100.2%) !important;
}

.bug {
    background: linear-gradient(to top, #96fbc4 0%, #f9f586 100%) !important;
}

.normal {
    background: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%) !important;
}

.poison {
    background: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%) !important;
}

.electric {
    background: linear-gradient(109.6deg, rgb(255, 219, 47) 11.2%, rgb(244, 253, 0) 100.2%) !important;
}

.fairy {
    background: linear-gradient(122.3deg, rgb(111, 71, 133) 14.6%, rgb(232, 129, 166) 29.6%, rgb(237, 237, 183) 42.1%, rgb(244, 166, 215) 56.7%, rgb(154, 219, 232) 68.7%, rgb(238, 226, 159) 84.8%) !important;
}

.fighting {
    background: linear-gradient(87.4deg, rgb(255, 241, 165) 1.9%, rgb(200, 125, 76) 49.7%, rgb(83, 54, 54) 100.5%) !important;
}

.psychic {
    background: linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%) !important;
}

.rock {
    background: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%) !important;
}

.ghost {
    background: linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%) !important;
}

.ice {
    background: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%) !important;
}
.pokemon-name {
    text-transform: capitalize;
}

.pokemon-details {
    text-align: center;
    color: black;
    font-family: 'Roboto', sans-serif;
}

.pokemon-bio-details {
    display: inline;
     padding: 10px;
     background: #fdfcfb;
     margin: 20px;
     border-radius: 5px;
}
.container.gallery-container {
    background-color: #fff;
    color: #35373a;
    min-height: 100vh;
    padding: 30px 50px;
}

.gallery-container h1 {
    text-align: center;
    margin-top: 50px;
    font-family: 'Droid Sans', sans-serif;
    font-weight: bold;
}

.gallery-container p.page-description {
    text-align: center;
    margin: 25px auto;
    font-size: 18px;
    color: #999;
}

.tz-gallery {
    padding: 60px;
    width: 100%;
    margin: 0 auto;
}

/* Override bootstrap column paddings */
.tz-gallery .row > div {
    padding: 15px;
}

.tz-gallery .lightbox img {
    width: 50%;
    border-radius: 0;
    margin: 0 auto;
}

.lightbox {
    -webkit-animation-duration: .8s;
  animation-duration: .8s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}


.tz-gallery .lightbox:before {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -13px;
    margin-left: -13px;
    opacity: 0;
    color: #fff;
    font-size: 26px;
    font-family: 'Glyphicons Halflings';
    content: '\e003';
    pointer-events: none;
    z-index: 9000;
    transition: 0.4s;
}


.tz-gallery .lightbox:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba(46, 132, 206, 0.7);
    content: '';
    transition: 0.4s;
}



.baguetteBox-button {
    background-color: transparent !important;
}


@keyframes bounce {
	0%, 100%, 20%, 50%, 80% {
		-webkit-transform: translateY(0);
		-ms-transform:     translateY(0);
		transform:         translateY(0)
	}
	40% {
		-webkit-transform: translateY(-30px);
		-ms-transform:     translateY(-30px);
		transform:         translateY(-30px)
	}
	60% {
		-webkit-transform: translateY(-15px);
		-ms-transform:     translateY(-15px);
		transform:         translateY(-15px)
	}
}

.lightbox:hover {
    cursor: pointer;
  animation-name: bounce;
  -moz-animation-name: bounce;
}


@media(max-width: 768px) {
    body {
        padding: 0;
    }
    
    .pokemon-bio-details {
        display: block;
    
    }
    .tz-gallery .row > div {
        padding: 7px;
        margin-bottom: 10px;
    }

    .tz-gallery .lightbox img {
        width: 100%;
        border-radius: 0;
        margin: 0 auto;
    }
    .tz-gallery {
        padding: 0px;
    }


}


</style>