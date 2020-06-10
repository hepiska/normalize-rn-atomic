import React, { Component } from 'react'
import { InteractionManager } from 'react-native'
import { ScrollDiv } from '@components/atoms/basic'
import { connect } from 'react-redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@src/utils/constants'
import { transactionListData } from '@hocs/data/payment'
import PaymentDetailPage from '@components/organisms/payment-details'
import PaymentDetailLoader from '@src/components/atoms/loaders/payment-detail-loader'

const PaymentHoc = transactionListData(PaymentDetailPage)

class PaymentDetails extends Component<any, any> {
  state = {
    finishAnimation: false,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
    })
  }
  render() {
    const { details, transactionId } = this.props
    const { finishAnimation } = this.state
    return (
      <>
        <NavbarTop
          title="Payment Details"
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        {finishAnimation ? (
          <PaymentHoc details={details} transactionId={transactionId} />
        ) : (
          <PaymentDetailLoader style={{ margin: 16 }} />
        )}
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const details = ownProps.route.params.details
  const transactionId = ownProps.route.params.transactionId

  return {
    details,
    transactionId,
  }
}

export default connect(mapStateToProps, null)(PaymentDetails)
