import React from 'react'
import { Dimensions } from 'react-native'
import {
  Div,
  Font,
  // Image,
  // ScrollDiv,
  // PressAbbleDiv,
} from '@components/atoms/basic'
import Config from 'react-native-config'
import { Button } from '@components/atoms/button'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarTopAnimated from '@components/molecules/navbar-top-animated'
import CoverImageAnimated from '@src/components/organisms/cover-image-animated'
import ImagesWithPreviews from '@components/organisms/images-with-preview'
import ContentExpandable from '@components/molecules/content-expandable'
import ImageCoverContentLayout from '@src/components/layouts/image-cover-animated-content'
// import ProductOverviewCard from '@src/components/molecules/product-overview-card-body'
import ProductAttributes from '@components/organisms/product-attributes'
import Animated from 'react-native-reanimated'
import { colors } from '@src/utils/constants'
import { addCart } from '@modules/cart/action'
import RangePrice from '@components/molecules/range-price'
import Price from '@components/atoms/price'
import ButtonGroup from '@components/molecules/button-group'
import { fontStyle } from '@components/commont-styles'
import { GradientButton } from '@components/atoms/button'
import { getProductById } from '@modules/product/action'
import { setImage, deepClone } from '@utils/helpers'

const { Value } = Animated
const { width, height } = Dimensions.get('screen')

const y = new Value(0)

class ProductListPage extends React.Component<any, any> {
  state = {
    selectedVariant: 1,
    isUserSelectVariant: false,
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = () => {
    this.props.getProductById(this.props.route.params?.productId)
  }

  getVariantData = id => {
    const { product } = this.props
    const varian = product.variants.find(variant => variant.id === id)
    return varian || product.variants[0]
  }

  dimentionConstant = {
    imageHeight: Math.min(width * (3 / 2), height * 0.7),
  }

  _selectVariant = attributes => {
    const { product } = this.props
    const variant = product.variants.find(_variant => {
      const ismatch = _variant.attribute_values.reduce((acc, _att) => {
        const sellectedAtt = attributes.find(
          _attribute =>
            _attribute.attribute_id === _att.attribute_id &&
            _attribute.attribute_value_id === _att.attribute_value_id,
        )
        if (!sellectedAtt) {
          return acc && false
        }
        return acc && true
      }, true)
      return ismatch
    })
    if (variant) {
      this.setState({ selectedVariant: variant.id, isUserSelectVariant: true })
    }
  }

  static navigationOptions = {
    headerTransparent: true,
    headerShown: false,
  }

  openCartModal = () => {
    const { navigation, product } = this.props
    navigation.navigate('modals', {
      screen: 'CartModal',
      params: { product: product.id },
    })
  }

  groupButton = [
    { name: 'Save to Collection', icon: 'bookmark', onPress: () => {} },
    {
      name: 'Share',
      icon: 'share',
      onPress: () => {
        const { product } = this.props
        this.props.navigation.navigate('modals', {
          screen: 'Share',
          params: {
            title: 'The shonet product' + product.name,
            uri: Config.SHONET_URI + '/products/' + product.id,
            message: product.description,
          },
        })
      },
    },
  ]

  _addToCart = () => {
    if (this.state.isUserSelectVariant) {
      this.props.addCart({ variant_id: this.state.selectedVariant, qty: 1 })
    } else {
      this.openCartModal()
    }
  }

  render() {
    const { product, loading } = this.props
    const { selectedVariant, isUserSelectVariant } = this.state

    const varianData = this.getVariantData(selectedVariant)
    const price: any = {}
    if (!product.max_price_after_disc && !product.min_price_after_disc) {
      price.from = product.min_price
      price.to = product.max_price
      price.withDiscount = false
    } else {
      price.from = product.min_price_after_disc
      price.to = product.max_price_after_disc
      price.exFrom = product.min_price
      price.exTo = product.max_price
      price.withDiscount = true
    }

    return (
      <>
        <NavbarTopAnimated
          parentDim={{ coverheight: this.dimentionConstant.imageHeight }}
          showBack
          showSearch
          showCart
          y={y}
          Title={product.name}
        />
        <Div _width="100%" justify="flex-start">
          <CoverImageAnimated
            y={y}
            width={width}
            images={varianData.image_urls.map(url => ({
              uri: url,
            }))}
            height={this.dimentionConstant.imageHeight}>
            <ImagesWithPreviews
              size={{ width, height: this.dimentionConstant.imageHeight }}
              images={varianData.image_urls.map(url => ({
                uri: setImage(url, { width: 400, height: 600 }),
              }))}
            />
          </CoverImageAnimated>
          <ImageCoverContentLayout
            y={y}
            dimentionConstant={this.dimentionConstant}>
            <Div bg="white" _width="100%" padd="0px 16px 96px">
              <Div width="100%" align="flex-start" padd="16px 0px">
                <Font
                  style={fontStyle.futuraDemi}
                  size={18}
                  _margin="4px"
                  color={colors.black100}>
                  {product.brand.name}
                </Font>
                <Font size={18} _margin="4px" color={colors.gray3}>
                  {product.name}
                </Font>
                {isUserSelectVariant ? (
                  <Price
                    price={varianData.price}
                    discount_price={varianData.price_after_disc}
                  />
                ) : (
                  <RangePrice {...price} />
                )}
              </Div>
              {product.attributes && (
                <ProductAttributes
                  attributes={product.attributes}
                  onAllAttributesSelected={this._selectVariant}
                />
              )}
              <Button
                leftIcon="save"
                title="Available for return or exchange"
                onPress={() => {}}
                style={{
                  width: '100%',
                  marginVertical: 12,
                  justifyContent: 'flex-start',
                  height: 32,
                  backgroundColor: 'rgba(26, 26, 26, 0.04)',
                }}
              />
              <GradientButton
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#3067E4', '#8131E2']}
                title="Add to cart"
                onPress={this._addToCart}
                fontStyle={{
                  color: colors.white,
                  ...fontStyle.helveticaBold,
                  fontSize: 14,
                }}
                style={{
                  width: '100%',
                  height: 46,
                  marginVertical: 12,
                  backgroundColor: '#8131E2',
                }}
              />

              <ButtonGroup items={this.groupButton} />
              {product?.details?.map((detail, idx) => (
                <ContentExpandable
                  title={detail.type}
                  content={detail.content}
                  key={`product-detail-${idx}`}
                  id={'expanable' + idx}
                  isFirst={idx === 0}
                />
              ))}
            </Div>
          </ImageCoverContentLayout>
        </Div>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const _product = deepClone(
    state.products.data[ownProps.route.params?.productId],
  )
  _product.brand = state.brands.data[_product.brand]
  if (_product.attributes) {
    _product.attributes = _product.attributes.map(v => {
      return state.productAttribute.data[v]
    })
  }

  return {
    product: _product,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getProductById, addCart }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage)
