import React from 'react'
import {
  Platform,
  View,
  Animated,
  Modal,
  TouchableOpacity,
  Picker,
  Dimensions,
  Text,
} from 'react-native'
import Popup from 'react-native-modal'
import { PressAbbleDiv, Font, Div, ScrollDiv } from '@components/atoms/basic'
import { colors } from '@src/utils/constants'

interface PickerProps {
  value?: number
  items: any
  title?: string
  ios?: any
  pickerRef: any
  onValueChange: any
  onCancel?: any
  onDismiss?: any
  cancelButton?: string
  confirmButton?: string
}

class PickerAndroid extends React.Component<PickerProps> {
  state = {
    isVisible: false,
  }

  onClose = () => {
    const { onCancel } = this.props
    this.setState({ isVisible: false })
    if (onCancel !== undefined) {
      onCancel()
    }
  }

  onChangeHandler = (value, index) => () => {
    const { onValueChange, onDismiss, items } = this.props
    onValueChange(value, index, items[index])
    onDismiss !== undefined && onDismiss()
    this.setState({
      isVisible: false,
    })
  }

  render() {
    const { isVisible } = this.state
    const { value, items, title, pickerRef } = this.props
    pickerRef({
      show: () => {
        this.setState({
          isVisible: true,
          selectedValue: value === undefined ? null : value,
        })
      },
    })
    return (
      <Popup
        isVisible={isVisible}
        backdropColor="rgba(0, 0, 0, 0.32)"
        useNativeDriver={true}
        animationInTiming={500}
        onBackdropPress={this.onClose}
        animationOutTiming={500}>
        <Div
          _width="100%"
          _background="white"
          radius="4px"
          style={{ maxHeight: 300 }}>
          {title && (
            <Div
              _width="100%"
              align="flex-start"
              _padding="16px 0px 12px 0px"
              style={{
                borderBottomWidth: 2.5,
                borderBottomColor: colors.black50,
              }}>
              <Font size={16} color={colors.black60} _margin="0px 16px">
                {title}
              </Font>
            </Div>
          )}
          <ScrollDiv style={{ width: '100%' }}>
            {items.map((item, index) => (
              <Div key={`item-${index}`} width="100%">
                <PressAbbleDiv
                  onPress={this.onChangeHandler(item.value, index)}
                  _width="100%"
                  align="flex-start"
                  _padding="12px 0px 12px 0px">
                  <Font size={18} color={colors.black100} _margin="0px 16px">
                    {item.label || index}
                  </Font>
                </PressAbbleDiv>
                <Div
                  width="100%"
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.gray7,
                  }}
                />
              </Div>
            ))}
          </ScrollDiv>
        </Div>
      </Popup>
    )
  }
}

class PickerIOS extends React.Component<PickerProps> {
  static defaultProps = {
    ios: {
      duration: 330,
      overlayColor: 'rgba(0,0,0,0.3)',
    },
    cancelButton: 'Cancel',
    confirmButton: 'Confirm',
  }

  state = {
    isVisible: false,
    animation: new Animated.Value(0),
    selectedValue: this.props.value,
    selectedIndex: 0,
  }
  isIphoneX = () => {
    const dimen = Dimensions.get('window')
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (dimen.height === 812 ||
        dimen.width === 812 ||
        dimen.height === 896 ||
        dimen.width === 896)
    )
  }

  onChangeHandler = (val, index) => {
    this.setState({
      selectedValue: val,
      selectedIndex: index,
    })
  }

  onCancel = () => {
    const { ios, onCancel } = this.props
    {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: ios.duration,
      }).start(() => {
        this.setState({
          isVisible: false,
        })
        if (onCancel !== undefined) {
          onCancel()
        }
      })
    }
  }

  onSubmit = () => {
    const { items, value, onValueChange, ios, onDismiss } = this.props
    const { animation, selectedValue, selectedIndex } = this.state
    if (selectedValue === null || selectedValue !== value) {
      const isNull = selectedValue === null
      const valueIndex = isNull ? 0 : selectedValue
      const valueText = isNull ? items[0].value : selectedValue
      const data = isNull ? items[0] : items[selectedIndex]
      onValueChange(valueText, valueIndex, data)
      onDismiss !== undefined && onDismiss()
      Animated.timing(animation, {
        toValue: 0,
        duration: ios.duration,
      }).start(() => {
        this.setState({
          isVisible: false,
        })
      })
    }
  }

  render() {
    const {
      value,
      items,
      title,
      onValueChange,
      pickerRef,
      ios,
      cancelButton,
      confirmButton,
      onCancel,
      onDismiss,
    } = this.props
    pickerRef({
      show: () => {
        this.setState(
          {
            isVisible: true,
            selectedValue: value === undefined ? null : value,
          },
          () => {
            Animated.timing(this.state.animation, {
              toValue: 1,
              duration: ios.duration,
            }).start()
          },
        )
      },
    })
    const styles = {
      container: {
        flex: 1,
        bottom: this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-Dimensions.get('window').height, 0],
        }),
        justifyContent: 'flex-end',
        zIndex: 999,
      },
      content: {
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      confirmButtonView: {
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: 'rgba(165,165,165,0.2)',
        paddingVertical: 15,
      },
      confirmButtonText: {
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center',
        color: 'rgba(0,122,255,1)',
      },
      cancelButton: {
        marginVertical: 10,
      },
      cancelButtonView: {
        marginHorizontal: 15,
        marginBottom: this.isIphoneX() ? 50 : 15,
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
      },
      cancelButtonText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        color: 'rgba(0,122,255,1)',
      },
      titleView: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(165,165,165,0.2)',
      },
      titleText: {
        fontWeight: '500',
        fontSize: 14,
        textAlign: 'center',
        color: '#bdbdbd',
      },
    }
    return (
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        visible={this.state.isVisible}
        animationType="none"
        transparent={true}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: this.state.animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['transparent', ios.overlayColor],
            }),
          }}>
          <Animated.View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.titleView}>
                <Text style={[styles.titleText, ios.titleStyle]}>{title}</Text>
              </View>
              <Picker
                selectedValue={
                  this.state.selectedValue === null
                    ? 0
                    : this.state.selectedValue
                }
                style={{ maxHeight: 200, overflow: 'hidden' }}
                onValueChange={this.onChangeHandler}>
                {items.map((item, index) => {
                  return (
                    <Picker.Item
                      key={'item-' + index}
                      label={item.label || item}
                      value={item.value || index}
                    />
                  )
                })}
              </Picker>
              <TouchableOpacity activeOpacity={0.9} onPress={this.onSubmit}>
                <View
                  style={[
                    styles.confirmButtonView,
                    {
                      opacity:
                        this.state.selectedValue !== null
                          ? this.state.selectedValue !== this.props.value
                            ? 1
                            : 0.1
                          : 1,
                    },
                  ]}>
                  <Text style={styles.confirmButtonText as any}>
                    {confirmButton}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.cancelButton}>
              <TouchableOpacity activeOpacity={0.9} onPress={this.onCancel}>
                <View style={styles.cancelButtonView}>
                  <Text style={styles.cancelButtonText as any}>
                    {cancelButton}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    )
  }
}

const PickerPopup: React.FC<PickerProps> = props => {
  return Platform.OS === 'ios' ? (
    <PickerIOS {...props} />
  ) : (
    <PickerAndroid {...props} />
  )
}

export default PickerPopup
