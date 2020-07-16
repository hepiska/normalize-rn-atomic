import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { setImage } from '@utils/helpers'
import { connect, useDispatch } from 'react-redux'
import { getUserCoupons } from '@modules/coupons/action'
import NavbarTop from '@components/molecules/navbar-top'
import { fontStyle } from '@components/commont-styles'
import IconFa from 'react-native-vector-icons/FontAwesome5'
import { applyCoupon } from '@modules/cart/action'

import dayjs from 'dayjs'
import Line from '@components/atoms/line'
import { Button } from '@components/atoms/button'

import { colors } from '@utils/constants'
import TitleDescription from '@src/components/molecules/title-description'
import ImageAutoSchale from '@components/atoms/image-autoschale'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    ...fontStyle.playfairBold,
    fontSize: 16,
  },
  image: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardMargin: {
    marginBottom: 16,
  },
  action: {
    flexDirection: 'row',
  },
  section: {
    marginVertical: 8,
  },
  desc: {
    ...fontStyle.helvetica,
    color: colors.black70,
    fontSize: 14,
  },
  timeContainer: {
    marginLeft: 8,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: colors.black10,
  },
  btnSubmit: {
    marginTop: 16,
    marginBottom: 16,
    width: '100%',
    height: 48,
    paddingVertical: 16,
    backgroundColor: colors.black100,
  },
  btnSubmitText: {
    color: colors.white,
    marginLeft: 0,
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeText: {
    color: colors.black100,
    ...fontStyle.helveticaBold,
    marginVertical: 16,
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
})

const CouponsDetailPage = ({ coupon, route, navigation }: any) => {
  const dispatch = useDispatch()
  const [layout, setLayout] = useState(undefined)
  const { source, cartIds } = route.params || {}
  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  const _handleUse = useCallback(() => {
    if (source === 'cart') {
      dispatch(applyCoupon(coupon.id))
      navigation.pop(2)
    } else {
      dispatch(applyCoupon(coupon.id))
      navigation.pop(2)
    }
  }, [])
  return (
    <>
      <NavbarTop
        leftContent={['back']}
        title="Coupon Detail"
        saveAreaStyle={{ backgroundColor: 'white' }}
      />
      <ScrollView style={[styles.container]} onLayout={_setLayout}>
        {layout && (
          <ImageAutoSchale
            style={styles.image}
            width={layout.width}
            height={80}
            source={{
              uri: setImage(coupon.image_url, {
                width: layout.width * 2,
              }),
            }}
          />
        )}
        <Text style={[styles.title, styles.section]}>{coupon.name}</Text>

        <View style={[styles.action, { alignItems: 'center' }, styles.section]}>
          <IconFa name="stopwatch" size={14} />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              Valid until: {dayjs(coupon.expiring_at).format('MMM DD[th], hhA')}
            </Text>
          </View>
        </View>
        <Line style={styles.section} />

        <Text style={[styles.section, styles.desc]}>{coupon.description}</Text>
        <TitleDescription title="Term and Condition" description={coupon.tnc} />
        <TitleDescription title="How to Use" description={coupon.how_to_use} />
        <Text style={[styles.section, styles.desc]}>
          This coupon was receive on{' '}
          {dayjs(coupon.created_at).format('DD MMM YYYY')}
        </Text>
        <Button
          title="Use Coupon"
          onPress={_handleUse}
          style={styles.btnSubmit}
          fontStyle={styles.btnSubmitText}
        />
      </ScrollView>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.coupons.loading,
  total: state.coupons.pagination.total || 0,
  coupon: state.coupons.data[ownProps.route.params.couponId],
})

export default connect(mapStateToProps, null)(CouponsDetailPage)
