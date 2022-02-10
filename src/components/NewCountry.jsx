import React, {useState} from "react"; 
import {Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField} from "@mui/material";
import { Add} from "@mui/icons-material";

const NewCountry = (props) =>{
    const [open, setOpen] = useState(false); 
    const [name, setName] = useState(''); 
  
    const handleOpen = () => {
        setOpen(true); 
        setName(''); 
    }

    const handleClose = () => setOpen(false); 

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addCountry(name);
        setOpen(false); 
    }
    return(
        <div>
            <Fab color="primary" aria-label="add" onClick={handleOpen}><Add/></Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Country</DialogTitle>
                <form onSubmit={ (e) => handleSubmit(e)}>
                <DialogContent>
                    <DialogContentText>Please enter a country name</DialogContentText>
                    <TextField 
                        onChange={(e) => setName(e.target.value)} 
                        autoFocusid="name"
                        name="name"
                        value={ name }
                        label="Country Name"
                        type="text"
                        fullWidth>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="warning">Cancel</Button>
                    <Button disabled={name.trim().length === 0} type="submit">Add Country</Button>
                </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default NewCountry;