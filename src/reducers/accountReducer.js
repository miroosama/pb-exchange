const defaultState = {
  accounts: {
    1:{type:"EUR", amount: 1000}
  },
  history: []

}

const accountReducer = (state=defaultState, action) => {
  switch(action.type){
    case "ADD_ACCOUNT":
    return {...state,
      accounts: Object.assign(state.accounts, action.payload.newAccount)
    }
    case "UPDATE_ACCOUNT":
    return {...state,
      accounts: action.payload.updatedAccount
    }
    case "TRANSFER":
    return {...state,
      accounts: action.payload.updatedAccount
    }
    case "TRANSFER_HISTORY":
    return{
      ...state,
      history: state.history.concat(action.payload.updatedAccount)
    }
    default: return state
  }
}

export default accountReducer
