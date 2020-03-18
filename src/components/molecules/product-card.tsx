import React, { useState } from 'react'
import { ViewStyle, StyleSheet, View, TextStyle } from 'react-native'
import styled from 'styled-components'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import Img from '@components/atoms/image'
import { OutlineButton } from '@components/atoms/button'
import { formatRupiah, checkHex } from '@utils/helpers'
import { colors, images } from '@utils/constants'

const AbsDiv = styled(Div)`
  position: absolute;
  right: 16px;
  top: 16px;
`

interface styleTypes {
  _margin: string
  _width: string | number
}

interface ViewExtend extends ViewStyle {
  wrappermargin?: number
}

interface ProductCard {
  product: any
  brand?: any
  style?: ViewExtend
}

const typeDict = {
  large: {
    main: 18,
    sub: 16,
  },
  med: {
    main: 16,
    sub: 14,
  },
  small: {
    main: 14,
    sub: 12,
  },
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
  },
  defaultStyle: {
    width: 156,
    minHeight: 352,
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 8,
    justifyContent: 'flex-start',
  },
})

const imageVariantSource = [
  {
    attribute_value_id: 3,
    uri:
      'https://cdn-image.hipwee.com/wp-content/uploads/2019/02/hipwee-51661786_307638939937433_3349881294454051841_n-640x800.jpg',
  },
  {
    attribute_value_id: 6,
    uri:
      'https://cdn.idntimes.com/content-images/post/20180727/dc061a68f4afea39ea934004202161fa.jpg',
  },
]

const ProductCard = ({ product, style, brand }: ProductCard) => {
  const type = 'med'
  const composeStyle = { ...styles.defaultStyle, ...style }
  const margin = composeStyle.marginRight
    ? Number(composeStyle.marginRight)
    : Number(composeStyle.paddingHorizontal) * 2
  let width = Number(composeStyle.width) - margin
  width = composeStyle.wrappermargin
    ? width - composeStyle.wrappermargin
    : width

  const isSaved = false

  const imageSource = product.image_url
    ? {
        uri:
          product.image_url +
          '?w=450&h=600&fit=fillmax&fill=solid&fill-color=white',
      }
    : require('../../assets/placeholder/placeholder2.jpg')

  const [image, setImage] = useState(imageSource)
  const [selectedAttribute, setSelectedAttribute] = useState(null)

  const attributeChange = attribute => () => {
    const selected = imageVariantSource.find(
      x => x.attribute_value_id === attribute.id,
    )
    setImage({ uri: selected.uri })
    setSelectedAttribute(selected)
  }

  return (
    <Div style={{ ...composeStyle, width }} key={'productcard' + product.id}>
      <Div _margin="0px 0px 8px" _width="100%">
        <AbsDiv zIndex="2">
          <Icon
            name="bookmark"
            size={24}
            color={isSaved ? colors.black50 : colors.black90}
          />
        </AbsDiv>
        <ImageAutoSchale
          source={image}
          onError={() => {
            setImage(images.product)
          }}
          width={width}
          style={styles.image}
        />
      </Div>

      <View
        style={{
          width: '100%',
          flex: 1,
          paddingHorizontal: composeStyle.paddingHorizontal,
        }}>
        <Font
          type="HelveticaNeue"
          size={typeDict[type].main}
          weight="bold"
          _margin="4px"
          color={colors.black100}>
          {brand.name}
        </Font>
        <Font
          size={typeDict[type].sub}
          _margin="4px"
          color={colors.black80}
          numberOfLines={2}
          ellipsizeMode="tail">
          {product.name}
        </Font>

        {/* <RangePrice
          from={1090900}
          to={1890000}
          exFrom={1590000}
          exTo={2390000}
          withDiscount={true}
        />
        <AddToCartButton /> */}
        {/* <UserSaved imageUrl={imageSource} /> */}
        {product.attributes && (
          <ColorList
            selectedId={
              selectedAttribute ? selectedAttribute.attribute_value_id : null
            }
            data={
              product.attributes.filter(x => x.label === 'Color')[0]
                ? product.attributes.filter(x => x.label === 'Color')[0].values
                : []
            }
            onChange={attributeChange}
          />
        )}
        <Price value={1000} />
      </View>
    </Div>
  )
}

