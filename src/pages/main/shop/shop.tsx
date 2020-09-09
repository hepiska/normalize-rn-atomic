import React, { useEffect } from 'react'
import {
  View,
  StyleSheet,
  RefreshControl,
  InteractionManager,
  SafeAreaView,
} from 'react-native'
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
import Amplitude from 'amplitude-js'
import { onScroll } from 'react-native-redash'
import NavbarTopAnimated from '@components/molecules/navbar-top-animated'
import FeaturedCategory from '@components/organisms/featured-category-new'
import ShopLoader from '@components/atoms/loaders/shop'
import { makeGetShopPage } from '@modules/page/selector'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    justifyContent: 'flex-start',
  },
  firstSectionMargin: {
    // marginBottom: 12,
    marginVertical: 0,
    paddingVertical: 0,
  },
  sectionMargin: {
    marginVertical: 18,
  },
})

const { Value } = Animated

const y = new Value(0)

class ShopPage extends React.Component<any, any> {
  state = {
    finishAnimation: false,
    navbarLayout: {},
  }
  componentDidMount() {
    Amplitude.getInstance().logEvent('shop')
    InteractionManager.runAfterInteractions(() => {
      this._fetchData()
      this.setState({ finishAnimation: true })
    })
  }
  dimentionConstant = {
    imageHeight: globalDimention.jumbotronSize.height,
  }

  _fetchData = () => {
    this.props.getPage('shop')
  }

  _renderSection = (section, key) => {
    if (!section) return null
    switch (section.component) {
      case 'jumbotron':
        return (
          <Jumbotron
            key={`shop-${section.component}-${key}`}
            data={section.images}
            navigation={this.props.navigation}
            style={
              section.order <= 1
                ? styles.firstSectionMargin
                : styles.sectionMargin
            }
            navigateTarget="ProductList"
          />
        )
      case 'section-horizontal-list':
        return (
          <HorizontalList
            key={`shop-${section.component}-${key}`}
            navigation={this.props.navigation}
            style={styles.sectionMargin}
            data={section}
          />
        )
      case 'section-grid-list':
        return (
          <SectionGridList
            navigation={this.props.navigation}
            key={`shop-${section.component}-${key}`}
            data={section}
          />
        )
      default:
        return null
    }
  }

  setLayout = layout => {
    this.setState({
      navbarLayout: layout,
    })
  }

  render() {
    const { page, navigation, loading } = this.props
    if (!this.state.finishAnimation || loading) {
      return <ShopLoader />
    }

    return (
      <>
        <NavbarTopAnimated
          parentDim={{ coverheight: this.dimentionConstant.imageHeight }}
          showSearch
          showCart
          showLogo
          getLayout={this.setLayout}
          y={y}
        />

        <View style={styles.container}>
          <SafeAreaView
            style={{ marginTop: this.state.navbarLayout.height || 0 }}>
            {/* <FeaturedCategory
              key={'sections' + 'featured'}
              style={{ marginVertical: 6 }}
              navigation={navigation}
            /> */}
            <Animated.ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={this._fetchData}
                />
              }
              onScroll={onScroll({ y })}
              scrollEventThrottle={5}>
              <FeaturedCategory
                key={'sections' + 'featured'}
                style={{ marginVertical: 6 }}
                navigation={navigation}
              />
              {page.section &&
                page.section.map((_section, key) => {
                  console.log('section', page.section)
                  return this._renderSection(_section, key)
                })}
            </Animated.ScrollView>
          </SafeAreaView>
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
  const getShopPage = makeGetShopPage()

  return { page: getShopPage(state), loading: state.page.loading.shop }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)
