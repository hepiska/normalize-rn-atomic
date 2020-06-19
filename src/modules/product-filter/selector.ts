import { deepClone } from '@utils/helpers'
import { createSelector } from 'reselect'

const getProduct = filter => filter

export const makeflatenFilter = () =>
  createSelector([getProduct], filter => {
    filter = { ...filter, ...filter.prices }
    delete filter.prices
    return filter
  })

const getCategoryFilter = state => state.productFilter.data.categories
const getCategoriesData = state => state.categories.data

export const makeMapFilterCategories = () =>
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
