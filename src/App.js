import React, {Component} from 'react';
import { Avatar, AppBar, Container, Toolbar, Typography } from '@mui/material';
import './App.css';
import Country from './components/Country';
import NewCountry from './components/NewCountry';

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

  handleAddCountry = (name) => {
    let {countries} = this.state; 
    let id = countries.length === 0 ? 1 : Math.max(...countries.map(c => c.id)) + 1; 
    const mutableCountries = countries.concat({ id: id, name: name, gold: 0, silver: 0, bronze: 0},)
    this.setState({countries: mutableCountries}); 
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
        </Container>
        <NewCountry addCountry = {this.handleAddCountry}/>
      </div>
    )
  }
}

export default App;
