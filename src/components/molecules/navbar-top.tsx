import React from 'react'
import { useNavigation } from '@react-navigation/native'
import DeviceInfo from 'react-native-device-info'
import {
  Dimensions,
  Platform,
  SafeAreaView,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Div, PressAbbleDiv, Font } from '@components/atoms/basic'
import {
  helveticaBlackBold,
  helveticaBlackTitleBold,
  fontStyle,
  helveticaNormalFont12,
} from '@components/commont-styles'
import NotificationAction from '@components/atoms/notification-action-button'
import SearchAction from '@components/atoms/search-action-button'
import CartAction from '@components/atoms/cart-action-button'
import CreateAction from '@components/atoms/create-action-button'
import BackCloseAction from '@components/atoms/back-close-action-button'
import styled from 'styled-components/native'
import { colors } from '@utils/constants'

let hasNotch = DeviceInfo.hasNotch()

const LeftDiv = styled(Div)`
  position: absolute;
  padding: 16px 12px;
  flex: 1;
  left: 0px;
`

const RightDiv = styled(Div)`
  position: absolute;
  padding: 12px 12px;
  flex: 1;
  right: 0px;
`

const styles = StyleSheet.create({
  saveArea: { backgroundColor: 'rgba(0,0,0,0.5)' },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
})

const { width } = Dimensions.get('screen')

interface NavbarTopProps {
  title?: string
  subtitle?: string
  style?: ViewStyle
  onBeforeBack?: () => void
  leftContent?: Array<string>
  rightContent?: Array<string>
  leftAction?: any
  rightAction?: any
}

const RenderLeftContent = ({ content, leftAction, onBeforeBack }: any) => {
  const navigation = useNavigation()

  const _onBack = async () => {
    if (onBeforeBack) {
      await onBeforeBack()
    }
    if (navigation.canGoBack) {
      navigation.goBack()
    }
  }

  return (
    <LeftDiv _direction="row" zIndex="2">
      {content &&
        content.map(v => (
          <BackCloseAction key={`v-${v}`} name={v} onPress={_onBack} />
        ))}
      {leftAction && leftAction}
    </LeftDiv>
  )
}

const RenderRightContent = ({ content, rightAction }) => {
  return (
    <RightDiv _direction="row">
      {content &&
        content.map(v => {
          switch (v) {
            case 'search':
              return <SearchAction key={`navbar-${v}`} />
            case 'shop' || 'cart':
              return <CartAction key={`navbar-${v}`} />
            case 'notification':
              return <NotificationAction key={`navbar-${v}`} />
            default:
              return null
          }
        })}
      {rightAction && rightAction}
    </RightDiv>
  )
  return null
}

const NavbarTop: React.SFC<NavbarTopProps> = ({
  style = {},
  title,
  subtitle,
  leftContent,
  rightContent,
  onBeforeBack,
  leftAction,
  rightAction,
}) => {
  return (
    <SafeAreaView style={styles.saveArea}>
      <View style={{ ...styles.container, ...style }}>
        <RenderLeftContent
          content={leftContent}
          onBeforeBack={onBeforeBack}
          leftAction={leftAction}
        />
        {subtitle ? (
          <Div justify="center" _width="100%">
            <Font style={fontStyle.helveticaBold}>{title}</Font>
            <Font {...helveticaNormalFont12} color={colors.black60}>
              {subtitle}
            </Font>
          </Div>
        ) : (
          <Div justify="center" _width="100%">
            <Font style={fontStyle.helveticaBold} size="18">
              {title}
            </Font>
          </Div>
        )}
        <RenderRightContent content={rightContent} rightAction={rightAction} />
      </View>
    </SafeAreaView>
  )
}

// interface NavbarTopProps {
//   title?: any
//   style?: any
// }

export const NavbarTopModal: React.FC<NavbarTopProps> = ({ title, style }) => {
  const navigation = useNavigation()
  return (
    <Div
      bg="#FFF"
      _height={hasNotch ? '88px' : '55px'}
      zIndex="10"
      _width={width}
      _direction="row"
      padd={Platform.OS === 'ios' ? '42px 16px 12px' : '0px 16px 12px'}
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
