import * as React from 'react'
import { View, Text } from 'react-native'
import { Div, PressAbbleDiv, Image } from '@components/atoms/basic'
import NabarBottom from '@components/molecules/navbar-bottom'
import { Switch, Route } from 'react-router-native'
import HomePage from './home'
import ShopPage from './shop'
import SettingsPage from './settings'



class MainPages extends React.Component<any, any>{
  state = {

  }

  render() {
    return (
      <>
        <Div bg='#f8f8f8' _flex='1' _width='100%' style={{ marginBottom: 56 }}>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/shop' component={ShopPage} />
            <Route exact path='/settings' component={SettingsPage} />
          </Switch>
        </Div>
        <NabarBottom />
      </>
    )
  }

}


export default MainPages