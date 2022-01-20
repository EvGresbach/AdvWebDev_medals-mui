import React, { Component } from "react";
import App from "../App";
class Country extends Component {
    state = {
        name: 'US', 
        gold: 0,
    }

    handleIncrement = () => {
        
        this.setState({gold: this.state.gold + 1}); 
    
    }

    render() {
        return(
            <div className="country">
                <div className="name">{this.state.name}</div>
                <div className="medals">
                    Gold Medals: {this.state.gold} 
                    <button id="increment" onClick={this.handleIncrement} >+</button>
                </div>
                
            </div>
        );
    }
}

export default Country; 