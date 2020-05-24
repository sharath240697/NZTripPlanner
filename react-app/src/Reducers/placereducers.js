

import * as actions from '../Actions/actions'

export const initialState = {
  saveProgress: "Done",
  from: {
    placeholder: "From",
    description: "",
    placeId: "",
    types: [],
    place_location: { lat: undefined, lng: undefined }
  },

  to: {
    placeholder: "To",
    description: "",
    placeId: "",
    types: [],
    place_location: { lat: undefined, lng: undefined }
  },

  from_to_validation: {       // state variable which holds result of validation of from to address object obtained from searching
    from: false,
    to: false
  },

  tourist_places: { type: ['tourist_attraction', 'amusement_park', 'aquarium', 'art_gallery', 'church', 'hindu_temple', 'zoo', 'museum', 'place_of_worship'] }, // more plcae type should be added later
  resturant_lodging_places: { type: ['bakery', 'bar', 'cafe', 'liquor_store', 'lodging', 'meal_delivery', 'meal_takeaway', 'restaurant', 'supermarket'] }, // more plcae type should be added later

  nearby_tourist_attractions: { attractions: [] },
  nearby_lodgings: { lodgings: [] },

  browser_location: { accuracy: undefined, altitude: undefined, altitudeAccuracy: undefined, heading: undefined, lat: undefined, lng: undefined },

  loading: {
    loading_status: true
  },

  testdata: {
    status: '',
    message: ''
  },

  placesOnMap: []
}

export default function placeReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_FROM_PLACE:
      {
        // console.log(state);
        // console.log(action.payload);
        var status;
        if (action.payload.place_location.lat === undefined) { status = false }
        else { status = true }
        return {
          ...state, from_to_validation: { from: status, to: state.from_to_validation.to }, from: {
            placeholder: "From",
            description: action.payload.description,
            placeId: action.payload.placeId,
            types: action.payload.types,
            place_location: action.payload.place_location,
          }
        };
      }

    case actions.CHANGE_TO_PLACE:
      {
        // console.log(state);
        // console.log(action.payload);

        if (action.payload.place_location.lat === undefined) { status = false }
        else { status = true }
        return {
          ...state, from_to_validation: { from: state.from_to_validation.from, to: status }, to: {
            placeholder: "To",
            description: action.payload.description,
            placeId: action.payload.placeId,
            types: action.payload.types,
            place_location: action.payload.place_location,
          }
        };
      }

    case actions.LOADING:
      {
        // console.log("in LOADING case of placereducers.js")
        return { ...state, loading: { loading_status: true } }
      }


    case actions.TESTDATA:
      {
        // console.log("in TESTDATA case of placereducers.js")
        return {
          ...state, loading: { loading_status: false },
          testdata: { status: action.payload.status, message: action.payload.message }
        }
      }

    case actions.FROMTOVALIDATION:
      {
        // console.log("in FROMTOVALIDATION case of placereducers.js")
        return { ...state, from_to_validation: { from: action.payload.from, to: action.payload.to } }
      }

    case actions.SAVENEARBYATTRACTIONS:
      {
        // console.log("in SAVENEARBYATTRACTIONS case of placereducres.js")
        // console.log(action.payload)
        return { ...state, nearby_tourist_attractions: { attractions: action.payload } }
      }

    case actions.SAVENEARBYLODGINGS:
      {
        // console.log("in SAVENEARBYLODGINGS case of placereducres.js")
        // console.log(action.payload)
        return { ...state, nearby_lodgings: { lodgings: action.payload } }
      }

    case actions.SETBROWSERLOCATION:
      {
        // console.log("in SETBROWSERLOCATION case of placereducres.js")
        // console.log(action.payload)
        return { ...state, browser_location: { accuracy: action.payload.accuracy, altitude: action.payload.altitude, heading: action.payload.heading, lat: action.payload.latitude, lng: action.payload.longitude } }
      }

    case actions.ADDPLACETOMAP:
      {
        // console.log(state);
        let index = state.placesOnMap.findIndex(place => place.id === action.payload.id);
        if (index === -1) {
          const obj = { ...state, placesOnMap: [...state.placesOnMap, action.payload] };
          // console.log(obj)
          return obj;
        }
        return state;
      }

    case actions.REMOVEPLACEFROMMAP:
      {
        return { ...state, placesOnMap: [...state.placesOnMap.filter((place) => place.id !== action.payload.id)] }
      }

    case actions.SETSAVEPROGRESS:
      {
        // console.log('progress update');
        return {
          ...state, saveProgress: action.payload,
          to: {
            placeholder: "To",
            description: "",
            placeId: "",
            types: [],
            place_location: { lat: undefined, lng: undefined }
          },
          placesOnMap: [],
          from_to_validation: {       // state variable which holds result of validation of from to address object obtained from searching
            from: false,
            to: false
          },
          nearby_tourist_attractions: { attractions: [] },
          nearby_lodgings: { lodgings: [] },
        }
      }


    default:
      return state
  }
}