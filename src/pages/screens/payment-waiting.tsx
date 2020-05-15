import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors, images as defaultImages } from '@src/utils/constants'
import { getTransactionById } from '@modules/transaction/action'
import { fontStyle } from '@components/commont-styles'
import StatusAlert from '@components/atoms/status-alert'
import { CommonActions } from '@react-navigation/native'
import ImageAutoSchale from '@src/components/atoms/image-autoschale'
import { OutlineButton, GradientButton } from '@components/atoms/button'
import { showAlert, formatRupiah, countdown } from '@utils/helpers'
import Clipboard from '@react-native-community/clipboard'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconMi from 'react-native-vector-icons/MaterialIcons'
import { PressAbbleDiv } from '@src/components/atoms/basic'
import ContentExpandable from '@components/molecules/content-expandable'
import day from 'dayjs'
import { payment_guide } from '@utils/payment-guide'
import { navigate, goBack } from '@src/root-navigation'
import BottomSheetModal from '@src/components/layouts/bottom-sheet-modal'
import ActionListCard from '@components/molecules/action-list-card'
import { sendEmail } from '@utils/helpers'

const Divider = ({ marginTop }) => (
  <View
    style={{
      borderColor: colors.black50,
      borderStyle: 'dashed',
      borderWidth: 1,
      width: '100%',
      marginTop: marginTop || 0,
    }}
  />
)

const { width, height } = Dimensions.get('screen')

const statusToIcon = status => {
  switch (status.toLowerCase()) {
    case 'unpaid':
    case 'waiting':
      return 'stopwatch'
  }
}

const statusToDescription = status => {
  switch (status.toLowerCase()) {
    case 'waiting':
      return 'Waiting for Payment'
    default:
      return status.toLowerCase()
  }
}

const styles = StyleSheet.create({
  image: {
    width: 56,
    borderRadius: 8,
    backgroundColor: colors.black50,
  },
  qrCode: {
    width: 300,
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
    color: colors.black70,
  },
  helvetica12Black80: {
    ...fontStyle.helvetica,
    fontSize: 12,
    color: colors.black80,
  },
  helvetica14: {
    ...fontStyle.helvetica,
    fontSize: 14,
    color: colors.black70,
  },
  helveticaBold14: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
    color: colors.black80,
  },
  helvetica14Color100: {
    ...fontStyle.helvetica,
    fontSize: 14,
    color: colors.black100,
  },
  helveticaBold14Color70: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
    color: colors.black70,
  },
  futuraBold18: {
    ...fontStyle.futuraBold,
    fontSize: 18,
    color: colors.black100,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  margin: {
    marginTop: 24,
    marginBottom: 16,
  },
  va_number: {
    ...fontStyle.helveticaBold,
    fontSize: 16,
    letterSpacing: 0.05,
    color: colors.blue60,
  },
  btnCopy: {
    width: 82,
    backgroundColor: 'rgba(17, 76, 212, 0.05)',
    height: 28,
    borderRadius: 100,
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCopyText: {
    ...fontStyle.helveticaBold,
    color: colors.blue60,
    fontSize: 12,
  },
  totalBillDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  timerContainer: {
    backgroundColor: colors.white,
    borderColor: colors.black10,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
  },
  buttonBlue: {
    width: '100%',
    height: 46,
    borderColor: colors.blue60,
    backgroundColor: colors.white,
  },
  buttonTextBlue: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
    color: colors.blue60,
    marginLeft: 0,
  },
  buttonTextWhite: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
    color: colors.white,
    marginLeft: 0,
  },
})
class PaymentWaiting extends Component<any, any> {
  interval = null
  count = null
  state: any = {
    isBottomSheetOpen: false,
    countdownTimer: {
      minutes: 0,
      seconds: 0,
      hours: 0,
    },
  }

