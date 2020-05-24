import rootReducer from '../Reducers';
import { createStore } from 'redux';
import * as actions from '../Actions/actions'

let store;

//setup the store fresh before each test case
beforeEach(() => {
    store = createStore(rootReducer);
})

describe( 'initial state', () => {
//check to see if reducers initial states are setup correctly
test('check initial store state', () => {
    const keys = Object.keys(store.getState());
    //check the right number of reducers are created
    expect(keys.length).toBe(4);
    expect(keys[0]).toBe('posts');
    expect(keys[1]).toBe('places');
    expect(keys[2]).toBe('oauth');
    expect(keys[3]).toBe('weather');   
})

test('check initial state of oauth', () => {
  expect(store.getState().oauth.Credentials.name).toBe(undefined);
  expect(store.getState().oauth.Credentials.accessToken).toBe(undefined);
  expect(store.getState().oauth.Credentials.loggedIn).toBe(false);
})

test('check initial state of posts', () => {
    expect(store.getState().posts.loading).toBe(false);
    expect(store.getState().posts.hasErrors).toBe(false);
    expect(store.getState().posts.posts).toMatchObject([]);
})

test('check initial state of weather', () => {
    expect(store.getState().weather.openWeatherData).toMatchObject({});
})

test('check initial state of places', () => {
    //check initial state of places.from
    expect(store.getState().places.from.placeholder).toBe("From");
    expect(store.getState().places.from.description).toBe("");
    expect(store.getState().places.from.placeId).toBe("");
    expect(store.getState().places.from.types).toMatchObject([]);
    expect(store.getState().places.from.place_location.lat).toBe(undefined);
    expect(store.getState().places.from.place_location.lng).toBe(undefined);
    //check initial state of places.to
    expect(store.getState().places.to.placeholder).toBe("To");
    expect(store.getState().places.to.description).toBe("");
    expect(store.getState().places.to.placeId).toBe("");
    expect(store.getState().places.to.types).toMatchObject([]);
    expect(store.getState().places.to.place_location.lat).toBe(undefined);
    expect(store.getState().places.to.place_location.lng).toBe(undefined);
    //check initial state of places.from_to_validation
    expect(store.getState().places.from_to_validation.from).toBe(false);
    expect(store.getState().places.from_to_validation.to).toBe(false);
    //check initial state of places tourist
    expect(store.getState().places.tourist_places.type).toMatchObject(['tourist_attraction', 'amusement_park', 'aquarium', 'art_gallery', 'church', 'hindu_temple', 'zoo', 'museum', 'place_of_worship']);
    expect(store.getState().places.resturant_lodging_places.type).toMatchObject(['bakery','bar','cafe','liquor_store','lodging','meal_delivery','meal_takeaway','restaurant','supermarket']);
    expect(store.getState().places.nearby_tourist_attractions.attractions).toMatchObject([]);
    expect(store.getState().places.nearby_lodgings.lodgings).toMatchObject([]);
    //check initial state of places, browser location
    expect(store.getState().places.browser_location.accuracy).toBe(undefined);
    expect(store.getState().places.browser_location.altitude).toBe(undefined);
    expect(store.getState().places.browser_location.altitudeAccuracy).toBe(undefined);
    expect(store.getState().places.browser_location.heading).toBe(undefined);
    expect(store.getState().places.browser_location.lat).toBe(undefined);
    expect(store.getState().places.browser_location.lng).toBe(undefined);
    //check initial state of places, loading, testdata and placeonmap
    expect(store.getState().places.loading.loading_status).toBe(true);
    expect(store.getState().places.testdata.status).toBe('');
    expect(store.getState().places.testdata.message).toBe('');
    expect(store.getState().places.placesOnMap).toMatchObject([]);
})
})