// EXTRA ====

interface Price {
  value: number
  style?: TextStyle
}

export const Price = ({ value, style }: Price) => {
  const type = 'med'
  return (
    <Font
      size={typeDict[type].sub}
      color={colors.black100}
      type="title"
      _margin="4px"
      style={{
        marginTop: 16,
        ...style,
      }}>
      {formatRupiah(value)}
    </Font>
  )
}

interface RangePrice {
  from: number
  to: number
  exFrom?: number
  exTo?: number
  withDiscount?: boolean
  style?: TextStyle
}

export const RangePrice = ({
  from,
  to,
  exFrom,
  exTo,
  withDiscount,
  style,
}: RangePrice) => {
  const type = 'med'
  const price = `${formatRupiah(from)} - ${formatRupiah(to)}`.split(' ')

  return (
    <Div align="flex-start" _margin="8px 0px 0px 0px">
      <Font
        type="HelveticaNeue"
        size={11}
        _margin="4px"
        color={colors.black60}
        style={{ textDecorationLine: 'line-through' }}>
        {`${formatRupiah(exFrom)} - ${formatRupiah(exTo)}`}
      </Font>

      <Div _direction="row" justify="flex-start" style={{ flexWrap: 'wrap' }}>
        {price.map((x, i) => {
          if (i !== price.length - 1) {
            return (
              <Font
                key={i}
                size={typeDict[type].sub}
                type="title"
                _margin="4px 0px 0px 4px"
                style={style}>
                {x}
              </Font>
            )
          } else {
            return (
              <Div key={i} _direction="row">
                <Font
                  size={typeDict[type].sub}
                  type="title"
                  _margin="4px"
                  style={style}>
                  {x}
                </Font>
                {withDiscount && (
                  <Div _margin="0px 4px">
                    <Img
                      source={require('../../assets/icons/badge-discount.png')}
                      style={{
                        position: 'absolute',
                        width: 31,
                        height: 14,
                      }}
                    />
                    <Font
                      size={8}
                      _margin="0px 0px 0px 8px"
                      color={colors.white}>
                      100%
                    </Font>
                  </Div>
                )}
              </Div>
            )
          }
        })}
      </Div>
    </Div>
  )
}

const UserSaved = ({ imageUrl }) => {
  const type = 'small'
  return (
    <Div _direction="row" justify="flex-start" _margin="8px 0px 0px 4px">
      <Img
        source={imageUrl}
        _width={16}
        _height={16}
        _margin="0px 4px 0px 0px"
        radius={16 / 2}
      />
      <Font
        size={typeDict[type].sub}
        color={colors.black100}
        style={{ fontWeight: '500' }}>
        agungganteng
        <Font size={typeDict[type].sub} style={{ fontWeight: 'normal' }}>
          {' '}
          save this
        </Font>
      </Font>
    </Div>
  )
}

interface ColorList {
  selectedId: any
  data: any
  onChange: any
}

const ColorList = ({ selectedId, data, onChange }: ColorList) => {
  return (
    <Div _direction="row" justify="flex-start">
      {data.map((item, index) => (
        <PressAbbleDiv key={index} onPress={onChange(item)}>
          <Div
            _width="20px"
            _height="20px"
            _margin="8px 4px 0px"
            _border={`2px solid ${
              selectedId === item.id ? colors.black90 : colors.black50
            }`}
            radius="20px"
            _background={checkHex(item.metadata) ? item.metadata : '#FFF'}
          />
        </PressAbbleDiv>
      ))}
    </Div>
  )
}

const AddToCartButton = () => {
  return (
    <Div _flex={1} justify="flex-end">
      <OutlineButton
        title="Add to Cart"
        onPress={() => {}}
        leftIcon={<Icon name="shopping-bag" size={12} color={colors.black80} />}
        style={{
          width: '100%',
          marginTop: 16,
          borderColor: '#EFEFEF',
        }}
        fontStyle={{
          fontSize: 12,
          color: colors.black80,
          marginLeft: 8,
          fontWeight: 'bold',
        }}
      />
    </Div>
  )
}

export default ProductCard
