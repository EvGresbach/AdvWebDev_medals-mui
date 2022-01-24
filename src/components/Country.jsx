import React, { Component } from "react";
import { Avatar, Button, Card, CardContent, CardActions, Divider, IconButton } from "@mui/material"
import { withStyles } from "@mui/styles";
import { AddCircle, RemoveCircle } from "@mui/icons-material"

const styles = {
    card: {
        marginTop: '5%',
        margin: 'auto',
        width: "35%"
    }, 
    medals: {
        backgroundColor: "gold", 
        color: 'black',
        display: 'inline-flex'
    },
    countryName: {
        fontSize: '2em',
        marginBottom: '.auto'
    }
}
class Country extends Component {
    state = {
        name: this.props.country.name, 
        gold: this.props.country.goldMedalCount,
        id: this.props.country.id
    }

    handleIncrement = () => {
        this.setState({gold: this.state.gold + 1}); 
    }
    handleDecrement = () => {
        this.setState({gold: this.state.gold - 1}); 
    }

    render() {
        const { classes } = this.props;
        return(
            <Card className={classes.card}>            
                <CardContent>
                    <div className={classes.countryName}>{this.state.name}</div>
                    <Divider></Divider>
                    <div> 
                        <Avatar className={classes.medals} >{this.state.gold}</Avatar>
                        <span style={{fontSize: "1.5em"}}> Gold Medal{this.state.gold === 1 ? '' : 's'} </span> 
                    </div> 
                    <IconButton size="small" className="increment" onClick={this.handleIncrement}><AddCircle /></IconButton>
                    <IconButton size="small" className="decrement" onClick={this.handleDecrement} disabled={this.state.gold === 0}><RemoveCircle /></IconButton>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" onClick={() => this.props.onDelete(this.state.id)}>Remove Country</Button>
                </CardActions>
            </Card>
            
        );
    }
}

export default withStyles(styles, { withTheme: true })(Country);