import React, { Component } from 'react';
import './PlanTrip.css';
import SearchPlaceFrom from '../SearchPlaceFrom/SearchPlaceFrom';
import SearchPlaceTo from '../SearchPlaceTo/SearchPlaceTo';
import Button from '../Button/Button';
import { connect } from 'react-redux'
import {setfromtovalidation} from '../../Actions/actions';
import {fetchnearbyplaces} from '../../Actions/expressActions';
import {store} from '../../index'
import NearbyPlaces from '../NearbyPlaces/NearbyPlaces'

const mapStateToProps = state => ( 
          
  {
    from_validation: state.places.from_to_validation.from,
    to_validation: state.places.from_to_validation.to,
    from_lat: state.places.from.place_location.lat,
    from_lng: state.places.from.place_location.lng,
    to_lat: state.places.to.place_location.lat,
    to_lng: state.places.to.place_location.lng,
    place_type: state.places.tourist_places.type,
 } ) 

 const mapDispatchToProps = {
   setfromtovalidation,fetchnearbyplaces
}



const PlanTrip = (props) => {
   

  const navigate = () =>
  {
    const type = [];  // type of near by places to be fetched should be defined
    console.log(props.from_validation +' props.from_validation');
    console.log(props.to_validation +' props.to_validation');
    console.log("in Plantrip component navigate function")  // if else block validates from to lat lng value and dispatches appropriate actions 
    if(props.from_validation && props.to_validation){       
      props.fetchnearbyplaces({lat: props.to_lat, lng: props.to_lng, type: props.place_type})  // redux thunks dispatch
      console.log("in Plantrip component navigate function if block after thunk dispatch")
    }
    else{    
      console.log('props.from_lat '+props.from_lat)
      const data = {from:true , to:true }
      if((props.from_lat || props.from_lng)=== undefined)
       { data.from = false;}
      if((props.to_lat || props.to_lng)=== undefined)
        {data.to = false;}
        store.dispatch(setfromtovalidation(data));    // redux dispatch
    }
  } 

    return (
      <div>
        {(!props.from_validation || !props.to_validation) && <h2>Please select your Start location and destination</h2>}<br/><br/>
      <div className="from_to">
        
                    <SearchPlaceFrom /> 
                    <SearchPlaceTo />             
          </div>
           <br/><br/>

           <Button className='button' name='Navigate' onClick={navigate}></Button>
           <br/><br/>
              <NearbyPlaces />
           </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanTrip);