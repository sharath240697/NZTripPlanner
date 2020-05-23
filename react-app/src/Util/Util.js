import {store} from '../index'
import * as actions from '../Actions/actions';

export function setBrowserLocation() {
    if (navigator.geolocation) {
        console.log('in util.js setBrowserlocation function')
      navigator.geolocation.getCurrentPosition(getcoordinates);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function getcoordinates(position) {
   console.log("in get cosdinates func")
    console.log(position.coords); 
    console.log('in util.js getcoordinates method before dispatching actions')
    store.dispatch(actions.setbrowserlocation(position.coords))
  }

