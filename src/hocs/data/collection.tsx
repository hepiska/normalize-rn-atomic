import React from 'react'
import { connect } from 'react-redux'

const collectionListMap = (state, ownProps) => {
  const { collectionId } = ownProps
  const collection = state.collection.data[collectionId]
  return {
    collection,
  }
}
export function collectionListData(WrappedComponent) {
  return connect(collectionListMap, null)(WrappedComponent)
}
