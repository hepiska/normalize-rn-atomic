import React from 'react'
import LottieView from 'lottie-react-native'
import { Div } from '@components/atoms/basic'

export default class InviniteLoader extends React.Component {
  render() {
    return (
      <Div _width="100%" _height="200">
        <LottieView source={require('./invinite-loader.json')} autoPlay loop />
      </Div>
    )
  }
}
