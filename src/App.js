import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Avatar, AppBar, Container, Toolbar, Typography } from '@mui/material';
import './App.css';
import Country from './components/Country';
import NewCountry from './components/NewCountry';

const App = () =>{
  const apiEndpoint = "https://medals-api-eg.azurewebsites.net/api/country";

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
  
  const handleAddCountry = async (name) => {
    const { data: post } = await axios.post(apiEndpoint, { name: name });
    setCountries(countries.concat(post));
  }

  const handleCountryDelete = async (id) => {
    const originalCountries = countries;
    setCountries(countries.filter(c => c.id !== countryId));
    try {
      await axios.delete(`${apiEndpoint}/${countryId}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        // country already deleted
        console.log("The record does not exist - it may have already been deleted");
      } else { 
        alert('An error occurred while deleting');
        setCountries(originalCountries);
      }
    }
  }
  
  const handleIncrement = (countryId, medalName) => handleUpdate(countryId, medalName, 1);
  const handleDecrement = (countryId, medalName) =>  handleUpdate(countryId, medalName, -1);
  const handleUpdate = async (countryId, medalName, factor) => {
    const idx = countries.findIndex(c => c.id === countryId);
    const mutableCountries = [...countries ];
    mutableCountries[idx][medalName] += (1 * factor);
    setCountries(mutableCountries);
    const jsonPatch = [{ op: "replace", path: medalName, value: mutableCountries[idx][medalName] }];
    console.log(`json patch for id: ${countryId}: ${JSON.stringify(jsonPatch)}`);

    try {
      await axios.patch(`${apiEndpoint}/${countryId}`, jsonPatch);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        // country already deleted
        console.log("The record does not exist - it may have already been deleted");
      } else { 
        alert('An error occurred while updating');
        setCountries(originalCountries);
      }
    }
  }

  const getTotalMedals = () => {
    return countries.reduce((a, b) => a + b.goldMedalCount + b.silverMedalCount + b.bronzeMedalCount, 0);
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
