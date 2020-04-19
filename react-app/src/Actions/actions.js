export const CHANGE_FROM_PLACE = 'CHANGE_FROM_PLACE'
export const CHANGE_TO_PLACE = 'CHANGE_TO_PLACE'

export const updateFromPlace = from => ({
    type: CHANGE_FROM_PLACE,
    payload: from,
  })
  
  export const updateToPlace = to => ({
    type: CHANGE_TO_PLACE,
    payload: to,
  })