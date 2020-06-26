import { connect } from 'react-redux'
import { makeSelectedCommerce } from '@src/modules/notification/commerce-selector'

const commerceListMap = () => {
  const getSelectedCommerce = makeSelectedCommerce()

  return (state, ownProps) => {
    const commerce = getSelectedCommerce(state, ownProps.commerceId)
    if (!commerce) return null
    return {
      commerce,
    }
  }
}

export function commerceListData(WrappedComponent) {
  return connect(commerceListMap, null)(WrappedComponent)
}
