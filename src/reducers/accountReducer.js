const defaultState = {
  accounts: {
    1:{type:"EUR", amount: 1000}
  },
  history: []

}

const accountReducer = (state=defaultState, action) => {
  // console.log(action.payload.newAccount)
  switch(action.type){
    case "ADD_ACCOUNT":
    return {...state,
      accounts: Object.assign(state.accounts, action.payload.newAccount),
      history: state.history.concat(action.payload.newAccount)
    }
    case "UPDATE_ACCOUNT":
    return {...state,
      accounts: action.payload.updatedAccount
    }
    default: return state
  }
}

export default accountReducer

//
// const accountReducer = (state=defaultState, action) => {
//   // console.log(action.payload.newAccount)
//   let index = (Object.keys(state.accounts).length += 1)
//   switch(action.type){
//     case "ADD_ACCOUNT":
//     return {...state,
//       accounts: action.payload.newAccount
//     }
//     case "UPDATE_ACCOUNT":
//     return {...state,
//       accounts: "no"
//     }
//     default: return state
//   }
// }