  async componentDidMount() {
    const { transactionId, transaction, route } = this.props
    const { holdOpenWeb } = route.params || {}

    if (transactionId) {
      await this.callApi
      this.interval = setInterval(this.callApi, 10000)
    }
    if (transaction) {
      if (!holdOpenWeb) {
        this.handleTransaction()
      }
      const expired = transaction.expiring_at

      this.count = countdown(new Date(expired), data => {
        this.setState({
          countdownTimer: data,
        })
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { transaction } = this.props
    if (prevProps.transaction.expiring_at !== transaction.expiring_at) {
      const expired = transaction.expiring_at

      this.count = countdown(new Date(expired), data => {
        this.setState({
          countdownTimer: data,
        })
      })
    }
  }

  callApi = () => {
    this.props.getTransactionById(this.props.transactionId)
  }

  handleTransaction = () => {
    const { transaction } = this.props
    const method = transaction.provider_payment_method?.channel.toLowerCase()
    let redirectUri
    switch (method) {
      case 'gopay':
        redirectUri = transaction.actions.find(
          _act => _act?.name === 'deeplink-redirect',
        ).url
        this.props.navigation.navigate('PaymentWebView', { uri: redirectUri })
        break
      case 'dana':
        redirectUri = transaction.redirect_url
        this.props.navigation.navigate('PaymentWebView', { uri: redirectUri })
        break
      default:
        break
    }
  }

  _redirectToStatus = transaction => {
    if (
      transaction.status?.toLowerCase() === 'paid' &&
      transaction.status?.toLowerCase() === 'cancelled'
    ) {
      this.props.navigation.replace('PaymentResponse', {
        status: transaction.status,
        transactionId: transaction.id,
      })
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval)
    clearInterval(this.count)
  }

  handleCopy = va_number => () => {
    Clipboard.setString(va_number)
    showAlert('Copied')
  }

  renderContentExpandable = () => {
    const { transaction } = this.props
    if (!transaction || !transaction.provider_payment_method) {
      return null
    }
    return (
      <View>
        <View style={styles.totalBillDetail}>
          <Text style={styles.helveticaBold14Color70}>Total Price</Text>
          <Text style={styles.helveticaBold14Color70}>
            {formatRupiah(transaction.total_amount)}
          </Text>
        </View>
        <View style={styles.totalBillDetail}>
          <Text style={styles.helveticaBold14Color70}>Shipping Cost</Text>
          <Text style={styles.helveticaBold14Color70}>
            {formatRupiah(transaction.shipping_cost)}
          </Text>
        </View>
        <View style={styles.totalBillDetail}>
          <Text style={styles.helveticaBold14Color70}>Insurance Fee</Text>
          <Text style={styles.helveticaBold14Color70}>
            {formatRupiah(transaction.total_insurance_cost)}
          </Text>
        </View>
        <View style={styles.totalBillDetail}>
          <Text style={styles.helveticaBold14Color70}>Payment Fee</Text>
          <Text style={styles.helveticaBold14Color70}>
            {formatRupiah(transaction.provider_payment_method?.total_fee || 0)}
          </Text>
        </View>
      </View>
    )
  }

  renderTitleExpandable = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.helveticaBold14}>Payment Total</Text>
        <View style={{ marginLeft: 8 }}>
          <IconMi name="verified-user" size={12} color={colors.blue60} />
        </View>
      </View>
    )
  }

  renderRightTitleExpandable = () => {
    const { transaction } = this.props
    if (!transaction) {
      return null
    }
    return (
      <View style={{ marginRight: 16 }}>
        <Text style={styles.helveticaBold14}>
          {formatRupiah(
            transaction.total_amount +
              transaction.shipping_cost +
              transaction.total_insurance_cost,
            // transaction.provider_payment_method.total_fee,
          )}
        </Text>
      </View>
    )
  }

  renderShowTime = () => {
    const { countdownTimer } = this.state

    if (countdownTimer !== null) {
      let hour = countdownTimer.hours > 0 ? countdownTimer.hours : 0
      let min = countdownTimer.minutes > 0 ? countdownTimer.minutes : 0
      let sec = countdownTimer.seconds > 0 ? countdownTimer.seconds : 0
      return `${hour} Hours : ${min} Minutes : ${sec} Seconds`
    }
    return ` Hours : Minutes`
  }

  renderCountdownTimer = () => {
    const { transaction } = this.props
    if (!transaction) {
      return null
    }
    return (
      <View style={styles.timerContainer}>
        <Text style={styles.helvetica12}>Payment Time Remaining</Text>
        <View style={{ marginTop: 16 }}>
          <Text style={styles.futuraBold18}>{this.renderShowTime()}</Text>
        </View>
        <Divider marginTop={16} />
        <View style={{ marginTop: 16 }}>
          <Text
            style={
              styles.helvetica12Black80
            }>{`Please complete payment before ${day(
            transaction.expiring_at,
          ).format('MMMM DD, HH:mm')} WIB`}</Text>
        </View>
      </View>
    )
  }

