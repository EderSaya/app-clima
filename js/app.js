/**
 * Script donde se realiza el consumo de la api openweathermap.
 * Se procesa la información y se muestra en el front.
 * Autor: Eder Saya Castillo.
 */
const apiKey = '56e5fe71bdab7ff4a778094260ffa6d0';

let iconWeather = document.querySelector("#icon-weather");
let iconDay1 = document.querySelector("#icon-day1");
let iconDay2 = document.querySelector("#icon-day2");
let iconDay3 = document.querySelector("#icon-day3");

let iconParis = document.querySelector("#icon-paris");
let iconParis2 = document.querySelector("#icon-paris2");


//Función que obtiene los datos metereólogicos de la ciudad de París
function obtenerDatosParis() {
    let urlParis = `https://api.openweathermap.org/data/2.5/onecall?lat=48.85&lon=2.358&exclude=hourly,minutely&appid=${apiKey}&units=metric`;

    const apiParis = new XMLHttpRequest();
    apiParis.open('GET', urlParis , true)
    apiParis.send();

    apiParis.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {
            let result = JSON.parse(this.responseText);
            console.log(result);
         
            //Datos París
            let paris = document.querySelector('#city-france');
            paris.innerHTML = `${result.timezone.substr(-5,6)}`

            let tempDayOne = document.querySelector('#temp-day1');
            tempDayOne.innerHTML =`${Math.trunc(result.current.temp)}`;
            let humidity = document.querySelector('#humidity');
            humidity.innerHTML = `Humidity ${result.current.humidity}%`;
            let velocityDayOne = document.querySelector('#speed-day1');
            velocityDayOne.innerHTML = `${Math.trunc(result.current.wind_speed)}Km/h`;

            let tempDayTwo = document.querySelector('#temp-day2');
            tempDayTwo.innerHTML =`${Math.trunc(result.daily[1].temp.day)}`;
            let humidityTwo = document.querySelector('#humidity-two');
            humidityTwo.innerHTML = `Humidity ${result.daily[1].humidity}%`;
            let velocityDayTwo = document.querySelector('#speed-day2');
            velocityDayTwo.innerHTML = `${Math.trunc(result.daily[1].wind_speed)}Km/h`;

            //Obtengo el icono del día actual.
            if(result.current.weather[0].main == 'Clouds' || result.current.weather[0].icon == '04n'){
                iconParis.classList.add('icon-cloudy2');
            } 
            //Obtengo el icono del día siguiente.
            if (result.daily[1].weather[0].main == 'Clouds' || result.daily[1].weather[0].icon == '04n') {
                iconParis2.classList.add('icon-cloudy2');
            } else if(result.daily[1].weather[0].main == 'Clear'){
                iconParis2.classList.add('icon-sun-fill');
            } else {
                iconParis2.classList.add('icon-rainy');
            }
        } else {
            console.log('Ha ocurrido un error con la conexión a la api.');
        }
        
    }
} 

//Función que obtiene los datos metereólogicos de la ciudad de Bogotá
function obtenerDatosBogota() {
    let urlBogota = `https://api.openweathermap.org/data/2.5/onecall?lat=4.61&lon=-74.08&exclude=hourly,minutely&appid=${apiKey}&units=metric`;
    
    const apiBogota = new XMLHttpRequest();
    apiBogota.open('GET', urlBogota , true);
    apiBogota.send();

    apiBogota.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {
            let datos = JSON.parse(this.responseText);
            console.log(datos);

            //Datos Bogotá
            let labelCity = document.querySelector('#label-city');
            labelCity.innerHTML = `${datos.timezone.substr(-6,6)}`;

            let labelWeather = document.querySelector('#label-weather');
            labelWeather.innerHTML = `${datos.current.weather[0].main}`;
            let labelTemp = document.querySelector('#label-temp');
            labelTemp.innerHTML = `${datos.current.temp}`;
            let tempMaxOne = document.querySelector('#min-max-one'); 
            tempMaxOne.innerHTML = `${Math.trunc(datos.daily[1].temp.min)} / ${Math.trunc(datos.daily[1].temp.max)}`;
            let tempMaxTwo = document.querySelector('#min-max-two'); 
            tempMaxTwo.innerHTML = `${Math.trunc(datos.daily[2].temp.min)} / ${Math.trunc(datos.daily[2].temp.max)}`;
            let tempMaxTre = document.querySelector('#min-max-thre'); 
            tempMaxTre.innerHTML = `${Math.trunc(datos.daily[3].temp.min)} / ${Math.trunc(datos.daily[3].temp.max)}`;

            let rain = document.querySelector('#rain');
            rain.innerHTML = `${datos.daily[0].weather[0].main}`;
            let clear = document.querySelector('#clear');
            clear.innerHTML = `${datos.daily[1].weather[0].main}`;
            let cloudy = document.querySelector('#cloudy');
            cloudy.innerHTML = `${datos.daily[2].weather[0].main}`;
    
            //Obtengo el icono que sera mostrado en el día actual.
           if(datos.current.weather[0].main == 'Clouds') {
                iconWeather.classList.add('icon-cloudy2');
            }  else if(datos.daily[1].weather[0].main == 'Clear'){
                iconWeather.classList.add('icon-sun-fill'); 
            } else {
                iconWeather.classList.add('icon-rainy');
            }

            //Obtengo los iconos para mostrar en los 3 días siguientes
            if (datos.daily[1].weather[0].main == 'Clouds' || datos.daily[1].weather[0].icon == '04n') {
                iconDay1.classList.add('icon-cloudy2');
            } else if(datos.daily[1].weather[0].main == 'Clear'){
                iconDay1.classList.add('icon-sun-fill');
            } else {
                iconDay1.classList.add('icon-rainy');
            }

            //Icono día 2
            if (datos.daily[2].weather[0].main == 'Clouds' || datos.daily[2].weather[0].icon == '04n') {
                iconDay2.classList.add('icon-cloudy2');
            } else if(datos.daily[2].weather[0].main == 'Clear'){
                iconDay2.classList.add('icon-sun-fill');
            } else {
                iconDay2.classList.add('icon-rainy');
            }
            
            //Icono día 3.
            if (datos.daily[3].weather[0].main == 'Clouds' || datos.daily[3].weather[0].icon == '04n') {
                iconDay3.classList.add('icon-cloudy2');
            } else if(datos.daily[3].weather[0].main == 'Clear'){
                iconDay3.classList.add('icon-sun-fill');
            } else {
                iconDay3.classList.add('icon-rainy');
            }

        } else {
            console.log('Ha ocurrido un error con la conexión a la api.');
      }
    }
}
obtenerDatosBogota();
obtenerDatosParis();