import React, { Component, useMemo } from 'react'
import { Text, View, Dimensions, InteractionManager } from 'react-native'
import BottomSheet from '@src/components/layouts/bottom-sheet'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { fontStyle } from '@src/components/commont-styles'
import { colors } from '@src/utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import { navigate } from '@src/root-navigation'
const { width, height } = Dimensions.get('screen')

class ConfigProfileModal extends React.Component<any, any> {
  state = {
    currentPos: 1,
    finishAnimation: false,
  }

  snapPoints = [200, 200, 10]
  _ref: any = React.createRef()

  timeOut = null

  _closeModal = () => this.props.navigation.goBack()

  _navigateTo = (screen, screenName, params = {}) => {
    return navigate(screen, {
      screen: screenName,
      params,
    })
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ finishAnimation: true })
      this._ref.snapTo(this.state.currentPos)
    })
  }

  render() {
    const { route } = this.props
    const goToSettings = () => {
      this._closeModal
      this._navigateTo('Screens', 'AccountSetting', {})
    }
    const goShare = () => {
      console.log('go to share')
    }
    const goReport = () => {
      console.log('go to report')
    }

    const data = route.params
      ? [
          {
            title: 'Share This Profile',
            icon: 'cog',
            onPress: goShare,
          },
          { title: 'Report This Account', icon: 'share', onPress: goReport },
        ]
      : [
          {
            title: 'Account Settings',
            icon: 'cog',
            onPress: goToSettings,
          },
          { title: 'Share Profile', icon: 'share', onPress: goShare },
        ]

    return (
      this.state.finishAnimation && (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <BottomSheet
            snapPoints={this.snapPoints}
            snapEnabled={true}
            initialSnap={this.snapPoints.length - 2}
            onClose={this._closeModal}
            bottomSheetProps={{
              // enabledGestureInteraction: false,
              ref: ref => (this._ref = ref),
            }}>
            <View
              style={{
                display: 'flex',
                width,
                paddingHorizontal: 16,
                backgroundColor: 'white',
                height: '100%',
                justifyContent: 'flex-start',
              }}>
              {data?.map(res => (
                <TouchableOpacity
                  key={'config-profile' + res.title}
                  onPress={res.onPress}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 12,
                    alignItems: 'center',
                  }}>
                  <Icon
                    style={{ width: 24 }}
                    name={res.icon}
                    size={24}
                    color={colors.black100}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      ...fontStyle.helvetica,
                      fontWeight: '500',
                      fontSize: 16,
                    }}>
                    {res.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </BottomSheet>
        </View>
      )
    )
  }
}

export default ConfigProfileModal
