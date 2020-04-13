import React from 'react'
import { StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import { Button } from '@components/atoms/button'
import NavbarTop from '@components/molecules/navbar-top'
import ProductOverviewCart from '@components/molecules/product-overview-cart'
import ProductAttributes from '@components/organisms/product-attributes'
import { getProductById } from '@modules/product/action'
import { images, colors } from '@utils/constants'
import { formatRupiah } from '@utils/helpers'

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

  getVariantData = id => {
    const { product } = this.props
    const varian = product.variants.find(variant => variant.id === id)
    return varian || product.variants[0]
  }

  render() {
    const { selectedVariant } = this.state
    const { product, brand } = this.props
    const varianData = this.getVariantData(selectedVariant || 1)

    return (
      <>
        <NavbarTop title="Add To Cart" leftContent={['close']} />
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
              <Button
                onPress={() => console.log('add cart to redux + BE')}
                title="Add to Cart"
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
    },
    dispatch,
  )

const mapStateToProps = (state, ownProps) => {
  const productId = ownProps.route.params?.product
  const product = state.products.data[productId]
  return {
    product,
    brand: state.brands.data[product.brand],
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)
