import { createSelector } from 'reselect'

const getSavedproduct = (state, props) =>
  state.productsSaved.data[props.productId]

const getSavedProductOrder = state => state.productsSaved.order

export const makeIsSaved = () =>
  createSelector([getSavedproduct], products => {
    return !!products
  })

export const makeSlicedProductSaved = () =>
  createSelector([getSavedProductOrder], productOrder => {
    return productOrder.slice(0, 4)
  })
