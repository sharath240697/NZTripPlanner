import React, { Component } from 'react';
import './PlanTrip.css';
import SearchPlaceFrom from '../SearchPlaceFrom/SearchPlaceFrom';
import SearchPlaceTo from '../SearchPlaceTo/SearchPlaceTo';
import Button from '../Button/Button';
import { connect } from 'react-redux'
import { setfromtovalidation } from '../../Actions/actions';
import { fetchnearbyplaces } from '../../Actions/expressActions';
import { postsavetrip } from '../../Actions/expressActions';
import { fetchweatherdata } from '../../Actions/expressActions';
import { store } from '../../index'
import MapComponent from '../MapComponent/MapComponent'
import MapComponentDefault from '../MapComponent/MapComponentDefault'
import NearbyPlaces from '../NearbyPlaces/NearbyPlaces';
import Weather from '../Weather/Weather';
import SaveTrip from '../SaveTrip/SaveTrip';



const mapStateToProps = state => (

  {
    from_validation: state.places.from_to_validation.from,
    to_validation: state.places.from_to_validation.to,
    from_placeId: state.places.from.placeId,
    to_placeId: state.places.to.placeId,
    from_lat: state.places.from.place_location.lat,
    from_lng: state.places.from.place_location.lng,
    to_lat: state.places.to.place_location.lat,
    to_lng: state.places.to.place_location.lng,
    place_type: state.places.tourist_places.type,
    lodging_resturant_types: state.places.resturant_lodging_places.type,
    browser_lat: state.places.browser_location.lat,
    browser_lng: state.places.browser_location.lng,
    placesOnMap: state.places.placesOnMap,
    credentials: state.oauth.Credentials
  })

const mapDispatchToProps = {
  setfromtovalidation, fetchnearbyplaces, fetchweatherdata, postsavetrip
}



const PlanTrip = (props) => {

  /* Sends request to express api once from and to is selected by user*/
  const navigate = () => {
    const type = [];  // type of near by places to be fetched should be defined
    console.log(props.from_validation + ' props.from_validation');
    console.log(props.to_validation + ' props.to_validation');
    console.log("in Plantrip component navigate function")  // if else block validates from to lat lng value and dispatches appropriate actions 
    if (props.from_validation && props.to_validation) {
      props.fetchnearbyplaces({ lat: props.to_lat, lng: props.to_lng, places_type: props.place_type, resturant_type: props.lodging_resturant_types })  // redux thunks dispatch
      console.log("in Plantrip component navigate function if block after thunk dispatch")
      props.fetchweatherdata({ lat: props.to_lat, lng: props.to_lng });

    }
    else {
      console.log('props.from_lat ' + props.from_lat)
      const data = { from: true, to: true }
      if ((props.from_lat || props.from_lng) === undefined) { data.from = false; }
      if ((props.to_lat || props.to_lng) === undefined) { data.to = false; }
      store.dispatch(setfromtovalidation(data));
      // redux dispatch

    }
  }


  /* finds waypoints required to render on map*/
  const waypoints = props.placesOnMap.map(place => place.place_id)

  /* handle save trip function */
  const handlesavetrip = () => {
    // console.log(props.credentials)
    const access = props.credentials.response.wc;
    console.log(access)
    props.postsavetrip({ credentials: access, trip: props.placesOnMap })
  }

  return (
    <div>
      <div className="from_to">
        <SearchPlaceFrom />
        <SearchPlaceTo />
        <Weather />
      </div>
      <div className="MapandPlacesContainer">
        {props.from_validation && props.to_validation && <MapComponent origin={props.from_placeId} destination={props.to_placeId} browser={{ lat: props.browser_lat, lng: props.browser_lng }} waypoints={waypoints} ></MapComponent>}
        {(!props.from_validation || !props.to_validation) && <MapComponentDefault browser={{ lat: props.browser_lat, lng: props.browser_lng }}></MapComponentDefault>}

        <NearbyPlaces func={navigate()} />
      </div>
      <SaveTrip />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanTrip);