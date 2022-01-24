import React, {Component} from 'react';
import { Container } from '@mui/material';
import './App.css';
import Country from './components/Country';

class App extends Component{
  state = {
    countries: [
      { id: 1, name: 'United States', goldMedalCount: 2 },
      { id: 2, name: 'China', goldMedalCount: 3 },
      { id: 3, name: 'Germany', goldMedalCount: 0 },
    ]
  }

  render(){
    return (
      <div className="App">
        <Container>
          {this.state.countries.map(country =>
              <Country key={country.id}
                country = {country}
              />
            )}
        </Container>
      </div>
    )
  }
}

export default App;
