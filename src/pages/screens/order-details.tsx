import React, { Component } from 'react'
import { ScrollView, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@src/utils/constants'
import OrderDetails from '@components/organisms/order-details'
import OrderDetailLoader from '@src/components/atoms/loaders/checkout'

class OrderDetailPage extends Component<any, any> {
  state = {
    finishAnimation: false,
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        finishAnimation: true,
      })
    })
  }
  render() {
    const { orderId } = this.props
    const { finishAnimation } = this.state
    return (
      <>
        <NavbarTop
          title="Order Details"
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        {finishAnimation ? (
          <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <OrderDetails orderId={orderId} />
          </ScrollView>
        ) : (
          <OrderDetailLoader style={{ margin: 16 }} />
        )}
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
