import React from "react";
import "./App.css";
import Weather from "./components/Weather/Weather";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";

const weather_key = "571a1d47938adf930358178ee46b45b5";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }
  componentDidMount() {
    this.getWeather();
  }

  getWeatherIcon(weatherIcons, id) {
    switch(true) {
      case id >= 200 && id <= 232:
        return weatherIcons.Thunderstorm;
      case id >= 300 && id <= 321:
        return weatherIcons.Drizzle;
      case id >= 500 && id <= 531:
        return weatherIcons.Rain;
      case id >= 600 && id <= 622:
        return weatherIcons.Snow;
      case id >= 701 && id <= 781:
        return weatherIcons.Atmosphere;
      case id == 800:
        return weatherIcons.Clear;
      case id >= 801 && id <= 804:
        return weatherIcons.Clouds;   
      default:
        return weatherIcons.Clear;                             
    }
  }

  getWeather = async function () {
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${weather_key}`
    );
    const response = await api_call.json();
    this.setState({
      city: response.name,
      country: response.sys.country,
      celsius: this.calcCelsius(response.main.temp),
      temp_max: this.calcCelsius(response.main.temp_max),
      temp_min: this.calcCelsius(response.main.temp_min),
      description: response.weather[0].description,
      icon: this.getWeatherIcon(this.weatherIcon, response.weather[0].id),
    });
    console.log(response);
  };
  calcCelsius(temp) {
    return Math.floor(temp-273.15);
  }
  render() {
    return (
      <div className="App">
        <Weather
          description={this.state.description}
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
