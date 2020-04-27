import React, { Component } from 'react'
import { ScrollDiv } from '@components/atoms/basic'
import { connect } from 'react-redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@src/utils/constants'
import { transactionListData } from '@hocs/data/payment'
import PaymentDetailPage from '@components/organisms/payment-details'

const PaymentHoc = transactionListData(PaymentDetailPage)

class PaymentDetails extends Component<any, any> {
  render() {
    const { details, transactionId } = this.props
    return (
      <>
        <NavbarTop
          title="Payment Details"
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        <PaymentHoc details={details} transactionId={transactionId} />
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
