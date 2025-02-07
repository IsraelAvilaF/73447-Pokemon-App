let pokemones = [];
const URL_API = `https://pokeapi.co/api/v2`;

function obtenerPokemones(){
    // 1. Hacer una petición al servidor con un metodo asincrónico con axios
    axios.get(`${URL_API}/pokemon`).then(response =>{
                                        console.log(`Respuesta desde pokemonapi`, response);

                                        // 2. Guardar la respuesta en la variable pokemones
                                        pokemones = response.data.results

                                        // 3. Pintar los pokemones en el HTML
                                        pintarPokemones(pokemones);
                                    })
                                .catch(error => {
                                        console.error(error);
                                        console.error(`Error al obtener los pokemones`);
                                })
}

obtenerPokemones()

function pintarPokemones(arrayPokemones) {
    // 1. Seleccionar el contenedor de pokemones
    const pokemonListHTML = document.getElementById(`poke`);

    // 2. Borrar el contenido del contenedor
    console.log(`pintarpokemones`, arrayPokemones);

    // 3. Recorrer el array de pokemones con un forEach
    arrayPokemones.forEach(pokemon => {
        // 4. Crear un elemento HTML por cada pokemón

        const ID = extraerPokemonID(pokemon.url)

        // const pokemonID = pokemon.url.split(`/`).at(-2);

        pokemonListHTML.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
                                        ${pokemon.name}
                                        <a href="/pages/detail.html?pokemon=${ID}" class="btn btn-primary btn-sm">Ver</a>
                                    </li>`
    })
}

function extraerPokemonID(url) {

        const urlSplit = url.split(`/`);
        const pokemonID = urlSplit.at(-2);
        return pokemonID;

}