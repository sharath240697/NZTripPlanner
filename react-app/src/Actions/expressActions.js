import * as actions from './actions'

export function fetchtestobject()
{
    console.log('in expressActions.js fetchtestObject method')
    return async dispatch  => {
        console.log('inside return in expressActions.js fetchtestObject method ')
        dispatch(actions.loading());
            try {
                const response = await fetch("http://localhost:9000/NZTripPlanner");
                const data = await response.json();
                console.log(data);
                dispatch(actions.gettestdata(data));
            } catch (error) {
                console.log('BIGG FATTT ERROOORRR! in expressActions.js fetchtestObject method');
            }
    }
}

export function fetchnearbyplaces(lat,lng,types)
{
    console.log('in expressActions.js fetchtnearbyplaces method');
    return async dispatch => {
        console.log('inside return in expressActions.js fetchtnearbyplaces method ');
        dispatch(actions.loading());
        try {
            fetch('http://localhost:9000/NZTripPlanner/nearbyplaces', {
                        method: 'POST', // or 'PUT'
                        headers: {'Content-Type': 'application/json',},
                        body: JSON.stringify(),
                                                 })
        } catch (error) {
            console.log('BIGG FATTT ERROOORRR! in expressActions.js fetchnearbyplaces method')
        }
    }
}