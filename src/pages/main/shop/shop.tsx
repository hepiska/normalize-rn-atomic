import React from 'react'
import { FlatList, Dimensions, View, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { collectionApi } from '@modules/collection/action'
import { getPage } from '@modules/page/action'
import { deepClone } from '@utils/helpers'
import { collectionListData } from '@hocs/data/collection'
import InviniteLoader from '@components/atoms/loaders/invinite'
import { Font, PressAbbleDiv } from '@components/atoms/basic'
import Jumbotron from '@components/organisms/jumbotron'
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
    this.props.collectionApi()
    this.props.getPage('shop')
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
      default:
        return null
    }
  }
  render() {
    const { navigation, page, loading } = this.props
    const dummyPost = {
      id: 82,
      type: 'image',
      component: 'jumbotron',
      title: '',
      subtitle: '',
      link: '',
      link_text: '',
      image_urls: null,
      order: 1,
      images: [
        {
          id: 27,
          image_url:
            'https://ecs7.tokopedia.net/img/banner/2020/3/20/85531617/85531617_2d947b4e-eb8a-40c1-ba26-ccf06058bac9.jpg',
          target_url: '/collections/rafie-botaks',
        },
        {
          id: 28,
          image_url:
            'https://ecs7.tokopedia.net/img/banner/2020/3/20/85531617/85531617_a2ac7b8f-c63e-4739-ae7b-dbb77f4a7338.jpg',
          target_url: '/collections/rafie-botak',
        },
      ],
    }

    return (
      <>
        <NavbarTopAnimated
          parentDim={{ coverheight: this.dimentionConstant.imageHeight }}
          showBack
          showSearch
          showCart
          y={y}
          Title="bla bla"
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
    denormalizedPage.section = denormalizedPage.section.map(
      sectionId => state.page.section[sectionId],
    )
  }

  return { page: denormalizedPage, loading: state.page.loading.shop }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)
