import axios from 'axios';
import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lon: '',
      displayName: '',
      mapFlag: false,
      displayErr: false
    }
  }


  getLocationData = async (event) => {

    event.preventDefault();
    let cityName = event.target.cityName.value;
    // let keyAPI = 'pk.ecabd378ab96c0605c0417b2d7af1979';
    // let keyAPI = process.env.REACT_KEY;
    console.log(process.env.REACT_APP_LOCATION_IQ_KEY);
    let URl = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${cityName}&format=json`;

    try {
      // axious : to send a request from the client side (browser) to the API server.
      let response = await axios.get(URl);
      console.log(response.data);

      this.setState({
        lat: response.data[0].lat,
        lon: response.data[0].lon,
        displayName: response.data[0].display_name,
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
        <Header/>
        <form onSubmit={this.getLocationData}>
          <input type='text' name='cityName' placeholder='Enter City Name here' />
          <button type='submit'>Explore</button>
        </form>

        {/* Render the city data */}
        <p>DisplayName: {this.state.displayName}</p>
        <p>Lat : {this.state.lat}</p>
        <p>Lon : {this.state.lon}</p>

        {this.state.mapFlag && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.ecabd378ab96c0605c0417b2d7af1979&center=${this.state.lat},${this.state.lon}`} alt='map' />}

        {this.state.displayErr && <p>Sorry some errors may occured</p>}

        <Footer />

      </>
    )
  }

}
export default App;