import { createSelector } from 'reselect'

const getSavedproduct = (state, props) =>
  state.productsSaved.data[props.productId]

export const makeIsSaved = () =>
  createSelector([getSavedproduct], products => {
    return !!products
  })
