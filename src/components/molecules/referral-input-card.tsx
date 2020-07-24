import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { fontStyle, borderStyle } from '@components/commont-styles'
import IconFa from 'react-native-vector-icons/FontAwesome'
import { request } from '@utils/services'
import { colors } from '@utils/constants'
import Field from '@components/atoms/field'

const styles = StyleSheet.create({
  title: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
    color: colors.black100,
  },
  text: {
    ...fontStyle.helvetica,
    fontSize: 10,
    marginTop: 6,
    marginBottom: 8,
    color: colors.black60,
  },
  check: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
})
let deftittle = 'Referral Code'
const deftext = 'Find your friends invitation code to get special gift'
const ReferalInputCard: React.FC<any> = ({ value, onChangeText, title }) => {
  const [userRef, setuserref] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    setError(null)
  }, [value])
  const _onBlur = useCallback(() => {
    request({ url: '/users/referrals/' + value, method: 'GET' })
      .then(res => {
        setuserref(res.data.data)
      })
      .catch(err => {
        setuserref(null)
        setError(err)
      })
  }, [])
  return (
    <ImageBackground
      style={{
        width: '100%',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#F8F6F1',
      }}
      source={require('@assets/placeholder/coupon-bg-large.png')}>
      <Text style={styles.title}>{title || deftittle}</Text>
      <Text style={styles.text}>{deftext}</Text>

      <View style={{ height: 46 }}>
        <Field
          value={value}
          onBlur={_onBlur}
          style={{
            backgroundColor: 'white',
            ...borderStyle.all,
            borderColor: colors.gold,
          }}
          placeholder=" eg. SHNT738-TZ"
          onChangeText={onChangeText}
        />
        {userRef && (
          <IconFa
            name="check-circle"
            style={styles.check}
            size={14}
            color={colors.gold}
          />
        )}
      </View>
      {error && (
        <Text style={[styles.text, { color: colors.gold }]}>
          Seems like this promo code is fully redeemed or invalid.
        </Text>
      )}
    </ImageBackground>
  )
}
export default ReferalInputCard
