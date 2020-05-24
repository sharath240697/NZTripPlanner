export const CHANGE_FROM_PLACE = 'CHANGE_FROM_PLACE'
export const CHANGE_TO_PLACE = 'CHANGE_TO_PLACE'
export const LOADING = 'LOADING';
export const TESTDATA = 'TESTDATA';
export const FROMTOVALIDATION = 'FROMTOVALIDATION'
export const SAVENEARBYATTRACTIONS = 'SAVENEARBYATTRACTIONS'
export const SAVENEARBYLODGINGS = 'SAVENEARBYLODGINGS'
export const SETBROWSERLOCATION = 'SETBROWSERLOCATION'
export const ADDPLACETOMAP = 'ADDPLACETOMAP'
export const REMOVEPLACEFROMMAP = 'REMOVEPLACEFROMMAP'
export const SAVEOAUTHDATA = 'SAVEOAUTHDATA'
export const STOREWEATHER = 'STOREWEATHER'
export const STORESAVEDTRIPS = 'STORESAVEDTRIPS'
export const SETSAVEPROGRESS = 'SETSAVEPROGRESS'

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
  }
}

export const gettestdata = (data) => {
  console.log('in actions.js ==>  gettestdata method')
  return {
    type: TESTDATA,
    payload: data
  }
}

export const setfromtovalidation = (validationstate) => {
  console.log('in action.js ==> setfromtovalidation method');
  return {
    type: FROMTOVALIDATION,
    payload: validationstate
  }
}

export const savenearbyattractions = (data) => {
  console.log('in action.js ==> setnearbyattraction method')
  console.log(data)
  return {
    type: SAVENEARBYATTRACTIONS,
    payload: data
  }
}

export const savenearbylodgings = (data) => {
  console.log('in action.js ==> setnearbyattraction method')
  console.log(data)
  return {
    type: SAVENEARBYLODGINGS,
    payload: data
  }
}

export const setbrowserlocation = (browserlocation) => {
  console.log('in action.js ==> setbrowserlocation method')
  console.log(browserlocation)
  return {
    type: SETBROWSERLOCATION,
    payload: browserlocation
  }
}

export const addplacetomap = (place) => {
  console.log('called add place actions')
  return {
    type: ADDPLACETOMAP,
    payload: place
  }
}

export const removeplacefrommap = (place) => {
  console.log('called remove place actions')
  return {
    type: REMOVEPLACEFROMMAP,
    payload: place
  }
}

export const saveOathDetails = (data) => {
  console.log('save oauth action')
  return {
    type: SAVEOAUTHDATA,
    payload: data
  }
}

export const storeweatherdata = (data) => {
  return {
    type: STOREWEATHER,
    payload: data
  }
}

export const storeSavedTrips = (data) => {
  return {
    type: STORESAVEDTRIPS,
    payload: data
  }
}

export const setSaveProgress = (data) => {
  return {
    type: SETSAVEPROGRESS,
    payload: data
  }
}
