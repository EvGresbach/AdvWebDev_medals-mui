import React, {Component} from "react"; 
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { withStyles } from "@mui/styles";

const styles = {
    medals: {
        backgroundColor: "gold", 
        color: 'black',
        display: 'inline-flex'
    },
}

class Medal extends Component{
    
    capatalize(){
        return this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1);
    }

    render(){
        const { classes } = this.props;

        return(
            <div>
                <div> 
                    <Avatar className={classes.medals} >{this.props.value}</Avatar>
                    <span style={{fontSize: "1.5em"}}> {this.capatalize()} Medal{this.props.value === 1 ? '' : 's'} </span> 
                </div> 
                <IconButton size="small" className="increment" onClick={() => this.props.increment()}><AddCircle /></IconButton>
                <IconButton size="small" className="decrement" onClick={() => this.props.decrement()} disabled={this.props.value === 0}><RemoveCircle /></IconButton>
            </div>
            
        )
    }
}

export default withStyles(styles, { withTheme: true })(Medal);