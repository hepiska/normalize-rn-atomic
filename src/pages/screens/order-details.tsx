import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@src/utils/constants'
import OrderDetails from '@components/organisms/order-details'

class OrderDetailPage extends Component<any, any> {
  componentDidMount() {}
  render() {
    const { orderId } = this.props
    return (
      <>
        <NavbarTop
          title="Order Details"
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
          <OrderDetails orderId={orderId} />
        </ScrollView>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

const mapStateToProps = (state, ownProps) => {
  const orderId = ownProps.route.params.orderId
  return {
    orderId,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailPage)
