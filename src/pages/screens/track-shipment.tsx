import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  InteractionManager,
} from 'react-native'
import { ScrollDiv, Font } from '@components/atoms/basic'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@src/utils/constants'
import { fontStyle } from '@components/commont-styles'
import dayjs from 'dayjs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import TrackShipmentLoader from '@src/components/atoms/loaders/courier-loader'

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  futuraBold16: {
    ...fontStyle.futuraDemi,
    fontWeight: '500',
    fontSize: 16,
  },
  helveticaBold14: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
  },
})

class TrackShipment extends Component<any, any> {
  state = {
    finishAnimation: false,
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        finishAnimation: true,
      })
    })
  }
  render() {
    const {
      params: { order },
    } = this.props.route
    const { finishAnimation } = this.state

    return (
      <>
        <NavbarTop
          title="Track Shipment"
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        {finishAnimation ? (
          <ScrollView>
            <View {...styles.container}>
              <View>
                <Text style={{ ...styles.futuraBold16 }}>Receipt Number</Text>
                <View style={{ marginTop: 8 }}>
                  <Text
                    style={{
                      ...styles.helveticaBold14,
                      color: colors.black70,
                      lineHeight: 14,
                    }}>
                    {order.invoice_no}
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 24 }}>
                {order.logs &&
                  order.logs.map((item, key) => (
                    <View key={key}>
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            {/* bullet */}
                            <View>
                              <View
                                style={{
                                  backgroundColor:
                                    key !== 0
                                      ? colors.black60
                                      : colors.greenAccent,
                                  opacity: 0.1,
                                  width: 24,
                                  height: 24,
                                  borderRadius: 100,
                                }}
                              />
                              <View
                                style={{
                                  backgroundColor:
                                    key !== 0
                                      ? colors.black60
                                      : colors.greenAccent,
                                  opacity: 1,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 100,
                                  zIndex: 2,
                                  position: 'absolute',
                                  left: 6,
                                  top: 6,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                {key === 0 && (
                                  <Icon
                                    name="check"
                                    size={8}
                                    color={colors.white}
                                  />
                                )}
                              </View>
                            </View>
                            <Font
                              style={{
                                ...fontStyle.helveticaBold,
                                marginLeft: 8,
                              }}
                              size={14}
                              color={
                                key !== 0 ? colors.black60 : colors.greenAccent
                              }>
                              {`System - ${dayjs(item.created_at).format(
                                'ddd, DD MMM YYYY',
                              )}`}
                            </Font>
                          </View>
                          <Font
                            style={{ ...fontStyle.helvetica }}
                            size={14}
                            color={colors.black70}>
                            {dayjs(item.created_at).format('HH:mm WIB')}
                          </Font>
                        </View>
                      </View>

                      <View
                        style={{
                          marginTop: 4,
                          marginBottom: 4,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {key !== order.logs.length - 1 && (
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: colors.black50,
                              borderStyle: 'dashed',
                              width: 1,
                              height: 28,
                              marginLeft: 11.5,
                            }}
                          />
                        )}
                        <Font
                          style={{
                            ...fontStyle.helvetica,
                            marginLeft: key !== order.logs.length - 1 ? 18 : 32,
                          }}
                          size={14}
                          color={colors.black100}>
                          {item.status}
                        </Font>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          </ScrollView>
        ) : (
          <TrackShipmentLoader style={{ margin: 16 }} />
        )}
      </>
    )
  }
}

export default TrackShipment
