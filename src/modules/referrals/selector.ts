import { createSelector } from 'reselect'

const getNewReferrralUser = state =>
  state.referrals.newOrder.map(_id => state.user.data[_id])

export const makeGetNewreferrralUser = () =>
  createSelector([getNewReferrralUser], users => {
    return users
  })