  renderVirtualAccountInfo = () => {
    const { transaction } = this.props
    if (!transaction.provider_payment_method) {
      return null
    }
    if (!transaction) {
      return null
    }
    return (
      <>
        <View>
          <View style={{ marginTop: 24 }}>
            <Text style={styles.futuraBold18}>
              Transfer to Virtual Account Number
            </Text>
          </View>
          <View
            style={{
              marginTop: 24,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <ImageAutoSchale
                source={
                  transaction.provider_payment_method.image
                    ? { uri: transaction.provider_payment_method.image }
                    : defaultImages
                }
                width={56}
                style={styles.image}
              />
              <View style={{ marginLeft: 16 }}>
                <Text style={styles.va_number}>{transaction.va_number}</Text>
              </View>
            </View>
            <PressAbbleDiv onPress={this.handleCopy(transaction.va_number)}>
              <View style={styles.btnCopy}>
                <Icon
                  style={{ marginRight: 8 }}
                  name="copy"
                  color={colors.blue60}
                />
                <Text style={styles.btnCopyText}>Copy</Text>
              </View>
            </PressAbbleDiv>
          </View>
        </View>
        <Divider marginTop={32} />
      </>
    )
  }

  renderPaymentGuide = () => {
    if (!this.props.transaction.provider_payment_method) {
      return null
    }
    const {
      transaction: {
        provider_payment_method: { name, channel },
      },
    } = this.props

    let _name
    if (name.toLowerCase() === 'virtual account') _name = 'virtual_account'
    if (name.toLowerCase() === 'gopay' || name.toLowerCase() === 'dana')
      _name = 'e_wallet'
    if (name.toLowerCase() === 'credit card') _name = 'credit_card'

    // notes: belum cek credit card karena ga bisa choose payment credit card

    if (channel.toLowerCase() === 'dana') {
      return null
    }
    return payment_guide[_name][channel].via.map((paymentVia, key) => (
      <View key={`${channel}-${paymentVia}-${key}`}>
        <ContentExpandable
          key={`${channel}-${paymentVia}`}
          paddingTitleHorizontal={0}
          paddingTitleVertical={24}
          title={paymentVia}
          content={
            <View style={{ marginTop: 16 }}>
              {Array.isArray(payment_guide[_name][channel].body[0])
                ? payment_guide[_name][channel].body[key].map(
                    (_content, key2) => (
                      <Text
                        key={`content-${key2}`}
                        style={styles.helvetica14Color100}>
                        {`${key2 + 1}. ${_content}`}
                      </Text>
                    ),
                  )
                : payment_guide[_name][channel].body.map((_content, key2) => (
                    <Text
                      key={`content-${key2}`}
                      style={styles.helvetica14Color100}>
                      {`${key2 + 1}. ${_content}`}
                    </Text>
                  ))}
            </View>
          }
          id={`${channel}-${paymentVia}`}
          divider={<Divider marginTop={0} />}
        />
      </View>
    ))
  }

  renderFooterButton = () => {
    const { transaction } = this.props
    if (!transaction.provider_payment_method) {
      return null
    }

    if (
      transaction.provider_payment_method?.group_payment === 'Virtual Account'
    )
      return (
        <View
          style={{
            marginBottom: 16,
            paddingHorizontal: 16,
          }}>
          <OutlineButton
            title="Check Your Payment"
            onPress={this._handleBack}
            style={styles.buttonBlue}
            fontStyle={styles.buttonTextBlue}
          />
          <GradientButton
            onPress={this.goToShop}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#3067E4', '#8131E2']}
            title="Shop Again"
            fontStyle={styles.buttonTextWhite}
            style={{
              width: '100%',
              height: 46,
              backgroundColor: '#8131E2',
              marginTop: 16,
            }}
          />
        </View>
      )
    return (
      <View style={{ marginBottom: 16, paddingHorizontal: 16 }}>
        <GradientButton
          leftIcon={
            <View style={{ marginRight: 8 }}>
              <Icon name="lock" color={colors.white} size={14} />
            </View>
          }
          onPress={this.handleTransaction} // notes: go to pay now
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#3067E4', '#8131E2']}
          title="Pay Now"
          fontStyle={styles.buttonTextWhite}
          style={{
            width: '100%',
            height: 46,
            backgroundColor: '#8131E2',
            marginTop: 16,
          }}
        />
      </View>
    )
  }

  goToShop = () => {
    const routes = [{ name: 'Main', params: { screen: 'Shop' } }]
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes,
      }),
    )
  }

  moreAction = [
    // {
    //   source: 'material-icon',
    //   icon: 'error',
    //   title: 'Cancel Transaction',
    //   onPress: () => {
    //     this._toggleBottomSheet()
    //     this.props.navigation.navigate('modals', {
    //       screen: 'ConfirmationModal',
    //       params: {
    //         title: 'Cancel Transaction',
    //         actiontext: {
    //           approve: 'Yes',
    //           cancel: 'No',
    //         },
    //         empesizeApprove: false,
    //         desc: 'Are you sure you want to cancel the transaction?',
    //         onApprove: () => {
    //           console.log('=====', this)
    //         },
    //       },
    //     })
    //   },
    // },
    {
      icon: 'bullhorn',
      title: 'Ask for Information or Help',
      onPress: () => {
        sendEmail('', 'I Need Help')
      },
    },
  ]

  renderBottomSheet = () => {
    return (
      <BottomSheetModal
        snapPoints={[0.5 * height, 0]}
        isOpen={this.state.isBottomSheetOpen}
        initialSnap={0}
        title="More"
        onClose={this._toggleBottomSheet}>
        <View
          style={{
            paddingHorizontal: 16,
            display: 'flex',
            width,
            height: 200,
            backgroundColor: 'white',
          }}>
          {this.moreAction.map((action, index) => (
            <TouchableOpacity
              onPress={action.onPress}
              key={`more-action${index}`}>
              <ActionListCard
                {...action}
                index={index}
                key={`more-action${index}`}
              />
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheetModal>
    )
  }

  _toggleBottomSheet = () => {
    this.setState({ isBottomSheetOpen: !this.state.isBottomSheetOpen })
  }
  _handleBack = () => {
    const routes = [
      { name: 'Main', params: { screen: 'Shop' } },
      {
        name: 'Screens',
        params: {
          screen: 'PaymentList',
          params: { hideHeader: true, selectedFilter: ['unpaid', 'waiting'] },
        },
      },
    ]
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes,
      }),
    )
  }

  render() {
    const { transaction } = this.props
    if (!transaction) {
      return null
    }
    return (
      <>
        <NavbarTop
          title="Transaction Detail"
          leftAction={
            <Icon
              name="chevron-left"
              onPress={this._handleBack}
              size={22}
              color={colors.black100}
            />
          }
          rightAction={
            <PressAbbleDiv onPress={this._toggleBottomSheet}>
              <IconMi name="more-vert" size={22} color={colors.black100} />
            </PressAbbleDiv>
          }
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        {this.renderBottomSheet()}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 16, marginTop: 24, marginBottom: 24 }}>
          <View style={styles.row}>
            <Text style={styles.helvetica14}>Transaction ID</Text>
            <Text style={styles.helveticaBold14}>{transaction.id}</Text>
          </View>
          <StatusAlert
            style={styles.margin}
            icon={statusToIcon(transaction.status)}
            status={transaction.status}
            text={statusToDescription(transaction.status)}
          />
          {this.renderCountdownTimer()}
          {transaction.provider_payment_method?.group_payment ===
            'Virtual Account' && this.renderVirtualAccountInfo()}
          <ContentExpandable
            paddingTitleVertical={24}
            paddingTitleHorizontal={0}
            title={this.renderTitleExpandable()}
            rightTitle={this.renderRightTitleExpandable()}
            content={this.renderContentExpandable()}
            id={`payment-waiting-${transaction.id}`}
            divider={<Divider marginTop={0} />}
          />
          {/* QR Code khusus gopay */}
          {transaction.provider_payment_method?.name.toLowerCase() ===
            'gopay' &&
            transaction.actions[0]?.url && (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginTop: 32,
                }}>
                <ImageAutoSchale
                  source={{ uri: transaction.actions[0]?.url }}
                  width={256}
                  style={styles.qrCode}
                />
              </View>
            )}
          {transaction.provider_payment_method && this.renderPaymentGuide()}
          <View />
        </ScrollView>
        {transaction.provider_payment_method && this.renderFooterButton()}
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTransactionById,
    },
    dispatch,
  )

const mapStateToProps = (state, ownProps) => {
  const transactionId = ownProps.route.params.transactionId
  const transaction = state.transaction.data[transactionId]

  return {
    transactionId,
    transaction,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentWaiting)
