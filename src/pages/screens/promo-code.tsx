import React, { useCallback, useReducer } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import NavbarTop from '@components/molecules/navbar-top'

import { fontStyle, borderStyle } from '@components/commont-styles'

import { Button, OutlineButton } from '@components/atoms/button'
import { colors } from '@utils/constants'
import Field from '@components/atoms/field'
import { redemCoupon } from '@modules/coupons/action'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    ...fontStyle.helveticaBold,
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
    fontSize: 12,
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
  absolute: {
    position: 'absolute',
    paddingHorizontal: 16,
    width: '100%',
    bottom: 0,
    left: 0,
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

const actionType = {
  CHANGE_LOADING: 'CHANGE_LOADING',
  CHANGE_IS_SUCCESS: 'CHANGE_STATUS',
  CHANGE_DATA: 'CHANGE_DATA',
  SET_ERROR: 'SET_ERROR',
  CHANGE_CODE: 'CHANGE_CODE',
}
const initialState = {
  loading: false,
  data: [],
  code: '',
  isSuccess: false,
  error: null,
}
const promoReducer = (state, action) => {
  const { type, payload } = action
  const newState = { ...state }
  switch (type) {
    case actionType.CHANGE_DATA:
      newState.data = payload
      return newState
    case actionType.CHANGE_LOADING:
      newState.loading = payload
      return newState

    case actionType.CHANGE_CODE:
      newState.code = payload
      return newState

    case actionType.CHANGE_IS_SUCCESS:
      newState.status = payload
      return newState

    case actionType.SET_ERROR:
      newState.error = payload
      return newState

    default:
      return state
  }
}

const PromoCode = ({ navigation, route }: any) => {
  const [{ loading, code, isSuccess, error, data }, dispatch] = useReducer(
    promoReducer,
    initialState,
  )
  const { source } = route.params || {}
  const _handleSumit = useCallback(() => {
    dispatch({ type: actionType.SET_ERROR, payload: null })
    dispatch({ type: actionType.CHANGE_LOADING, payload: true })

    redemCoupon(code)
      .then(_data => {
        dispatch({ type: actionType.CHANGE_DATA, payload: _data.data.data })
        dispatch({ type: actionType.CHANGE_LOADING, payload: false })
        dispatch({ type: actionType.CHANGE_IS_SUCCESS, payload: true })
      })
      .catch(() => {
        dispatch({
          type: actionType.SET_ERROR,
          payload: 'Seems like this promo code is fully redeemed or invalid.',
        })
        dispatch({ type: actionType.CHANGE_LOADING, payload: false })
      })
  }, [code])
  const _goToCoupons = useCallback(() => {
    navigation.replace('Coupons')
  }, [])

  const _changeCode = useCallback(e => {
    dispatch({ type: actionType.SET_ERROR, payload: null })

    dispatch({ type: actionType.CHANGE_CODE, payload: e })
  }, [])

  const _handleExit = useCallback(e => {
    if (source && source === 'cart') {
      // handle back to cart
    } else {
      // handle back to shop
    }
  }, [])
  return (
    <>
      {!isSuccess && (
        <NavbarTop
          leftContent={['back']}
          title="Promo Code"
          saveAreaStyle={{ backgroundColor: 'white' }}
        />
      )}

      {!isSuccess ? (
        <View style={[styles.container, { marginTop: 24 }]}>
          <Text style={[styles.title]}>Enter Promo Code</Text>
          <Text style={[styles.desc, { marginBottom: 24 }]}>
            Enter promo code below and earn gift
          </Text>

          <View style={{ height: 46 }}>
            <Field
              value={code}
              style={{ backgroundColor: 'white', ...borderStyle.all }}
              placeholder=" eg. SHNT738-TZ"
              onChangeText={_changeCode}
            />
          </View>
          {error && (
            <Text
              style={[
                styles.desc,
                { marginBottom: 24, color: colors.gold, marginTop: 8 },
              ]}>
              Seems like this promo code is fully redeemed or invalid.
            </Text>
          )}
        </View>
      ) : (
        <View
          style={[
            styles.container,
            { marginTop: 24, justifyContent: 'center', alignItems: 'center' },
          ]}>
          <Text style={[styles.title, { fontSize: 18 }]}>
            You Got {data.length} New Coupon
          </Text>
          <Text style={[styles.desc, { marginBottom: 24 }]}>
            Use coupon for shopping at Shonet Commerce
          </Text>
        </View>
      )}

      <View style={styles.absolute}>
        {isSuccess ? (
          <>
            <OutlineButton
              onPress={_goToCoupons}
              title="View all Coupon"
              fontStyle={{ ...styles.btnSubmitText, color: colors.black100 }}
              style={{ borderColor: colors.black50 }}
            />
            <Button
              title={
                source && source === 'cart' ? 'Back to Cart' : 'Go to Shopping'
              }
              onPress={_handleExit}
              loading={loading}
              style={styles.btnSubmit}
              fontStyle={styles.btnSubmitText}
            />
          </>
        ) : (
          <Button
            title="Use Coupon"
            onPress={_handleSumit}
            loading={loading}
            style={styles.btnSubmit}
            fontStyle={styles.btnSubmitText}
          />
        )}
      </View>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.coupons.loading,
  total: state.coupons.pagination.total || 0,
})

export default connect(mapStateToProps, null)(PromoCode)
