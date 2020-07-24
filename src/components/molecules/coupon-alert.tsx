import React, { useCallback, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native'
import { fontStyle, borderStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import { navigate } from '@src/root-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconMa from 'react-native-vector-icons/MaterialCommunityIcons'
import { makeSelectedCoupons } from '@src/modules/coupons/selector'
import { applyCoupon } from '@modules/cart/action'
import { getUserCoupons, getAvailiableCoupons } from '@modules/coupons/action'
import { connect, useDispatch } from 'react-redux'

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerPadding: { paddingVertical: 10, paddingHorizontal: 16 },
  icon: { width: 16, height: 12, marginRight: 10, color: colors.black100 },
  text: { fontSize: 14, ...fontStyle.helvetica, color: colors.black100 },
  goldtext: { fontSize: 13, ...fontStyle.helveticaBold, color: colors.gold },

  successAlert: {
    width: 328,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
  },
})

const CouponAlert = (props: any) => {
  const dispatch = useDispatch()
  const _removeAppliedCoupons = useCallback(() => {
    dispatch(applyCoupon(null))
  }, [])
  const style = StyleSheet.flatten(props.style)
  useEffect(() => {
    if (props.selectedCart) {
      dispatch(getAvailiableCoupons({ cart_ids: props.selectedCart }))
    } else {
      dispatch(getUserCoupons({}))
    }
  }, [props.selectedCart])

  const _goToCoupons = useCallback(() => {
    navigate('Screens', {
      screen: 'Coupons',
      params: {
        source: 'cart',
        cartIds: props.selectedCart,
      },
    })
  }, [])
  const _goToReferal = useCallback(() => {
    navigate('Screens', {
      screen: 'PromoCode',
      params: {
        source: 'cart',
        cartIds: props.selectedCart,
      },
    })
  }, [])
  if (!props.selectedCart) {
    return (
      <View style={style}>
        <TouchableOpacity
          onPress={_goToReferal}
          style={[
            styles.rowContainer,
            borderStyle.all,
            styles.containerPadding,
            { justifyContent: 'space-between' },
          ]}>
          <View style={styles.rowContainer}>
            <Image
              style={styles.icon}
              source={require('@assets/icons/ticket.png')}
            />
            <Text style={styles.text}>Do you have promo code ?</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={style}>
      {!props.appliedCoupon ? (
        <TouchableOpacity
          onPress={_goToCoupons}
          style={[
            styles.rowContainer,
            borderStyle.all,
            styles.containerPadding,
            { justifyContent: 'space-between' },
          ]}>
          <View style={styles.rowContainer}>
            <Image
              style={styles.icon}
              source={require('@assets/icons/ticket.png')}
            />
            <Text style={styles.text}>
              You have {props.total} discount coupon
            </Text>
          </View>
          <Icon name="chevron-right" size={16} />
        </TouchableOpacity>
      ) : props.appliedCoupon && props.appliedCoupon.is_valid ? (
        <ImageBackground
          style={[
            styles.successAlert,
            styles.containerPadding,
            styles.rowContainer,
            { justifyContent: 'space-between' },
          ]}
          source={require('@assets/icons/coupon-bg.png')}>
          <View style={styles.rowContainer}>
            <Image
              style={styles.icon}
              source={require('@assets/icons/ticket-gold.png')}
            />
            <Text style={styles.goldtext}>{props.appliedCoupon.name}</Text>
          </View>
          <IconMa
            name="close-circle"
            onPress={_removeAppliedCoupons}
            size={14}
            color={colors.gold}
          />
        </ImageBackground>
      ) : (
        <View
          style={[
            styles.rowContainer,
            {
              paddingHorizontal: 8,
              paddingVertical: 16,
              borderRadius: 8,
              backgroundColor: colors.orange,
            },
          ]}>
          <Text style={{ flex: 1, marginRight: 16, color: colors.white }}>
            Cannot Apply Coupon: Minimum purchase is not met or coupon is no
            longer valid
          </Text>
          <IconMa
            name="close"
            onPress={_removeAppliedCoupons}
            size={14}
            color={colors.white}
          />
        </View>
      )}
    </View>
  )
}

const mapStateToProps = () => {
  const getCoupon = makeSelectedCoupons()
  return (state, ownProps) => {
    return {
      total: state.coupons.pagination.total || 0,
      appliedCoupon: getCoupon(state, state.carts.appliedCoupon),
    }
  }
}
export default connect(mapStateToProps, null)(CouponAlert)
