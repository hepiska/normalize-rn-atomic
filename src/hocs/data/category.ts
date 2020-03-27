import { connect } from 'react-redux'

const categoryListMap = (state, ownProps) => {
  const { categoryId } = ownProps
  const category = state.categories.data[categoryId]
  return {
    item: category,
  }
}
export function categoryListData(WrappedComponent) {
  return connect(categoryListMap, null)(WrappedComponent)
}
