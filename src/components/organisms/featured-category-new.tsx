import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getFeaturedCategories } from '@modules/category/action'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '@src/utils/constants'

const styles = StyleSheet.create({
  activeStyle: {
    borderBottomColor: colors.black100,
    borderBottomWidth: 2,
  },
  disabled: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
  },
})
class FeaturedCategory extends React.Component<any, any> {
  state = {
    selectedItem: 0,
  }
  onPress = idx => () => {
    this.setState({
      selectedItem: idx,
    })
  }
  componentDidMount() {
    this.props.getFeaturedCategories()
  }

  _keyExtractor = (item, index) => {
    return `key-featured-category-${index}`
  }

  _renderItem = ({ item, idx }) => {
    const style =
      this.state.selectedItem === idx ? styles.activeStyle : styles.disabled
    const activeText =
      this.state.selectedItem === idx ? colors.black100 : colors.black60
    return (
      <TouchableOpacity style={{ ...style }} onPress={this.onPress(idx)}>
        <Text
          style={{
            padding: 8,
            color: activeText,
          }}>
          {item.title.toUpperCase()}
        </Text>
      </TouchableOpacity>
    )
  }
  _separator = () => {
    return <View style={{ width: 16 }} />
  }

  render() {
    const { categories, style } = this.props
    const data = [
      { title: 'Sale', slug: 'collections/sales' },
      { title: 'New Arrival', slug: 'collections/new-arrival' },
      ...categories.map(category => ({
        title: category.name,
        slug: `categories/${category.slug}`,
      })),
      { title: 'Brand', slug: 'brands' },
    ]

    return (
      <View style={{ borderBottomColor: colors.black50, borderBottomWidth: 1 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={this._keyExtractor}
          data={data}
          renderItem={({ item, index }) => {
            const data = {
              item: item,
              idx: index,
            }
            return this._renderItem(data)
          }}
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
          ItemSeparatorComponent={this._separator}
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getFeaturedCategories }, dispatch)

const mapStateToProps = state => ({
  categories: state.categories.featured.map(_id => state.categories.data[_id]),
})
export default connect(mapStateToProps, mapDispatchToProps)(FeaturedCategory)
