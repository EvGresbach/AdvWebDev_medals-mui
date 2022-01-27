import React, {Component} from 'react';
import { Avatar, AppBar, Container, Button, Toolbar, Typography } from '@mui/material';
import './App.css';
import Country from './components/Country';

class App extends Component{
  state = {
    countries: [
      { id: 1, name: 'United States', gold: 2, silver: 0, bronze: 3},
      { id: 2, name: 'China', gold: 3, silver: 5, bronze: 1},
      { id: 3, name: 'Germany', gold: 0, silver: 1, bronze: 7},
    ],

    medals: [
      {id: 1, type: "gold"}, 
      {id: 2, type: "silver"}, 
      {id: 3, type: "bronze"}
    ],

    randomCountryNames: [
      "Iceland", "Tuvalu", "Israel", "Estonia", "Saint Lucia", "Mayotte"
    ],

  }

  handleIncrement = (countryId, medalType) => {
    //get id
    const index = this.state.countries.findIndex(c => c.id === countryId);
    //create temporary array
    const countries = [...this.state.countries]; 
    //edit and save
    countries[index][medalType]++; 
    this.setState({countries: countries});
  }
  handleDecrement = (countryId, medalType) => {
    //get id
    const index = this.state.countries.findIndex(c => c.id === countryId);
    //create temporary array
    const countries = [...this.state.countries]; 
    //edit and save
    countries[index][medalType]--; 
    this.setState({countries: countries});
  }

  handleCountryDelete = (id) => {
    this.setState({countries: this.state.countries.filter(c => c.id !== id)})
  }

  getTotalMedals(){
    return this.state.countries.reduce((a, b) => a + b.gold + b.silver + b.bronze, 0);
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
      countries.push({id: id, name: name, gold: rnd, silver: ++rnd, bronze: --rnd });
      this.setState({countries: countries}); 

    }
  }

  render(){
    return (
      <div className="App">
        <AppBar>
          <Toolbar>
            <Typography variant="h4">Olympic Medals</Typography>    
            <Avatar style={{"display": 'inline-flex'}} >{this.getTotalMedals()}</Avatar>
          </Toolbar>
        </AppBar>
        <Container>
          {this.state.countries.map(country =>
              <Country key={country.id}
                country = {country}
                medals = {this.state.medals}
                increment = {this.handleIncrement}
                decrement = {this.handleDecrement}
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
