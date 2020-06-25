import React, { Component } from 'react';
import './App.css';
import MainPanel from './components/MainPanel';
import { Form, FormGroup, Input } from 'reactstrap';
import MapboxAutocomplete from 'react-mapbox-autocomplete';

const HeadLine = () => {
  return <h1 className="mt-4">What's the Weather Like ?</h1>;
}

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const Unsplash_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const Mapbox_KEY = process.env.REACT_APP_MAPBOX_KEY;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      city: '',
      weather: [],
      weatherType: '',
      weatherDescript: '',
      image: '',
      imageUrl: '',
      imageDescript: '',
      imageLocation: ''

    }

    this.handleChange = this.onSuggestionSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  
  onSuggestionSelect = (result, lat, lng, text) => {
    this.setState({city: text});
  };


  // handleChange(event) {
  //   this.setState({city: event.target.value});
  //   console.log("onchange", this.state.city);
  // }

  handleSubmit(event) {
    console.log("onSubmit", this.state.city);
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${WEATHER_API_KEY}`)
    .then(res => res.json())
    .then((data) => {
      this.setState({weather: data});
      this.setState({weatherType: this.state.weather.weather[0].main});
      this.setState({weatherDescript: this.state.weather.weather[0].description});
      console.log(this.state.weather);
      console.log(this.state.weatherType);
      console.log(this.state.weatherDescript);
      return fetch(`https://api.unsplash.com/photos/random?query=${this.state.weatherType},${this.state.city}&client_id=${Unsplash_ACCESS_KEY}`);
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({image: data});
      this.setState({imageUrl: this.state.image.urls.regular});
      this.setState({imageLocation: this.state.image.location.title})
      this.setState({imageDescript: this.state.image.alt_description})
      console.log(this.state.imageLocation);
      console.log(this.state.imageDescript);
    })
    .catch((err) => alert('Cannot find picture for the location'))
    
    event.preventDefault();
}

  imagePanel() {
    if (!this.state.imageUrl) {
      return null
    } else {
      return (
      <MainPanel 
          city={this.state.city}
          weatherType={this.state.weatherType} 
          weatherDescript={this.state.weatherDescript} 
          imageUrl={this.state.imageUrl} 
          imageLocation={this.state.imageLocation} 
          imageDescript={this.state.imageDescript}
         />
      )
    }

  }

  render() {

    return (
      <div className="App">
        <HeadLine /> 
        <Form className="container justify-content-center" inline onSubmit={this.handleSubmit}>
          <FormGroup>
              <MapboxAutocomplete 
                publicKey={Mapbox_KEY}
                inputClass='form-control search mr-2 mt-4'
                resetSearch={false} 
                onSuggestionSelect={this.onSuggestionSelect} 
              />
              <Input type="submit" value="Submit" />
          </FormGroup>
        </Form>
        {this.imagePanel()}
      </div>
    );
  }
}

export default App;
