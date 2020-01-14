import React from 'react'
import DeviceInfo from 'react-native-device-info'
import { Dimensions } from 'react-native'
import { Div, PressAbbleDiv, Image } from '@components/atoms/basic'
import styled from 'styled-components/native'

let hasNotch = DeviceInfo.hasNotch();


const AbsDiv = styled(Div)`
  top: 0;
  left: 0;
`

const { width } = Dimensions.get('screen')

interface NavbarBottomProps {
  style?: any
}



const NavbarTop: React.SFC<NavbarBottomProps> = ({ style }) => {
  return (
    <AbsDiv bg='#1a1a1a' _height={hasNotch ? '88px' : '55px'}
      _position='absolute'
      zIndex='10'
      _width={width}
      _direction='row'
      padd='42px 16px 12px'
      justify='flex-start' align='center'>
      <Image
        resizeMode='contain'
        source={require('../../assets/icons/the-shonet-logo-white.png')}
        _height='20px'
        _width='140px' />
    </AbsDiv>
  )
}

export default NavbarTop