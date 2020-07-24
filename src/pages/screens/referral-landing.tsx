import React, { useMemo, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native'
import IconFa from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import { useuserReferrals } from '@src/hooks/referrals'
import { colors } from '@utils/constants'

import { landingPageStyles } from '@components/commont-styles'
const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  abs: {},
  image: { width, height: 1.28 * width },
  bottomSection: {
    position: 'absolute',
    padding: 16,
    width: '100%',
    bottom: 0,
    zIndex: 2,
    left: 0,
  },
  floatingCardContainer: {
    position: 'absolute',
    backgroundColor: colors.white,
    flexDirection: 'row',
    padding: 8,
    borderRadius: 32,
    left: 16,
    top: 32,
    alignItems: 'center',
    zIndex: 3,
  },
  userAva: {
    width: 32,
    borderRadius: 16,
    marginRight: 16,
    height: 32,
  },
})

const InviterCard = ({ refcode }) => {
  const [userRef] = useuserReferrals(refcode)
  if (!userRef) {
    return null
  }
  return (
    <View style={styles.floatingCardContainer}>
      <Image style={styles.userAva} source={{ uri: userRef.photo_url }} />
      <Text style={landingPageStyles.text}>
        You are invited by{' '}
        <Text style={landingPageStyles.textbold}>{userRef.name}</Text> 🎉
      </Text>
    </View>
  )
}

const ReferalLanding: React.FC<any> = ({ navigation }) => {
  const [pos, setPos] = useState(0)
  const { refcode } = useSelector(state => ({
    refcode: state.auth.referral_code,
  }))
  console.log('refcode', refcode)
  const data = useMemo(() => {
    return [
      {
        title: 'Your one stop Shopping Network',
        image: require('@assets/placeholder/referral-landing-1.png'),
        // actionText: 'Next',
        actionText: "Let's Start",
        action: () => {
          // setPos(1)
          navigation.navigate('LoginRegister', { refcode: refcode })
        },
        desc:
          'Connect, create, and seamlessly shop thousands of fashion and beauty products',
      },
      {
        title: 'Share your posts & products to earn!',
        image: require('@assets/placeholder/referral-landing-2.png'),
        actionText: 'Let’s start to explore ',
        icon: (
          <IconFa
            name="arrow-right"
            size={12}
            color={colors.white}
            style={{ marginLeft: 8 }}
          />
        ),
        action: () => {
          console.log('=======')
        },
        desc:
          'Share the things you love and earn commission on every purchase made',
      },
    ]
  }, [])
  const active = data[pos]
  return (
    <View style={(landingPageStyles.container, { flex: 1 })}>
      <InviterCard refcode={refcode} />
      <View style={[StyleSheet.absoluteFill, { zIndex: 0 }]}>
        <View>
          <Image style={styles.image} source={active.image} />
          <LinearGradient
            style={StyleSheet.absoluteFill}
            colors={['rgba(255,255,255, 0)', 'rgba(255,255,255, 1)']}
          />
        </View>
      </View>

      <View style={styles.bottomSection}>
        <Text style={[landingPageStyles.title, { marginBottom: 16 }]}>
          {active.title}
        </Text>

        <Text style={[landingPageStyles.desc, { marginBottom: 40 }]}>
          {active.desc}
        </Text>

        <TouchableOpacity
          onPress={active.action}
          style={[
            landingPageStyles.btnblack,
            {
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            },
          ]}>
          <Text style={[landingPageStyles.btnblackText]}>
            {active.actionText}
          </Text>
          {active.icon && active.icon}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ReferalLanding
