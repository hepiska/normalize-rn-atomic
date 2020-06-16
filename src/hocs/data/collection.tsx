import { connect } from 'react-redux'
import { makeSelectedCollections } from '@src/modules/collection/selector'

const collectionListMap = (state, ownProps) => {
  const getCollections = makeSelectedCollections()
  const collection = getCollections(
    state,
    ownProps.collectionId || ownProps.collectionsID,
  )
  return {
    collection,
  }
}
export function collectionListData(WrappedComponent) {
  return connect(collectionListMap, null)(WrappedComponent)
}
