/*global google*/
import React from 'react'
import { connect } from 'react-redux'
import {store} from '../../index'
import { Marker } from 'google-maps-react';
import  { compose, withProps, lifecycle } from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer} from 'react-google-maps'
const mapStateToProps = state => ( 
    {
      browser_lat: state.places.browser_location.lat,
      browser_lng: state.places.browser_location.lng,   
      from_lat: state.places.from.place_location.lat,
      from_lng: state.places.from.place_location.lng,
      to_lat: state.places.to.place_location.lat,
      to_lng: state.places.to.place_location.lng,            

} )
const MapAndDirection = (props) => {  
  

    const DirectionsComponent = compose(
      withProps({
        googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyBjwnK_zvDGQokuzDJ0NVnR979L_KNEYuo&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `400px` }} />,
        containerElement: <div style={{ width: `100%` }} />,
        mapElement: <div style={{height: `600px`, width: `600px` }}  />,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() { 
          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route({
           origin: new google.maps.LatLng( -36.8928383, 174.7001938),
            destination: new google.maps.LatLng(-41.28666552, 174.772996908),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
this.setState({
                directions: {...result},
                markers: true
              })
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      })
    )(props =>
      <GoogleMap
      defaultCenter={{ lat:props.browser_lat, lng:props.browser_lng}}
        defaultZoom={3}
      >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
       
      </GoogleMap>
             

    );
return (
        <DirectionsComponent
        />
    )
  
}

export default connect(mapStateToProps)(MapAndDirection);