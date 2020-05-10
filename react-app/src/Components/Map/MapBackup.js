import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import {store} from '../../index'
import { connect } from 'react-redux'

const mapStyles = {
    width: '100%',
    height: '100%',
  };



   //export class MapAndDirection extends Component {

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
    
        return (

            <Map
            google={props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat:props.browser_lat, lng: props.browser_lng}}
          >
            <Marker position={{ lat:props.browser_lat, lng: props.browser_lng}} />       
               
                     </Map>      
          
          
        );
        }

      export default GoogleApiWrapper({
        apiKey: 'AIzaSyAvri8O_Xgk3dGV84-tyQ2KnSsCqhQmYJY'
    })(connect(mapStateToProps)(MapAndDirection));