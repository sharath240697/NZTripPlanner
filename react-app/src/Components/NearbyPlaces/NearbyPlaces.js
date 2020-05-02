import React from 'react';
import { connect } from 'react-redux'
import './NearbyPlaces.css';

const mapStateToProps = state => ({ 
        attractions: state.places.nearby_tourist_attractions.attractions
  })
  const mapDispatchToProps = {
    
 }
const NearbyPlaces = (props) => {
  
  
    return (
      <div>
          {props.attractions.map(attraction => (<h6>Place: {attraction.name}</h6>))}
      </div>
    );
  
}

export default connect(mapStateToProps)(NearbyPlaces);