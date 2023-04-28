<template>
    <div>
        <p style="color:white">{{ pokemon }}</p>
    </div>
</template>

<script>
import axios from 'axios';
import VueAxios from 'vue-axios';
import Swal from 'sweetalert2'
export default {
    props: [
        'pokeUrl',
        'imageUrl'
    ],
    data: () => {
        return {
            show:false,
            pokemon: {},
            dexEntryURL: 'https://pokeapi.co/api/v2/pokemon-species/',
            dexEntry: {},
            dex:  'yes'
        }
    },
    methods: {
        getPokemon() {

            let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                
                });

            axios.get(this.pokeUrl)
            .then((data) => {
                this.pokemon = data.data

                axios.get(this.dexEntryURL+this.pokemon.id)
                .then((data) => {
                let dex = JSON.stringify(data.data.flavor_text_entries[0].flavor_text);
                this.dexEntry = dex.replace(/(?:\\[rnf]|[\r\n]+)+/g, " ") 
                console.log(this.dexEntry)

                
                setTimeout(() => {
                    loader.hide()
                }, 500)


                Swal.fire({
                title: '<p style ="text-transform: capitalize;"><strong>'+this.pokemon.name+'</strong></p>',
                imageUrl: this.imageUrl+this.pokemon.id+'.png',
                imageHeight: 300,
                html: 
                '<p><strong>Dex Entry: </strong>' +
                    this.dexEntry +'</p>'
                })

                this.closeModal()
                this.show = true;
                })

            })

        },

        closeModal() {
            this.$emit('closeModal')
        }
    },

    created() {
        this.getPokemon() 
    }
}
</script>