//consider reducers for weather
describe('weather reducer', () => {
test('should return the initial state', () => {
      expect(rootReducer(store.getState().weather.openWeatherData, {}).weather).toEqual(
        {
            openWeatherData: {}
        }
      )
    })
  
    test('should handle STOREWEATHER', () => {
      expect(
        rootReducer(store.getState().weather.openWeatherData, {
          type: actions.STOREWEATHER,
          payload: '3 degrees'
        }).weather
      ).toEqual(
        {
          openWeatherData: '3 degrees'
        }
      )
    })
  })

  //consider reducers for oauth
describe('oauth reducer', () => {
  test('should return the initial state', () => {
        expect(rootReducer(store.getState().oauth.Credentials, {}).oauth).toEqual({
            Credentials: {
              name: undefined,
              accessToken: undefined,
              loggedIn: false,
          },
          savedTrips: []
        })
      })
    
      test('should handle SAVEOAUTHDATA', () => {
        expect(
          rootReducer(store.getState().oauth, {
            type: actions.SAVEOAUTHDATA,
            payload: {
              name: 'Jaedyn',
              accessToken: 'aw3f2353532',
              loggedIn: true,
        }
            
          }).oauth
        ).toEqual(
          {
            Credentials: {
              name: 'Jaedyn',
            accessToken: 'aw3f2353532',
            loggedIn: true,
          },
          savedTrips: []     
          }
        )
      })
    })

  //consider reducers for posts
  describe('posts reducer', () => {
    test('should return the initial state', () => { 
      expect(rootReducer(store.getState() , {}).posts).toEqual(
        {
            posts: [],
            loading: false,
            hasErrors: false,
        }
      )
    })
  })

  describe('places reducer', () => {
    test('should return the initial state', () => { 
      expect(rootReducer(store.getState() , {}).places).toEqual(
        {
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
            
              from_to_validation: {
                from: false,
                to: false
              },
            
              tourist_places: { type: ['tourist_attraction', 'amusement_park', 'aquarium', 'art_gallery', 'church', 'hindu_temple', 'zoo', 'museum', 'place_of_worship'] }, 
              resturant_lodging_places: { type: ['bakery','bar','cafe','liquor_store','lodging','meal_delivery','meal_takeaway','restaurant','supermarket'] },             
              nearby_tourist_attractions: { attractions: [] },
              nearby_lodgings: { lodgings: [] },
            
              browser_location: { accuracy: undefined, altitude: undefined, altitudeAccuracy: undefined, heading: undefined, lat: undefined, lng: undefined },
            
              loading: {
                loading_status: true
              },
              saveProgress: 'Done',
              testdata: {
                status: '',
                message: ''
              },
            
              placesOnMap: []
        }
      )
    })

    test('setting from place, status true', () => { 
        expect(rootReducer(store.getState() , {type: actions.CHANGE_FROM_PLACE,
        payload: {
                placeholder: "From",
                description: "new cool place",
                placeId: "14356",
                types: [],
                place_location: { lat: 1.4, lng: -1.4 }
              }
        }).places.from).toEqual(
          {
                  placeholder: "From",
                  description: "new cool place",
                  placeId: "14356",
                  types: [],
                  place_location: { lat: 1.4, lng: -1.4 }
          }
        )
      })

      test('setting from place, status false', () => { 
        expect(rootReducer(store.getState() , {type: actions.CHANGE_FROM_PLACE,
        payload: {
                placeholder: "From",
                description: "new cool place",
                placeId: "14356",
                types: [],
                place_location: { lat: undefined, lng: undefined }
              }
        }).places.from).toEqual(
          {
                  placeholder: "From",
                  description: "new cool place",
                  placeId: "14356",
                  types: [],
                  place_location: { lat: undefined, lng: undefined }
          }
        )
      })

      test('setting to place, status true', () => { 
        expect(rootReducer(store.getState() , {type: actions.CHANGE_TO_PLACE,
        payload: {
                placeholder: "To",
                description: "new cool place",
                placeId: "14356",
                types: [],
                place_location: { lat: 1.4, lng: -1.4 }
              }
        }).places.to).toEqual(
          {
                  placeholder: "To",
                  description: "new cool place",
                  placeId: "14356",
                  types: [],
                  place_location: { lat: 1.4, lng: -1.4 }
          }
        )
      })

      test('setting to place, status false', () => { 
        expect(rootReducer(store.getState(), {type: actions.CHANGE_TO_PLACE,
        payload: {
                placeholder: "To",
                description: "new cool place",
                placeId: "14356",
                types: [],
                place_location: { lat: undefined, lng: undefined }
              }
        }).places.to).toEqual(
          {
                  placeholder: "To",
                  description: "new cool place",
                  placeId: "14356",
                  types: [],
                  place_location: { lat: undefined, lng: undefined }
          }
        )
      })
      test('check LOADING', () => { 
        expect(rootReducer(undefined , {type: actions.LOADING
        }).places.loading).toEqual(
          {
                loading_status: true
          }
        )
      })
      test('check TESTDATA', () => { 
        expect(rootReducer(store.getState() , {type: actions.TESTDATA,
            payload: {
                status: true,
                message: 'new message'
            }
        }).places.testdata).toEqual(
          {
            status: true,
            message: 'new message'
          }
        )
        //expect(store.getState().places.loading.loading_status).toEqual(false);
      })
      test('check FROMTOVALIDATION', () => { 
        expect(rootReducer(store.getState() , {type: actions.FROMTOVALIDATION,
            payload: {
                from: true,
                to: true
              }
        }).places.from_to_validation).toEqual(
          {
            from: true,
            to: true
          }
        )
      })
      test('check SAVENEARBYATTRACTIONS', () => { 
        expect(rootReducer(store.getState() , {type: actions.SAVENEARBYATTRACTIONS,
            payload: 'bakery'
        }).places.nearby_tourist_attractions).toEqual(
          {
            attractions: 'bakery'
          }
        )
      })

      test('check SAVENEARBYLODGINGS', () => { 
        expect(rootReducer(store.getState() , {type: actions.SAVENEARBYLODGINGS,
            payload: 'home'
        }).places.nearby_lodgings).toEqual(
          {
            lodgings: 'home'
          }
        )
      }) 
      test('check SETBROWSERLOCATION', () => { 
        expect(rootReducer(store.getState() , {type: actions.SETBROWSERLOCATION,
            payload: {
                 accuracy: 10, altitude: 11, altitudeAccuracy: 12, heading: 13, latitude: 14, longitude: 15 
                }
            }).places.browser_location).toEqual(
          {
            accuracy: 10, altitude: 11, heading: 13, lat: 14, lng: 15 }
        )
      }) 
      test('check SETBROWSERLOCATION', () => { 
        expect(rootReducer(store.getState() , {type: actions.SETBROWSERLOCATION,
            payload: {
                 accuracy: 10, altitude: 11, altitudeAccuracy: 12, heading: 13, latitude: 14, longitude: 15 
                }
            }).places.browser_location).toEqual(
          {
            accuracy: 10, altitude: 11, heading: 13, lat: 14, lng: 15 }
        )
      }) 

      test('check ADDPLACETOMAP', () => { 
        expect(rootReducer(store.getState() , {type: actions.ADDPLACETOMAP,
            payload: {
                 id: 4 
                }
            }).places.placesOnMap).toEqual(
          [{
           "id": 4 
         }]
        )
      }) 

      test('check ADDPLACETOMAP then REMOVEPLACEFROMMAP', () => { 
        expect(rootReducer(store.getState() , {type: actions.ADDPLACETOMAP,
            payload: {
                 id: 1
                }
            }).places.placesOnMap).toEqual(
          [{
            "id": 1 }]
        )
        expect(rootReducer(store.getState() , {type: actions.REMOVEPLACEFROMMAP,
            payload: {
                 id: 1
                }
            }).places.placesOnMap).toEqual(
          []
        )

      }) 
    //   test('check ADDPLACETOMAP, index not -1', () => { 
    //     expect(rootReducer(store.getState() , {type: actions.ADDPLACETOMAP,
    //         payload: {
    //             }
    //         }).places.placesOnMap).toMatchObject([])
    //   })
  })

