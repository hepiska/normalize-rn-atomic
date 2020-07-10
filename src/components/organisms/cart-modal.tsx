import React from 'react'
import { StyleSheet, InteractionManager, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import { Button, GradientButton } from '@components/atoms/button'
import NavbarTop from '@components/molecules/navbar-top'
import ProductOverviewCart from '@components/molecules/product-overview-cart'
import ProductAttributes from '@components/organisms/product-attributes'
import { getProductById } from '@modules/product/action'
import {
  addCart,
  changeVariant,
  changeVariantBeforeLogin,
} from '@modules/cart/action'
import { images, colors } from '@utils/constants'
import { formatRupiah, deepClone } from '@utils/helpers'
import CartModalLoader from '@components/atoms/loaders/cart-modal-loader'
import { fontStyle } from '../commont-styles'
// import CircleLoader from '@components/atoms/loaders/circle-loader'

const AbsDiv = styled(Div)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px;
`

const styles = StyleSheet.create({
  bottomSheet: {
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 1.0,
    shadowColor: colors.black50,
    elevation: 4,
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: colors.black50,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 46,
    backgroundColor: '#8131E2',
  },
})

class CartModal extends React.Component<any, any> {
  state = {
    selectedVariant: null,
    isUserSelectVariant: false,
    finishAnimation: false,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
      this.props.getProductById(this.props.route.params?.product)
    })
  }

  componentDidUpdate(prevProps) {
    const { product } = this.props
    if (prevProps.product !== product) {
      if (!product.attributes) {
        this.setState({ selectedVariant: product.variants?.[0].id })
      }
    }
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

  _addToCart = async () => {
    const { navigation, isAuth, product } = this.props
    const { type, cart } = this.props.route.params
    if (type === 'change_variant' && cart) {
      if (isAuth) {
        await this.props.changeVariant({
          variant_id: this.state.selectedVariant,
          cart: cart,
        })
      } else {
        this.props.changeVariantBeforeLogin({
          variant_id: this.state.selectedVariant,
          variant: this.getVariantData(this.state.selectedVariant),
          cart,
          product,
          brand: this.props.brand.name,
        })
      }
      navigation.goBack()
    } else {
      await this.props.addCart({
        variant_id: this.state.selectedVariant,
        qty: 1,
      })
      navigation.goBack()
    }
  }
  getVariantData = id => {
    const { product } = this.props
    const varian = product.variants.find(variant => variant.id === id)
    return varian || product.variants[0]
  }

  render() {
    const { selectedVariant, filteredAttributes, finishAnimation } = this
      .state as any
    const { product, brand, route, loading } = this.props
    const varianData = this.getVariantData(selectedVariant || 1)
    const { fixAttributes, type, changeAttribute } = route.params

    const fixAttributesIds =
      type === 'change_variant' && fixAttributes
        ? [fixAttributes.attribute_id]
        : []

    const selectedAttributes =
      type === 'change_variant' && fixAttributes ? [fixAttributes] : []
    console.log('==change att', changeAttribute)
    const headerTitle =
      type === 'change_variant' && changeAttribute
        ? `Choose New ${changeAttribute.label}`
        : 'Add To Cart'
    const buttonText =
      type === 'change_variant' && changeAttribute
        ? `Update ${changeAttribute.label}`
        : 'Add To Cart'
    return (
      <>
        <NavbarTop title={headerTitle} leftContent={['close']} />
        {finishAnimation ? (
          <Div
            _width="100%"
            _flex="1"
            align="flex-start"
            justify="flex-start"
            _padding="24px 16px"
            style={styles.content}>
            <ProductOverviewCart
              image={
                varianData ? { uri: varianData.image_urls[0] } : images.product
              }
              brand={brand.name.toUpperCase()}
              name={product.name}
            />
            <ProductAttributes
              filteredAttributes={filteredAttributes}
              onAttributesChanged={this._filterVariants}
              fixAttributesIds={fixAttributesIds}
              selectedAttributes={selectedAttributes}
              attributes={product.attributes || []}
              onAllAttributesSelected={this._selectVariant}
            />
            <AbsDiv
              _direction="row"
              justify="space-between"
              _background={colors.white}
              style={styles.bottomSheet}>
              <Div _flex={0.5} align="flex-start">
                <Text
                  style={{
                    ...fontStyle.helvetica,
                    fontSize: 13,
                    color: colors.gray1,
                    marginBottom: 8,
                  }}>
                  Product Price
                </Text>
                <Text
                  style={{
                    ...fontStyle.helveticaBold,
                    fontWeight: '700',
                    fontSize: 18,
                    color: colors.gray1,
                  }}>
                  {formatRupiah(product.max_price)}
                </Text>
              </Div>
              <Div _flex={0.5} align="flex-end">
                <GradientButton
                  onPress={this._addToCart}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#3067E4', '#8131E2']}
                  title={buttonText}
                  fontStyle={styles.buttonText}
                  style={styles.button}
                  disabled={!selectedVariant || loading || !product.is_commerce}
                />
              </Div>
            </AbsDiv>
          </Div>
        ) : (
          <CartModalLoader style={{ marginHorizontal: 16 }} />
        )}
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProductById,
      addCart,
      changeVariant,
      changeVariantBeforeLogin,
    },
    dispatch,
  )

const mapStateToProps = (state, ownProps) => {
  const productId = ownProps.route.params?.product
  const isAuth = ownProps.route.params?.isAuth
  const product = state.products.data[productId]
  const _product = { ...product }

  return {
    product: _product,
    loading: state.products.productLoading,
    brand: state.brands.data[product.brand],
    isAuth,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)
