
export const conversionReducer = (conversions => {
  return {
    type: "CONVERSIONS",
    payload: {
      conversions: conversions,
    }
  }
})
