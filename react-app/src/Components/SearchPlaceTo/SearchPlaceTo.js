import React, { useState } from 'react';
import './SearchPlace.css';
import { connect } from 'react-redux'

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { updateToPlace } from '../../Actions/actions';
import {store} from '../../index'



const SearchPlace = (props) => {

  console.log(props.placeholder)
  let suggestions_arr;
  const [address, setaddress] = useState(props.description);

  const handleChange = add => {
   setaddress(add);
   store.dispatch(updateToPlace({ description: add, placeId: "", types: [], place_location: {lat:undefined, lng:undefined}}));
    console.log('after handle change and dispatching action');
   
  };
 
   const handleSelect = async (address,place_id) => 
  {

    if(place_id!==null)
    {
      console.log('in Search Place component handleSelect method');
    console.log(address+" "+place_id)
    let place_location;
    let place;
     
      suggestions_arr.map(suggestion => {
        if(suggestion.placeId===place_id)
         {place=suggestion;}
         return null;
      }) 
     

      let promise = geocodeByAddress(address)
      .then(results => {console.log(results); handleChange(place.description);
        return getLatLng(results[0]);})
      .then(latLng => {console.log('Success', latLng);place_location=latLng})
      .catch(error => console.error('Error', error));
      let result = await promise;
      console.log(result);
      console.log({ description: address, placeId: place.placeId, types: place.types, place_location: place_location});
      store.dispatch(updateToPlace({ description: address, placeId: place.placeId, types: place.types, place_location: place_location}));
    
    }  
    else{
      handleChange("");
    }
     
      
  };
   
  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {
        ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input {...getInputProps(  { placeholder: props.placeholder,
              className: 'location-search-input',
            }   )  }
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {
              
              suggestions.map(suggestion => 
                {
                  suggestions_arr=suggestions;
              const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active ? { backgroundColor: '#ffaaaa', cursor: 'pointer' } : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
              })}
          </div>
        </div>
      )
      
    }
    </PlacesAutocomplete>
  );
      
}


const mapStateToProps = state => ( 
          
   {description: state.places.to.description,
    placeholder: state.places.to.placeholder,
    
  } ) 

export default connect(mapStateToProps)(SearchPlace);



/*

class SearchPlace extends Component {
  // constructor(props){
    // super(props);
    // this.state = {};
  // }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  constructor(props) {
    super(props);
    this.state = { address: '' };
    let suggestions_arr;
  }
 
  
  handleChange = address => {
    this.setState({ address });
  };
 
   handleSelect = async (address,place_id) => 
  {

    console.log('in Search Place component handleSelect method');
    console.log(address);

    let place_location;
    let place;
     this.suggestions_arr.map(suggestion => {
      if(suggestion.placeId===place_id)
       {place=suggestion;}
    }) 
   let promise = geocodeByAddress(address)
      .then(results => {console.log(results); this.handleChange(place.description);
        return getLatLng(results[0]);})
      .then(latLng => {console.log('Success', latLng);place_location=latLng})
      .catch(error => console.error('Error', error));

      let result = await promise;
      console.log(this.props.onSelect);
      this.props.onSelect({place, address, place_location});
      
  };

 
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {
          ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps(  { placeholder: this.props.placeHolder,
                className: 'location-search-input',
              }   )  }
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {
                
                suggestions.map(suggestion => 
                  {
                    this.suggestions_arr=suggestions;
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active ? { backgroundColor: '#ffaaaa', cursor: 'pointer' } : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
                })}
            </div>
          </div>
        )
        
      }
      </PlacesAutocomplete>
    );
  }
}*/

