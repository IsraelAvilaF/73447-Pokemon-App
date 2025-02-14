const KEY = `deb84c47623351cdf8ad23d2a323ae3f`;
const baseURL = `https://api.openweathermap.org/data/2.5/weather?appid=${KEY}&units=metric`;
let longitud = 139.774497;
let latitud = 35.671174;
const weatherInput = document.querySelector(`#weather-search`);
const weatherBtnSave = document.querySelector(`#weather-save`);
let ultimaCiudadValida = "";

const ciudadGuardada = localStorage.getItem(`clima-ciudad`)

if(ciudadGuardada){

    obtenerClimaPorNombreCiudad(ciudadGuardada);

} else {

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = position.coords;
                latitud = coords.latitude;
                longitud = coords.longitude;
                obtenerClimaPorCoordenadas(latitud,longitud);
            }, // successCallBack
            (error) => {
                console.log(`Error al obtener la ubicación`)
                obtenerClimaPorCoordenadas(latitud, longitud)
            } // errorCallBack
        )
    }
}

function obtenerClimaPorCoordenadas(LATI,LONG){
    axios.get(`${baseURL}&lat=${LATI}&lon=${LONG}`) // Japon 35.671174, 139.774497 // Lima -12.138639, -76.979196
        .then(response => {
            console.log(response.data)
            const weather = response.data;
            pintarClima(weather);
        })
        .catch(error => {
            console.warn(error);
        })
} // IIFE para invocar inmediatamente la función

// weatherInput.addEventListener(`input`, function(event){
//     weatherBtnSave.disabled = true;
// })

weatherInput.addEventListener(`keyup`, function(event){
    if(event.key === `Enter`){
        const valorInput = event.target.value.toLowerCase();
        obtenerClimaPorNombreCiudad(valorInput)
    }
})

weatherBtnSave.addEventListener(`click`, function(){
    // const ciudad = weatherInput.value;
    localStorage.setItem(`clima-ciudad`, ultimaCiudadValida)

    Swal.fire({
        title: `Ciudad guardada`,
        text: `Se guardó la ciudad ${ultimaCiudadValida}`,
        icon: `info`
    })
    // obtenerClimaPorNombreCiudad(ciudad, true)

})


function obtenerClimaPorNombreCiudad(ciudad, save = false){
    axios.get(`${baseURL}&q=${ciudad}`)
        .then(response =>{
            const weather = response.data;
            pintarClima(weather)
            weatherBtnSave.disabled = false;
            ultimaCiudadValida = ciudad;
            Swal.fire({
                title: `Ciudad encontrada`,
                text: `Se encontró la ciudad ${ciudad}`,
                icon: `success`
            })

        })
        .catch(error => {
            weatherBtnSave.disabled = true;
            Swal.fire({
                title: `Ciudad no encontrada`,
                text: `No se encontró la ciudad ${ciudad}`,
                icon: `error`
            })

        })
}

function pintarClima(clima){
    const weatherTempHTML = document.getElementById(`weather-temp`);
    const weatherLocationHTML = document.getElementById(`weather-location`);
    const weatherIconHTML = document.getElementById(`weather-icon`);
    weatherTempHTML.innerText = clima.main.temp;
    weatherLocationHTML.innerText = clima.name;
    const icon = clima.weather[0].icon;
    const img = document.createElement(`img`);
    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    img.alt = `Icono del clima`
    weatherIconHTML.innerHTML = "";
    weatherIconHTML.appendChild(img);
}