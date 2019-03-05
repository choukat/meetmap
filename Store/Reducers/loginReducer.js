// Store/Reducers/loginReducer.js

const initialState = { name: "", email: "", logged: false }

function setProfile(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SET_NAME' :
      nextState = {
        ...state,
        name: action.value
      }
      return nextState || setState
    case 'SET_EMAIL' :
      nextState = {
        ...state,
        email: action.value
      }
      return nextState || setState
    case 'LOGIN' :
        nextState = {
          ...state,
          logged: true
      }
      return nextState || setState
    case 'LOGOUT' :
      return initialState
    default:
      return state
  }
}

export default setProfile
