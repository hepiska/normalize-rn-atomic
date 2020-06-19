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
  shouldComponentUpdate(nextProps, nextState) {
    const { state, props } = this

    if (props.selectedCategory !== nextProps.selectedCategory) {
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
        isSelected={this.props.selectedCategory.includes(item)}
        categoryId={item}
      />
    )
  }
  _setFilter = item => {
    this.props.changeSelectedCategory(item.id)
    let categoryId = this.props.selectedCategory
    this.props.fetchCountProduct({
      category_ids: categoryId || this.props.activeCategory,
    })
  }

  _headerSelected = isSelected => item => {
    let categoryId = this.props.selectedCategory || ''
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
    batch(() => {
      this.props.setSelectedCategory(categoryId)
      this.props.fetchCountProduct({
        category_ids: categoryId || this.props.activeCategory,
        collection_ids: this.props.activeCollection,
        brand_ids: this.props.brans_ids,
        ...this.props.selectedPrice,
      })
    })
  }

  _renderSectionHeader = ({ section }) => {
    const isSelected = isAllChildernIncluded(
      section.children,
      this.props.selectedCategory,
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
    const { categories, selectedCategory } = this.props
    console.log('rerender cat')
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
