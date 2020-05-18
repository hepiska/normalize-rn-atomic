import React from 'react'
import { Dimensions, View, Text } from 'react-native'
import {
  Div,
  Font,
  Image,
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
import HTML from 'react-native-render-html'
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
import { setImage, deepClone, getDetailContent } from '@utils/helpers'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
  addProductSaved,
  deleteProductSaved,
} from '@modules/product-saved/action'
import CircleLoader from '@components/atoms/loaders/cirle'

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

  _filterVariants = attribute => {
    const { product } = this.props
    const variants = product.variants.filter(_var => {
      return _var.attribute_values.find(
        _att =>
          _att.attribute_id === attribute.attribute_id &&
          _att.attribute_value_id === attribute.attribute_value_id,
      )
    })

    const filteredAttributes = variants.reduce((sum, _variant) => {
      _variant.attribute_values.forEach(_attribute => {
        if (sum[_attribute.attribute_id]) {
          if (
            !sum[_attribute.attribute_id].values.includes(
              _attribute.attribute_value_id,
            )
          ) {
            sum[_attribute.attribute_id].values.push(
              _attribute.attribute_value_id,
            )
          }
        } else {
          sum[_attribute.attribute_id] = {}
          sum[_attribute.attribute_id].values = [_attribute.attribute_value_id]
        }
      })
      return sum
    }, {})
    delete filteredAttributes[attribute.attribute_id]
    this.setState({ filteredAttributes })
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

  onSaveProduct = () => {
    const { isSaved, product, deleteProductSaved, addProductSaved } = this.props

    const onSave = isSaved
      ? deleteProductSaved(product.id)
      : addProductSaved(product.id)
    return onSave
  }

  groupButton = isSaved => {
    return [
      {
        name: isSaved ? 'Saved' : 'Save',
        icon: 'bookmark',
        iconColor: isSaved ? '#8131e2' : colors.black100,
        onPress: this.onSaveProduct,
        apasih: isSaved,
      },
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
              message: 'Shop ' + product.name + ' at The Shonet',
            },
          })
        },
      },
    ]
  }

  _addToCart = () => {
    if (!this.props.isAuth) {
      this.props.navigation.navigate('modals', { screen: 'LoginModal' })
    } else {
      if (this.state.isUserSelectVariant) {
        this.props.addCart({ variant_id: this.state.selectedVariant, qty: 1 })
      } else {
        this.openCartModal()
      }
    }
  }

  _addToCollection = () => {}

  render() {
    const { product, loading, isSaved } = this.props
    const { selectedVariant, isUserSelectVariant, filteredAttributes } = this
      .state as any
    let returnExchange = ''
    if (
      product.flags?.includes('returnable') &&
      product.flags?.includes('exchangeable')
    ) {
      returnExchange = 'return or exchange'
    } else if (product.flags?.includes('returnable')) {
      returnExchange = 'return'
    } else if (product.flags?.includes('exchangeable')) {
      returnExchange = 'exchange'
    }

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

    const productType = product.is_commerce ? 'cart' : 'collection'
    const actionButton = {
      cart: {
        buttonText: 'Add to cart',
        action: this._addToCart,
      },
      collection: {
        buttonText: 'Add to Collection',
        action: this._addToCollection,
      },
    }

    let userSaveProduct = []
    if (product.saved && product.saved.user) {
      userSaveProduct.push(
        <Font
          key="product-save-username"
          style={{
            ...fontStyle.helveticaBold,
            color: colors.black100,
            fontSize: 12,
          }}>
          {product.saved.user[0].name}
        </Font>,
      )
      if (product.saved.count > 1) {
        userSaveProduct.push(
          <React.Fragment key="product-save-wrapper">
            <Font key="product-save-connection">{` and `}</Font>
            <Font
              key="product-save-count"
              style={{
                ...fontStyle.helveticaBold,
                color: colors.black100,
                fontSize: 12,
              }}>
              {product.saved.count - 1 + ' others'}
            </Font>
          </React.Fragment>,
        )
      }
      userSaveProduct.push(<Font key="product-save-end">{` saved this`}</Font>)
    }
    return (
      <>
        <NavbarTopAnimated
          parentDim={{ coverheight: this.dimentionConstant.imageHeight }}
          showBack
          showSearch
          showCart
          y={y}
          title={product.name}
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
                  filteredAttributes={filteredAttributes}
                  onAttributesChanged={this._filterVariants}
                  attributes={product.attributes}
                  onAllAttributesSelected={this._selectVariant}
                />
              )}
              {returnExchange !== '' && (
                <View
                  style={{
                    width: '100%',
                    marginVertical: 12,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: 32,
                    backgroundColor: 'rgba(26, 26, 26, 0.04)',
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                  }}>
                  <Icon name="save" size={16} color={colors.black100} />
                  <View style={{ marginLeft: 8 }}>
                    <Text>Available for {returnExchange}</Text>
                  </View>
                </View>
              )}
              <GradientButton
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                disabled={loading || !product.is_commerce}
                colors={['#3067E4', '#8131E2']}
                title={actionButton[productType].buttonText}
                onPress={actionButton[productType].action}
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

              <ButtonGroup items={this.groupButton(isSaved)} />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: 12,
                }}>
                {product.saved &&
                  product.saved.count > 0 &&
                  product.saved.user?.map((value, key) => {
                    const img = value.photo_url
                    if (key >= 3) return null
                    return (
                      <View
                        key={`user-saved-${key}`}
                        style={{
                          borderColor: colors.white,
                          borderRadius: 20,
                          borderWidth: 1,
                          marginLeft: key !== 0 ? -16 : 0,
                        }}>
                        <Image
                          key={`image-user-saved-${key}`}
                          source={
                            img
                              ? { uri: img }
                              : require('@src/assets/placeholder/placeholder2.jpg')
                          }
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 20,
                          }}
                        />
                      </View>
                    )
                  })}
                <View style={{ marginLeft: 8, flexDirection: 'row' }}>
                  {product.saved && userSaveProduct}
                </View>
              </View>
              {product?.details?.map((detail, idx) => {
                const contentItem = getDetailContent(
                  detail.type,
                  detail.content,
                )
                return (
                  <ContentExpandable
                    title={detail.type}
                    content={
                      <HTML
                        html={contentItem
                          .replace(/\\\\r\\\\n/g, '')
                          .replace(/\\r\\n/g, '')}
                        tagsStyles={{
                          li: {
                            ...fontStyle.helvetica,
                            color: colors.black70,
                            fontSize: 14,
                          },
                          p: {
                            ...fontStyle.helvetica,
                            color: colors.black70,
                            fontSize: 14,
                          },
                        }}
                        listsPrefixesRenderers={{
                          ul: (
                            _htmlAttribs,
                            _children,
                            _convertedCSSStyles,
                            passProps,
                          ) => {
                            return (
                              <View
                                style={{
                                  marginRight: 10,
                                  width: 14 / 2.8,
                                  height: 14 / 2.8,
                                  marginTop: 14 / 2,
                                  borderRadius: 14 / 2.8,
                                  backgroundColor: colors.black70,
                                }}
                              />
                            )
                          },
                        }}
                      />
                    }
                    key={`product-detail-${idx}`}
                    id={'expanable' + idx}
                    isFirst={idx === 0}
                  />
                )
              })}
            </Div>
          </ImageCoverContentLayout>

          {loading && (
            <Div
              style={{ position: 'absolute', bottom: 0, left: 0 }}
              justify="center"
              _width="100%"
              _background="rgba(64,64,64,0.3)"
              _height="64px">
              <CircleLoader />
            </Div>
          )}
        </Div>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const productId = ownProps.route.params?.productId
  const _product = deepClone(state.products.data[productId])
  _product.brand = state.brands.data[_product.brand]
  if (_product.attributes) {
    _product.attributes = _product.attributes.map(v => {
      return state.productAttribute.data[v]
    })
  }

  return {
    product: _product,
    isAuth: state.auth.isAuth,
    isSaved: !!state.productsSaved.data[productId],
    loading: state.products.productLoading,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getProductById, addCart, addProductSaved, deleteProductSaved },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage)
