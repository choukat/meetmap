// Store/Reducers/eventReducer.js

const initialState = { event: [] }

function setEvent(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SET_EVENT' :
      nextState = {
        ...state,
        event: action.value
      }
      return nextState || setState
    default:
      return state
  }
}

export default setEvent
