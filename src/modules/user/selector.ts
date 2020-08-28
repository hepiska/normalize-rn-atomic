import { createSelector } from 'reselect'

const getUser = (state, userId) => state.user.data[userId] || {}
const getRecommendedUserOrder = (state) => state.user.recommendedUserOrer || {}

export const makeGetUser = () =>
  createSelector([getUser], user => {
    return user
  })

export const makeGetRecommendedUserOrder = () =>
  createSelector([getRecommendedUserOrder], order => {
    return order
  })
