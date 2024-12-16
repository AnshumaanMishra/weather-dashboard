const weatherContent = document.getElementById('content');

const contentNavigators = document.getElementsByClassName('navigator');

const search = document.getElementsByClassName('sicon')[0];

var city = undefined;
var jsondata = undefined;

var unit = 'M';
const unitToggle = document.getElementById('unit-toggle');

var day = -1;
const dataToggle = document.getElementById('data-toggle');

const cityName = document.getElementById('name');
const region = document.getElementById('region');
const date = document.getElementById('date');

const condition = document.getElementById('condition');
const conditionIcon = document.getElementById('icon');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feels-like');

const humidity = document.getElementById('humidity');
const pressure = document.getElementById('atmospheric-pressure');
const precipitation = document.getElementById('precipitation');
const visibility = document.getElementById('visibility');

const windSpeed = document.getElementById('wind-speed');
const windDirection = document.getElementById('wind-direction');
const windDegrees = document.getElementById('wind-degrees');
const astroContainer = document.getElementById('astro-container');
astroContainer.firstElementChild.innerText = "Moonset:";
astroContainer.classList.add('hidden');


async function APICall(city){    
    await fetch("https://api.weatherapi.com/v1/forecast.json?key=f0450e703e924000a7a64512241612&q=" + city + "&days=7&aqi=no&alerts=yes")
        .then(response => response.json())
        .then((data) => {
            jsondata = data;
            console.log(data);
            changeTheme(data.current.is_day);
            update(data);
        })
        .catch(error => {
            erroralert(error);
            return;
        });
    
}

function changeTheme(isDay){
    if(isDay == 1){
        weatherContent.style.backgroundColor = "#ececec";
        weatherContent.style.color = "black";
    }
    else{
        weatherContent.style.backgroundColor = "rgb(46, 46, 46)"
        weatherContent.style.color = "lightgray";
    }
}

function erroralert(error) {
    switch(error.code){
        case 1003:
            alert("Please enter a value");
            break;
        case 1006:
            alert("City Not found");
            break;
        default:
            alert(error.code);
            break;
    }
}

function updateCityDetails(location){
    cityName.innerText = location.name;// + "\n" + 
    region.innerText = location.region + ", " + location.country; 
}

function updateCondition(fcondition) {
    condition.innerText = fcondition.text;
    conditionIcon.setAttribute("src", "https:" + fcondition.icon);
}

function updateTemperature(current, unit) {
    if(unit == 'M'){
        temperature.innerText = current.temp_c + "\xB0" + "C";
        feelsLike.lastElementChild.innerText = "(" + current.feelslike_c + "\xB0" + "C)";
    }
    else{
        temperature.innerText = current.temp_f + "\xB0" + "F";
        feelsLike.lastElementChild.innerText = "(" + current.feelslike_f + "\xB0" + "F)";
    }   
}

function updateLeftPane(current, unit) {
    humidity.firstElementChild.innerText = "Humidity:";
    pressure.firstElementChild.innerText = "Pressure:";
    precipitation.firstElementChild.innerText = "Rainfall:";
    visibility.firstElementChild.innerText = "Visibility:";

    if(unit == 'M'){
        humidity.lastElementChild.innerText = current.humidity + "%";
        pressure.lastElementChild.innerText = current.pressure_mb + " mBar";
        precipitation.lastElementChild.innerText = current.precip_mm + " mm";
        visibility.lastElementChild.innerText = current.vis_km + " km";
    }
    else{
        humidity.lastElementChild.innerText = current.humidity + "%";
        pressure.lastElementChild.innerText = current.pressure_mb + " mBar";
        precipitation.lastElementChild.innerText = current.precip_in + " in";
        visibility.lastElementChild.innerText = current.vis_miles + " mi";
    }
}

function updateRightPane(current, unit) {
    windSpeed.parentElement.firstElementChild.innerText = "Wind:";
    windSpeed.firstElementChild.innerText = "Speed:";
    windDirection.firstElementChild.innerText = "Direction:";
    windDegrees.firstElementChild.innerText = "Degrees:";
    windDegrees.parentElement.lastElementChild.classList.add("hidden");

    if(unit == 'M'){
        windSpeed.lastElementChild.innerText = current.wind_kph + " kph";
        windDirection.lastElementChild.innerText = current.wind_dir + "";
        windDegrees.lastElementChild.innerText = current.wind_degree + "\xB0";
    }
    else{
        windSpeed.lastElementChild.innerText = current.wind_mph + " mph";
        windDirection.lastElementChild.innerText = current.wind_dir + "";
        windDegrees.lastElementChild.innerText = current.wind_degree + "\xB0";
    }
}

