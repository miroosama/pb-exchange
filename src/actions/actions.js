
export const conversionAction = (conversions => {
  return {
    type: "CONVERSIONS",
    payload: {
      conversions: conversions,
    }
  }
})

export const addAccountAction = (newAccount => {
  return {
    type: "ADD_ACCOUNT",
    payload: {
      newAccount: newAccount,
    }
  }
})

export const updateAccountAction = (updatedAccount => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: {
      updatedAccount: updatedAccount,
    }
  }
})

export const transferAccountAction = (updatedAccount => {
  return {
    type: "TRANSFER",
    payload: {
      updatedAccount: updatedAccount,
    }
  }
})

export const transferAccountHistoryAction = (updatedAccount => {
  return {
    type: "TRANSFER_HISTORY",
    payload: {
      updatedAccount: updatedAccount,
    }
  }
})
