import React, {useState} from 'react';
import { Avatar, AppBar, Container, Toolbar, Typography } from '@mui/material';
import './App.css';
import Country from './components/Country';
import NewCountry from './components/NewCountry';

const App = () =>{
  const [countries, setCountries] = useState([
    { id: 1, name: 'United States', gold: 2, silver: 0, bronze: 3},
    { id: 2, name: 'China', gold: 3, silver: 5, bronze: 1},
    { id: 3, name: 'Germany', gold: 0, silver: 1, bronze: 7},
  ]); 
  const [medals, setMedals] = useState([
    {id: 1, type: "gold"}, 
    {id: 2, type: "silver"}, 
    {id: 3, type: "bronze"}
  ])
  
  const handleIncrement = (countryId, medalType) => {
    //get id
    const index = countries.findIndex(c => c.id === countryId);
    //create temporary array
    const mutableCountries = [...countries]; 
    //edit and save
    mutableCountries[index][medalType]++; 
    setCountries(mutableCountries); 
  }
  const handleDecrement = (countryId, medalType) => {
    //get id
    const index = countries.findIndex(c => c.id === countryId);
    //create temporary array
    const mutableCountries = [...countries]; 
    //edit and save
    mutableCountries[index][medalType]--; 
    setCountries(mutableCountries); 
  }

  const handleCountryDelete = (id) => {
    setCountries(countries.filter(c => c.id !== id));
  }

  const getTotalMedals = () => {
    return countries.reduce((a, b) => a + b.gold + b.silver + b.bronze, 0);
  }

  const handleAddCountry = (name) => {
    let id = countries.length === 0 ? 1 : Math.max(...countries.map(c => c.id)) + 1; 
    const mutableCountries = countries.concat({ id: id, name: name, gold: 0, silver: 0, bronze: 0},)
    setCountries(mutableCountries); 
    }

    return (
      <div className="App">
        <AppBar>
          <Toolbar>
            <Typography variant="h4">Olympic Medals</Typography>    
            <Avatar style={{"display": 'inline-flex'}} >{getTotalMedals()}</Avatar>
          </Toolbar>
        </AppBar>
        <Container>
        
          {countries.map(country =>
              <Country key={country.id}
                country = {country}
                medals = {medals}
                increment = {handleIncrement}
                decrement = {handleDecrement}
                onDelete = {handleCountryDelete}
              />
            )}
        </Container>
        <NewCountry addCountry = {handleAddCountry}/>
      </div>
    )
}

export default App;
