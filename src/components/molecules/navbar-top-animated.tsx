import React from 'react'
import DeviceInfo from 'react-native-device-info'
import { Dimensions, StyleSheet, SafeAreaView, View, Text } from 'react-native'
import { Div, Font, Image, PressAbbleDiv } from '@components/atoms/basic'
import LinearGradient from 'react-native-linear-gradient'
import { globalDimention, colors } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import { fontStyle } from '@components/commont-styles'
import CartAction from '@components/atoms/cart-action-button'
import { useNavigation } from '@react-navigation/native'
import { navigate } from '@src/root-navigation'
import HTML from 'react-native-render-html'

const { interpolate, Extrapolate } = Animated

const styles = StyleSheet.create({
  rightAction: {
    marginLeft: 24,
  },
  leftAction: {
    marginRight: 24,
  },
})

const LeftDiv = styled(PressAbbleDiv)`
  position: absolute;
  flex: 1;
  top: 0;
  left: 0px;
`
const RightDiv = styled(Div)`
  position: absolute;
  flex: 1;
  top: 0;
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
  showSearch?: boolean
  showCart?: boolean
  showBack?: boolean
  showBars?: boolean
  title?: string | React.ReactType<any>
}

const headerHeight = 55

const AnimatedSaveArea: any = Animated.createAnimatedComponent(SafeAreaView)

const NavbarTopAnimated: React.SFC<NavbarBottomProps> = ({
  style,
  showBack,
  title,
  showSearch,
  showCart,
  showBars,
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

  const _onSearch = () => {
    navigate('Screens', { screen: 'SearchList' })
  }
  const _onBurger = () => {
    ;(navigation as any).toggleDrawer()
  }
  const textOpacity = interpolate(y, {
    inputRange: [
      parentDim.coverheight - headerHeight,
      parentDim.coverheight - headerHeight + 18,
    ],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  })
  const opacity = interpolate(y, {
    inputRange: [
      parentDim.coverheight - headerHeight - 32,
      parentDim.coverheight - headerHeight + 20,
    ],
    outputRange: [0, 1],
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
      <Div
        as={Animated.View}
        style={[StyleSheet.absoluteFill, { zIndex: -1, opacity }]}
      />
      <Div
        style={{ backgroundColor: 'transparent' }}
        _width={width}
        // _height={globalDimention.headerHeight}
        justify="center"
        zIndex="10"
        _direction="row">
        <LeftDiv zIndex="2" _direction="row">
          {showBack && (
            <PressAbbleDiv onPress={_onBack} style={{ width: 36, height: 52 }}>
              <Icon name="chevron-left" size={20} color={colors.black100} />
            </PressAbbleDiv>
          )}
          {showBars && (
            <PressAbbleDiv onPress={_onBurger}>
              <Icon name="bars" size={20} color={colors.black100} />
            </PressAbbleDiv>
          )}
        </LeftDiv>
        <Div
          padd="16px 12px"
          overflow="visible"
          width={200}
          _direction="row"
          minHeight={48}
          wrap="wrap"
          {...style}
          align="center">
          <Animated.View style={[{ opacity: textOpacity }]}>
            {title ? (
              <HTML
                html={`<title>${title}</title>`}
                renderers={{
                  // eslint-disable-next-line react/display-name
                  title: (
                    htmlAttribs,
                    children,
                    convertedCSSStyles,
                    passProps,
                  ) => {
                    return (
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          ...fontStyle.helveticaBold,
                          flexWrap: 'wrap',
                          color: 'black',
                          fontSize: 16,
                          textAlign: 'center',
                          fontWeight: '400',
                        }}>
                        {passProps.rawChildren[0].data}
                      </Text>
                    )
                  },
                }}
              />
            ) : null}
          </Animated.View>
        </Div>

        <RightDiv _flex="1" _direction="row">
          {showSearch && (
            <PressAbbleDiv
              onPress={_onSearch}
              style={{
                width: 36,
                height: 52,
                ...styles.rightAction,
              }}>
              <Icon name="search" size={20} color={colors.black100} />
            </PressAbbleDiv>
          )}
          {showCart && <CartAction />}
        </RightDiv>
      </Div>
    </AnimatedSaveArea>
  )
}

export default NavbarTopAnimated
