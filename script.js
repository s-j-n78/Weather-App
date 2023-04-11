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
		console.log(name, icon, description, temp, humidity, speed);
		document.querySelector(".city").innerText = "Weather in " + name;
		document.querySelector(".icon").src = " https://openweathermap.org/img/wn/" + icon + ".png"; //@2x
		document.querySelector(".description").innerText = description;
		document.querySelector(".temp").innerText = Math.round(temp) + "°C";
		document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
		document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
		
	},
		
	getImage: function(data){
		const { regular } = data.results[0].urls; 
		console.log(regular);
		document.body.style.backgroundImage = "url(" + regular + ")";
	},	
	
	search: function(){
		this.fetchWeather(document.querySelector(".search-bar").value);		
	}
		
};

	document
	.querySelector(".search button").addEventListener("click", function(){
		weather.search();
	});

	document.querySelector(".search-bar").addEventListener("keyup", function(event){
		if(event.key == "Enter"){
			weather.search();
		}
	});
