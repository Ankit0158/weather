const appKey = "f30a1f1b1e86a304259db541732c1cb8";
window.addEventListener("load", function() {
    document.getElementById("city").addEventListener("keyup", checkWeather);
});

function checkWeather() {
    event.preventDefault();
    if (event.keyCode === 13) {
        cityName = document.getElementById("city").value;
        var searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + appKey;
        httpRequestAsync(searchLink, theResponse);
                document.getElementById("city").value = "";
    }
}

function httpRequestAsync(url, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            callback(httpRequest.responseText);
        } else if (httpRequest.status == 404) {
            error(httpRequest.responseText);
        }
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function theResponse(response) {
    var jsonObject = JSON.parse(response);
    var city = document.getElementById("cityName");
    var icon = document.createElement("img");
    icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    var temperature = document.getElementById("temp");
    city.innerHTML = jsonObject.name;
    city.appendChild(icon);
    temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°";
    document.getElementById("city").value = "";
}

function error(response) {
    var jsonObject = JSON.parse(response);
    var city = document.getElementById("cityName");
    var temperature = document.getElementById("temp");
    city.innerHTML = jsonObject.message;
    temperature.innerHTML = "☹";
}