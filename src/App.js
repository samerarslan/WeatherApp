import React, { Component } from "react";
import Weather from './components/Weather'
import Form from './components/Form'

const API_KEY = "b5b9a48d6315a109e4f7cba0e75628b2";

class App extends Component {

  state = {
    tempreature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    error: ''
  }

  getWeather = async (e) => {
    e.preventDefault();
    
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}egypt&appid=${API_KEY}`);

    const data = await api.json();
    console.log(data.cod)
    if(city && country && data.cod !== '404') {
      this.setState ({
        tempreature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
      })
    }
    else {
      this.setState ({
        tempreature: '',
        city: '',
        country: '',
        humidity: '',
        description: '',
        error: 'Please Enter Data'
      })
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form-container">
          <Form getWeather={this.getWeather}/>
          <Weather 
            tempreature= {this.state.tempreature}
            city= {this.state.city}
            country= {this.state.country}
            humidity= {this.state.humidity}
            description= {this.state.description}
            error= {this.state.error} />
          </div>
      </div>
    );
  }
}

export default App;
