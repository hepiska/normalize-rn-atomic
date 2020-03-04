import React from 'react'
import DeviceInfo from 'react-native-device-info'
import { Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Div, PressAbbleDiv, Image } from '@components/atoms/basic'
import styled from 'styled-components/native'

let hasNotch = DeviceInfo.hasNotch()

const LeftDiv = styled(Div)`
  position: absolute;
  padding: 42px 16px 12px;
  flex: 1;
  left: 0px;
`

const RightDiv = styled(Div)`
  position: absolute;
  padding: 42px 16px 12px;
  flex: 1;
  right: 0px;
`

const { width } = Dimensions.get('screen')

interface NavbarBottomProps {
  style?: any
}

const NavbarTop: React.SFC<NavbarBottomProps> = ({ style, children }) => {
  return (
    <Div
      bg="#FFF"
      _height={hasNotch ? '88px' : '55px'}
      _position="absolute"
      zIndex="10"
      _width={width}
      _direction="row"
      padd="42px 16px 12px"
      justify="flex-start"
      style={style}
      align="center">
      <LeftDiv zIndex="2" _height={hasNotch ? 88 : 55}>
        <PressAbbleDiv>
          <Icon name="chevron-left" size={20} color="black" />
        </PressAbbleDiv>
      </LeftDiv>
      {children}
      <RightDiv _direction="row">
        <PressAbbleDiv mar="0px 16px 0px 0px">
          <Icon name="search" size={20} color="black" />
        </PressAbbleDiv>
        <PressAbbleDiv>
          <Icon name="shopping-cart" size={20} color="black" />
        </PressAbbleDiv>
      </RightDiv>
    </Div>
  )
}

export default NavbarTop
