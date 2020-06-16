import { deepClone } from '@utils/helpers'
import { createSelector } from 'reselect'

const getProduct = product => product

export const makeCloneProduct = () =>
  createSelector([getProduct], product => {
    return deepClone(product)
  })

const getData = data => data

export const makeDeepClone = () =>
  createSelector([getData], data => {
    return deepClone(data)
  })
