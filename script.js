/*let weather = {
	"apiKey": "eacb8ff0ee879d7417ac3a6ed0d4ac2f",
	
	fetchWeather: function(city){
		
		fetch("http://api.openweathermap.org/data/2.5/weather?q=denver&units=metric&APPID=" 
		+ this.apiKey)
		
		.then((response) => response.json())
		.then((data) => console.log(data));
			
	
	
		fetch("https://api.unsplash.com/search/photos/?query=london&client_id=YG-V5GvdSp574YtRJOsHSBEMJjug-7K3QlknWSuwcZw")
		.then((response) => response.json())
		.then((data) => console.log(data));
	}
	
};
*/

//Create object for storing the variables and functions for using the api
let weather = {
	"apiKey": "eacb8ff0ee879d7417ac3a6ed0d4ac2f",
	
	fetchWeather: function(city){
		
		fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=" + this.apiKey)
		.then((response) => response.json())
		.then((data) => this.displayWeather(data));	
		
		// get images based on city search from unsplash API
		fetch("https://api.unsplash.com/search/photos/?query=" + city + "&client_id=YG-V5GvdSp574YtRJOsHSBEMJjug-7K3QlknWSuwcZw")
		.then((response) => response.json())
		.then((data) => this.getImage(data));		
	},
	
	//function that takes in the weather api data 
	displayWeather: function(data){
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;	
						
		// get local time  https://stackoverflow.com/questions/60627245/openweather-api-time-always-in-my-local-time-zone#:~:text=Add%20the%20timezone%20to%20the%20time%20and%20then,%2A%201000%29%20You%20will%20get%20the%20local%20time
		const sunrise1 = new Date((data.sys.sunrise + data.timezone) * 1000 );  
		const sunset1 = new Date((data.sys.sunset + data.timezone) * 1000);
		
		let sunrise = sunrise1.toUTCString(); // https://www.w3schools.com/js/js_dates.asp
		let sunset = sunset1.toUTCString();  // convert to string so "time" can be extracted using substr *
		
		console.log(typeof sunrise1); //https://www.w3schools.com/JS//js_typeof.asp
		console.log(typeof sunrise);  

		console.log(name, icon, description, temp, humidity, speed, sunrise1, sunset1);
		document.querySelector(".city").innerText = "Weather in " + name;
		document.querySelector(".icon").src = " https://openweathermap.org/img/wn/" + icon + ".png"; //@2x
		document.querySelector(".description").innerText = description;
		document.querySelector(".temp").innerText = Math.round(temp) + "°C";
		document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
		document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
		document.querySelector(".sunrise").innerText = "Sunrise: " + sunrise.substr(17, 5);  // * https://www.w3schools.com/jsref/jsref_substr.asp
		document.querySelector(".sunset").innerText = "Sunset: " + sunset.substr(17, 5);
	},
		
	getImage: function(data){
		const { regular } = data.results[0].urls; 
		console.log(regular);
		document.body.style.backgroundImage = "url(" + regular + ")";  //display image based on city search
	},	
	
	search: function(){
		this.fetchWeather(document.querySelector(".search-bar").value);	
	}
};

	document.querySelector(".search button").addEventListener("click", function(){
		weather.search();
	});

	document.querySelector(".search-bar").addEventListener("keyup", function(event){
		if(event.key == "Enter"){
			weather.search();
		}
	});
