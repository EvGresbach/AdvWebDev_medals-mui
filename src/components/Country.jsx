import React from "react";
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
const Country = (props) =>  {
 
    const getTotal = () => {
        return props.medals.reduce((a, b) => a + props.country[b.type + "MedalCount"], 0); 
    }
    
    const { classes } = props;
    const country = props.country;
    return(
        <Card className={classes.card}>            
            <CardContent>
                <div className={classes.countryName}>{country.name}</div> 
                <IconButton variant="outlined" onClick={() => props.onDelete(country.id)}><Delete/></IconButton>
                <Divider></Divider>
                {props.medals.map(medal => 
                <Medal 
                    key = {medal.id}
                    type = {medal.type}
                    value = {country[medal.type + "MedalCount"]}
                    increment = {() => props.increment(country.id, medal.type)}
                    decrement = {() => props.decrement(country.id, medal.type)}
                ></Medal>
            )}
                <span style={{"font-weight": "bold"}}>Total Medals: {getTotal()}</span>     
            </CardContent>
        </Card>
        
    );
}

export default withStyles(styles, { withTheme: true })(Country);