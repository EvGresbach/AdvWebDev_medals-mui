import React, {Component} from "react"; 
import {Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField} from "@mui/material";
import { Add} from "@mui/icons-material";

class NewCountry extends Component{

    state = {
        open: false,
        name: '',
    }

    capatalize(){
        return this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1);
    }

    handleOpen = () => {
        this.setState({open: true, name: ''})
    }

    handleClose = () => {
        this.setState({open: false,}) 
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addCountry(this.state.name);
        this.setState({open: false}); 
    }

    render(){
       return(
            <div>
                <Fab color="primary" aria-label="add" onClick={this.handleOpen}><Add/></Fab>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Add New Country</DialogTitle>
                    <form onSubmit={ (e) => this.handleSubmit(e)}>
                    <DialogContent>
                        <DialogContentText>Please enter a country name</DialogContentText>
                        <TextField 
                            onChange={this.handleChange} 
                            autoFocusid="name"
                            name="name"
                            value={ this.state.name }
                            label="Country Name"
                            type="text"
                            fullWidth>
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="warning">Cancel</Button>
                        <Button disabled={this.state.name.trim().length === 0} type="submit">Add Country</Button>
                    </DialogActions>
                    </form>
                </Dialog>
            </div>
            
        )
    }
}

export default NewCountry;