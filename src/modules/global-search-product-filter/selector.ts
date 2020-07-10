import { createSelector } from 'reselect'
import { deepClone } from '@utils/helpers'

const getAppliedFilter = state => state.globalSearchProductFilter.applied

export const getBrands = state => state.brands.data
export const getGlobalSearchBrandOrder = state =>
  state.globalSearchProductFilter.order.brands

export const makeGetGroupBrandSelector = (
  getOrder: (state: any) => Array<any>,
  getData: (any) => any,
) =>
  createSelector([getOrder, getData], (order, data) => {
    let res = (order || [])
      .map(or => data[or])
      .reduce((acc, current) => {
        const regex = /[a-z,A-Z]/
        const firstChar = regex.test(current.name[0])
          ? current.name[0].toUpperCase()
          : '#'
        if (acc[firstChar]) {
          acc[firstChar].data.push(current)
        } else {
          acc[firstChar] = { data: [current] }
        }
        return acc
      }, {})
    res = Object.keys(res)
      .map(key => ({
        title: key,
        data: res[key].data,
      }))
      .sort((a, b) => {
        if (a.title > b.title) return 1
        if (a.title < b.title) return -1
        return 0
      })
    return res
  })

export const makeMapAppliedFilters = () =>
  createSelector([getAppliedFilter], applied => {
    const newApplied = { ...deepClone(applied), ...applied.prices }
    delete newApplied.prices
    return newApplied
  })
