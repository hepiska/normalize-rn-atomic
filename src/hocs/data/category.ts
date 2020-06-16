import { connect } from 'react-redux'
import { makeSelectedCategory } from '@modules/category/selector'

const categoryListMap = (state, ownProps) => {
  // const { categoryId } = ownProps
  // const category = state.categories.data[categoryId]
  // return {
  //   item: category,
  // }
  const getCategories = makeSelectedCategory()
  const category = getCategories(state, ownProps.categoryId)

  if (!category) return null
  return {
    item: category,
  }
}
export function categoryListData(WrappedComponent) {
  return connect(categoryListMap, null)(WrappedComponent)
}
