import * as React from 'react'
import { View, Text, SafeAreaView, Platform } from 'react-native'
import { Switch, Route } from 'react-router-native'
import { Div } from '@components/atoms/basic'
import NavbarTop from '@components/molecules/navbar-top'
import MainPage from './main'
import DeviceInfo from 'react-native-device-info'
let hasNotch = DeviceInfo.hasNotch();




const Pages = () => (
  <Div _height='100%' _flex='1' _width='100%' bg='#fafafa'>
    <NavbarTop></NavbarTop>
    <Div _height='100%' _flex='1' _width='100%' style={{ marginTop: hasNotch ? 88 : 55 }} _padding='0px 16px'>
      <Switch>
        <Route path='/' component={MainPage} />
      </Switch>
    </Div>

  </Div >

)



export default Pages