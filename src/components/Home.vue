<template>
    <div class="container">
        <h1 class="home-header">PokeDex</h1>
       <PokemonList :apiUrl="apiUrl" :imageUrl="imageUrl" @passPokemonUrl="passPokemonUrl"/>
        <PokemonView v-if="showPokemon"  :pokeUrl="pokeUrl" :imageUrl="imageUrl" @closeModal ="closeModal"/>
    </div>
</template>

<script>
    import PokemonList from './PokemonList.Vue'
    import PokemonView from './PokemonView.vue'
    export default {
        components: {
            PokemonList,
            PokemonView,
        },
        data() {
            return {
               apiUrl: 'https://pokeapi.co/api/v2/pokemon',
               imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
               pokeUrl: '',
               showPokemon : false,
            }
        },

        methods: {
            passPokemonUrl(url) {
                this.pokeUrl = url
                this.showPokemon = true
            },
            closeModal() {
                this.pokeUrl = ''
                this.showPokemon = false
            }
        },

        computed: {

        }
    }
</script>

<style scoped>
.home-header {
    color: white;
    text-align: center;
}
</style>