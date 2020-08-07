import React, { Component } from 'react'
import { Text } from 'react-native'
import NavbarTop from '@src/components/molecules/navbar-top'
import InitialConnectDana from '@src/components/organisms/dana-initial-connect'
import DanaWithdraw from '@src/components/organisms/dana-withdraw'

class WithdrawEarnings extends Component<any, any> {
  state: {
    connectDana: boolean
  }
  constructor(props) {
    super(props)
    this.state = {
      connectDana: true,
    }
  }

  render() {
    return (
      <>
        <NavbarTop
          title={
            this.state.connectDana ? 'Withdraw to DANA' : 'Connect To Dana'
          }
          leftContent={['back']}
        />
        {this.state.connectDana ? <DanaWithdraw /> : <InitialConnectDana />}
      </>
    )
  }
}

export default WithdrawEarnings
