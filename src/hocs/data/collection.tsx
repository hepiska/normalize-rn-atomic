import { connect } from 'react-redux'

const collectionListMap = (state, ownProps) => {
  const collectionId = ownProps.collectionId || ownProps.collectionsID
  const collection = state.collection.data[collectionId]
  return {
    collection,
  }
}
export function collectionListData(WrappedComponent) {
  return connect(collectionListMap, null)(WrappedComponent)
}
