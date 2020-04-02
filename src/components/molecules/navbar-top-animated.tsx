import React from 'react'
import DeviceInfo from 'react-native-device-info'
import { Dimensions, StyleSheet, SafeAreaView } from 'react-native'
import { Div, Font, Image, PressAbbleDiv } from '@components/atoms/basic'
import LinearGradient from 'react-native-linear-gradient'
import { globalDimention } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

const { interpolate, Extrapolate } = Animated

const LeftDiv = styled(PressAbbleDiv)`
  position: absolute;
  padding: 16px 12px;
  flex: 1;
  left: 0px;
`
const RightDiv = styled(Div)`
  position: absolute;
  padding: 16px 16px 12px;
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
  showBack?: boolean
  Title?: string | React.ReactType<any>
  RightMenu?: React.ReactType<any>
}

const headerHeight = 55

const AnimatedSaveArea = Animated.createAnimatedComponent(SafeAreaView)
const AnimatedIcon = Animated.createAnimatedComponent(Icon)

const NavbarTopAnimated: React.SFC<NavbarBottomProps> = ({
  style,
  showBack,
  RightMenu,
  Title,
  y,
  parentDim,
}) => {
  const backgroundColor = interpolate(y, {
    inputRange: [
      parentDim.coverheight - headerHeight,
      parentDim.coverheight - headerHeight + 2,
    ],
    outputRange: [Animated.color(0, 0, 0, 0), Animated.color(255, 255, 255, 1)],
    extrapolate: Extrapolate.CLAMP,
  })
  const navigation = useNavigation()
  const _onBack = () => {
    navigation.goBack()
  }
  const textOpacity = interpolate(y, {
    inputRange: [
      parentDim.coverheight - headerHeight,
      parentDim.coverheight - headerHeight + 18,
    ],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  })
  const textColor = interpolate(y, {
    inputRange: [
      parentDim.coverheight - headerHeight,
      parentDim.coverheight - headerHeight + 2,
    ],
    outputRange: [Animated.color(255, 255, 255), Animated.color(0, 0, 0)],
    extrapolate: Extrapolate.CLAMP,
  })

  return (
    <AnimatedSaveArea
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: backgroundColor,
        zIndex: 10,
      }}>
      <LinearGradient
        style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0.4 }}
        colors={[
          'transparent',
          'rgba(26, 26, 26, 0.3)',
          'rgba(26, 26, 26, 0.4)',
          'rgba(26, 26, 26, 0.5)',
        ]}
      />
      <Div
        as={Animated.View}
        style={{ backgroundColor: backgroundColor }}
        _width={width}
        _height={globalDimention.headerHeight}
        justify="space-between"
        zIndex="10"
        _direction="row">
        <LeftDiv zIndex="2" _height={55} _direction="row">
          {showBack && (
            <PressAbbleDiv onPress={_onBack}>
              <AnimatedIcon name="chevron-left" size={20} color={textColor} />
            </PressAbbleDiv>
          )}
        </LeftDiv>
        <Div
          padd="16px 12px"
          width="100%"
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
          <RightDiv _flex="1" _height={55}>
            <RightMenu />
          </RightDiv>
        )}
      </Div>
    </AnimatedSaveArea>
  )
}

export default NavbarTopAnimated
