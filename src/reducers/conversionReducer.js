const defaultState = {
  conversions: {}
}

export default function conversionReducer(state = defaultState, action){
  switch(action.type){
    case "CONVERSIONS":
    return {...state,
      conversions: action.payload.conversions.rates
    }
    default: return state
  }
}
