const weatherContent = document.getElementById('content');

var unit = 'M';
const unitToggle = document.getElementById('unit-toggle');

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

let city;

async function APICall(city){    
    await fetch("https://api.weatherapi.com/v1/forecast.json?key=f0450e703e924000a7a64512241612&q=" + city + "&days=1&aqi=yes&alerts=yes")
        .then(response => response.json())
        .then((data) => {
            // console.log(data);
            update(data);
        })
        .catch(error => {
            console.log("Error : " + error);
            erroralert(error);
            return;
        });
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

function update(jsondata) {
    try {
        if(jsondata.error.code != 0){
            erroralert(jsondata.error);
        }
        return;
    } catch (error) {
        
    }
    cityName.innerText = jsondata.location.name;// + "\n" + 
    region.innerText = jsondata.location.region + ", " + jsondata.location.country; 
    date.innerText = jsondata.location.localtime;  
    
    condition.innerText = jsondata.current.condition.text;
    conditionIcon.setAttribute("src", "https:" + jsondata.current.condition.icon);
    if(unit == 'M'){
        temperature.innerText = jsondata.current.temp_c + "\xB0" + "C";
        feelsLike.children[1].innerText = jsondata.current.feelslike_c + "\xB0" + "C";
        
        humidity.children[1].innerText = jsondata.current.humidity + "%";
        pressure.children[1].innerText = jsondata.current.pressure_mb + " mBar";
        precipitation.children[1].innerText = jsondata.current.precip_mm + " mm";
        visibility.children[1].innerText = jsondata.current.vis_km + " km";
        
        windSpeed.children[1].innerText = jsondata.current.wind_kph + " kph";
        windDirection.children[1].innerText = jsondata.current.wind_dir + "";
        windDegrees.children[1].innerText = jsondata.current.wind_degree + "\xB0";
    }
    else{
        temperature.innerText = jsondata.current.temp_f + "\xB0" + "F";
        feelsLike.children[1].innerText = jsondata.current.feelslike_f + "\xB0" + "F";
        
        humidity.children[1].innerText = jsondata.current.humidity + "%";
        pressure.children[1].innerText = jsondata.current.pressure_mb + " mBar";
        precipitation.children[1].innerText = jsondata.current.precip_in + " in";
        visibility.children[1].innerText = jsondata.current.vis_miles + " mi";
        
        windSpeed.children[1].innerText = jsondata.current.wind_mph + " mph";
        windDirection.children[1].innerText = jsondata.current.wind_dir + "";
        windDegrees.children[1].innerText = jsondata.current.wind_degree + "\xB0";
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
    APICall(city);
});

const search = document.getElementsByClassName('sicon')[0];


search.addEventListener('click', async () => {
    city = document.getElementById('search-box').value;
    APICall(city);
});
