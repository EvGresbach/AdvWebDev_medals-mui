import React, { Component } from "react";
import { Button, Card, CardContent, CardHeader } from "@mui/material"
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
            <Card>
                <div className="country">
                    <CardContent className="medals">
                        {this.state.name}
                        Gold Medals: {this.state.gold} 
                        <Button variant="contained" size="small" className="increment" onClick={this.handleIncrement} >+</Button>
                    </CardContent>
                </div>
            </Card>
            
        );
    }
}

export default Country; 