import React, {Component} from 'react';
import WeatherTab from '../WeatherCards/weatherTab'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './weather.css'
import map from 'lodash/map';
import { WiCloudyWindy ,WiCloudy ,WiDaySunny } from "react-icons/wi";



class WeatherWidget extends Component {

    state = {
        myWeatherObject: [],
        name :{}
    }

     weater_by_day = {};

    componentDidMount() {
        let today = new Date().getDate();
        console.log(this.props.weatherData[today])
        this.setState({
            currentWeather:this.props.weatherData[today],
            productId:today,
            myWeatherObject: this.props.weatherData,
            name:this.props.city,
            description:this.props.weatherData[today][0].weather[0].description,
            temp:this.props.weatherData[today][0].main.temp,
            icon:this.props.weatherData[today][0].weather[0].icon,
        })
    }

     timeConvert  = (time)  => {
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        let suffix , mytime
        if (time.length > 1) { 
          time = time.slice (1);
           suffix = +time[0] < 12 ? 'AM' : 'PM'; 
           mytime = +time[0] % 12 || 12;
        }
        return mytime + " "+ suffix; 
      }



    addStyle = (id) => {
        console.log(id)
        this.setState({
            productId:id,
            currentWeather:this.props.weatherData[id],

        })

    }

    getTabName = (product) => {
        let today = new Date().getDate();
        if(product == today)
        return "Today"
        if(product == today + 1)
        return "Tomorrow"
        else 
        return product
    }
    render() {
        let today = new Date().getDate();
        let DateArr = Object.keys(this.state.myWeatherObject)
        return (

            <div style= {{marginTop:"2%"}}>
                <WeatherTab weatherDesc={this.state.description} data = {this.state.name} temp = {this.state.temp} icon = {this.state.icon}/>
                <Container style={{width:"65%"
                }}>
                    <Row>
                        <Col style = {{
                              background:"linear-gradient(rgba(59, 249, 223, 0.4), rgba(59, 249, 223, 0.4)),transparent",
                        }}>
                        <Row>
                            <Col  className= "percentStyle"><div>Wind</div>{ this.state.currentWeather && this.state.currentWeather[0].wind.speed } km/hr</Col>
                            <Col className= "iconStyle"><WiCloudyWindy /></Col> 
                            </Row>
                        <Row>
                        <Col  className= "percentStyle"><div>Cloud</div>{ this.state.currentWeather && this.state.currentWeather[0].clouds.all } %</Col>
                            <Col className= "iconStyle"><WiCloudy /></Col>
                        </Row>
                        <Row>
                        <Col  className= "percentStyle"><div>Avg.Temp </div>{ this.state.currentWeather && this.state.currentWeather[0].main.temp }&#8451;</Col>
                            <Col className= "iconStyle"><WiDaySunny /></Col>
                        </Row>

                        </Col>
                        <Col xs={7} style = {{
                            background: "linear-gradient(rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0.5)),transparent",
                            height:"340px",
                            overflow: "hidden",
                            fontFamily:"Raleway"

                        }}>
                            <Row>
                            {map(DateArr, (product)=> (
                         <Col key = {product} id = {product} onClick = {() => this.addStyle(product)} className = {this.state.productId == product ? "day" : "normal" }>
                         {this.getTabName(product)}
                         </Col>

                             ))}
                           
                            </Row>
                            <div className="dailyDetails">
                                {map(this.state.currentWeather, (data)=> (
                                    <Row className="dailyDetails">
                                    <Col>{this.timeConvert(data.dt_txt.split(" ")[1])}</Col>
                                    <Col>
                                    <div>{data.main.temp}</div>
                                    {data.weather[0].description}</Col>
                                    </Row>
                                ))}
                                </div>
                            
                            
                        </Col>
                        </Row>
                        
                    </Container>
             </div>
        )
    }
}

export default WeatherWidget;