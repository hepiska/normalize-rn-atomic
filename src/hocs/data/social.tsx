import { connect } from 'react-redux'
import { makeSelectedSocial } from '@src/modules/notification/social-selector'

const socialListMap = () => {
  const getSelectedSocial = makeSelectedSocial()
  return (state, ownProps) => {
    const social = getSelectedSocial(state, ownProps.socialId)
    if (!social) return null
    return {
      social,
    }
  }
}

export function socialListData(WrappedComponent) {
  return connect(socialListMap, null)(WrappedComponent)
}
