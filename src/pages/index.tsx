import * as React from 'react'
import { View, Text, SafeAreaView, Platform } from 'react-native'
import { Switch, Route } from 'react-router-native'
import { Div } from '@components/atoms/basic'
import NavbarTop from '@components/molecules/navbar-top'
import MainPage from './main'



const Pages = () => (
  <Div _height='100%' _flex='1' _width='100%' bg='grey'>
    <NavbarTop></NavbarTop>
    <Switch>
      <Route path='/' component={MainPage} />
    </Switch>
  </Div>

)



export default Pages