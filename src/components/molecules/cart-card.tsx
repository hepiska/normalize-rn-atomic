import React from 'react'
import { StyleSheet, View, ViewStyle, Text } from 'react-native'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import {
  helveticaNormalFont12,
  helveticaBlackBold,
  futuraBlackFont14,
  fontStyle,
} from '@components/commont-styles'
import { Checkbox } from '@components/atoms/checkbox'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { colors, images as defaultImages } from '@utils/constants'
import FieldQuantity from '@components/atoms/field-quantity'
import IconFa from 'react-native-vector-icons/FontAwesome5'
import IconMa from 'react-native-vector-icons/MaterialIcons'
import { navigate } from '@src/root-navigation'
import { setImage as chageImageUri, formatRupiah } from '@utils/helpers'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface CartCardType {
  brand: any
  cart: any
  variant: any
  product: any
  idx: any
  style: ViewStyle
  index: string | number
  isChecked: boolean
  chooseCart: Function
  isSaved?: boolean
  onSave?: (productId: any) => void
  removeCart: (data: any) => void
  changeCartQty: (data: any) => void
  removeSelectedVariant: (data: any) => void
  gotoProductDetail?: () => void
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
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
  helveticaBold12: {
    ...fontStyle.helveticaBold,
    fontSize: 12,
  },
  helveticaBold14: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
  futuraBold14: {
    ...fontStyle.futuraDemi,
    fontWeight: '500',
    fontSize: 14,
  },
})

const Overlay = () => (
  <View
    style={[
      StyleSheet.absoluteFillObject,
      { backgroundColor: 'rgba(255,255,255, 0.5)' },
    ]}
  />
)

class CartCard extends React.Component<CartCardType, any> {
  state = {
    defaultImage: null,
  }

  _deleteCart = () => {
    this.props.removeCart(this.props.cart.id)
    this.props.removeSelectedVariant(this.props.cart.id)
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

  renderAttention = () => {
    const { cart } = this.props
    let bgColor
    let label
    let textColor

    if (!cart.is_stock_available) {
      if (cart.is_available) {
        bgColor = 'rgba(255,160,16,.05)'
        textColor = '#ffa010'
        label = 'Attention, the quantity exceeds the available stock'
      } else {
        bgColor = 'rgba(26,26,26,.04)'
        textColor = colors.gray1
        label = 'Sorry, this product is not available'
      }
      return (
        <View
          style={{
            width: '100%',
            height: 30,
            backgroundColor: bgColor,
            paddingVertical: 8,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginBottom: 10,
            alignItems: 'flex-start',
          }}>
          <Text style={{ ...styles.helvetica12, color: textColor }}>
            {label}
          </Text>
        </View>
      )
    }
    return <View />
  }

  _onSave = () => {
    this.props.onSave(this.props.product.id)
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
      isSaved,
      gotoProductDetail,
    } = this.props

    const images = variant.image_urls
    const random = Math.floor(Math.random() * images.length)

    const image =
      this.state.defaultImage ||
      (!!variant.image_urls[random]
        ? chageImageUri(images[random], { ...styles.image })
        : defaultImages.product)

    return (
      <View style={{ ...styles.container, ...style }}>
        {/* divider */}
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
        <View style={{ marginTop: index !== 0 ? 24 : 0, width: '100%' }}>
          {this.renderAttention()}
          <View
            style={{
              ...styles.container,
              flexDirection: 'row',
            }}>
            <Checkbox
              isChecked={isChecked}
              onPress={chooseCart(cart.id)}
              style={{ marginRight: 16, marginTop: 52 }}
            />
            <View style={{ width: '100%', flex: 1 }}>
              {/* image, desc */}
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={gotoProductDetail}>
                  <ImageAutoSchale
                    source={{
                      uri: image,
                    }}
                    onError={() => {
                      this.setState({ defaultImage: defaultImages.product })
                    }}
                    style={styles.image}
                  />
                </TouchableOpacity>
                {/* overlay */}
                {!cart.is_available && <Overlay />}
                <Div
                  _flex="1"
                  flexDirection="column"
                  align="flex-start"
                  _padding="0 0 0 16px">
                  <TouchableOpacity onPress={gotoProductDetail}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{
                        ...styles.helveticaBold12,
                        color: colors.black100,
                      }}>
                      {brand.name ? brand.name.toUpperCase() : 'UNKNOWN'}
                    </Text>
                    <View style={{ marginTop: 8 }}>
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={{
                          ...styles.helvetica12,
                          color: colors.black70,
                        }}>
                        {variant.product
                          ? variant.product.product_name.replace(
                              /(\r\n|\n|\r)/gm,
                              '',
                            )
                          : 'UNKNOWN'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ marginTop: 16 }}>
                    <Text
                      style={{
                        ...styles.helveticaBold12,
                        color: colors.black100,
                      }}>
                      {formatRupiah(variant.price) || '0'}
                    </Text>
                  </View>
                  {/* overlay */}
                  {!cart.is_available && <Overlay />}
                  <Div
                    _width="100%"
                    flexDirection="row"
                    justify="space-between"
                    align="center"
                    _margin="16px 0 0 0">
                    <FieldQuantity
                      qty={cart.qty}
                      onChangeQty={() => {}}
                      placeholder="1"
                      onIncrease={this._incQty}
                      onDecrease={this._decQty}
                      incDisable={!cart.is_stock_available}
                    />
                    {/* overlay */}
                    {!cart.is_available && <Overlay />}
                    <View style={{ flexDirection: 'row' }}>
                      {/* remove cart */}
                      <PressAbbleDiv onPress={this._deleteCart}>
                        <View style={{ ...styles.icon }}>
                          <IconFa
                            name="trash-alt"
                            size={16}
                            color={colors.black60}
                          />
                        </View>
                      </PressAbbleDiv>
                      {/* bookmark */}
                      <PressAbbleDiv onPress={this._onSave}>
                        <View style={{ ...styles.icon }}>
                          <IconMa
                            name={isSaved ? 'bookmark' : 'bookmark-border'}
                            size={16}
                            color={isSaved ? colors.black60 : colors.black90}
                          />
                        </View>
                      </PressAbbleDiv>
                    </View>
                  </Div>
                </Div>
              </View>
              {/* variant */}
              <Div
                flexDirection="row"
                _margin="16px 0 24px 0"
                justifyContent="flex-start">
                {variant &&
                  variant.attribute_values &&
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
                          <Font _margin="0 8px 0 0">
                            {_attribute.value.label}
                          </Font>
                          <IconFa
                            name="sort-down"
                            size={6}
                            colors={colors.black100}
                          />
                        </Div>
                      </PressAbbleDiv>
                    )
                  })}
              </Div>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default CartCard
