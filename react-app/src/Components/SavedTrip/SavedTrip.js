import React, { Component } from "react";
import TripTable from "../TripTable/TripTable";
import "./SavedTrip.css";
import { postloadtrips } from '../../Actions/expressActions'
import { connect } from "react-redux";
import MapComponentDefault from "../MapComponent/MapComponentDefault";
import NearbyPlaces from "../NearbyPlaces/NearbyPlaces";
import { fetchnearbyplaces } from '../../Actions/expressActions';


const mapDispatchToProps = {
  postloadtrips, fetchnearbyplaces
}

const mapStateToProps = (state) => ({
  credentials: state.oauth.Credentials,
  browser_lat: state.places.browser_location.lat,
  browser_lng: state.places.browser_location.lng,
  place_type: state.places.tourist_places.type,
  lodging_resturant_types: state.places.resturant_lodging_places.type,
});

class SavedTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {
        id: "",
        trip: {
          name: "",
          to: {
            id: "",
            lat: "",
            lng: ""
          },
          from: "",
          places: ""
        }
      },
      savedTrips: []
    };
  }

  componentWillMount() {
    if (this.props.credentials.response) {
      this.props.postloadtrips({ credentials: this.props.credentials.response.wc })
    }
    this.setSelectedTrip()
  }

  setSelectedTrip(selected) {
    this.setState({
      selected: trip
    })
    // this.props.fetchnearbyplaces({
    //   lat: this.state.selected.trip.to.lat,
    //   lng: this.state.selected.trip.to.lng,
    //   place_type: this.props.place_type,
    //   resturant_lodging_places: this.props.resturant_lodging_places
    // })
  }
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    const waypoints = this.state.selected.trip.placesOnMap.map(place => place.place_id)
    return (
      <div className="SavedTrip">
        <TripTable setSelected={this.setSelectedTrip} trips={this.state.savedTrips} className="TripTable" />
        <MapComponentDefault origin={this.state.selected.trip.from} destination={this.state.selected.trip.to.id} browser={{ lat: this.props.browser_lat, lng: this.props.browser_lng }} waypoints={this.state.selected.trip.placesOnMap} />
        <NearbyPlaces />
      </div>
    );
  }
}

const trip = { "id": "56715945-e9dd-4ec7-bd2c-b9f90354d3b3", "trip": { "placesOnMap": ["f00c7a9ddf56a523fc67efc5caade7e534b1f95e", "86b40d02295e75358622d8a17d1dba4953c63f08"], "to": { "id": "ChIJy3TpSfyxOG0RcLQTomPvAAo", "lat": -41.2864603, "lng": 174.776236 }, "from": "ChIJ--acWvtHDW0RF5miQ2HvAAU", "name": "name" } }

export default connect(mapStateToProps, mapDispatchToProps)(SavedTrip);
