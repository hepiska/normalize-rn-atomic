import React from 'react'
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  InteractionManager,
} from 'react-native'
import {
  Div,
  Font,
  Image,
  PressAbbleDiv,
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
import Amplitude from 'amplitude-js'
import HTML from 'react-native-render-html'
// import ProductOverviewCard from '@src/components/molecules/product-overview-card-body'
import ProductAttributes from '@components/organisms/product-attributes'
import Animated from 'react-native-reanimated'
import { colors } from '@src/utils/constants'
import { addCart, addCartBeforeLogin } from '@modules/cart/action'
import RangePrice from '@components/molecules/range-price'
import Price from '@components/atoms/price'
import ButtonGroup from '@components/molecules/button-group'
import { fontStyle } from '@components/commont-styles'
import { GradientButton } from '@components/atoms/button'
import { getProductById } from '@modules/product/action'
import { setImage, getDetailContent, formatCur } from '@utils/helpers'
import ProductListLoader from '@components/atoms/loaders/product-detail'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconF from 'react-native-vector-icons/FontAwesome'
import { makeDeepClone } from '@modules/selector-general'
import { makeSelectedProducts } from '@modules/product/selector'
import { makeSelectedBrands } from '@modules/brand/selector'
import { addProduct as addSeenProduct } from '@modules/seen-history/action'
import { sendSeenData } from '@modules/seen-history/action'
import {
  addProductSaved,
  deleteProductSaved,
} from '@modules/product-saved/action'
import { capitalEachWord } from '@utils/helpers'
import ProductSimilarList from '@src/components/organisms/product-similar-list'
import { navigate } from '@src/root-navigation'
import {
  acne,
  allType,
  antiAging,
  blackhead,
  brightening,
  combination,
  darkSpot,
  dryControl,
  dry,
  normal,
  oilControl,
  oily,
  pore,
  redness,
  sensitive,
} from '@src/utils/image-skin'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CardProduct from '@src/components/molecules/earn-card-product'

const { Value } = Animated
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  breadcrumb: {
    ...fontStyle.helveticaThin,
    fontWeight: '300',
    fontSize: 14,
    color: colors.black70,
  },
  skin: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  stockWarning: {
    width: '100%',
    backgroundColor: colors.gray1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    marginTop: -5,
    // marginVertical: 12,
  },
  warningLabelText: {
    ...fontStyle.helvetica,
    fontSize: 14,
    color: '#CCC',
  },
  returnExchangeText: {
    ...fontStyle.helvetica,
    fontSize: 12,
    color: colors.black80,
  },
  button: {
    backgroundColor: colors.black100,
    height: 46,
    width: '100%',
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  disabledBtnText: {
    color: colors.black60,
    fontSize: 14,
    fontWeight: 'bold',
  },
  shareSection: {
    flex: 1,
    width: '100%',
    borderBottomColor: colors.black50,
    borderBottomWidth: 1,
    paddingBottom: 16,
    marginBottom: 16,
  },
  shareBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderTopColor: 'rgba(224, 188, 133, 0.3)',
    borderTopWidth: 1,
  },
  share: {
    fontSize: 16,
    ...fontStyle.helvetica,
    fontWeight: '500',
    marginLeft: 8,
    color: colors.black100,
  },
  p: {
    ...fontStyle.helvetica,
    color: colors.black70,
    marginBottom: 16,
  },
  preorderWrap: {
    width: '100%',
    padding: 8,
    backgroundColor: 'rgba(224, 188, 133, 0.21)',
    borderRadius: 4,
    borderColor: 'rgba(224, 188, 133, 0.34)',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  orderAdminWrap: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 4,
    width: '100%',
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

const y = new Value(0)

const renderImage = type => {
  switch (type) {
    case 'oily':
      return oily
    case 'brightening':
      return brightening
    case 'acne':
      return acne
    case 'alltype':
      return allType
    case 'antiaging':
      return antiAging
    case 'blackhead':
      return blackhead
    case 'combination':
      return combination
    case 'darkspot':
      return darkSpot
    case 'drycontrol':
      return dryControl
    case 'dry':
      return dry
    case 'normal':
      return normal
    case 'oilcontrol':
      return oilControl
    case 'pore':
      return pore
    case 'redness':
      return redness
    case 'sensitive':
      return sensitive
    default:
      return null
  }
}

const WarningLabel = ({ text }) => {
  return (
    <View
      style={{
        ...styles.stockWarning,
      }}>
      <Text style={{ ...styles.warningLabelText }}>{text}</Text>
    </View>
  )
}

class ProductListPage extends React.Component<any, any> {
  state = {
    selectedVariant: 1,
    isUserSelectVariant: false,
    isProductSaved: this.props.isSaved,
    finishAnimation: false,
    showEarn: false,
  }
  _breadcrumb = []

  componentDidMount() {
    const { product, isAuth, route } = this.props
    const { referral_code, productSlug } = route.params || {}
    InteractionManager.runAfterInteractions(() => {
      if (product) {
        this.logData()
      }
      this._fetchData()

      if (this.props.product && this.props.categories) {
        this.renderBreadcrumb(this.props.product.category.id)
      }
      this.setState({ finishAnimation: true })
    })
  }

  componentDidUpdate(prevProps) {
    const { product, isAuth, route } = this.props
    if (product && product.id !== prevProps.product.id) {
      this.logData()
    }
  }

  logData = () => {
    const { product, isAuth, route } = this.props
    const { referral_code, productSlug } = route.params || {}

    const date = new Date()
    const seenProduct: any = {
      product_id: this.props.route.params?.productId,
      created_at: date.toISOString(),
    }

    if (!isAuth) {
      this.props.addSeenProduct(seenProduct)
    } else {
      if (referral_code) {
        seenProduct.referral_code = referral_code
        sendSeenData([seenProduct])
      }
    }

    Amplitude.getInstance().logEvent('product-detail', {
      id: this.props.route.params?.productId,
      name: product.name,
      category: this.props.product.category.name,
    })
  }

  _fetchData = () => {
    const { route } = this.props

    const { referral_code, productSlug } = route.params || {}

    if (productSlug) {
      this.props.getProductById(productSlug, 'slug')
    } else {
      this.props.getProductById(this.props.route.params?.productId)
    }
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
    this.setState(state => ({
      isProductSaved: !state.isProductSaved,
    }))
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
      },
      {
        name: 'Share',
        icon: 'share',
        onPress: () => {
          const { product } = this.props
          this.props.navigation.navigate('modals', {
            screen: 'Share',
            params: {
              title: product.name + ' - The Shonet',
              uri:
                Config.SHONET_URI + '/products/' + product.slug || product.id,
              message: 'Shop ' + product.name + ' at The Shonet',
            },
          })
        },
      },
    ]
  }

  _addToCart = () => {
    const { product, isAuth, totalCart } = this.props
    if (!isAuth) {
      this.props.addCartBeforeLogin({
        variant_id: this.state.selectedVariant,
        variant: this.getVariantData(this.state.selectedVariant),
        qty: 1,
        remark: 'offline',
        product,
        id: `notlogin_${totalCart}`,
      })
    } else {
      if (this.state.isUserSelectVariant) {
        this.props.addCart({ variant_id: this.state.selectedVariant, qty: 1 })
      } else {
        this.openCartModal()
      }
    }
  }

  _addToCollection = () => {}

  renderBreadcrumb = id => {
    const { categories } = this.props

    let parentID = null

    if (categories[id]?.parent) {
      if (typeof categories[id].parent === 'number') {
        parentID = categories[id].parent
      } else {
        parentID = categories[id].parent.id
      }
    } else if (categories[id]?.parent_id) {
      parentID = categories[id].parent_id
    }

    if (parentID) {
      this.renderBreadcrumb(parentID)
    }

    if (categories[id]) {
      this._breadcrumb.push({
        name: categories[id].name,
        slug: categories[id].slug,
        id,
      })
    }
    return
  }

  handleOnpressBreadcrumb = slug => () => {
    navigate('ProductList', { categoriesSlug: slug, from: 'categories' })
  }

  goShareEarn = () => {
    const { product, isAuth } = this.props
    if (isAuth) {
      navigate('modals', {
        screen: 'ShareProduct',
        params: {
          product: product,
          title: product.name + ' - The Shonet',
          uri: Config.SHONET_URI + '/products/' + product.slug || product.id,
          message: 'Shop ' + product.name + ' at The Shonet',
        },
      })
    } else {
      navigate('modals', {
        screen: 'ShareAndEarn',
        params: {
          product: product,
        },
      })
    }
  }

  defineStatusButton = () => {
    const { product, selectedVariant, varianData } = this.props
    if (!product.is_purchaseable) {
      return 'Currently Unavailable'
    } else if (
      !varianData.is_available &&
      selectedVariant === varianData.id &&
      product.is_purchaseable
    ) {
      return 'Out Stock'
    }
    return 'Add To Cart'
  }

  render() {
    const { product, loading, isSaved } = this.props
    if (!product) {
      return null
    }

    const {
      selectedVariant,
      isUserSelectVariant,
      filteredAttributes,
      isProductSaved,
      isLogin,
    } = this.state as any
    if (!product) {
      return null
    }

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

    let statusButton = ''
    if (!product.is_purchaseable) {
      statusButton = 'Currently Unavailable'
    } else if (
      !varianData.is_available &&
      selectedVariant === varianData.id &&
      product.is_purchaseable
    ) {
      statusButton = 'Out Stock'
    } else {
      statusButton = 'Add To Cart'
    }

    const isButtonDisabled =
      loading ||
      !product.is_commerce ||
      !varianData.is_available ||
      !product.is_purchaseable

    const productType = product.is_commerce ? 'cart' : 'collection'

    const actionButton = {
      cart: {
        buttonText: statusButton,
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
    let description = []
    let contentItem = []
    product?.details?.map(value => {
      if (
        value.type === 'description' ||
        value.type === 'care-label' ||
        value.type === 'size-and-fit'
      ) {
        description.push(value)
      } else {
        contentItem.push(value)
      }
    })
    if (description.length > 0) {
      const newData = []
      description?.map((value, key) => (newData[key] = value))
      const newContent = {
        type: 'details',
        content: newData,
      }
      contentItem.push(newContent)
    }
    if (returnExchange !== '') {
      const newContent = {
        type: 'shipping & returns',
        content: `Available for ${returnExchange}`,
      }
      contentItem.push(newContent)
    }

    if (!this.state.finishAnimation || loading) {
      return (
        <ProductListLoader imageHeight={this.dimentionConstant.imageHeight} />
      )
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
            images={varianData.image_urls?.map(
              url =>
                ({
                  uri: url,
                } || []),
            )}
            height={this.dimentionConstant.imageHeight}>
            <ImagesWithPreviews
              size={{ width, height: this.dimentionConstant.imageHeight }}
              images={
                varianData.image_urls?.map(url => ({
                  uri: setImage(url, { width: 400, height: 600 }),
                })) || []
              }
            />
          </CoverImageAnimated>
          <ImageCoverContentLayout
            y={y}
            dimentionConstant={this.dimentionConstant}>
            <Div bg="white" _width="100%" padd="0px 16px 96px">
              <Div width="100%" align="flex-start" padd="16px 0px">
                <View style={{ flexDirection: 'row', margin: 4 }}>
                  {this._breadcrumb?.map((val, key) => (
                    <Font
                      style={{ ...styles.breadcrumb }}
                      key={`breadcrumb-${key}`}>
                      {key > 0 && <Font>{` / `}</Font>}
                      <Font onPress={this.handleOnpressBreadcrumb(val.slug)}>
                        {val.name}
                      </Font>
                    </Font>
                  ))}
                </View>
                <Font
                  style={fontStyle.playfairBold}
                  size={26}
                  _margin="4px"
                  color={colors.black100}>
                  {product.brand.name}
                </Font>
                <HTML
                  html={`<productname>${product?.name || ''}</productname>`}
                  renderers={{
                    // eslint-disable-next-line react/display-name
                    productname: (
                      htmlAttribs,
                      children,
                      convertedCSSStyles,
                      passProps,
                    ) => {
                      return (
                        <Text
                          style={{
                            ...fontStyle.helveticaThin,
                            fontWeight: '300',
                            fontSize: 18,
                            margin: 4,
                            color: colors.black80,
                          }}>
                          {passProps?.rawChildren[0]?.data || ''}
                        </Text>
                      )
                    },
                  }}
                />
                {isUserSelectVariant ? ( // ada bug disini
                  <Price
                    {...varianData.price}
                    stylePrev={{
                      fontSize: 14,
                      color: colors.black90,
                      ...fontStyle.helveticaThin,
                      fontWeight: '300',
                    }}
                    style={{
                      fontSize: 18,
                      color: colors.gray1,
                      ...fontStyle.helveticaBold,
                    }}
                    // price={varianData.price}
                    // discount_price={varianData.price_after_disc}
                  />
                ) : (
                  <RangePrice
                    {...price}
                    stylePrev={{
                      fontSize: 14,
                      color: colors.black90,
                      ...fontStyle.helveticaThin,
                      fontWeight: '300',
                    }}
                    style={{
                      fontSize: 18,
                      color: colors.gray1,
                      ...fontStyle.helveticaBold,
                    }}
                  />
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
                    marginVertical: 16, // should be 12
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: 32,
                    backgroundColor: 'rgba(49,226,56,.102)',
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                  }}>
                  <Image
                    source={require('@assets/icons/shipment.png')}
                    style={{ width: 16, height: 16 }}
                  />
                  <View style={{ marginLeft: 8 }}>
                    <Text
                      style={{
                        ...styles.returnExchangeText,
                      }}>
                      Available for {returnExchange}
                    </Text>
                  </View>
                </View>
              )}
              <View style={styles.shareSection}>
                <CardProduct product={product} />
                <TouchableOpacity
                  style={styles.shareBtn}
                  onPress={this.goShareEarn}>
                  <Image
                    source={require('@assets/icons/share.png')}
                    style={{ width: 16, height: 16, marginRight: 8 }}
                  />
                  <Text style={styles.share}>Share And Earn</Text>
                </TouchableOpacity>
                <Text style={styles.p}>
                  You’ll Earn IDR {formatCur(product?.max_potential_earnings)}{' '}
                  when your friend buy this product from your link. Learn More
                </Text>
              </View>

              {/* // need State */}
              <View style={styles.preorderWrap}>
                <Image
                  source={require('@assets/icons/pre-order.png')}
                  style={{ width: 20, height: 20, marginRight: 8 }}
                />
                <Text style={{ color: colors.black80 }}>
                  Pre Order. Please check description for details
                </Text>
              </View>

              <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                <TouchableOpacity
                  onPress={this.onSaveProduct}
                  style={{
                    height: 46,
                    width: 46,
                    borderColor: colors.black50,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    marginRight: 8,
                  }}>
                  <IconF
                    name={isProductSaved ? 'heart' : 'heart-o'}
                    size={24}
                    color={colors.black100}
                  />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Button
                    title={actionButton[productType].buttonText}
                    onPress={actionButton[productType].action}
                    style={styles.button}
                    fontStyle={
                      isButtonDisabled
                        ? styles.disabledBtnText
                        : styles.buttonText
                    }
                    disabled={isButtonDisabled}
                  />
                </View>
              </View>

              {/* ego component */}

              {/* <GradientButton
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                disabled={isButtonDisabled}
                colors={['#3067E4', '#8131E2']}
                colorsDisabled={[colors.black50, colors.black50]}
                title={actionButton[productType].buttonText}
                onPress={actionButton[productType].action}
                fontStyle={
                  isButtonDisabled
                    ? {
                        color: colors.black80,
                        ...fontStyle.helveticaBold,
                        fontSize: 14,
                      }
                    : {
                        color: colors.white,
                        ...fontStyle.helveticaBold,
                        fontSize: 14,
                      }
                }
                style={{
                  width: '100%',
                  height: 46,
                  marginTop: 12,
                  backgroundColor: '#8131E2',
                }}
              />

              {!varianData.is_available &&
                selectedVariant === varianData.id &&
                product.is_purchaseable && (
                  <WarningLabel text="Sorry, this product is Out of Stock." />
                )}

              {!product.is_purchaseable && (
                <WarningLabel text="Sorry, this product is currently unavailable" />
              )}

              <ButtonGroup items={this.groupButton(isProductSaved)} /> */}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: 24,
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

              {/* bisa di pisah jadi 1 organimis sendiri biar bisa di use memo itung2gannya refisit: enu */}
              {contentItem?.map((item, idx) => {
                let newItem = null
                if (typeof item.content !== 'string') {
                  newItem = item.content
                    ?.map(value => {
                      return (
                        `<title>${capitalEachWord(value.type)
                          .replace(/\\\\r\\\\n/g, '')
                          .replace(/\\r\\n/g, '')}:</title>` +
                        getDetailContent(value.type, value.content)
                      )
                    })
                    .join('')
                  if (product.skin_type || product.skin_concern) {
                    newItem += `<title>Suitable For:</title>`

                    newItem += `${
                      product.skin_type
                        ? `<subtitle>Skin type:</subtitle>` +
                          `<mytag>` +
                          `<imageskin skintype=${product.skin_type.label
                            .toLowerCase()
                            .replace(' ', '')}></imageskin>` +
                          `<p>${product.skin_type.label}</p>` +
                          `</mytag>`
                        : ''
                    }`

                    newItem += `${
                      product.skin_concern
                        ? `<subtitle>Skin concern:</subtitle>` +
                          `<mytag>` +
                          `<imageskin skintype=${product.skin_concern.label
                            .toLowerCase()
                            .replace(' ', '')}></imageskin>` +
                          `<p>${product.skin_concern.label}</p>` +
                          `</mytag>`
                        : ''
                    }`
                  }
                } else {
                  newItem = `<p>${item.content}</p>`
                }
                return (
                  <ContentExpandable
                    paddingTitleVertical={12}
                    style={{
                      borderBottomColor: colors.black50,
                      borderBottomWidth: 1,
                    }}
                    title={
                      <Text
                        style={{
                          ...fontStyle.playfairBold,
                          fontSize: 24,
                          color: colors.black100,
                        }}>
                        {capitalEachWord(item.type.replace(/-/g, ' '))}
                      </Text>
                    }
                    content={
                      <HTML
                        html={newItem}
                        renderers={{
                          imageskin: ({ skintype }) => {
                            const img = renderImage(skintype)
                            return (
                              <Image
                                source={img}
                                style={{ ...styles.skin, marginRight: 4 }}
                              />
                            )
                          },
                          mytag: (convertedCSSStyles, children) => {
                            return (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                {children}
                              </View>
                            )
                          },
                        }}
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
                          title: {
                            ...fontStyle.helveticaBold,
                            color: colors.black100,
                            fontSize: 14,
                            marginVertical: 8,
                          },
                          subtitle: {
                            ...fontStyle.helvetica,
                            color: colors.black100,
                            fontSize: 14,
                            marginVertical: 8,
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
                    isDisabledBorder
                  />
                )
              })}
              <PressAbbleDiv
                onPress={() => {
                  console.log('go to whatsapp chat')
                }}
                style={styles.orderAdminWrap}>
                <Image
                  source={require('@assets/icons/whatsapp-icon-large.png')}
                  style={{ width: 28, height: 28, marginRight: 8 }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      ...fontStyle.helvetica,
                      fontWeight: '500',
                      color: colors.black100,
                      fontSize: 16,
                    }}>
                    Order by Whatsapp
                  </Text>
                  <Text style={{ color: colors.black70 }}>
                    Instant buying, our admin ready 24/7 for you
                  </Text>
                </View>
              </PressAbbleDiv>
              {product && <ProductSimilarList />}
            </Div>
          </ImageCoverContentLayout>

          {/* {loading && (
            <Div
              style={{ position: 'absolute', bottom: 0, left: 0 }}
              justify="center"
              _width="100%"
              _background="rgba(64,64,64,0.3)"
              _height="64px">
              <CircleLoader />
            </Div>
          )} */}
        </Div>
      </>
    )
  }
}

const mapStateToProps = () => {
  const getselectedProduct = makeSelectedProducts()
  const getselectedBrand = makeSelectedBrands()
  const deepClone = makeDeepClone()
  return (state, ownProps) => {
    const productId =
      ownProps.route.params?.productId || state.products.activeProduct

    if (!productId) {
      return {}
    }

    const selectedProduct = getselectedProduct(state, productId)

    if (!selectedProduct) {
      return {
        isAuth: state.auth.isAuth,
        loading: state.products.productLoading,
      }
    }

    const _product = deepClone(selectedProduct)

    _product.brand = getselectedBrand(state, selectedProduct.brand)

    return {
      product: _product,
      isAuth: state.auth.isAuth,
      isSaved: !!state.productsSaved.data[productId],
      loading: state.products.productLoading,
      categories: state.categories.data,
      totalCart: Object.keys(state.carts.data).length || 0,
    }
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProductById,
      addSeenProduct,
      addCart,
      addProductSaved,
      deleteProductSaved,
      addCartBeforeLogin,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage)
