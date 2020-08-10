import React, { useMemo, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import NavbarModal from '@src/components/molecules/navbar-right-sidebar'
import { getAllCart, setLoading } from '@modules/cart/action'
import List from '@components/layouts/list-header'
import { cartListData } from '@hocs/data/cart'
import { changesRightSideBar } from '@modules/ui-interaction/action'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { product } from '@src/modules/normalize-schema'
import { colors, images as defaultImages } from '@src/utils/constants'
import { makeCartSummary } from '@modules/cart/selector'
import {
  setImage as changeImageUri,
  textElipsis as limitText,
} from '@utils/helpers'
import { fontStyle } from '../commont-styles'
import Icon from 'react-native-vector-icons/Feather'
import ImageAutoSchale from '../atoms/image-autoschale'
import CartEmptyState from '../molecules/cart-empty-state'
import { Button } from '../atoms/button'
import ActionGlobalCart from '../molecules/action-global-cart'
import CardLoader from '@components/atoms/loaders/cart-global-card'

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  saveArea: { backgroundColor: 'white' },
  cartContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  h1: {
    ...fontStyle.helveticaBold,
    fontSize: 18,
    color: colors.black100,
    marginBottom: 6,
  },
  productName: {
    ...fontStyle.helvetica,
    fontSize: 16,
    color: colors.black80,
  },
  productSpec: {
    ...fontStyle.helvetica,
    fontSize: 14,
    color: colors.black60,
    marginVertical: 8,
  },
  productPrice: {
    ...fontStyle.helvetica,
    flex: 1,
    fontSize: 16,
    color: colors.black100,
  },
  image: {
    width: 110,
  },
})

const Cart = props => {
  const image = !!props?.variant?.image_urls[0]
    ? changeImageUri(props?.variant?.image_urls[0], { ...styles.image })
    : defaultImages.product

  const productName = limitText(props.variant.product.product_name, 24)
  const _removeCart = useCallback(() => {
    props.removeCart(props.cartId)
  }, [])
  return (
    <View style={styles.cartContainer}>
      <View
        style={{
          width: 110,
          height: 190,
          marginRight: 16,
          justifyContent: 'center',
          backgroundColor: colors.black10,
        }}>
        <ImageAutoSchale
          source={
            typeof image === 'string'
              ? {
                  uri: changeImageUri(image, {
                    width: 110 * 2,
                    height: 190 * 2,
                  }),
                }
              : image
          }
          width={110}
          height={190}
          errorStyle={styles.image}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
        }}>
        <Text style={styles.h1}>{props.variant.product.brand_name}</Text>
        <Text style={styles.productName}>{productName}</Text>
        <Text style={styles.productSpec}>
          {props.cart.qty} pcs{' '}
          {props.variant.attribute_values?.map(data => {
            return ' • ' + data.value.label
          })}
        </Text>
        <Text style={styles.productPrice}>Rp {props.variant.price}</Text>
        <TouchableOpacity
          onPress={_removeCart}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            name="trash-2"
            size={14}
            color={colors.black60}
            style={{ marginRight: 4 }}
          />
          <Text style={{ color: colors.black60 }}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const CartWithData = cartListData(Cart)

const GlobalCart = (props: any) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCart())
  }, [])

  const _renderItem = useMemo(
    () => ({ item }) => {
      return <CartWithData cartId={item} />
    },
    [],
  )

  const _emptyState = () => {
    if (props.loading) {
      return <CardLoader />
    }
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <CartEmptyState />
      </View>
    )
  }

  const _keyExtractor = (item, index) => 'globnal-cart-item' + item

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <NavbarModal title={`Shopping Bag (${props.cartSummary.total_cart})`} />
      </SafeAreaView>
      <FlatList
        data={props.carts}
        renderItem={_renderItem}
        ListEmptyComponent={_emptyState}
        keyExtractor={_keyExtractor}
        scrollEnabled={props.carts.length === 0 ? false : true}
      />

      {props.carts.length ? <ActionGlobalCart /> : null}
    </View>
  )
}

const getCartSummary = makeCartSummary()

const mapStateToProps = (state: any) => {
  const isAuth = state.auth.isAuth
  const cartSummary = getCartSummary(state)

  let addresses = []
  let transactionCount = []
  if (isAuth) {
    addresses = state.addresses.order
    transactionCount = state.transaction.count
  }
  return {
    isAuth,
    addresses,
    stateCarts: state.carts.data,
    carts: state.carts.order,
    transactionCount,
    cartSummary,
  }
}

export default connect(mapStateToProps)(GlobalCart)
