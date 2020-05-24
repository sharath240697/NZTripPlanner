
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
    to_name: state.places.to.description,
    from_name: state.places.from.description,
    saveState: state.places.saveProgress

});

const mapDispathToProps = {
    postsavetrip
};

class SaveTrip extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            name: "name"
        }
        this.handleSetName = this.handleSetName.bind(this)
    }

    handleClickOpen() {
        this.setState({
            open: true
        })
    }

    handleSetName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleSave() {
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
                placesOnMap: this.props.placesOnMap.map(place => place.place_id),
                to: {
                    id: this.props.to_placeId,
                    lat: this.props.to_lat,
                    lng: this.props.to_lng,
                    name: this.props.to_name
                },
                from: {
                    id: this.props.from_placeId,
                    name: this.props.from_name
                },
                name: this.state.name
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
                    {this.props.saveState === "Done" ?
                        <Button onClick={() => this.handleClickOpen()}>Save Trip</Button> :
                        <p>Saving trip...</p>}

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
                                ref="TextField"
                                id="name"
                                label="Name"
                                fullWidth
                                onChange={this.handleSetName}
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
