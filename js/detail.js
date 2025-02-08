const urlParams = new URLSearchParams(window.location.search);

const ID = urlParams.get(`pokemon`);

obtenerPokemonDesdeAPI(ID);

function obtenerPokemonDesdeAPI(id){
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response =>{
            const pokemon = response.data;
            console.log(pokemon)
            const nombre = pokemon.name;
            const order = pokemon.order;
            const image = pokemon.sprites.other["official-artwork"].front_default

            const nameHTML = document.getElementById(`pokemon-name`)
            const descriptionHTML = document.getElementById(`pokemon-description`)
            const imageHTML = document.getElementById(`pokemon-image`)

            nameHTML.innerText = nombre;
            descriptionHTML.innerText = `#${order}`;
            imageHTML.src = image;
            
        })
        .catch(error => {
            alert(`Error al obtener el pokemon`)
        })
}