import React from "react";
import "./App.css";
import Weather from "./components/Weather/Weather";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import Form from "./components/Form/Form";
import imageSrc1 from './assets/background/01.jpg';
import imageSrc2 from './assets/background/02.jpg';
import imageSrc3 from './assets/background/03.jpg';
import imageSrc4 from './assets/background/04.jpg';
import imageSrc5 from './assets/background/05.jpg';
import imageSrc6 from './assets/background/06.jpg';
import imageSrc7 from './assets/background/07.jpg';


const weather_key = "571a1d47938adf930358178ee46b45b5";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      icon: undefined,
      image: undefined,
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
    this.weatherImages = {
      Thunderstorm: imageSrc1,
      Drizzle: imageSrc2,
      Rain: imageSrc3,
      Snow: imageSrc4,
      Atmosphere: imageSrc5,
      Clear: imageSrc6,
      Clouds: imageSrc7,
    };
  }

  getWeatherIconAndBackImage(weatherIcons, weatherImages, id) {
    switch (true) {
      case id >= 200 && id <= 232:
        this.setState({
          icon: weatherIcons.Thunderstorm,
          image: weatherImages.Thunderstorm,
        });
        break;
      case id >= 300 && id <= 321:
        this.setState({
          icon: weatherIcons.Drizzle,
          image: weatherImages.Drizzle,
        });
        break;
      case id >= 500 && id <= 531:
        this.setState({
          icon: weatherIcons.Rain,
          image: weatherImages.Rain,
        });
        break;
      case id >= 600 && id <= 622:
        this.setState({
          icon: weatherIcons.Snow,
          image: weatherImages.Snow,
        });
        break;
      case id >= 701 && id <= 781:
        this.setState({
          icon: weatherIcons.Atmosphere,
          image: weatherImages.Atmosphere,
        });
        break;
      case id == 800:
        this.setState({
          icon: weatherIcons.Clear,
          image: weatherImages.Clear,
        });
        break;
      case id >= 801 && id <= 804:
        this.setState({
          icon: weatherIcons.Clouds,
          image: weatherImages.Clouds,
        });
        break;
      default:
        this.setState({
          icon: weatherIcons.Clear,
          image: weatherImages.Clear,
        });
    }
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    try {
      if (city && country) {
        const api_call = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${weather_key}`
        );
        const response = await api_call.json();
        this.setState({
          city: `${response.name}, ${response.sys.country}`,
          celsius: this.calcCelsius(response.main.temp),
          temp_max: this.calcCelsius(response.main.temp_max),
          temp_min: this.calcCelsius(response.main.temp_min),
          description: response.weather[0].description,
          error: false,
        });
        this.getWeatherIconAndBackImage(
          this.weatherIcon,
          this.weatherImages,
          response.weather[0].id
        );
        document.body.style.backgroundImage = `url(${this.state.image})`;
      } else {
        this.setState({ error: true });
      }
    } catch (e) {
      this.setState({ error: true });
    }
  };
  calcCelsius(temp) {
    return Math.floor(temp - 273.15);
  }
  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather
          description={this.state.description}
          city={this.state.city}
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
