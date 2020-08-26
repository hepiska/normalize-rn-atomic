import { createSelector } from 'reselect'

const getProduct = (state, productId) => state.products.data[productId]
const getRecommendedBeautyProductOrder = state =>
  state.products.specificQueryProduct.beauty
const getRecommendedFashionProductOrder = state =>
  state.products.specificQueryProduct.fashion

export const makeSelectedProducts = () =>
  createSelector([getProduct], products => {
    return products
  })

export const makeGetRecommendedBeautyOrder = () =>
  createSelector([getRecommendedBeautyProductOrder], products => {
    return products
  })

export const makeGetRecommendedFashionOrder = () =>
  createSelector([getRecommendedFashionProductOrder], products => {
    return products
  })
