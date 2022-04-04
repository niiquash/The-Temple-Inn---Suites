// Display menu on button click
function toggleMenu() {
  document.getElementById("main-nav").classList.toggle("open");
}

// Adding a button event listener to nav button
const navBtn = document.getElementById("nav-btn");
navBtn.onclick = toggleMenu;

// Display Today's date to the user
const options = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};
document.getElementById("today-date").innerHTML = new Date().toLocaleDateString(
  "en-US",
  options
);

// Weather Section for the Home Page
// Make a call to a weather api
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?q=Rexburg,us&units=imperial&appid=c515a57b84161fb3f31f685e290f0729";

// Convert api data to json object
fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        weather(jsObject);
        getWindChill(jsObject);
    });

// The weather function utilises the json object to get and display items on the screen
function weather(jsObject) {
    document.querySelector('#weather-temp').textContent  = jsObject.main.temp;
    const iconsrc = `http://openweathermap.org/img/w/${jsObject.weather[0].icon}.png`;
    const desc = jsObject.weather[0].description;

    // Send json data to html dom
    document.querySelector('#weather-icon').setAttribute('src', iconsrc);
    document.querySelector('#weather-icon').setAttribute('alt', desc);
    document.querySelector('figcaption').textContent = desc;
    document.querySelector('#wind-speed').textContent = jsObject.wind.speed;
}

// Calculate the windchill
function getWindChill(jsObject) {
    let temperature = jsObject.main.temp;
    let windspeed = jsObject.wind.speed;
    let windChill = document.querySelector('#wind-chill');

    if (temperature > 50 || windspeed < 3) {
        windChill.textContent = "N/A"
    } else {
        let chill = Math.round(35.74 + (0.6215 * temperature)-(35.75 * Math.pow(windspeed,0.16)) + (0.4275*temperature*Math.pow(windspeed,0.16)));
        windChill.textContent = `${chill}°F`
    }
}