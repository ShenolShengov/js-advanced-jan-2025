const urls = {
    locations: 'http://localhost:3030/jsonstore/forecaster/locations',
    today: 'http://localhost:3030/jsonstore/forecaster/today/',
    upcoming: 'http://localhost:3030/jsonstore/forecaster/upcoming/'

}

const html = {
    locationInput: document.querySelector('#location'),
    submitBtn: document.querySelector('#submit'),
    forecast: document.querySelector('#forecast'),
    current: document.querySelector('#current'),
    upcoming: document.querySelector('#upcoming')
};

const assing = (el, properties) => Object.assign(el, properties);


const weathersSymbols = {
    Sunny: '&#x2600;', // ☀,
    'Partly sunny': '&#x26C5', // ⛅,
    Overcast: '&#x2601;', // ☁
    Rain: '&#x2614;', //☂
};

function attachEvents() {
    html.submitBtn.addEventListener('click', getWeatherHandler);
}

function getWeatherHandler() {
    html.forecast.style.display = 'block';
    const locationName = html.locationInput.value;
    fetch(urls.locations)
        .then(r => r.json())
        .then(locations => findLocation(locationName, locations))
        .then(l => {
            fetchTodayWeather(l);
            fetchUpcomingWeather(l)
        })
        .catch(showError);
}


function fetchUpcomingWeather(location) {
    const {code} = location;
    fetch(urls.upcoming + code)
        .then(r => r.json())
        .then(d => d.forecast)
        .then(showUpcomingWeather);
}

function showUpcomingWeather(forecasts) {
    const forecastsInfo = document.createElement('div');
    assing(forecastsInfo, {className: 'forecast-info'});


    forecastsInfo.append(...forecasts.map(toUpcomingWeatherElement));
    html.upcoming.append(forecastsInfo);
}

function toUpcomingWeatherElement(forecast) {
    const upcomingEl = document.createElement('div');
    assing(upcomingEl, {className: 'upcoming'});

    const symbolSpan = document.createElement('div');
    assing(symbolSpan, {className: 'symbol', innerHTML: weathersSymbols[forecast.condition]});

    const tempSpan = document.createElement('span');
    const {low, high, condition} = forecast;
    assing(tempSpan, {className: 'forecast-data', textContent: `${low}°/${high}°`});

    const conditionSpan = document.createElement('span');
    assing(conditionSpan, {className: 'forecast-data', textContent: condition});

    upcomingEl.append(symbolSpan, tempSpan, conditionSpan);
    return upcomingEl;

}


function fetchTodayWeather(location) {
    const {name, code } = location;
    fetch(urls.today + code)
        .then(r => r.json())
        .then(showTodayWeather);
}

function showTodayWeather(data) {
    const {name, forecast} = data;

    const forecastEl = document.createElement('div');
    assing(forecastEl, {className: 'forecasts'});

    const conditionSymbolEl = document.createElement('span');
    assing(conditionSymbolEl, {className: 'condition symbol', innerHTML: weathersSymbols[forecast.condition]});


    const weatherEl = document.createElement('div');
    assing(weatherEl, {className: 'condition'});

    const forecastDataClass = 'forecast-data';
    
    const nameSpan = document.createElement('span');
    assing(nameSpan, {className: forecastDataClass, textContent: name});

    const tempSpan = document.createElement('span');
    const {low, high, condition} = forecast;
    assing(tempSpan, {className: forecastDataClass, textContent: `${low}°/${high}°`});

    const conditionSpan = document.createElement('span');
    assing(conditionSpan, {className: forecastDataClass, textContent: condition});

    weatherEl.append(nameSpan, tempSpan, conditionSpan);
    forecastEl.append(conditionSymbolEl, weatherEl);
    html.current.append(forecastEl);

}

function findLocation(name, locations) {
    const found = locations.find(l => l.name == name);
    if(!found) throw new Error("Location " + location + " is not found!");
    return found;
}

function showError() {
    html.forecast.textContent = 'Error';
}


attachEvents();