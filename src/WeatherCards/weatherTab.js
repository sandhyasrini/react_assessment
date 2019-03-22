import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class WeatherTab extends Component {

    state = {
        curTime : new Date().toLocaleTimeString(),
        getDate : new Date().toDateString()
    }
  componentDidMount() {
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleTimeString()
      })
    },1000)
    console.log(this.state.getDate)
  }

    render()
    {
        let imgUrl = "http://openweathermap.org/img/w/" +  this.props.icon + ".png"
        return (

<Container style = {{
      background: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),transparent",
      width:"65%",
      textAlign:"left",
      paddingLeft:"4%"

}}>
  <Row>
    <Col style ={{paddingBottom:"5%"}}>     
           <div style = {{
               color:"white",
               fontWeight:"bolder",
               fontSize:"300%"
           }}> {this.props.data.name}</div>
            <div style = {{
                color:"#bbb",
                fontSize:"200%"
            }} >{this.props.weatherDesc}</div>
            </Col>
            <Col style ={{  textAlign:"right",}}><img src ={imgUrl}  alt="img" style = {{
                width:"25%",
                marginRight:"50%"
            }}/></Col>

            </Row>
            <Row>
            <Col>
            <div style = {
                {
                    textAlign:"left"
                }
            }>
                <div style = {{
               color:"white",
               fontSize:"300%"
           }}>Now</div>
                <div style= {{
                     color:"white",
                     fontWeight:"bolder",
                     fontSize:"400%"
                }}>{this.props.temp}<sup>&#8451;</sup></div></div>
            </Col>
                <Col  style = {{
               color:"white",
               fontSize:"180%",
               paddingTop:"4%",
               paddingRight:"6%",
               textAlign:"right",
             

           }}>
           <div  style = {{color:"#23E9C8" ,fontWeight:"bolder" , fontSize:"20px"}}>
           {this.state.curTime}</div>
           <div>{this.state.getDate} </div></Col>
            </Row>
</Container>
            
        )
    }
}

export default WeatherTab
