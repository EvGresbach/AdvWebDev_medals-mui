import React from "react"; 
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

const Medal = (props) => {
    
    const capatalize = () => {
        return props.type.charAt(0).toUpperCase() + props.type.slice(1);
    }

    const { classes } = props;

    return(
        <div>
            <div> 
                <Avatar className={classes.medals} >{props.value}</Avatar>
                <span style={{fontSize: "1.5em"}}> {capatalize()} Medal{props.value === 1 ? '' : 's'} </span> 
            </div> 
            { props.canPatch && 
                <React.Fragment>
                   <IconButton size="small" className="increment" onClick={() => props.increment()}><AddCircle /></IconButton>
                    <IconButton size="small" className="decrement" onClick={() => props.decrement()} disabled={props.value === 0}><RemoveCircle /></IconButton> 
                </React.Fragment>
            }
        </div>
        
    )
}

export default withStyles(styles, { withTheme: true })(Medal);