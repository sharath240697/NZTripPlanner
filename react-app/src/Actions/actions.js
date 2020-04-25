export const CHANGE_FROM_PLACE = 'CHANGE_FROM_PLACE'
export const CHANGE_TO_PLACE = 'CHANGE_TO_PLACE'
export const LOADING = 'LOADING';
export const TESTDATA = 'TESTDATA';

export const updateFromPlace = from => ({
    type: CHANGE_FROM_PLACE,
    payload: from,
  })
  
  export const updateToPlace = to => ({
    type: CHANGE_TO_PLACE,
    payload: to,
  })

  export const loading = () => {
    console.log('in actions.js ==>  loading method')
    return {
    type: LOADING,
  }}

  export const gettestdata = (data) => {
    console.log('in actions.js ==>  gettestdata method')
    return {
    type: TESTDATA,
    payload: data
  }
} 