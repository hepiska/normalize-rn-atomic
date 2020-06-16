import { createSelector } from 'reselect'

const getUser = (state, userId) => state.user.data[userId] || {}

export const makeGetUser = () =>
  createSelector([getUser], user => {
    return user
  })
