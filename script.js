//How the Code works?
    // 1. creating a main elemets to show the weather card
    // 2. getting country details and using this creating a 
    //     weather card for each countries with the countries details
    // 3. Then using event listener when the button in the weather card is clicked
    //     we will use the get the weather data for the country and add the data in
    //     element

//Main Elements
let container = document.createElement("main");
container.setAttribute("class","container")
document.body.appendChild(container);

let row = document.createElement("div");
row.setAttribute("class","row","gap-3")
container.appendChild(row);

//getting a Countries data using API
fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {

        //creating weather card for all the countries
        data.forEach((arr,index) => {
            const countryData = {
                countryName: arr.name.common,
                capital: arr.capital || "no data available",
                region: arr.region,
                flag: arr.flags.png,
                countryCode: arr.cca3,
                latIng: arr.latlng,
            }
            //calling weather card function
            cardCreate(countryData,data,index); 
        });
    })
    .catch((err) => console.log(err));


//Creating a weather card for each country
function cardCreate(ele,data,index){
    row.innerHTML += `
    <div class="col-lg-4 col-sm-12 col-md-6" id="country-card">
        <div class="card-content">
            <p class="country-name card-header"><span>${ele.countryName}</span></p> 
            <img src="${ele.flag}" alt="${ele.countryName}" class="image" loading="lazy">
            <div class="card-body">
                <p><span>Capital: ${ele.capital}</span></p> 
                <p><span>Region: ${ele.region}</span></p> 
                <p><span>Country Code: ${ele.countryCode}</span></p> 
                <button class="weather-btn btn btn-primary">Click for Weather</button>
                <p class="weather-data-${index}"></p> 
            </div>
        </div>
    </div>
    `;
    //getting a weather data for each countries
    getWeather(data);
}


//Function to get a weather data
function getWeather(data){
    let get = document.querySelectorAll(".btn");
    get.forEach((e,index) => {   
        e.addEventListener("click",() =>{
            let apiKey = "ad25de67d12562202ef4fcd4bb9a6ded";

            let lat = data[index].latlng[0];
            let lon = data[index].latlng[1];

            const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`; 
            fetch(apiURL)
                .then((weatherRes) => weatherRes.json())
                .then((weatherData) => {
                    //selecting a element to show the weather
                    let weatherShow = document.querySelector(`.weather-data-${index}`); 
                    weatherShow.innerHTML = `Temperature: ${weatherData.main.temp}°F<br>
                                            Humidity: ${weatherData.main.humidity}°F`;
                })
                .catch((err) => console.log(`Error in getting ind weather data:${err}`));
        })
    });
}