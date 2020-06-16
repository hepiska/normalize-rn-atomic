import { createSelector } from 'reselect'

const getCollection = (state, collectionId) =>
  state.collection.data[collectionId]

export const makeSelectedCollections = () =>
  createSelector([getCollection], collection => {
    return collection
  })