function updateDayTemperature(current, unit) {
    if(unit == 'M'){
        temperature.innerText = current.avgtemp_c + "\xB0" + "C";
        feelsLike.lastElementChild.innerText = "(" + current.maxtemp_c + "\xB0" + "C/" + current.mintemp_c + "\xB0" + "C)";
    }
    else{
        temperature.innerText = current.avgtemp_f + "\xB0" + "F";
        feelsLike.lastElementChild.innerText = "(" + current.maxtemp_f + "\xB0" + "F/" + current.mintemp_f + "\xB0" + "F)";
    }   
}

function updateDayLeftPane(current, unit) {
    humidity.firstElementChild.innerText = "Humidity:";
    pressure.firstElementChild.innerText = "Max. Wind:";
    precipitation.firstElementChild.innerText = "Rainfall:";
    visibility.firstElementChild.innerText = "Visibility:";
    
    if(unit == 'M'){
        humidity.lastElementChild.innerText = current.avghumidity + "%";
        pressure.lastElementChild.innerText = current.maxwind_mph + " mph";
        precipitation.lastElementChild.innerText = current.totalprecip_mm + " mm";
        visibility.lastElementChild.innerText = current.avgvis_km + " km";
    }
    else{
        humidity.lastElementChild.innerText = current.avghumidity + "%";
        precipitation.lastElementChild.innerText = current.totalprecip_in + " in";
        precipitation.lastElementChild.innerText = current.maxwind_mph + " mph";
        visibility.lastElementChild.innerText = current.avgvis_miles + " mi";
    }
}

function updateDayRightPane(current) {
    windSpeed.parentElement.firstElementChild.innerText = "Astro:";
    windSpeed.firstElementChild.innerText = "Sunrise:";
    windDirection.firstElementChild.innerText = "Sunset:";
    windDegrees.firstElementChild.innerText = "Moonrise:";
    windDegrees.parentElement.lastElementChild.classList.remove("hidden");

    windSpeed.lastElementChild.innerText = current.sunrise;
    windDirection.lastElementChild.innerText = current.sunset;
    windDegrees.lastElementChild.innerText = current.moonrise;
    windDegrees.parentElement.lastElementChild.lastElementChild.innerText = current.moonset;
}


function update(jsondata) {
    try {
        if(jsondata.error.code != 0){
            erroralert(jsondata.error);
        }
        return;
    } catch (error) {
        
    }
    if(day == -1){
        contentNavigators[0].classList.add('hidden');
        contentNavigators[1].classList.add('hidden');

        updateCityDetails(jsondata.location);
        date.innerText = jsondata.location.localtime;  
        updateCondition(jsondata.current.condition);
        updateTemperature(jsondata.current, unit);
        updateLeftPane(jsondata.current, unit);
        updateRightPane(jsondata.current, unit);
    }
    else{
        contentNavigators[0].classList.remove('hidden');
        contentNavigators[1].classList.remove('hidden');

        updateCityDetails(jsondata.location);
        date.innerText = jsondata.forecast.forecastday[day].date;
        updateCondition(jsondata.forecast.forecastday[day].day.condition);
        updateDayTemperature(jsondata.forecast.forecastday[day].day, unit);
        updateDayLeftPane(jsondata.forecast.forecastday[day].day, unit);
        updateDayRightPane(jsondata.forecast.forecastday[day].astro, unit);
    }   
    weatherContent.classList.remove("hidden");
}

unitToggle.addEventListener('click', () => {
    if(unit == 'I'){
        unit = 'M';
        unitToggle.firstElementChild.classList.remove('hidden');
        unitToggle.lastElementChild.classList.add('hidden');
    }
    else{
        unit = 'I';
        unitToggle.firstElementChild.classList.add('hidden');
        unitToggle.lastElementChild.classList.remove('hidden');
    }
    if(city === undefined){
        city = document.getElementById('search-box').value;
    }
    if(jsondata == undefined){
        APICall(city);
    }
    else{
        update(jsondata);
    }
});

dataToggle.addEventListener('click', () => {
    if(day == -1){
        day = 0;
        dataToggle.firstElementChild.classList.add('hidden');
        dataToggle.lastElementChild.classList.remove('hidden');
    }
    else{
        day = -1;
        dataToggle.firstElementChild.classList.remove('hidden');
        dataToggle.lastElementChild.classList.add('hidden');
    }
    if(city === undefined){
        city = document.getElementById('search-box').value;
    }
    if(jsondata == undefined){
        APICall(city);
    }
    else{
        update(jsondata);
    }
});

search.addEventListener('click', async () => {
    city = document.getElementById('search-box').value;
    APICall(city);
});

contentNavigators[0].addEventListener('click', () => {
    if(day > 0 && day <= 6){
        day--;
    }
    if(jsondata == undefined){
        APICall(city);
    }
    else{
        update(jsondata);
    }
});

contentNavigators[1].addEventListener('click', () => {
    if(day >= 0 && day < 6){
        day++;
    }
    if(jsondata == undefined){
        APICall(city);
    }
    else{
        update(jsondata);
    }
});
