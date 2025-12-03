//variables locales
const apiKey = "fe84f811272d4cafb5e155227250312";
const cityCode = "Granada";
const endpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityCode}&days=1&aqi=no&alerts=no`;
const refreshInterval = 60000;

let currentRequest = null;

//función que rellena el documento HTML con los datos del clima que se obtengan de la API
async function fillWeatherData(city, country, skyDesc, skyImg, temp, precip, humidity, wind, timetable) {
    //si la petición anterior no ha terminado aún, no hacemos nada
    if (currentRequest) return;

    //lanzamos la petición
    currentRequest = getWeatherData();

    //esperamos a que se resuelva
    const data = await currentRequest;

    //solo cambiamos el HTML si la petición ha sido exitosa
    if (data) {
        //obtenemos y rellenamos la ciudad en la que estamos
        const dName = data.location?.name;
        const dCountry = data.location?.country;

        city.innerText = dName;
        country.innerText = dCountry;

        //obtenemos y rellenamos estado del clima y foto del clima
        const dText = data.current?.condition?.text;
        const dIcon = data.current?.condition?.icon;

        skyDesc.innerText = dText;
        skyImg.setAttribute("src", dIcon);
        skyImg.setAttribute("alt", dText);

        //obtenemos y rellenamos temperatura, precipitaciones, humedad y viento
        const dTemp = data.current?.temp_c;
        const dPrecip = data.current?.precip_mm;
        const dHumidity = data.current?.humidity;
        const dWind = data.current?.wind_kph;

        temp.innerText = dTemp + " ºC";
        precip.innerText = dPrecip + " mm";
        humidity.innerText = dHumidity + "%";
        wind.innerText = dWind + " km/h";

        //borramos el contenido anterior de la timetable
        timetable.innerHTML = "";

        //obtenemos la tabla de tiempo
        const dTimetable = data.forecast?.forecastday?.[0]?.hour;

        //modificar la timetable solo si hemos recibido una tabla de tiempo válida
        if (Array.isArray(dTimetable)) {
            const elements = dTimetable.map(element => {
                const dTimeString = typeof element.time === "string" ? element.time : "";
                const dTimeArray = dTimeString.split(" ", 2);

                const dTime = dTimeArray.length === 2 ? dTimeArray[1] : "00:00";
                const dText = element.condition?.text;
                const dIcon = element.condition?.icon;
                const dTemp = element.temp_c + " ºC";

                return `
                    <div class="weather-data">
                        <span>${dTime}</span>
                        <img src="${dIcon}" alt="${dText}">
                        <span>${dTemp}</span>
                    </div>
                `;
            });

            timetable.innerHTML = elements.join("");
        }
    }

    //establecemos la petición como finalizada
    currentRequest = null;
}

//función que solicita y obtiene los datos de la API del tiempo
async function getWeatherData() {
    return fetch(endpoint)
    .then(response => {
        if (!response.ok) throw new Error("El servidor devolvió status " + response.status);
        return response.json();
    })
    .then(data => {
        if (data && typeof data === "object" && !Array.isArray(data)) return data;
    })
    .catch(error => {
        console.error("Error al solicitar los datos del clima de " + cityCode + " de WeatherAPI", error);
    });
}

export function setup(self, parent) {
    self.innerHTML = `
        <div id="weather-container" class="box">
            <div id="weather-location">
                <span id="weather-city"></span> / <span id="weather-country"></span>
            </div>

            <div id="weather-current">
                <div id="weather-sky">
                    <span id="weather-sky-desc"></span>
                    <img id="weather-sky-img">
                </div>

                <span id="weather-temp"></span>

                <div id="weather-air">
                    <p>Precipitaciones: <span id="weather-precip"></span></p>
                    <p>Humedad: <span id="weather-humidity"></span></p>
                    <p>Viento: <span id="weather-wind"></span></p>
                </div>
            </div>

            <ol id="weather-timetable"></ol>
        </div>
    `;

    //añadir elemento al padre
    parent.appendChild(self);

    //obtener los elementos a los que añadir funcionalidades del DOM
    const weatherCity = document.getElementById("weather-city");
    const weatherCountry = document.getElementById("weather-country");
    const weatherSkyDesc = document.getElementById("weather-sky-desc");
    const weatherSkyImg = document.getElementById("weather-sky-img");
    const weatherTemp = document.getElementById("weather-temp");
    const weatherPrecip = document.getElementById("weather-precip");
    const weatherHumidity = document.getElementById("weather-humidity");
    const weatherWind = document.getElementById("weather-wind");
    const weatherTimetable = document.getElementById("weather-timetable");

    //rellenar información sobre el clima lo antes posible para que los campos no estén vacíos al principio
    fillWeatherData(weatherCity, weatherCountry, weatherSkyDesc, weatherSkyImg,
        weatherTemp, weatherPrecip, weatherHumidity, weatherWind, weatherTimetable);

    //establecer intervalo de refresco de los datos
    setInterval(fillWeatherData, refreshInterval, weatherCity, weatherCountry,
        weatherSkyDesc, weatherSkyImg, weatherTemp, weatherPrecip, weatherHumidity, weatherWind, weatherTimetable);
}