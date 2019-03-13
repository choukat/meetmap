// Store/Reducers/mapReducer.js

const initialState = { localEvents: [] }

function setLocalEvents(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SET_LOCALEVENTS' :
      nextState = {
        ...state,
        localEvents: action.value
      }
      return nextState || setState
    default:
      return state
  }
}

export default setLocalEvents
