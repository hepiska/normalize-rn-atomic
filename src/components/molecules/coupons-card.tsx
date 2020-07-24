import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { setImage } from '@utils/helpers'
import { fontStyle } from '@components/commont-styles'
import { Button } from '@components/atoms/button'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { navigate } from '@src/root-navigation'
import IconFa from 'react-native-vector-icons/FontAwesome5'
import dayjs from 'dayjs'
import { colors } from '@utils/constants'
import { coupon } from '@src/modules/normalize-schema'

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: colors.black10,
    // borderBottomWidth: 0,
    marginTop: 8,
  },
  title: {
    ...fontStyle.playfairBold,
    fontSize: 16,
  },
  description: {
    ...fontStyle.helvetica,
    color: colors.black60,
    fontSize: 10,
  },
  image: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 8,
    marginHorizontal: 16,
  },
  action: {
    flexDirection: 'row',
  },
  timeContainer: {
    marginLeft: 8,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: colors.black10,
  },
  timeText: {
    color: colors.black100,
    ...fontStyle.helveticaBold,
    fontSize: 10,
  },
  btnSubmit: {
    width: 55,
    backgroundColor: colors.black100,
  },
  btnSubmitText: {
    color: colors.white,
    marginLeft: 0,
    fontSize: 12,
    fontWeight: 'bold',
  },
  justify: {
    justifyContent: 'space-between',
  },
  inActive: {
    backgroundColor: 'rgba(124,124,124, 0.5)',
  },
  dashedLine: {
    borderStyle: 'dotted',
    borderColor: colors.black10,
    borderWidth: 2,
    width: '100%',
  },
})

const CouponsCard = (props: any) => {
  const [layout, setLayout] = useState(undefined)
  const { is_valid } = props.coupon
  const _setLayout = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }
  const _handleUse = useCallback(() => {
    if (is_valid === false) {
      return null
    }

    if (props.onUse) {
      props.onUse(props.coupon)
    }
  }, [])
  const _handleClick = useCallback(() => {
    if (props.onClick) {
      props.onClick
    } else {
      navigate('Screens', {
        screen: 'CouponDetail',
        params: { couponId: props.coupon.id, source: props.source },
      })
    }
  }, [])
  // const is_valid = false
  const style = StyleSheet.flatten(props.style)
  const invalidStyleFont = is_valid === false ? { color: colors.black60 } : {}
  const invalidStyleButton =
    is_valid === false ? { backgroundColor: colors.black60 } : {}
  return (
    <>
      <View style={[styles.container, style]} onLayout={_setLayout}>
        <TouchableOpacity style={styles.image} onPress={_handleClick}>
          {layout && (
            <ImageAutoSchale
              width={328}
              height={62}
              source={{
                uri:
                  is_valid === false
                    ? setImage(
                        props.coupon.image_url,
                        {
                          width: layout.width * 2,
                        },
                        '&monochrome=716F6F',
                      )
                    : setImage(props.coupon.image_url, {
                        width: layout.width * 2,
                      }),
              }}
            />
          )}
        </TouchableOpacity>

        <Text style={[styles.title, styles.section, invalidStyleFont]}>
          {props.coupon.name}
        </Text>
        <Text style={[styles.section, styles.description]}>
          {props.coupon.description}
        </Text>
        <View style={[styles.section, styles.action, styles.justify]}>
          <View
            style={[
              styles.action,
              { justifyContent: 'center', alignItems: 'center' },
            ]}>
            <IconFa name="stopwatch" size={14} style={invalidStyleFont} />
            <View style={styles.timeContainer}>
              <Text style={[styles.timeText, invalidStyleFont]}>
                Valid until:
                {dayjs(props.coupon.expiring_at).format('MMM DD[th], hhA')}
              </Text>
            </View>
          </View>
          <Button
            title="Use"
            onPress={_handleUse}
            style={{ ...styles.btnSubmit, ...invalidStyleButton }}
            fontStyle={styles.btnSubmitText}
          />
        </View>
        {/* <View style={[StyleSheet.absoluteFill, styles.inActive]} /> */}
      </View>
      {/* <View style={styles.dashedLine} /> */}
    </>
  )
}

export default CouponsCard
