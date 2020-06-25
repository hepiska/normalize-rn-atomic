import { connect } from 'react-redux'
import { makeSelectedAnnouncement } from '@src/modules/notification/announcement-selector'

const announcementListMap = () => {
  const getSelectedAnnouncement = makeSelectedAnnouncement()

  return (state, ownProps) => {
    const announcement = getSelectedAnnouncement(state, ownProps.announcementId)
    if (!announcement) return null
    return {
      announcement,
    }
  }
}

export function announcementListData(WrappedComponent) {
  return connect(announcementListMap, null)(WrappedComponent)
}
