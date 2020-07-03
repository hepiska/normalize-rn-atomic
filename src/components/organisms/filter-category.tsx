import React, { Component } from 'react'
import { Dimensions, StyleSheet, SectionList, View } from 'react-native'
import { connect, batch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { colors } from '@utils/constants'
import isEqual from 'lodash/isEqual'
import {
  changeSelectedCategory,
  fetchCountProduct,
  setSelectedCategory,
} from '@modules/product-filter/action'
import { categoryListData } from '@hocs/data/category'
import SelectAbleItem, {
  SelectorShapeType,
} from '@components/molecules/filter-brand-item'

import { makeMapFilterCategories } from '@modules/product-filter/selector'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  itemFont: {
    color: colors.black70,
    fontSize: 14,
  },
  sectionHeader: {
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 16,
  },
})

const isAllChildernIncluded = (children, str) => {
  let res = true
  for (let i = 0; i < children?.length; i++) {
    res = res && str.includes(children[i])
    if (!res) {
      return res
    }
  }
  return res
}

const CategoryListItem = categoryListData(SelectAbleItem)

class FilterCategory extends Component<any, any> {
  state = {
    selectedCategory: this.props.selectedCategory,
  }

  timer = null

  shouldComponentUpdate(nextProps, nextState) {
    const { state, props } = this

    if (state.selectedCategory !== nextState.selectedCategory) {
      return true
    }
    return false
  }

  _renderItem = ({ item }) => {
    return (
      <CategoryListItem
        selectorShape={SelectorShapeType.circle}
        key={item.id}
        style={{ paddingLeft: 16 }}
        fontStyle={styles.itemFont}
        onPress={this._setFilter}
        isSelected={this.state.selectedCategory.includes(item)}
        categoryId={item}
      />
    )
  }

  _setFilter = item => {
    let categoryId = this.state.selectedCategory
    const regex = new RegExp(`(,${item.id})|(${item.id})`)

    if (categoryId.includes(item.id)) {
      categoryId = categoryId.replace(regex, '')
    } else {
      categoryId += ',' + item.id
    }

    this.setState({ selectedCategory: categoryId }, () => {
      this._dispatchCategoryChange(categoryId)
    })
  }

  _dispatchCategoryChange = categoryId => {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    } else {
      this.timer = setTimeout(() => {
        batch(() => {
          const params = {
            category_ids: categoryId || this.props.activeCategory,
            brand_ids: this.props.brans_ids,
            ...this.props.selectedPrice,
          }
          if (this.props.activeCollection === 'sales') {
            params.is_disc = true
          } else {
            params.collection_ids
          }
          this.props.setSelectedCategory(categoryId)
          this.props.fetchCountProduct(params)
        })
        this.timer = null
      }, 100)
    }
  }

  _headerSelected = isSelected => item => {
    let categoryId = this.state.selectedCategory || ''
    if (isSelected) {
      item.children.forEach(child => {
        if (categoryId.includes(child)) {
          const regex = new RegExp(`(,${child})|(${child})`)
          categoryId = categoryId.replace(regex, '')
        }
      })
    } else {
      item.children.forEach(child => {
        if (!categoryId) categoryId += child
        else if (!categoryId.includes(child)) {
          categoryId += ',' + child
        }
      })
    }

    this.setState({ selectedCategory: categoryId }, () => {
      this._dispatchCategoryChange(categoryId)
    })
  }

  _renderSectionHeader = ({ section }) => {
    const isSelected = isAllChildernIncluded(
      section.children,
      this.state.selectedCategory,
    )
    return (
      <SelectAbleItem
        key={section.id}
        selectorShape={SelectorShapeType.circle}
        style={styles.sectionHeader}
        fontStyle={styles.itemFont}
        onPress={this._headerSelected(isSelected)}
        isSelected={isSelected}
        item={section}
      />
    )
  }
  _keyExtractor = (item, index) => '' + item.id + index

  render() {
    const { categories } = this.props
    const { selectedCategory } = this.state

    return (
      <View style={{ flex: 1, width, backgroundColor: 'white' }}>
        <SectionList
          extraData={selectedCategory}
          style={styles.sectionContainer}
          keyExtractor={this._keyExtractor}
          renderSectionHeader={this._renderSectionHeader}
          sections={categories}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const mapStateToProps = () => {
  const mapCategoriesfilter = makeMapFilterCategories()

  return state => {
    return {
      categories: mapCategoriesfilter(state),
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { changeSelectedCategory, fetchCountProduct, setSelectedCategory },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(FilterCategory)
