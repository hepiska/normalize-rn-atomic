import React from 'react'
import { useNavigation } from '@react-navigation/native'
import DeviceInfo from 'react-native-device-info'
import { Dimensions, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Div, PressAbbleDiv, Font } from '@components/atoms/basic'
import { helveticaBlackBold } from '@components/commont-styles'
import styled from 'styled-components/native'

let hasNotch = DeviceInfo.hasNotch()

const LeftDiv = styled(Div)`
  position: absolute;
  padding: ${({ padd }) => padd || '42px 16px 12px'};
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

interface NavbarTopProps {
  style?: any
}

const NavbarTop: React.SFC<NavbarTopProps> = ({ style, children }) => {
  const navigation = useNavigation()

  return (
    <Div
      bg="#FFF"
      _height={hasNotch ? '88px' : '55px'}
      zIndex="10"
      _width={width}
      _direction="row"
      padd="42px 16px 12px"
      justify="flex-start"
      style={style}
      align="flex-start">
      <LeftDiv zIndex="2" _height={hasNotch ? 88 : 55}>
        <PressAbbleDiv onPress={navigation.goBack}>
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

interface NavbarTopProps {
  title?: any
  style?: any
}

export const NavbarTopModal: React.FC<NavbarTopProps> = ({ title, style }) => {
  const navigation = useNavigation()
  return (
    <Div
      bg="#FFF"
      _height={hasNotch ? '88px' : '55px'}
      zIndex="10"
      _width={width}
      _direction="row"
      padd={Platform.OS === 'ios' ? '42px 16px 12px' : '0px 16px'}
      justify="flex-start"
      style={{
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        ...style,
      }}
      align="center">
      <LeftDiv zIndex="2" padd={Platform.OS === 'ios' ? null : '0px 16px'}>
        <PressAbbleDiv onPress={() => navigation.goBack()}>
          <Icon name="close" size={22} color="black" />
        </PressAbbleDiv>
      </LeftDiv>
      <Div justify="center" _width="100%">
        <Font {...helveticaBlackBold} size={18}>
          {title}
        </Font>
      </Div>
    </Div>
  )
}

export default NavbarTop
