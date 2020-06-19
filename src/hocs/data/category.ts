import { connect } from 'react-redux'
import { makeSelectedCategory } from '@modules/category/selector'

const categoryListMap = () => {
  const getCategories = makeSelectedCategory()

  return (state, ownProps) => {
    // const { categoryId } = ownProps
    // const category = state.categories.data[categoryId]
    // return {
    //   item: category,
    // }
    const category = getCategories(state, ownProps.categoryId)

    if (!category) return null
    return {
      item: category,
    }
  }
}
export function categoryListData(WrappedComponent) {
  return connect(categoryListMap, null)(WrappedComponent)
}
