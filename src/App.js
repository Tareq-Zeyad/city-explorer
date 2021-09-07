import axios from 'axios';
import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './components/Weather';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lon: '',
      displayName: '',
      date: '',
      description:'',
      mapFlag: false,
      displayErr: false
    }
  }


  getLocationData = async (event) => {

    event.preventDefault();
    let cityName = event.target.cityName.value;
    // let keyAPI = process.env.REACT_KEY;
    // console.log(process.env.REACT_APP_LOCATION_IQ_KEY);
    let URl = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${cityName}&format=json`;

    let weatherURL = await axios.get(`http://localhost:3010/weather?searchQuery=${cityName}`)
    console.log(weatherURL.data);

    try {
      // axious : to send a request from the client side (browser) to the API server.
      let response = await axios.get(URl);
      console.log(response.data);

      this.setState({
        lat: response.data[0].lat,
        lon: response.data[0].lon,
        displayName: response.data[0].display_name,
        date: weatherURL.data[0].date,
        description: weatherURL.data[0].description,

        mapFlag: true,
      })
    }

    catch {
      console.log('error');
      this.setState({
        displayErr: true
      })
    }
  }


  render() {
    return (
      <>
        <Header className="Header" />
        <Form className="Form" onSubmit={this.getLocationData}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter City</Form.Label>
            <Form.Control name='cityName' type="text" placeholder="Enter City Name here" />
          </Form.Group>
          <Button type='submit'>Explore</Button>
        </Form>

        {/* Render the city data */}
        <p>Display Name: {this.state.displayName}</p>
        <p>Lat : {this.state.lat}</p>
        <p>Lon : {this.state.lon}</p>
        <p>Date : {this.state.date} </p>
        <p>Describtion : {this.state.description} </p>
      


        {this.state.mapFlag && <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center=${this.state.lat},${this.state.lon}`} alt='map' />}

        {this.state.displayErr && <p>Sorry some errors may occured</p>}

        <Footer />
      </>
    )
  }

}
export default App;