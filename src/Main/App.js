import React, { Component } from 'react';
import logo from '../logo.svg';
import WeatherWidget from '../WeatherWidget/index';
import Request from 'superagent';
import './App.css';


class App extends Component {

  
  state ={
    myWeatherObject : [],
    City:{}
}
  
  componentWillMount(){

    var url = "https://api.openweathermap.org/data/2.5/forecast?q=London&appid=70d8bfb74e35d57bf30beba273b1c277&units=metric"
    Request.get(url).then((response) => {
        let weater_by_day = {}
          response.body.list.forEach(element => {
              var ele = element.dt_txt.split(" ")[0].split("-")[2]
              if (!(ele in weater_by_day)) {
                  weater_by_day[ele] = [];
              }
              weater_by_day[ele].push(element);

          });
          this.setState({
            myWeatherObject: weater_by_day,
            City:response.body.city
        })  
      
    });
}
  render() {
    if(this.state.myWeatherObject.length === 0) 
    {
      return <div >Loading...</div>
    }
    else{
    return (
     
     <div>
       <div className="App">
          < div style = {{
            color:"white",
            fontWeight:"bolder",
               fontSize:"300%"
          }}>WEATHER WIDGET</div>
          <WeatherWidget className="container"  weatherData = {this.state.myWeatherObject} city= {this.state.City}/>
        
      </div>

      </div>

      
    );
  }
}
}

export default App;
