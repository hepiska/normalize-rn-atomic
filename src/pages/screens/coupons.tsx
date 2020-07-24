import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { getUserCoupons, getAvailiableCoupons } from '@modules/coupons/action'
import { fontStyle, borderStyle } from '@components/commont-styles'
import NavbarTop from '@components/molecules/navbar-top'
import { couponsData } from '@hocs/data/coupons'
import { applyCoupon } from '@modules/cart/action'
import EmptyState from '@components/molecules/empty-state'
import CouponLoader from '@components/atoms/loaders/coupon'
import List from '@components/layouts/list-header'
import CouponsCard from '@components/molecules/coupons-card'
import { colors } from '@utils/constants'

const CouponCardWithData = couponsData(CouponsCard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardMargin: {
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  desc: {
    textAlign: 'center',
    ...fontStyle.helvetica,
    color: colors.black70,
  },
  containerPadding: { paddingVertical: 10, paddingHorizontal: 16 },
  icon: { width: 16, height: 12, marginRight: 10, color: colors.black100 },
  text: { fontSize: 14, ...fontStyle.helvetica, color: colors.black100 },
  goldtext: { fontSize: 13, ...fontStyle.helveticaBold, color: colors.gold },
})

let limit = 10
const CouponsPage = (props: any) => {
  const dispatch = useDispatch()
  const [skip, setSkip] = useState(0)
  const { route } = props
  const { source, cartIds } = route.params || {}
  const _fetchData = () => {
    const params = { limit, offset: skip * limit }
    if (source === 'cart') {
      dispatch(getAvailiableCoupons({ ...params, cart_ids: cartIds }))
    } else {
      dispatch(getUserCoupons(params))
    }
  }

  useEffect(() => {
    if (skip > 0 && props.total <= props.coupons.length) {
      return
    }
    _fetchData()
  }, [skip])

  const _goToPromoCode = useCallback(() => {
    props.navigation.navigate('Screens', {
      screen: 'PromoCode',
      params: {
        source: 'cart',
        cartIds: props.selectedCart,
      },
    })
  }, [])

  const _goToReferal = useCallback(() => {
    props.navigation.navigate('Screens', {
      screen: 'Referrals',
      params: {
        source: 'cart',
        cartIds: props.selectedCart,
      },
    })
  }, [])

  const _handleOnUse = useCallback(coupon => {
    if (source === 'cart') {
      dispatch(applyCoupon(coupon.id))
      props.navigation.goBack()
    } else {
      dispatch(applyCoupon(coupon.id))
      props.navigation.goBack()
    }
  }, [])

  const _renderItem = useMemo(
    () => ({ item, index }) => {
      return (
        <CouponCardWithData
          source={source}
          onUse={_handleOnUse}
          key={'coupon-item-' + item}
          couponId={item}
          style={styles.cardMargin}
        />
      )
    },
    [],
  )

  const _rendeFooter = useMemo(
    () => ({ item, index }) => {
      if (!props.coupons.length) {
        return null
      }

      return (
        <View
          style={[
            styles.rowContainer,
            {
              backgroundColor: colors.black10,
              padding: 16,
              borderRadius: 8,
              marginBottom: 32,
            },
          ]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.text, { ...fontStyle.helveticaBold }]}>
              Do you more need coupon ?
            </Text>
            <Text
              style={[
                styles.text,
                { fontSize: 10, color: colors.black70, marginTop: 8 },
              ]}>
              Share your referral code to get 10% OFF discount coupon{' '}
            </Text>
          </View>
          <TouchableOpacity
            onPress={_goToReferal}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              borderStyle: 'solid',
              marginLeft: 16,
              borderWidth: 1,
              borderColor: colors.black60,
            }}>
            <Text style={[styles.text, { ...fontStyle.helveticaBold }]}>
              Learn More
            </Text>
          </TouchableOpacity>
        </View>
      )
    },
    [props.coupons],
  )
  const _renderHeader = useMemo(
    () => () => (
      <TouchableOpacity
        onPress={_goToPromoCode}
        style={[
          styles.rowContainer,
          borderStyle.all,
          styles.containerPadding,
          { justifyContent: 'space-between', marginTop: 16 },
        ]}>
        <View style={styles.rowContainer}>
          <Image
            style={styles.icon}
            source={require('@assets/icons/ticket.png')}
          />
          <Text style={styles.text}>Do you have promo code ?</Text>
        </View>
      </TouchableOpacity>
    ),
    [],
  )

  const _onReachEnd = useCallback(() => {
    if (!props.loading) {
      setSkip(state => {
        state += 1
        return state
      })
    }
  }, [props.loading])

  const _renderEmpty = () => {
    if (props.loading) {
      return <CouponLoader style={styles.list} />
    }
    return (
      <View>
        <EmptyState
          title="Do You Need Coupon ?"
          img={require('@assets/placeholder/searching-for-the-search-result.png')}
          description={
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.desc}>
                Share your invitation code and both of you can get special
                coupon from Shonet.{' '}
              </Text>
              <TouchableOpacity onPress={_goToReferal}>
                <Text
                  style={[styles.desc, { textDecorationLine: 'underline' }]}>
                  Learn More
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    )
  }

  return (
    <>
      <NavbarTop
        leftContent={['back']}
        title={`My Coupons (${props.total})`}
        saveAreaStyle={{ backgroundColor: 'white' }}
      />
      <View style={[styles.container]}>
        <List
          ListHeaderComponent={_renderHeader}
          ListEmptyComponent={_renderEmpty}
          onEndReached={_onReachEnd}
          onEndReachedThreshold={0.98}
          data={props.coupons}
          renderItem={_renderItem}
          style={styles.list}
          ListFooterComponent={_rendeFooter}
        />
      </View>
    </>
  )
}

const mapStateToProps = state => ({
  loading: state.coupons.loading,
  total: state.coupons.pagination.total || 0,
  coupons: state.coupons.order,
})

export default connect(mapStateToProps, null)(CouponsPage)
