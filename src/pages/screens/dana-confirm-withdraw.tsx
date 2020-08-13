import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import NavbarTop from '@src/components/molecules/navbar-top'
import DanaCardProfile from '@src/components/molecules/dana-card-profile'
import { colors, danafee } from '@src/utils/constants'
import { fontStyle } from '@src/components/commont-styles'
import { formatCur } from '@utils/helpers'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@src/components/atoms/button'
import { navigate } from '@src/root-navigation'
import { reqPostWithdraw } from '@utils/services'
import Toast from 'react-native-root-toast'

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 16,
    flex: 1,
  },
  checkoutWrap: {
    marginVertical: 24,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderColor: colors.black50,
    borderRadius: 8,
    borderWidth: 1,
  },
  h1: {
    ...fontStyle.helvetica,
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.black100,
  },
  h2: {
    ...fontStyle.helveticaBold,
    fontSize: 16,
    color: colors.black80,
  },
  h3: {
    ...fontStyle.helvetica,
    fontSize: 14,
    color: colors.black70,
  },

  button: {
    width: '100%',
    backgroundColor: colors.black100,
    height: 42,
    marginVertical: 12,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  line: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: colors.black50,
  },
  detailWrap: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    ...fontStyle.helvetica,
    color: colors.black70,
    fontSize: 10,
  },
  secure: {
    ...fontStyle.helvetica,
    color: colors.black60,
    fontSize: 8,
  },
})

export default class DanaConfirmWithdraw extends Component<any, any> {
  state = {
    loading: false,
  }
  withdraw = () => {
    this.setState({ loading: true })
    const { params } = this.props.route

    reqPostWithdraw(Number(params.amount))
      .then(res => {
        this.setState({ loading: false })
        this.props.navigation.goBack()
      })
      .catch(err => {
        if (err.message.includes('422')) {
          Toast.show('amont is invalid', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            backgroundColor: colors.red1,
            animation: true,
            hideOnPress: true,
          })
        } else if (err.message.includes('503')) {
          Toast.show('Something goes wrong with DANA', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            backgroundColor: colors.red1,
            animation: true,
            hideOnPress: true,
          })
        }
        this.setState({ loading: false })
      })
  }
  render() {
    const { params } = this.props.route
    return (
      <>
        <NavbarTop title={'Confirmation Withdraw'} leftContent={['back']} />
        <View style={styles.layout}>
          <View style={styles.checkoutWrap}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 18,
              }}>
              <Text style={styles.h1}>Received Ammount</Text>
              <Text style={styles.h1}>
                IDR {formatCur(params.amount - danafee)}
              </Text>
            </View>
            <View style={styles.line} />
            <View style={styles.detailWrap}>
              <Text style={styles.h3}>Withdraw Amount</Text>
              <Text style={styles.h3}>IDR {formatCur(params.amount)}</Text>
            </View>
            <View style={styles.detailWrap}>
              <Text style={styles.h3}>Processing Fee</Text>
              <Text style={styles.h3}>- IDR {formatCur(danafee)}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.h1}>Receiver Detail</Text>
            <DanaCardProfile />
          </View>
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Text style={styles.link}>
                All your transaction are secure. By Continuing, you agree to The
                Shonet{' '}
                <Text
                  style={{ fontWeight: 'bold' }}
                  onPress={() => {
                    navigate('Screens', { screen: 'TermsCondition' })
                  }}>
                  Terms of Use
                </Text>{' '}
                and{' '}
                <Text
                  style={{ fontWeight: 'bold' }}
                  onPress={() => {
                    navigate('Screens', { screen: 'PrivacyPolicy' })
                  }}>
                  Privacy Policy
                </Text>
              </Text>
              <Button
                title="Continue to Disburse"
                loading={this.state.loading}
                onPress={this.withdraw}
                style={styles.button}
                fontStyle={styles.buttonText}
              />
              <Text style={styles.secure}>
                Secure 128-bit SSL Encrypted Payment
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </>
    )
  }
}
