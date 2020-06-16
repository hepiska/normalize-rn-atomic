import { createSelector } from 'reselect'

const getCategories = state => state.categories.data
const getProduct = (state, props) => state.products.data[props.productId]

// export const makeSelectedCategory = () =>
//   createSelector([getCategories, getProduct], (categories, products) => {
//     return products.categories.map(cat => )
//   })
