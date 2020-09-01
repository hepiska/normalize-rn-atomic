import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Animated, { Extrapolate } from 'react-native-reanimated'
import { colors } from '@utils/constants'
import { fontStyle } from '@components/commont-styles'
import { setTabName, setMenu } from '@src/modules/post-discover/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  makeGetSpecificMenu,
  makeGetTabName,
} from '@src/modules/post-discover/selector'

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.black100,
  },
  fontActive: {
    color: colors.white,
  },
  subNav: {
    color: colors.black60,
    ...fontStyle.helveticaBold,
    fontSize: 12,
    paddingRight: 10,
    fontWeight: '400',
  },
})

interface TabMenuUnderlineType {
  state: any
  descriptors: any
  navigation: any
  position: any
  rightAction?: any
  onChangeTab?: (activeTab: any) => void
  setMenu?: (argh: any) => void
  tabname: string
  fashionMenu: string
  beautyMenu: string
}

class TabMenuUnderline extends React.PureComponent<TabMenuUnderlineType, any> {
  // _onChangeTab(name) {
  //   this.props.setTabName(name.toLowerCase())
  // }

  _onChangeMenu(query, name) {
    if (name === this.props[`${query}Menu`]) {
      this.props.setMenu({
        uri: query,
        data: '',
      })
    } else {
      this.props.setMenu({
        uri: query,
        data: name,
      })
    }
  }

  render() {
    const {
      state,
      descriptors,
      navigation,
      position,
      rightAction,
      onChangeTab,
      fashionMenu,
      beautyMenu,
    } = this.props
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            // paddingVertical: 8,
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 44,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: colors.black50,
          }}>
          <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key]
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name

              const isFocused = state.index === index

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                })

                if (onChangeTab) {
                  onChangeTab(index)
                }

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name)
                }

                // this._onChangeTab(route.name)
              }

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                })
              }

              const inputRange = state.routes.map((_, i) => i)
              if (inputRange.length < 2) {
                inputRange.push(1)
              }
              // console.log(
              //   '====',
              //   inputRange,
              //   inputRange.map(i => (i === index ? 1 : 0)),
              // )
              const opacity = Animated.interpolate(position, {
                inputRange,
                outputRange: inputRange.map(i => (i === index ? 1 : 0)),
                extrapolate: Extrapolate.CLAMP,
              })

              return (
                <TouchableOpacity
                  key={'tab-menu' + index}
                  accessibilityRole="button"
                  accessibilityStates={isFocused ? ['selected'] : []}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}>
                  <View
                    style={{
                      paddingHorizontal: 16,
                      borderRadius: 40, // before: 16, real: 40
                      paddingVertical: 8, // before: 4, real: 8
                    }}>
                    <Animated.View
                      style={[
                        StyleSheet.absoluteFillObject,
                        {
                          opacity,
                        },
                      ]}
                    />
                    <Text
                      style={{
                        color: isFocused ? colors.black100 : colors.black60,
                        ...fontStyle.helveticaBold,
                        fontSize: 14,
                        fontWeight: isFocused ? '500' : '400',
                      }}>
                      {label}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
          {rightAction && rightAction}
        </View>
        {state.index === 1 && (
          <View
            style={{
              flexDirection: 'row',
              height: 36,
              paddingHorizontal: 32,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this._onChangeMenu('fashion', 'collection')}>
              <Text
                style={{
                  ...styles.subNav,
                  ...{
                    fontWeight: fashionMenu === 'collection' ? '500' : '400',
                    color:
                      fashionMenu === 'collection'
                        ? colors.black100
                        : colors.black60,
                  },
                }}>
                COLLECTION
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._onChangeMenu('fashion', 'journal')}>
              <Text
                style={{
                  ...styles.subNav,
                  ...{
                    fontWeight: fashionMenu === 'journal' ? '500' : '400',
                    color:
                      fashionMenu === 'journal'
                        ? colors.black100
                        : colors.black60,
                  },
                }}>
                EDITORIAL
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {state.index === 2 && (
          <View
            style={{
              flexDirection: 'row',
              height: 36,
              paddingHorizontal: 32,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this._onChangeMenu('beauty', 'collection')}>
              <Text
                style={{
                  ...styles.subNav,
                  ...{
                    fontWeight: beautyMenu === 'collection' ? '500' : '400',
                    color:
                      beautyMenu === 'collection'
                        ? colors.black100
                        : colors.black60,
                  },
                }}>
                COLLECTION
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._onChangeMenu('beauty', 'journal')}>
              <Text
                style={{
                  ...styles.subNav,
                  ...{
                    fontWeight: beautyMenu === 'journal' ? '500' : '400',
                    color:
                      beautyMenu === 'journal'
                        ? colors.black100
                        : colors.black60,
                  },
                }}>
                EDITORIAL
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setTabName, setMenu }, dispatch)

const mapStateToProps = state => {
  const getManuName = makeGetSpecificMenu()
  return {
    fashionMenu: getManuName(state, 'fashion'),
    beautyMenu: getManuName(state, 'beauty'),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabMenuUnderline)
