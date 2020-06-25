import { createSelector } from 'reselect'

const getAnnouncement = (state, props) =>
  state.notifications.data.announcement[props]

export const makeSelectedAnnouncement = () =>
  createSelector([getAnnouncement], announcement => {
    return announcement
  })
