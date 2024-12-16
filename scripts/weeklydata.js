var contentList = [];

for(let i = 0; i < 7; i++){
    // Content
    var content = document.createElement('div');
    content.classList.add('hidden');
    content.classList.add('content');
    content.id = 'content-' + i;


    // City Details
    var cityDetails = document.createElement('div');
    cityDetails.id = 'city-details-' + i;
    cityDetails.classList.add('city-details');

    var cName = document.createElement('div');
    cName.classList.add('name');
    cName.id = 'name-' + i;
    var region = document.createElement('div');
    region.classList.add('region');
    region.id = 'region-' + i;
    var date = document.createElement('div');
    date.classList.add('date');
    date.id = 'date-' + i;

    cityDetails.appendChild(cName);
    cityDetails.appendChild(region);
    cityDetails.appendChild(date);

    content.appendChild(cityDetails);


    // Weather
    var weather = document.createElement('div');
    cName.classList.add('weather');
    cName.id = 'weather-' + i;
        
}