import { deepClone } from '@utils/helpers'
import { createSelector } from 'reselect'

const getProduct = filter => filter

export const makeflatenFilter = () =>
  createSelector([getProduct], filter => {
    filter = { ...filter, ...filter.prices }
    delete filter.prices
    return filter
  })

export const getCategoryFilter = state => state.productFilter.data.categories
export const getCategoriesData = state => state.categories.data
export const getGlobalSearchCategoryFilter = state => {
  return state.globalSearchProductFilter.order.categories || []
}

export const makeMapFilterCategories = (
  getCategoryFilter: (state: any) => Array<any>,
  getCategoriesData: (state: any) => Array<any>,
) =>
  createSelector(
    [getCategoryFilter, getCategoriesData],
    (catfilter, catData) => {
      return catfilter.map(_id => {
        return catData[_id]
      })
    },
  )

const getAppliedFilter = state => state.productFilter.applied

export const makecloneAppliedFilter = () =>
  createSelector([getAppliedFilter], applied => {
    return deepClone(applied)
  })
