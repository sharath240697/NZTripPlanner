
import React, { Component } from 'react'
import { store } from '../../index'
import { connect } from "react-redux";
import { Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@material-ui/core"

class SaveTrip extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    handleClickOpen() {
        this.setState({
            open: true
        })
    }

    handleSave() {
        // STUB call express endpoint to save the trip from here 

        this.handleClose();
    }

    handleClose() {
        this.setState({
            open: false
        })
    }


    render() {
        return (
            this.props.name !== undefined && (
                <div>
                    <Button onClick={() => this.handleClickOpen()}>Save Trip</Button>
                    <Dialog
                        open={this.state.open}
                        onClose={() => this.handleClose()}
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Save your trip"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Enter a name for your trip
                        </DialogContentText>
                            <TextField
                                autoFocus
                                id="name"
                                label="Name"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.handleSave()} color="primary">
                                Save
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
        )
    }
}

const mapStateToProps = (state) => ({
    name: state.oauth.Credentials.name,
    accessToken: state.oauth.Credentials.accessToken,
    loggedIn: state.oauth.Credentials.loggedIn,
    LoginDetails: state.oauth.Credentials.LoginDetails,
    expiry: state.oauth.Credentials.expiry
});

export default connect(mapStateToProps)(SaveTrip);
