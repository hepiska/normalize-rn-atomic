import { createSelector } from 'reselect'

const getBrand = (state, brandId) => state.brands.data[brandId] || {}

export const makeSelectedBrands = () =>
  createSelector([getBrand], brand => {
    return brand
  })

const getSearchBrand = (state, brandId) => state.searchBrand.data[brandId] || {}

export const makeSelectedSearchBrands = () =>
  createSelector([getSearchBrand], brand => {
    return brand
  })
