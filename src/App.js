import React from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import Navbar from './components/Navbar';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      forecast: [],
    }
  }

  getWeather() {
    const key = "f174dce301ae0f8a949ee0c5afe9fbad";
    const city = "Toronto";
    let tempforecast = [];

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Not successful");
        }
      })
      .then((result) => {
        let temp = Math.round(result.main.temp);
        let condition = result.weather[0].main.toLowerCase();
        let wind = Math.round(result.wind.speed * 3.6);
        tempforecast.push({ date: null, temp: temp, condition: condition, wind: wind });
      })

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Not successful");
        }
      })
      .then((result) => {
        for (let i = 0; i < 4; i++) {
          let index = (i * 8) + 5;
          let date = result.list[index].dt_txt;
          let temp = Math.round(result.list[index].main.temp)
          let condition = result.list[index].weather[0].main.toLowerCase();
          let pop = result.list[index].pop * 100;
          let wind = Math.round(result.list[index].wind.speed * 3.6);

          tempforecast.push({ date: date, temp: temp, condition: condition, pop: pop, wind: wind })
        }
        this.setState({
          forecast: tempforecast
        });

        // setCondition(result.list[0].weather[0].main.toLowerCase());
      })
  }

  componentDidMount() {
    this.getWeather();
  }


  render() {
    return (
      <div className="App">
        <Navbar />
        {this.state.forecast.map((day, index) =>
          <WeatherCard
            key={index}
            date={day.date}
            temp={day.temp}
            condition={day.condition}
            pop={(day.pop >= 0) ? day.pop :
              (day.condition === "rain" || day.condition === "thunderstorm" || day.condition === "drizzle")
                ? "Rain today" : "No rain today"}
            wind={day.wind}
          />)}

      </div>
    );
  }
}


export default App;

