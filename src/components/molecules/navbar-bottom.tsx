import React from 'react'
import { Div, PressAbbleDiv, Image } from '@components/atoms/basic'
import { useHistory } from 'react-router-native'
import { Dimensions } from 'react-native'
import { SvgUri } from 'react-native-svg'
import styled from 'styled-components/native'


const { width } = Dimensions.get('screen')

const AbsDiv = styled(Div)`
  bottom: 0;
  left: 0;
`
interface NavbarBottomProps {
  style?: any
}

interface NavItemProps {
  action: Function,
  icon: string,
}


const NavItem: React.SFC<NavItemProps> = ({ action, icon, }) => (
  <PressAbbleDiv flx='1' onPress={action} _height='56px'>
    <Image
      _width='24px'
      _height='24px'
      source={icon}
    />
  </PressAbbleDiv>
)



const NavbarBottom: React.SFC<NavbarBottomProps> = ({ style }) => {
  let history = useHistory()

  const goto = (uri) => () => {
    history.push(uri)
  }

  const navItemData = [
    {
      action: goto('/'),
      icon: require('../../assets/icons/explore.png'),
    },
    {
      action: goto('/shop'),
      icon: require('../../assets/icons/local-mall.png'),
    },
    {
      action: goto('/settings'),
      icon: require('../../assets/icons/menu.png'),
    },
  ]

  return (
    <AbsDiv _direction='row' _position='absolute' {...style} _width={width}>
      {navItemData.map((item, index) => (<NavItem key={index} {...item} />))}
    </AbsDiv>
  )
}


export default NavbarBottom