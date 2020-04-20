import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import {
  helveticaNormalFont12,
  helveticaBlackBold,
  futuraBlackFont14,
} from '@components/commont-styles'
import { Checkbox } from '@components/atoms/checkbox'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { colors, images as defaultImages } from '@utils/constants'
import FieldQuantity from '@components/atoms/field-quantity'
import IconFa from 'react-native-vector-icons/FontAwesome5'
import IconMa from 'react-native-vector-icons/MaterialIcons'
import { navigate } from '@src/root-navigation'
import { setImage as chageImageUri, formatRupiah } from '@utils/helpers'

interface CartCardType {
  brand: any
  cart: any
  variant: any
  idx: any
  style: ViewStyle
  index: string | number
  isChecked: boolean
  chooseCart: Function
  removeCart: (data: any) => void
  changeCartQty: (data: any) => void
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  buttonText: {
    color: colors.white,
    fontSize: 10,
  },
  button: {
    width: '100%',
    height: 22,
    marginTop: 16,
    backgroundColor: colors.black100,
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
  },
  image: {
    width: 78,
    height: 104,
    borderRadius: 8,
  },
  icon: {
    height: 24,
    width: 24,
  },
})

class CartCard extends React.PureComponent<CartCardType, any> {
  state = {
    defaultImage: null,
  }

  _deleteCart = () => {
    this.props.removeCart(this.props.cart.id)
  }

  _incQty = val => {
    this.props.changeCartQty({ cart_id: this.props.cart.id, qty: val })
  }
  _decQty = val => {
    this.props.changeCartQty({ cart_id: this.props.cart.id, qty: val })
  }
  _changeVariant = (attribute, attributes) => () => {
    const fixAttributes = attributes.find(_att => {
      return _att.attribute_id !== attribute.attribute_id
    })
    navigate('modals', {
      screen: 'CartModal',
      params: {
        product: this.props.variant.product_id,
        fixAttributes,
        cart: this.props.cart,
        changeAttribute: attribute,
        type: 'change_variant',
      },
    })
  }

  render() {
    const {
      cart,
      brand,
      variant,
      style,
      index,
      isChecked,
      chooseCart,
    } = this.props

    const images = variant.image_urls
    const random = Math.floor(Math.random() * images.length)

    const image =
      this.state.defaultImage ||
      (!!variant.image_urls[random]
        ? chageImageUri(images[random], { ...styles.image })
        : defaultImages.product)

    return (
      <View {...(styles.container, style)}>
        <View
          style={
            index !== 0 && {
              borderStyle: 'dashed',
              borderColor: colors.black50,
              borderWidth: 1,
              width: '100%',
            }
          }
        />
        <Div _margin="24px 0 0 0">
          <Div
            _width="100%"
            bg="rgba(255,160,16,.05)"
            _padding="8px 20px"
            radius="8px"
            _margin="0 0 10px 0"
            alignItems="flex-start">
            <Font color="#ffa010">
              Attention, the quantity exceeds the available stock
            </Font>
          </Div>
          <Div flexDirection="row" {...styles.container} alignItems="center">
            <Checkbox
              isChecked={isChecked}
              onPress={chooseCart(cart.id)}
              style={{ marginRight: 16 }}
            />
            <ImageAutoSchale
              source={{
                uri: image,
              }}
              onError={() => {
                this.setState({ defaultImage: defaultImages.product })
              }}
              style={styles.image}
            />
            <Div
              _flex="1"
              flexDirection="column"
              align="flex-start"
              _padding="0 0 0 16px">
              <Font {...helveticaBlackBold}>
                {brand.name ? brand.name.toUpperCase() : 'UNKNOWN'}
              </Font>
              <Font {...helveticaNormalFont12} _margin="8px 0 0 0">
                {variant.product ? variant.product.product_name : 'UNKNOWN'}
              </Font>
              <Font {...helveticaBlackBold} _margin="16px 0 0 0">
                {formatRupiah(variant.price) || '0'}
              </Font>
              <Div
                _width="100%"
                flexDirection="row"
                justify="space-between"
                align="center"
                _margin="16px 0 0 0">
                {/* <FieldQuantity
                  qty={cart.qty}
                  onChangeQty={() => {}}
                  placeholder="1"
                  onIncrease={this._incQty}
                  onDecrease={this._decQty}
                /> */}
                <Div style={{ flexDirection: 'row' }}>
                  {/* remove cart */}
                  <PressAbbleDiv onPress={this._deleteCart}>
                    <Div {...styles.icon}>
                      <IconFa
                        name="trash-alt"
                        size={16}
                        color={colors.black60}
                      />
                    </Div>
                  </PressAbbleDiv>
                  {/* bookmark */}
                  <PressAbbleDiv onPress={() => {}}>
                    <Div {...styles.icon}>
                      <IconMa
                        name="bookmark"
                        size={16}
                        color={colors.black60}
                      />
                    </Div>
                  </PressAbbleDiv>
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>

        <Div
          flexDirection="row"
          _margin="16px 0 24px 0"
          justifyContent="flex-start">
          {variant && variant.attribute_values ? (
            variant.attribute_values?.map((_attribute, index) => {
              return (
                <PressAbbleDiv
                  onPress={this._changeVariant(
                    _attribute,
                    variant.attribute_values,
                  )}
                  key={`card-attribute-${index}`}>
                  <Div
                    flexDirection="row"
                    style={{
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: colors.black10,
                      height: 30,
                      marginRight: 16,
                      paddingLeft: 12,
                      paddingRight: 12,
                    }}>
                    <Font _margin="0 8px 0 0" {...futuraBlackFont14}>
                      {_attribute.label}
                    </Font>
                    <Font _margin="0 8px 0 0">{_attribute.value.label}</Font>
                    <IconFa
                      name="sort-down"
                      size={6}
                      colors={colors.black100}
                    />
                  </Div>
                </PressAbbleDiv>
              )
            })
          ) : (
            <></>
          )}
        </Div>
      </View>
    )
  }
}

export default CartCard
