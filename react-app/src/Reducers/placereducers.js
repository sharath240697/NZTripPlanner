

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
    place_location: {lat:undefined , lng:undefined}  
    },

    from_to_validation: {       // state variable which holds result of validation of from to adress object obtained from searchimng
      from: false,
      to: false
    },

    loading: {
      loading_status: true
    },

    testdata: {
      status: '',
      message: ''
    }
  }
  
  export default function placeReducer(state = initialState, action) {
    switch (action.type) 
    {
      case actions.CHANGE_FROM_PLACE:
        {
          console.log(state);
          console.log(action.payload);
          
          return {...state, from_to_validation: {from: true, to:state.from_to_validation.to },from: {
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
            
            return {...state, from_to_validation: {from: state.from_to_validation.from, to: true }, to: {
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

          case actions.FROMTOVALIDATION:
              {
                console.log("in FROMTOVALIDATION case of placereducers.js")
                return {...state, from_to_validation: {from: action.payload.from, to: action.payload.to}}
              }

      default:
        return state
    }
  }