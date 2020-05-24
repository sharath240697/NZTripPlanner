
import React, { Component } from 'react'
import { store } from '../../index'
import { connect } from "react-redux";
import { Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@material-ui/core"
import { postsavetrip } from '../../Actions/expressActions';
import { v4 as uuidv4 } from 'uuid';

const mapStateToProps = (state) => ({
    name: state.oauth.Credentials.name,
    accessToken: state.oauth.Credentials.accessToken,
    loggedIn: state.oauth.Credentials.loggedIn,
    LoginDetails: state.oauth.Credentials.LoginDetails,
    expiry: state.oauth.Credentials.expiry,
    credentials: state.oauth.Credentials,
    placesOnMap: state.places.placesOnMap,
    from_placeId: state.places.from.placeId,
    to_placeId: state.places.to.placeId,
    to_lat: state.places.to.place_location.lat,
    to_lng: state.places.to.place_location.lng,
    place_type: state.places.tourist_places.type,
    lodging_resturant_types: state.places.resturant_lodging_places.type,
});

const mapDispathToProps = {
    postsavetrip
};

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
        const trip = this.buildTrip();
        console.log(trip);
        this.props.postsavetrip({ credentials: this.props.credentials.response.wc, trip: trip })
        this.handleClose();
    }

    buildTrip() {
        const id = uuidv4();
        const trip = {
            id: id,
            trip: {
                placesOnMap: this.props.placesOnMap.map(place => place.id),
                to: {
                    id: this.props.to_placeId,
                    lat: this.props.to_lat,
                    lng: this.props.to_lng
                },
                from: this.props.from_placeId,
                name: "name"
            }
        }
        return trip;
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



export default connect(mapStateToProps, mapDispathToProps)(SaveTrip);
