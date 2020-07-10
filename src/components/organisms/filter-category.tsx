import React, { Component } from 'react'
import { Dimensions, StyleSheet, SectionList, View } from 'react-native'
import { batch } from 'react-redux'
import { colors } from '@utils/constants'
import { categoryListData } from '@hocs/data/category'
import FilterListLoader from '@components/atoms/loaders/filter-list'
import SelectAbleItem, {
  SelectorShapeType,
} from '@src/components/molecules/selectable-item'

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
  skip = 0
  limit = 20
  lastskip = 0

  componentDidMount() {
    this._freshfetch()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedCategory !== this.props.selectedCategory &&
      this.props.selectedCategory === ''
    ) {
      this.setState({ selectedCategory: this.props.selectedCategory })
    }
  }

  _freshfetch = () => {
    this.skip = 0
    this._fetchData(this.skip)
  }

  _fetchData = skip => {
    const params = {
      offset: skip * this.limit,
      limit: this.limit,
    }
    if (this.props.fetchCategory) {
      this.props.fetchCategory(params)
    }
  }

  _fetchMore = () => {
    if (!this.props.loading) {
      const newskip = this.skip + 1
      if (newskip > this.lastskip) {
        this.skip = newskip
        this.lastskip = newskip
      }
      if (this.props.loading) {
        return
      }
      this._fetchData(this.skip)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { state, props } = this
    if (state.selectedCategory !== nextState.selectedCategory) {
      return true
    }
    if (
      nextProps.selectedCategory !== props.selectedCategory &&
      nextProps.selectedCategory === ''
    ) {
      return true
    }

    if (props.categories.length !== nextProps.categories.length) {
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
          // this.props.fetchCountProduct(params)
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
    const { categories, loading } = this.props
    const { selectedCategory } = this.state

    const firstLoading = loading && this.skip < 1

    return (
      <View style={{ flex: 1, width, backgroundColor: 'white' }}>
        {firstLoading ? (
          <FilterListLoader />
        ) : (
          <SectionList
            extraData={selectedCategory}
            // onEndReached={this._fetchMore}
            onEndReachedThreshold={0.98}
            style={styles.sectionContainer}
            keyExtractor={this._keyExtractor}
            renderSectionHeader={this._renderSectionHeader}
            sections={categories}
            renderItem={this._renderItem}
          />
        )}
      </View>
    )
  }
}

export default FilterCategory
