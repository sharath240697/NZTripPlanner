import * as actions from './actions'

export function fetchtestobject() {
    console.log('in expressActions.js fetchtestObject method')
    return async dispatch => {
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

export function fetchnearbyplaces(data) {
    console.log('in expressActions.js fetchtnearbyplaces method');
    return async dispatch => {
        console.log('inside return in expressActions.js fetchtnearbyplaces method ');
        dispatch(actions.loading());

        console.log(JSON.stringify(data));
        try {
            const data1 = { lat: data.lat, lng: data.lng, type: data.places_type };
            const data2 = { lat: data.lat, lng: data.lng, type: data.resturant_type };
            console.log('requesting nearby tourist attractions')
            const nearby_tourist_attractions = await fetch('http://localhost:9000/NZTripPlanner/nearbyplaces', {
                method: 'POST', // or 'PUT'
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(data1),
            })
            const result1 = await nearby_tourist_attractions.json();
            //  console.log(result1);
            dispatch(actions.savenearbyattractions(result1));
            console.log('requesting nearby lodging restrants and bar')
            const nearby_lodgings_resturants = await fetch('http://localhost:9000/NZTripPlanner/nearbyplaces', {
                method: 'POST', // or 'PUT'
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(data2),
            })

            const result2 = await nearby_lodgings_resturants.json();
            console.log(result2);
            dispatch(actions.savenearbylodgings(result2));
        } catch (error) {
            console.log('BIGG FATTT ERROOORRR! in expressActions.js fetchnearbyplaces method')
            console.log(error);
        }
    }
}


export function fetchweatherdata(data) {

    console.log('inside return in expressActions.js fetchtweatherdata method ');
    return async dispatch => {
        console.log('inside return in expressActions.js fetchtnearbyplaces method ');
        console.log(JSON.stringify(data));
        try {
            const url = 'http://api.openweathermap.org/data/2.5/weather?units=Metric&lat=' + data.lat + '&lon=' + data.lng + '&appid=aa9f26c33a1a8c68323a4907a0357fe6';
            console.log(url);
            const response = await fetch(url);
            const result = await response.json();
            console.log(result);
            dispatch(actions.storeweatherdata(result));

            // appropriate actions must be dispatched to save the obtained state
        } catch (error) {
            console.log('BIGG FATTT ERROOORRR! in expressActions.js fetchnearbyplaces method')
            console.log(error);
        }
    }

}


export function postsavetrip(data) {
    console.log('in expressActions.js saveOathDetails method');
    return async dispatch => {
        console.log('inside return in expressActions.js saveOathDetails method ');
        dispatch(actions.loading());
        console.log('data is' + JSON.stringify(data));
        try {
            dispatch(actions.setSaveProgress("Saving"));
            const savedDetails = await fetch('http://localhost:9000/NZTripPlanner/saveTripDetails', {
                method: 'POST', // or 'PUT'
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(data),
            })
            const result = await savedDetails.json();
            console.log(result);
            dispatch(actions.setSaveProgress("Done"));

        } catch (error) {
            console.log('BIGG FATTT ERROOORRR! in expressActions.js saveOathDetails method')
            console.log(error);
            dispatch(actions.setSaveProgress("Done"));
        }
    }
}

export function postloadtrips(data) {
    console.log('in expressActions.js saveOathDetails method');
    return async dispatch => {
        console.log('inside return in expressActions.js saveOathDetails method ');
        dispatch(actions.loading());
        console.log('data is' + JSON.stringify(data));
        try {

            const savedDetails = await fetch('http://localhost:9000/NZTripPlanner/downloadTripDetails', {
                method: 'POST', // or 'PUT'
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(data),
            })
            const result = await savedDetails.json();
            console.log(result);
            dispatch(actions.storeSavedTrips(result));

        } catch (error) {
            console.log('BIGG FATTT ERROOORRR! in expressActions.js saveOathDetails method')
            console.log(error);
        }
    }


}


