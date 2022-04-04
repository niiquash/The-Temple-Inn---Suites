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
const apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=39.0458&lon=76.6413&exclude=hourly&units=imperial&appid=c515a57b84161fb3f31f685e290f0729";
//   "https://api.openweathermap.org/data/2.5/weather?q=Bethesda,us&units=imperial&appid=c515a57b84161fb3f31f685e290f0729";

// Convert api data to json object
fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        weather(jsObject);
        getWindChill(jsObject);
        createForecast(jsObject);
    });

// The weather function utilises the json object to get and display items on the screen
function weather(jsObject) {
    document.querySelector('#weather-temp').textContent  = jsObject.current.temp;
    // const iconsrc = `http://openweathermap.org/img/w/${jsObject.weather[0].icon}.png`;
    const desc = jsObject.current.weather[0].description;

    // Send json data to html dom
    // document.querySelector('#weather-icon').setAttribute('src', iconsrc);
    // document.querySelector('#weather-icon').setAttribute('alt', desc);
    // document.querySelector('figcaption').textContent = desc;
    document.querySelector('#wind-speed').textContent = jsObject.current.wind_speed;
}

// Calculate the windchill
function getWindChill(jsObject) {
    let temperature = jsObject.current.temp;
    let windspeed = jsObject.current.wind_speed;
    let windChill = document.querySelector('#wind-chill');

    if (temperature > 50 || windspeed < 3) {
        windChill.textContent = "N/A"
    } else {
        let chill = Math.round(35.74 + (0.6215 * temperature)-(35.75 * Math.pow(windspeed,0.16)) + (0.4275*temperature*Math.pow(windspeed,0.16)));
        windChill.textContent = `${chill}°F`
    }
}

// Weather forecast table
function createForecast(jsObject) {
    const list = jsObject.daily;

    let threeDays = [];
    let d = new Date().getDay();
    console.log(d);
    for (let i = 0; i < 3; i++) {
        threeDays.push(list[i]);
        console.log(threeDays);
    }

    // Convert number weekday to noun weekday
    function toDate(dt) {
        const miliseconds = dt * 1000;
        const dateObject = new Date(miliseconds);
        const weekDay = dateObject.toLocaleDateString("default", {
            weekday: "short"
        });
        return weekDay;
    }

    console.log(toDate(jsObject.daily[1].dt));

    // Update the dom with html values via id's
    document.querySelector("#day-1").textContent = toDate(threeDays[0].dt);
    document.querySelector("#day-2").textContent = toDate(threeDays[1].dt);
    document.querySelector("#day-3").textContent = toDate(threeDays[2].dt);

    const imageLink = "https://openweathermap.org/img/w/";
    document.querySelector("#image-1").setAttribute("src", `${imageLink}${threeDays[0].weather[0].icon}.png`);
    document.querySelector("#image-2").setAttribute("src", `${imageLink}${threeDays[1].weather[0].icon}.png`);
    document.querySelector("#image-3").setAttribute("src", `${imageLink}${threeDays[2].weather[0].icon}.png`);

    document.querySelector("#image-1").setAttribute("alt", threeDays[0].weather[0].description);
    document.querySelector("#image-2").setAttribute("alt", threeDays[1].weather[0].description);
    document.querySelector("#image-3").setAttribute("alt", threeDays[2].weather[0].description);

    document.querySelector("#temp-1").textContent = `${threeDays[0].temp.day}°F`;
    document.querySelector("#temp-2").textContent = `${threeDays[1].temp.day}°F`;
    document.querySelector("#temp-3").textContent = `${threeDays[2].temp.day}°F`;

    document.querySelector("#description-1").textContent = `${threeDays[0].weather[0].description}`;
    document.querySelector("#description-2").textContent = `${threeDays[1].weather[0].description}`;
    document.querySelector("#description-3").textContent = `${threeDays[2].weather[0].description}`;
}





