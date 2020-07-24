import React, { useEffect } from 'react'
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { fontStyle } from '@components/commont-styles'
import { referralsUser, newReferal } from '@modules/referrals/action'
import { makeGetNewreferrralUser } from '@modules/referrals/selector'

import { colors } from '@utils/constants'
import { dispatch } from '@src/root-navigation'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    ...fontStyle.playfairBold,
    fontSize: 24,
    color: colors.black100,
  },
  text: {
    ...fontStyle.helvetica,
    fontSize: 14,
    color: colors.black60,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  textStyle: {
    marginLeft: 0,
    color: colors.black100,
    ...fontStyle.helveticaBold,
  },
  textbold: {
    ...fontStyle.helveticaBold,
    color: colors.black100,
  },
  userAva: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: -12,
  },
  textLayout: { marginHorizontal: 25 },

  cartTitle: {},
})

const ReferalBanners = ({ users, newCount }: any) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(newReferal())
  }, [])

  if (newCount > 0) {
    return (
      <View
        style={{
          overflow: 'hidden',
        }}>
        <View
          style={{
            paddingHorizontal: 16,
            borderRadius: 8,
            paddingVertical: 24,
          }}>
          <View style={[styles.rowContainer, { marginBottom: 16 }]}>
            {users.map(_user => (
              <Image
                source={{ uri: _user.photo_url }}
                key={'user-ava' + _user.id}
                style={styles.userAva}
              />
            ))}
            {users.length > 5 && (
              <View
                style={[
                  styles.userAva,
                  {
                    backgroundColor: colors.black100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Text
                  style={[
                    styles.text,
                    styles.textbold,
                    {
                      color: colors.white,
                    },
                  ]}>
                  +{' '}
                  {newCount - users.length < 100
                    ? newCount - users.length
                    : newCount - users.length}
                </Text>
              </View>
            )}
          </View>
          <Text style={[styles.text, styles.textbold]}>
            {newCount} New Joined The Shonet
          </Text>
          <Text style={[styles.text, { fontSize: 12, marginTop: 8 }]}>
            You receive{' '}
            <Text style={[styles.textbold]}>{newCount} new coupon</Text>
          </Text>
        </View>
        <Image
          source={require('@assets/placeholder/coupon-bg-large.png')}
          style={[StyleSheet.absoluteFillObject, { zIndex: -1 }]}
        />
      </View>
    )
  }

  return (
    <ImageBackground
      style={{
        width: '100%',
        borderRadius: 8,
        paddingVertical: 12,
        overflow: 'hidden',
      }}
      source={require('@assets/placeholder/get-coupon-bg.png')}>
      <Text style={[styles.text, styles.textbold, styles.textLayout]}>
        GET 10% DISCOUNT COUPON
      </Text>
      <Text
        style={[
          styles.text,
          { fontSize: 12, marginTop: 4 },
          styles.textLayout,
        ]}>
        Share your invitation code
      </Text>
    </ImageBackground>
  )
}

const mapStateToProps = () => {
  const getnewRefuser = makeGetNewreferrralUser()
  return state => ({
    newCount: state.referrals.newCount,
    users: getnewRefuser(state),
  })
}
export default connect(mapStateToProps, null)(ReferalBanners)
