const weatherContent = document.getElementById('content');

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

function update(jsondata) {
    cityName.innerText = jsondata.location.name;// + "\n" + 
    region.innerText = jsondata.location.region + ", " + jsondata.location.country; 
    date.innerText = jsondata.location.localtime;  
    
    condition.innerText = jsondata.current.condition.text;
    conditionIcon.setAttribute("src", "https:" + jsondata.current.condition.icon);
    temperature.innerText = jsondata.current.temp_c + "\xB0" + "C";
    feelsLike.children[1].innerText = jsondata.current.feelslike_c + "\xB0" + "C";

    humidity.children[1].innerText = jsondata.current.humidity + "%";
    pressure.children[1].innerText = jsondata.current.pressure_mb + " mBar";
    precipitation.children[1].innerText = jsondata.current.precip_mm + " mm";
    visibility.children[1].innerText = jsondata.current.vis_km + " km";
    
    windSpeed.children[1].innerText = jsondata.current.wind_kph + " km/h";
    windDirection.children[1].innerText = jsondata.current.wind_dir + "";
    windDegrees.children[1].innerText = jsondata.current.wind_degree + "\xB0";
}

const search = document.getElementsByClassName('sicon')[0];

search.addEventListener('click', () => {
    var city = document.getElementById('search-box').value;
    console.log("Hello " + city);
    let jsondata;
    fetch("https://api.weatherapi.com/v1/forecast.json?key=f0450e703e924000a7a64512241612&q=" + city + "&days=1&aqi=yes&alerts=yes")
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            update(data);
        })
        .catch(error => console.log("Error : " + error));
    weatherContent.classList.remove("hidden");
});
