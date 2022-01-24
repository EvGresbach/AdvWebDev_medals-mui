import React, {Component} from 'react';
import { Container, Button } from '@mui/material';
import './App.css';
import Country from './components/Country';

class App extends Component{
  state = {
    countries: [
      { id: 1, name: 'United States', goldMedalCount: 2 },
      { id: 2, name: 'China', goldMedalCount: 3 },
      { id: 3, name: 'Germany', goldMedalCount: 0 },
    ],
    randomCountryNames: [
      "Iceland", "Tuvalu", "Israel", "Estonia", "Saint Lucia", "Mayotte"
    ]
  }

  handleCountryDelete = (id) => {
    this.setState({countries: this.state.countries.filter(c => c.id !== id)})
  }
  addCountry = () => {
    console.log(this.state.randomCountryNames.length)
    if(this.state.randomCountryNames.length > 0){
      //generate random for name and gold medal count
      let rnd = Math.floor(Math.random() * this.state.randomCountryNames.length);
      let name = this.state.randomCountryNames[rnd];
      let id = Math.max.apply(Math, this.state.countries.map(c => c.id)) + 1; 

      //remove name to prevent duplicates
      this.setState({randomCountryNames: this.state.randomCountryNames.filter(n => n !== name)})

      //add to countries
      var countries = this.state.countries; 
      countries.push({id: id, name: name, goldMedalCount: rnd });
      this.setState({countries: countries}); 
    }
  }

  render(){
    return (
      <div className="App">
        <Container>
          {this.state.countries.map(country =>
              <Country key={country.id}
                country = {country}
                onDelete = {this.handleCountryDelete}
              />
            )}
            <Button variant="contained" onClick={this.addCountry} disabled={this.state.randomCountryNames.length === 0}>Add Random Country</Button>
        </Container>
      </div>
    )
  }
}

export default App;
