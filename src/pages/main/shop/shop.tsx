import React from 'react'
import { FlatList, Dimensions, View, StyleSheet, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { collectionApi } from '@modules/collection/action'
import { getPage } from '@modules/page/action'
import { deepClone } from '@utils/helpers'
import HorizontalList from '@components/organisms/horizontal-list'
import Jumbotron from '@components/organisms/jumbotron'
import SectionGridList from '@components/organisms/section-grid-list'
import Animated from 'react-native-reanimated'
import { globalDimention } from '@utils/constants'
import { onScroll } from 'react-native-redash'
import NavbarTopAnimated from '@components/molecules/navbar-top-animated'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
})

const { Value } = Animated

const y = new Value(0)

class ShopPage extends React.Component<any, any> {
  componentDidMount() {
    this.props.getPage('shop')
    this.props.navigation.setParams({ page: 'asadassasd' })
  }
  dimentionConstant = {
    imageHeight: globalDimention.jumbotronSize.height,
  }

  _renderSection = section => {
    if (!section) return null
    switch (section.component) {
      case 'jumbotron':
        return (
          <Jumbotron
            data={section.images}
            navigation={this.props.navigation}
            navigateTarget="ProductList"
          />
        )
      case 'section-horizontal-list':
        return <HorizontalList data={section} />
      case 'section-grid-list':
        return <SectionGridList data={section} />
      default:
        return null
    }
  }
  render() {
    const { page } = this.props

    return (
      <>
        <NavbarTopAnimated
          parentDim={{ coverheight: this.dimentionConstant.imageHeight }}
          showBars
          showSearch
          showCart
          y={y}
        />
        <View style={styles.container}>
          <Animated.ScrollView
            onScroll={onScroll({ y })}
            scrollEventThrottle={5}>
            {page.section &&
              page.section.map(_section => {
                return this._renderSection(_section)
              })}
          </Animated.ScrollView>
        </View>
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPage,
      collectionApi,
    },
    dispatch,
  )

const mapStateToProps = state => {
  let denormalizedPage: any = {}
  if (state.page.data.shop) {
    denormalizedPage = deepClone(state.page.data.shop)
    denormalizedPage.section = denormalizedPage.section
      .map(sectionId => state.page.section[sectionId])
      .sort((a, b) => {
        if (a.order > b.order) return 1
        if (a.order < b.order) return -1
        return 0
      })
  }

  return { page: denormalizedPage, loading: state.page.loading.shop }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)
