import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  makeMapFilterCategories,
  getCategoryFilter,
  getCategoriesData,
  getGlobalSearchCategoryFilter,
} from '@modules/product-filter/selector'
import {
  setSelectedPrice,
  changeSelectedCategory,
  fetchCountProduct,
  setSelectedCategory,
} from '@modules/product-filter/action'
import {
  getproductCategory,
  setSelectedPrice as globalSearchSetSelectedPrice,
  clearFilter as globalSearchClearFilter,
  applyFilter as globalSearchApplyFilter,
  setSelectedCategory as setglobalsearchFilterSelectedCategory,
  fetchCountProduct as setglobalsearchFilterCountProduct,
  getProductColor as globalSearchGetProductColor,
  changeSelectedColor as globalSearchchangeSelectedColor,
} from '@modules/global-search-product-filter/action'
import { clearFilter, applyFilter } from '@modules/product-filter/action'
import { deepClone } from '@utils/helpers'

import { removeCheckoutAddressData } from '@modules/checkout/action'
import { makeSelectedAddresses } from '@src/modules/address/selector'
import { exp } from 'react-native-reanimated'
import { colors } from '@src/utils/constants'

const collectionFilterCategoriesState = () => {
  const mapCategoriesfilter = makeMapFilterCategories(
    getCategoryFilter,
    getCategoriesData,
  )

  return state => {
    return {
      categories: mapCategoriesfilter(state),
      // categories: state.productFilter.data.categories.map(
      //   _cat => state.categories.data[_cat],
      // ),
      selectedPrice: state.productFilter.selected.price,
      activeCollection: state.productFilter.activePage.collection_ids || '',
      selectedBrand:
        state.productFilter.selected.brand_ids ||
        state.productFilter.activePage.brand_ids ||
        '',
      activeCategory: state.productFilter.activePage.category_ids || '',
      selectedCategory: state.productFilter.selected.category_ids
        ? state.productFilter.selected.category_ids
        : '',
    }
  }
}

const colectionFilterCategoriesDispatch = dispatch =>
  bindActionCreators(
    { changeSelectedCategory, fetchCountProduct, setSelectedCategory },
    dispatch,
  )

export function collectionFilterCategoriesData(WrappedComponent) {
  return connect(
    collectionFilterCategoriesState,
    colectionFilterCategoriesDispatch,
  )(WrappedComponent)
}

const globalSearchCategoriesDispatch = dispatch =>
  bindActionCreators(
    {
      fetchCategory: getproductCategory,
      setSelectedCategory: setglobalsearchFilterSelectedCategory,
      fetchCountProduct: setglobalsearchFilterCountProduct,
    },
    dispatch,
  )

const globalSearchCategoriesMap = () => {
  const mapCategoriesfilter = makeMapFilterCategories(
    getGlobalSearchCategoryFilter,
    getCategoriesData,
  )

  return state => {
    return {
      categories: mapCategoriesfilter(state),
      loading: state.globalSearchProductFilter.loading,
      selectedPrice: state.globalSearchProductFilter.selected.price,
      selectedBrand: state.globalSearchProductFilter.selected.brand_ids || '',
      selectedCategory:
        state.globalSearchProductFilter.selected.category_ids || '',
    }
  }
}

export function globalSearchCategoriesData(WrappedComponent) {
  return connect(
    globalSearchCategoriesMap,
    globalSearchCategoriesDispatch,
  )(WrappedComponent)
}

const productFilterActionDispatch = dispatch =>
  bindActionCreators({ clearFilter, applyFilter, fetchCountProduct }, dispatch)

const productFilterActionState = state => {
  console.log(state.productFilter.selected)
  return {
    selectedFilter: state.productFilter.selected,
    selectedCategories: state.productFilter.selected.category_ids,
    count: state.productFilter.countedProducts.count,
    isLoading: state.productFilter.countedProducts.isLoading,
  }
}

export const productFilterActionData = WrappedComponent => {
  return connect(
    productFilterActionState,
    productFilterActionDispatch,
  )(WrappedComponent)
}

const globalSearchActionDispatch = dispatch =>
  bindActionCreators(
    {
      clearFilter: globalSearchClearFilter,
      applyFilter: globalSearchApplyFilter,
      fetchCountProduct: setglobalsearchFilterCountProduct,
    },
    dispatch,
  )

const globalSearchActionState = state => {
  const selectedFilter = {
    ...deepClone(state.globalSearchProductFilter.selected),
    maximum_price:
      state.globalSearchProductFilter.selected.prices.maximum_price,
    minimum_price:
      state.globalSearchProductFilter.selected.prices.minimum_price,
  }
  delete selectedFilter.prices

  return {
    count: state.globalSearchProductFilter.countedProducts.count,
    searchKey: state.globalSearchUi.searchKey,
    selectedFilter,
    isLoading: state.globalSearchProductFilter.countedProducts.isLoading,
  }
}

export const globalSearchActionData = WrappedComponent => {
  return connect(
    globalSearchActionState,
    globalSearchActionDispatch,
  )(WrappedComponent)
}

const productFilterPriceDispatch = dispatch =>
  bindActionCreators(
    {
      setSelectedPrice,
      fetchCountProduct,
    },
    dispatch,
  )

const productFilterPriceState = state => ({
  colectionPrices: { ...state.productFilter.data.prices } || {},
  minimum_price: state.productFilter.selected.prices.minimum_price,
  maximum_price: state.productFilter.selected.prices.maximum_price,
  activeCollection: state.productFilter.activePage.collection_ids || '',
  selectedCategory:
    state.productFilter.selected.category_ids ||
    state.productFilter.activePage.category_ids ||
    '',
  selectedBrand:
    state.productFilter.selected.brand_ids ||
    state.productFilter.activePage.brand_ids ||
    '',
})

export const productFilterPriceData = WrappedComponent => {
  return connect(
    productFilterPriceState,
    productFilterPriceDispatch,
  )(WrappedComponent)
}

const globalSearchFilterPriceDispatch = dispatch =>
  bindActionCreators(
    {
      setSelectedPrice: globalSearchSetSelectedPrice,
      fetchCountProduct: setglobalsearchFilterCountProduct,
    },
    dispatch,
  )

const globalSearchFilterPriceState = state => ({
  colectionPrices: { ...state.globalSearchProductFilter.order.prices } || {},
  minimum_price: state.globalSearchProductFilter.selected.prices.minimum_price,
  maximum_price: state.globalSearchProductFilter.selected.prices.maximum_price,
  selectedCategory: state.globalSearchProductFilter.selected.category_ids || '',
  selectedBrand: state.globalSearchProductFilter.selected.brand_ids || '',
})

export const globalSearchFilterPriceData = WrappedComponent => {
  return connect(
    globalSearchFilterPriceState,
    globalSearchFilterPriceDispatch,
  )(WrappedComponent)
}

const globalSearchFilterColorDispatch = dispatch =>
  bindActionCreators(
    {
      getProductColor: globalSearchGetProductColor,
      changeSelectedColor: globalSearchchangeSelectedColor,
    },
    dispatch,
  )
const globalSearchFilterColorState = () => {
  return state => ({
    colors: state.globalSearchProductFilter.order.colors,
  })
}

export const globalSearchFilterColorData = WrappedComponent => {
  return connect(
    globalSearchFilterColorState,
    globalSearchFilterColorDispatch,
  )(WrappedComponent)
}
