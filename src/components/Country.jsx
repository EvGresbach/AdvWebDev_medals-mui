import React, { Component } from "react";
import { IconButton, Card, CardContent, Divider } from "@mui/material"
import { Delete} from "@mui/icons-material";
import { withStyles } from "@mui/styles";

import Medal from "./Medal";

const styles = {
    card: {
        marginTop: '5%',
        margin: 'auto',
        width: "35%"
    }, 
    
    countryName: {
        fontSize: '2em',
        marginBottom: '.auto',
        display: 'inline-flex'
    },
}
class Country extends Component {
 
    getTotal(){
        return this.props.medals.reduce((a, b) => a + this.props.country[b.type], 0); 
    }
    
    render() {
        const { classes } = this.props;
        const country = this.props.country;
        return(
            <Card className={classes.card}>            
                <CardContent>
                    <div className={classes.countryName}>{country.name}</div> 
                    <IconButton variant="outlined" onClick={() => this.props.onDelete(country.id)}><Delete/></IconButton>
                    <Divider></Divider>
                    {this.props.medals.map(medal => 
                    <Medal 
                        key = {medal.id}
                        type = {medal.type}
                        value = {country[medal.type]}
                        increment = {() => this.props.increment(country.id, medal.type)}
                        decrement = {() => this.props.decrement(country.id, medal.type)}
                    ></Medal>
                )}
                 <span style={{"font-weight": "bold"}}>Total Medals: {this.getTotal()}</span>     
                </CardContent>
            </Card>
            
        );
    }
}

export default withStyles(styles, { withTheme: true })(Country);