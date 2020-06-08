import React, { Component, useState, memo } from 'react'
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  SectionList,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { colors } from '@utils/constants'
import {
  changeSelectedCategory,
  fetchCountProduct,
  setSelectedCategory,
} from '@modules/product-filter/action'
import { helveticaNormalFont } from '@components/commont-styles'
import { categoryListData } from '@hocs/data/category'
import SelectAbleItem, {
  SelectorShapeType,
} from '@components/molecules/filter-brand-item'

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

class FilterBrandOrg extends Component<any, any> {
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
    if (!categoryId) categoryId = +item.id
    else if (categoryId.includes(item.id)) {
      const regex = new RegExp(`(,${item.id})|(${item.id})`)
      categoryId = categoryId.replace(regex, '')
    } else {
      categoryId += ',' + item.id
    }
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
    this.props.setSelectedCategory(categoryId)
    this.props.fetchCountProduct({
      category_ids: categoryId || this.props.activeCategory,
      collection_ids: this.props.activeCollection,
      brand_ids: this.props.brans_ids,
      ...this.props.selectedPrice,
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
    const { categories } = this.props
    return (
      <View style={{ flex: 1, width }}>
        <SectionList
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

const mapStateToProps = state => {
  const categories = state.productFilter.data.categories || []
  return {
    categories: categories.map(_id => {
      return state.categories.data[_id]
    }),
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { changeSelectedCategory, fetchCountProduct, setSelectedCategory },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(FilterBrandOrg)
