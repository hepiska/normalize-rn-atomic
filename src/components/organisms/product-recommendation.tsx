import React from 'react'
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  InteractionManager,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { makeGetSpecificQueryProduct } from '@src/modules/product/selector'
import { fontStyle } from '../commont-styles'
import { getTrendingProduct } from '@src/modules/product/action'
import { Font } from '../atoms/basic'
import ProductCard from '@components/molecules/product-card-new'
import { productListData } from '@src/hocs/data/product'

interface ProductRecommendationType {
  category: 'fashion' | 'beauty'
  limit?: number
  offset?: number
  recommendedUserOrder?: any
  getTrendingProduct?: any
  title?: string
}

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  productCard: {
    width: width / 2 - 16,
    minHeight: 220,
    margin: 8,
  },
  productWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
})

const ProductWithCardHoc = productListData(ProductCard)

class ProductRecommendation extends React.PureComponent<
  ProductRecommendationType,
  any
> {
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      // this.setState({ finishAnimation: true })
      this._freshfetch()
    })
  }

  _freshfetch() {
    this._fetchProductRecommendation(this.props.category)
  }

  _fetchProductRecommendation = type => {
    this.props.getTrendingProduct(
      {
        limit: this.props.limit ? this.props.limit : 6,
        offset: this.props.offset ? this.props.offset : 0,
      },
      type,
    )
  }

  render() {
    const { recommendedUserOrder } = this.props
    // console.log('type', this.props.category)
    // console.log('data', recommendedUserOrder)
    return (
      <>
        {recommendedUserOrder && recommendedUserOrder.length > 0 && (
          <>
            <Font
              size={24}
              fontFamily={fontStyle.playfairBold.fontFamily}
              textAlign="center"
              _margin="20px 0px 25px 0px">
              {this.props.title}
            </Font>
            <View style={styles.productWrapper}>
              {recommendedUserOrder.map((_item, _index) => {
                return (
                  <ProductWithCardHoc
                    productId={_item}
                    key={'feed-prod-beauty-list' + _item + _index}
                    style={styles.productCard}
                  />
                )
              })}
            </View>
          </>
        )}
      </>
    )
  }
}

const mapStateToProps = (state, props) => {
  const getRecommendedUserOrder = makeGetSpecificQueryProduct(props.category)
  return {
    recommendedUserOrder: getRecommendedUserOrder(state),
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getTrendingProduct,
    },
    dispatch,
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductRecommendation)
