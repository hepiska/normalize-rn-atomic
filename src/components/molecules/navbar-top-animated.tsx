import React from 'react'
import DeviceInfo from 'react-native-device-info'
import { Dimensions, StyleSheet } from 'react-native'
import { Div, Font, Image } from '@components/atoms/basic'
import LinearGradient from 'react-native-linear-gradient'
import { globalDimention } from '@utils/constants'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

let hasNotch = DeviceInfo.hasNotch()

const { interpolate, Extrapolate } = Animated

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

interface ParentDimType {
  coverheight: number
}

interface NavbarBottomProps {
  y: any
  style?: any
  parentDim: ParentDimType
  LeftMenu?: React.ReactType<any>
  Title?: string | React.ReactType<any>
  RightMenu?: React.ReactType<any>
}

const NavbarTopAnimated: React.SFC<NavbarBottomProps> = ({
  style,
  LeftMenu,
  RightMenu,
  Title,
  y,
  parentDim,
}) => {
  const opacity = interpolate(y, {
    inputRange: [parentDim.coverheight, parentDim.coverheight + 18],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  })
  const textOpacity = interpolate(y, {
    inputRange: [parentDim.coverheight, parentDim.coverheight + 18],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  })

  return (
    <Div
      _width={width}
      _height={globalDimention.headerHeight}
      justify="space-between"
      _direction="row"
      bg="transparent">
      <LinearGradient
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0.4 }}
        colors={['transparent', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.8)']}
      />
      {LeftMenu && (
        <LeftDiv zIndex="2" _height={hasNotch ? 88 : 55}>
          <LeftMenu />
        </LeftDiv>
      )}
      <Div
        padd="42px 16px 12px"
        width="100%"
        // _height='100%'
        // as={Animated.View}
        bg="transparent"
        {...style}
        align="center">
        <Animated.Text
          style={[
            {
              color: 'black',
              fontSize: 16,
              textAlign: 'center',
              fontWeight: '400',
            },
            { opacity: textOpacity },
          ]}>
          {Title}
        </Animated.Text>
      </Div>
      {RightMenu && (
        <RightDiv _flex="1" _height={hasNotch ? 88 : 55}>
          <RightMenu />
        </RightDiv>
      )}
    </Div>
  )
}

export default NavbarTopAnimated
