import React, { memo, useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native'
import { request } from '@utils/services'
import { getPostProduct } from '@modules/product/action'
import { useDispatch } from 'react-redux'
import { colors } from '@src/utils/constants'
import { Button } from '../atoms/button'
import { PressAbbleDiv } from '../atoms/basic'
import { fontStyle } from '../commont-styles'
import { textElipsis as textLimit } from '@utils/helpers'
import { navigate } from '@src/root-navigation'

const styles = StyleSheet.create({
  wrap: {
    padding: 16,
    borderRadius: 8,
    borderColor: colors.black50,
    borderWidth: 1,
    backgroundColor: colors.black10,
  },
  productWrap: {
    flexDirection: 'row',
    paddingBottom: 16,
    borderBottomColor: colors.black50,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  imgThumb: {
    width: 169,
    height: 280,
    borderRadius: 8,
    marginRight: 16,
    overflow: 'hidden',
  },
  brand: {
    ...fontStyle.helvetica,
    fontSize: 18,
    letterSpacing: 1,
    color: colors.black80,
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
  product: {
    ...fontStyle.helveticaBold,
    fontSize: 18,
    letterSpacing: 1,
    textDecorationLine: 'underline',
    marginBottom: 16,
  },
  editor: {
    ...fontStyle.helvetica,
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 8,
  },
  btnCart: {
    backgroundColor: colors.black100,
    width: '100%',
  },
  btn: {
    backgroundColor: colors.gold50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  btnTxt: {
    ...fontStyle.ChronicleDisplay,
    marginLeft: 8,
    fontSize: 18,
    bottom: -3,
    color: colors.black100,
  },
})

const PostContentProduct = (props: any) => {
  const dispatch = useDispatch()
  const [product, setproduct] = useState(null)
  const [err, serErr] = useState(null)

  useEffect(() => {
    dispatch(
      getPostProduct(props.slug, 'slug', data => {
        if (data.status === 'success') {
          setproduct(data.rawData.data)
        }
      }),
    )
  }, [])

  const _openCartModal = useCallback(() => {
    navigate('modals', {
      screen: 'CartModal',
      params: { product: product.id },
    })
  }, [product])

  const _gotoBrand = useCallback(() => {
    navigate('Screens', {
      screen: 'BrandProductList',
      params: { brandId: product.brand.id },
    })
  }, [product])
  const _gotoproduct = useCallback(() => {
    navigate('Screens', {
      screen: 'ProductDetail',
      params: { productSlug: product.slug },
    })
  }, [product])

  if (err) {
    return null
  }

  if (!product) {
    return null
  }

  const editorNoted =
    product.details?.find(_det => _det.type === 'editors-note')?.content || ''

  return (
    <View style={styles.wrap}>
      <View style={styles.productWrap}>
        <ImageBackground
          style={styles.imgThumb}
          resizeMode="cover"
          source={
            product.image_url
              ? { uri: product.image_url, width: 280 * 2 }
              : require('@src/assets/placeholder/placeholder2.jpg')
          }
        />

        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              paddingBottom: 16,
              borderBottomColor: colors.black50,
              borderBottomWidth: 1,
              marginBottom: 16,
            }}>
            <TouchableOpacity onPress={_gotoBrand}>
              <Text onPress={null} style={styles.brand}>
                {product.brand.name}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={_gotoproduct}>
              <Text style={styles.product}>{product.name}</Text>
            </TouchableOpacity>

            <Text style={styles.editor}>Editor's Note: </Text>
            <Text style={{ color: colors.black80 }}>
              {textLimit(editorNoted, 45)}
            </Text>
          </View>
          <Button
            title="Add To Cart"
            onPress={_openCartModal}
            style={styles.btnCart}
            fontStyle={{ color: colors.white, fontWeight: 'bold' }}
            loading={null}
            loaderColor={colors.white}
          />
        </View>
      </View>
      <PressAbbleDiv style={styles.btn}>
        <Image
          source={require('@assets/icons/share.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text style={styles.btnTxt}>Share and Earn</Text>
      </PressAbbleDiv>
      <Text style={{ ...fontStyle.helvetica, color: colors.black70 }}>
        You’ll Earn IDR 3.960 when someone buy this product from your link.{' '}
        <Text onPress={null} style={{ ...fontStyle.helveticaBold }}>
          Learn More
        </Text>
      </Text>
    </View>
  )
}

export default PostContentProduct
