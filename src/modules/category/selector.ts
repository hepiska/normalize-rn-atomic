import { createSelector } from 'reselect'

const getCategories = (state, categoryId) => state.categories.data[categoryId]
// const getProduct = (state, props) => state.products.data[props.productId]

export const makeSelectedCategory = () =>
  createSelector([getCategories], category => {
    return category
  })
// export const makeSelectedCategory = () =>
//   createSelector([getCategories, getProduct], (categories, products) => {
//     return products.categories.map(cat => )
//   })
