import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Avatar, AppBar, Container, Toolbar, Typography } from '@mui/material';
import './App.css';
import Country from './components/Country';
import NewCountry from './components/NewCountry';

const App = () =>{
  const [countries, setCountries] = useState([]); 

  const [medals] = useState([
    {id: 1, type: "gold"}, 
    {id: 2, type: "silver"}, 
    {id: 3, type: "bronze"}
  ])
  useEffect(() => {
    async function fetchData(){
      const{data: fetchedCountries} = await axios.get(apiEndpoint); 
      setCountries(fetchedCountries); 
    }
    fetchData(); 
  })
  const apiEndpoint = "https://medals-api-eg.azurewebsites.net/api/country";

  
  const handleIncrement = (countryId, medalType) => {
    //get id
    const index = countries.findIndex(c => c.id === countryId);
    //create temporary array
    const mutableCountries = [...countries]; 
    //edit and save
    mutableCountries[index][medalType + "MedalCount"]++; 
    setCountries(mutableCountries); 
  }
  const handleDecrement = (countryId, medalType) => {
    //get id
    const index = countries.findIndex(c => c.id === countryId);
    //create temporary array
    const mutableCountries = [...countries]; 
    //edit and save
    mutableCountries[index][medalType + "MedalCount"]--; 
    setCountries(mutableCountries); 
  }

  const handleCountryDelete = async (id) => {
    var origCountries = countries; 
    setCountries(countries.filter(c => c.id !== countryId));
    try{
      await axios.delete(`${apiEndpoint}/${countryId}`); 
    } catch (e) {
      if(e.response && e.response.status === 404){
        console.log("Thiss record does not exist - it may have been deleted")
      } else{
        alert('An error occurred while deleted a country')
        setCountries(origCountries); 
      }
    }
  }

  const getTotalMedals = () => {
    return countries.reduce((a, b) => a + b.gold + b.silver + b.bronze, 0);
  }

  const handleAddCountry = async (name) => {
    let id = countries.length === 0 ? 1 : Math.max(...countries.map(c => c.id)) + 1; 
    const {data: post} = await axios.post(apiEndpoint, { id: id, name: name, gold: 0, silver: 0, bronze: 0}); 

    setCountries(countries.concat(post));
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
