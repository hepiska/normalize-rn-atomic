import React from 'react'
import { StyleSheet } from 'react-native'
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
import { addCart, changeVariant } from '@modules/cart/action'
import { images, colors } from '@utils/constants'
import { formatRupiah, deepClone } from '@utils/helpers'

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
  }

  componentDidMount() {
    this.props.getProductById(this.props.route.params?.product)
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

  _addToCart = async () => {
    const { navigation } = this.props
    const { type, cart } = this.props.route.params

    if (type === 'change_variant' && cart) {
      await this.props.changeVariant({
        variant_id: this.state.selectedVariant,
        cart: cart,
      })
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
    const { selectedVariant } = this.state
    const { product, brand, route } = this.props
    const varianData = this.getVariantData(selectedVariant || 1)
    const { fixAttributes, type, changeAttribute } = route.params

    const fixAttributesIds =
      type === 'change_variant' && fixAttributes
        ? [fixAttributes.attribute_id]
        : []

    const selectedAttributes =
      type === 'change_variant' && fixAttributes ? [fixAttributes] : []

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
            sale // revisi: diubah data dari BE
          />
          <ProductAttributes
            fixAttributesIds={fixAttributesIds}
            selectedAttributes={selectedAttributes}
            attributes={product.attributes}
            onAllAttributesSelected={this._selectVariant}
          />
          <AbsDiv
            _direction="row"
            justify="space-between"
            _background={colors.white}
            style={styles.bottomSheet}>
            <Div _flex={0.5} align="flex-start">
              <Font
                type="title"
                color={colors.black100}
                size={12}
                _margin="0px 0px 8px">
                Product Price
              </Font>
              <Font type="title" color={colors.red2} size={18}>
                {formatRupiah(product.max_price)}
              </Font>
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
                disabled={selectedVariant ? false : true}
              />
            </Div>
          </AbsDiv>
        </Div>
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
    },
    dispatch,
  )

const mapStateToProps = (state, ownProps) => {
  const productId = ownProps.route.params?.product
  const product = state.products.data[productId]
  const _product = deepClone(product)
  _product.attributes = _product.attributes?.map(v => {
    return state.productAttribute.data[v]
  })
  console.log(_product)
  return {
    product: _product,
    brand: state.brands.data[product.brand],
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)
