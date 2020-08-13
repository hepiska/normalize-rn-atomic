import React, { Component } from 'react'
import NavbarTop from '@src/components/molecules/navbar-top'
import InitialConnectDana from '@src/components/organisms/dana-initial-connect'
import DanaWithdraw from '@src/components/organisms/dana-withdraw'
import { reqGetDanaAcount } from '@utils/services'

class WithdrawEarnings extends Component<any, any> {
  state: {
    is_connected: boolean
  }
  constructor(props) {
    super(props)
    this.state = {
      is_connected: true,
    }
  }

  componentDidMount() {
    this.getStattus()
  }

  getStattus = () => {
    reqGetDanaAcount.then(data => {
      this.setState({ is_connected: data.is_connected })
    })
  }

  changeConectedana = () => {
    this.setState({ is_connected: true })
  }

  render() {
    return (
      <>
        <NavbarTop
          title={
            this.state.is_connected ? 'Withdraw to DANA' : 'Connect To Dana'
          }
          leftContent={['back']}
        />
        {this.state.is_connected ? (
          <DanaWithdraw navigation={this.props.navigation} />
        ) : (
          <InitialConnectDana
            changeConectedana={this.changeConectedana}
            navigation={this.props.navigation}
          />
        )}
      </>
    )
  }
}

export default WithdrawEarnings
