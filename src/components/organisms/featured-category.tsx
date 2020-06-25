import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getFeaturedCategories } from '@modules/category/action'
import Pill from '@components/atoms/pill'
import { nestedScreenMap, colors } from '@utils/constants'
import { fontStyle } from '../commont-styles'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
  },
})

class FeaturedCategory extends React.Component<any, any> {
  componentDidMount() {
    this.props.getFeaturedCategories()
  }

  _onItemPress = slug => () => {
    const parsedUri = slug.split('/')
    const screenKey = parsedUri[parsedUri.length - 2]
    const screenParams = parsedUri[parsedUri.length - 1]
    if (screenKey) {
      const params = { from: screenKey }
      params[
        Number(screenParams) ? `${screenKey}Id` : `${screenKey}Slug`
      ] = screenParams

      const screen = nestedScreenMap(screenKey, params)
      this.props.navigation.navigate(screen.screen, screen.params)
    } else {
      const screen = nestedScreenMap(screenParams)
      this.props.navigation.navigate(screen.defaultScreen)
    }
  }

  _renderItem = ({ item }) => {
    return (
      <Pill
        title={item.title}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: colors.black50,
          backgroundColor: colors.black10,
          marginRight: 12, // real: 22
          paddingVertical: 10, // real: 13
          // paddingHorizontal: 15, // real: 15
        }}
        item={
          <Text
            style={{ ...fontStyle.helvetica, fontSize: 14, color: item.color }}>
            {item.title}
          </Text>
        }
        onPress={this._onItemPress(item.slug)}
      />
    )
  }

  _keyExtractor = (item, index) => {
    return `key-featured-category-${index}`
  }

  render() {
    const { categories, style } = this.props
    const composeStyle = { ...styles.container, ...style }
    const data = [
      { title: 'Sale', slug: 'collections/sales', color: colors.red1 },
      { title: 'New Arrival', slug: 'collections/new-arrival' },
      ...categories.map(category => ({
        title: category.name,
        slug: `categories/${category.slug}`,
      })),
      { title: 'Brand', slug: 'brands' },
    ]
    return (
      <View style={composeStyle}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={this._keyExtractor}
          data={data}
          renderItem={this._renderItem}
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
// export default FeaturedCategory
