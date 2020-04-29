

import * as actions from '../Actions/actions'

export const initialState = {
    from: {
      placeholder: "From",
      description: "",
      placeId: "",
      types: [],
      place_location: {lat:0 , lng:0}  },
    to: {
      placeholder: "To",
      description: "",
    placeId: "",
    types: [],
    place_location: {lat:0 , lng:0}  
    },
    loading: {
      loading_status: true
    },
    testdata: {
      status: '',
      message: ''
    }
  }
  
  export default function myReducer(state = initialState, action) {
    switch (action.type) 
    {
      case actions.CHANGE_FROM_PLACE:
        {
          console.log(state);
          console.log(action.payload);
          
          return {...state, from: {
            description: action.payload.description,
    placeId: action.payload.placeId,
    types: action.payload.types,
    place_location: action.payload.place_location,  
          }};
        }

        case actions.CHANGE_TO_PLACE:
          {
            console.log(state);
            console.log(action.payload);
            
            return {...state, to: {
              description: action.payload.description,
      placeId: action.payload.placeId,
      types: action.payload.types,
      place_location: action.payload.place_location,  
            }};
          }

        case actions.LOADING:
          {
              console.log("in LOADING case of placereducers.js")
              return {...state,loading: {loading_status: true}}
          }


          case actions.TESTDATA:
            {
              console.log("in TESTDATA case of placereducers.js")
              return {...state,loading: {loading_status: false},
              testdata: {status: action.payload.status,message:action.payload.message}}
            }
      default:
        return state
    }
  }