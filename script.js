let city_name;
let lat,lon,country_code,population;

function capitalizeFirstLetter(str) {
  if (!str) return ""; 
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function GetTemperature(latitude, longitude) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`)

    .then(response => {
        if (!response.ok) {
            alert("No weather dat exists for this city.")
            throw new Error("No information available for this city.")
        }
        return response.json();
    })    
    .then(data => {
        const temperature = data.current.temperature_2m;
        console.log(temperature);
        document.getElementById("weather").textContent = `The temperature of ${city_name} is ${temperature} °C`
    })
    .catch((error) => {
        console.error("Error: ", error);
        alert("SNo data exists for this city1");
    })
}

function GetCoords(user_city) {
    fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + user_city)

    .then(response => {
        if (!response.ok) {
            alert("Invalid City name! No such city exists.")
            throw new Error("Invalid City name!");   
        }
        return response.json();
    })
    .then(data => {
        lat = data.results[0].latitude;
        lon = data.results[0].longitude;

        population = data.results[0].population;
        country_code = data.results[0].country;
        document.getElementById("coords").textContent = `The coordinates of ${user_city} are: ${lat}, ${lon}`;
        document.getElementById("country_code").textContent = `The country in which ${user_city} is in is: ${country_code}`
        document.getElementById("population").textContent = `Population: ${population}`
        GetTemperature(lat,lon);
    })
    .catch((error) => {
            console.error("Error:", error);
            alert("No city contains this name!");
    });
}

function SubmitData() {
    document.getElementById("coords").textContent = "";
    document.getElementById("weather").textContent = "";
    document.getElementById("country_code").textContent = "";
    document.getElementById("population").textContent = "";
    city_name = capitalizeFirstLetter(document.getElementById("city").value);
    GetCoords(city_name);
}
