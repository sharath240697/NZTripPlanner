import * as actions from './actions'

export function fetchtestobject()
{
    console.log('in expressActions.js fetchtestObject method')
    return async dispatch  => {
        console.log('inside return in expressActions.js fetchtestObject method ')
        dispatch(actions.loading());
            try {
                const response = await fetch("http://localhost:9000/testAPI");
                const data = await response.json();
                console.log(data);
                dispatch(actions.gettestdata(data));
            } catch (error) {
                console.log('BIGG FATTT ERROOORRR!')
            }
    }
}