import { createSelector } from 'reselect'

const getBrand = (state, brandId) => state.brands.data[brandId] || {}

export const makeSelectedBrands = () =>
  createSelector([getBrand], brand => {
    return brand
  })
