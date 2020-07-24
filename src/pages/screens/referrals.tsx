import React, { useState, useCallback, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { landingPageStyles } from '@components/commont-styles'
import { Button } from '@components/atoms/button'
import { connect, useDispatch } from 'react-redux'
import { colors } from '@utils/constants'
import NavbarTop from '@components/molecules/navbar-top'
import ReveralHowTo from '@components/organisms/referrals-how-to'
import IconFa from 'react-native-vector-icons/FontAwesome'
import ContentExpandable from '@components/molecules/content-expandable'
import CONFIG from 'react-native-config'
import { getUser } from '@modules/user/action'

const { width } = Dimensions.get('window')

const howToData = [
  {
    image: require('@assets/icons/how-to-share.png'),
    title: 'Share Your Invitation Code',
    desc: 'Share to any social media platform that you have a thousand times',
  },
  {
    image: require('@assets/icons/how-to-contact.png'),
    title: 'Friend Registered with Your Invitation Code',
    desc:
      'Your friends or family receive invitation code and register into The Shonet',
  },
  {
    image: require('@assets/icons/how-to-reward.png'),
    title: 'Collect and Use Your Discount Coupon',
    desc:
      'You will automatically receive coupon into your account and let’s get shop',
  },
]

const qna = [
  {
    title: 'How many times you can get a coupon ?',
    desc:
      'Unlimited!. You can get as many as you can. Every user that use your invitation code to register in The Shonet you will automatically earn Discount Coupon',
  },
  {
    title:
      'Can we share link or code to more than one social media platform ? ',
    desc:
      'Unlimited!. You can get as many as you can. Every user that use your invitation code to register in The Shonet you will automatically earn Discount Coupon',
  },
  {
    title: 'Does coupon have expired date ?',
    desc:
      'Unlimited!. You can get as many as you can. Every user that use your invitation code to register in The Shonet you will automatically earn Discount Coupon',
  },
  {
    title: 'How many times you can get a coupon ?',
    desc:
      'Unlimited!. You can get as many as you can. Every user that use your invitation code to register in The Shonet you will automatically earn Discount Coupon',
  },
]

const ReferalPage = (props: any) => {
  const dispatch = useDispatch()
  const [couponCode, setCouponCode] = useState(null)
  const _shareCode = useCallback(() => {
    const shareUri =
      CONFIG.SHONET_URI +
      '/register?referral_code=' +
      props.detailme?.referral_code
    props.navigation.navigate('modals', {
      screen: 'Share',
      params: {
        uri: shareUri,
        title: 'Shonet Referrals',
        message: 'Get discount by Use this link',
      },
    })
  }, [])
  const _goToUserReverals = useCallback(() => {
    props.navigation.navigate('ReferralsStatus')
  }, [])
  const _goToTermndCondition = useCallback(() => {
    props.navigation.navigate('TermsCondition', {
      title: 'Referral Terms and Condition',
    })
  }, [])

  useEffect(() => {
    dispatch(getUser(props.me.username, 'username'))
  }, [])
  return (
    <>
      <NavbarTop
        leftContent={['back']}
        title="Referrals"
        saveAreaStyle={{ backgroundColor: 'white' }}
      />
      <ScrollView>
        <Image
          source={require('@assets/placeholder/referrals-image.png')}
          style={{ width, height: 0.9 * width }}
        />
        <View style={landingPageStyles.container}>
          <Text style={landingPageStyles.title}>
            Invite a friend to The Shonet
          </Text>
          <Text style={[landingPageStyles.text, { marginTop: 16 }]}>
            Share you invitation code below and get{' '}
            <Text style={landingPageStyles.textbold}>10% FREE </Text>coupon for
            each friend you invited
          </Text>
          <View style={[landingPageStyles.blackSection, { marginTop: 62 }]}>
            <Text
              style={[
                landingPageStyles.text,
                landingPageStyles.textbold,
                { color: colors.white },
              ]}>
              {props.detailme?.referral_code || 'CODE'}
            </Text>
            <Button
              title="Share"
              fontStyle={landingPageStyles.textStyle}
              onPress={_shareCode}
            />
          </View>
          <Button
            leftIcon="gift"
            onPress={_goToUserReverals}
            style={{ marginTop: 24 }}
            title="Check Status"
            fontStyle={{ ...landingPageStyles.text, color: colors.black100 }}
          />

          <Text
            style={[
              landingPageStyles.title,
              { marginTop: 60, marginBottom: 24 },
            ]}>
            How to earn The Shonet Discount Coupon
          </Text>
          <ReveralHowTo data={howToData} />

          <Text
            style={[
              landingPageStyles.title,
              { marginTop: 32, marginBottom: 24 },
            ]}>
            How can we help you ?
          </Text>

          <View>
            {qna.map((data, index) => {
              return (
                <ContentExpandable
                  title={data.title}
                  isCapitalEahWord={false}
                  paddingTitleVertical={16}
                  content={
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.black60,
                      }}>
                      {data.desc}
                    </Text>
                  }
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    marginBottom: 8,
                  }}
                  id={'=====qa' + index}
                  key={'qna' + index}
                />
              )
            })}
          </View>

          <TouchableOpacity
            style={[
              landingPageStyles.rowContainer,
              { alignItems: 'center', marginVertical: 32 },
            ]}
            onPress={_goToTermndCondition}>
            <IconFa name="lightbulb-o" size={14} />
            <Text
              style={[
                landingPageStyles.textbold,
                {
                  textDecorationLine: 'underline',
                  marginLeft: 16,
                  fontSize: 14,
                  textDecorationStyle: 'solid',
                },
              ]}>
              Read Referral Terms and Condition
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  )
}

const mapStateToProps = state => ({
  me: state.auth.data.user,
  detailme: state.user.data[state.auth.data.user.id],
})

export default connect(mapStateToProps, null)(ReferalPage)
