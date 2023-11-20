// Modo estrito
"use strict";

// Elementos
const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");
const invalid = document.querySelector(".invalid");
const empty = document.querySelector(".empty");
const weather = document.querySelector(".weather");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const apiKey = "fdf86069973a81bc10932ae1a7dd10f5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Verificar clima
async function checkWeather(city, response, data) {
    response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status === 404) {
        invalid.style.display = "block";
        empty.style.display = "none";
        weather.style.display = "none";
    }
    else if(response.status === 400) {
        empty.style.display = "block";
        invalid.style.display = "none";
        weather.style.display = "none";
    } 
    else {
        responseData(response, data)
        weather.style.display = "block";
        invalid.style.display = "none";
        empty.style.display = "none";
    }
    checkInputText();
}

// Obter dados do clima
async function responseData(response, data) {
    data = await response.json();
    console.log(data)
    temp.textContent = Math.round(data.main.temp) + "°c";
    city.textContent = data.name + ",";
    country.textContent = data.sys.country;
    humidity.textContent = data.main.humidity + "%";
    wind.textContent = data.wind.speed + " km/h";

    if(data.weather[0].main === "Clouds") {
        weatherIcon.src = "assets/images/clouds.png";
    }
    else if(data.weather[0].main === "Clear") {
        weatherIcon.src = "assets/images/clear.png";
    }
    else if(data.weather[0].main === "Drizzle") {
        weatherIcon.src = "assets/images/drizzle.png";
    }
    else if(data.weather[0].main === "Mist") {
        weatherIcon.src = "assets/images/mist.png";
    }
    else if(data.weather[0].main === "Rain") {
        weatherIcon.src = "assets/images/rain.png";
    }
}

// Verificar o texto de entrada
function checkInputText() {
    const validText = /[a-zA-z]/.test(searchBox.value);
    const invalidText = /[+0-9]/.test(searchBox.value);
    if(!validText || invalidText) {
        invalid.style.display = "block";
        empty.style.display = "none";
        weather.style.display = "none";
    }
    if(searchBox.value === "") {
        empty.style.display = "block";
        invalid.style.display = "none";
        weather.style.display = "none";
    } 
}

// Verificar clima pressionando a tecla ENTER
searchBox.addEventListener("keydown", async function(event) {
    if(event.code === "Enter") {
        await checkWeather(this.value);
    }
});

// Verificar clima clicando no botão de pesquisar
searchBtn.addEventListener("click", async function() {
    await checkWeather(searchBox.value);
});