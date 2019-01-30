const defaultState = {
  accounts: [
    {type:"USD", amount: 1000},
    {type:"EUR", amount: 0},
    {type:"CHF", amount: 0}
  ]


}

const accountReducer = (state=defaultState, action) => {
  return state
}

export default accountReducer
