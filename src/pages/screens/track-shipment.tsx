import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { ScrollDiv, Font } from '@components/atoms/basic'
import NavbarTop from '@src/components/molecules/navbar-top'
import { colors } from '@src/utils/constants'
import { fontStyle } from '@components/commont-styles'

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 24,
    marginBottom: 24,
  },
})

const dummy = [
  {
    date: 'Buyer - Mon, 17 Dec 2020',
    time: '16:26 WIB',
    desc: 'Awaiting confirmation',
  },
  {
    date: 'Buyer - Mon, 17 Dec 2020',
    time: '16:27 WIB',
    desc: 'Awaiting confirmation',
  },
  {
    date: 'Buyer - Mon, 17 Dec 2020',
    time: '16:28 WIB',
    desc: 'Awaiting confirmation',
  },
  {
    date: 'Buyer - Mon, 17 Dec 2020',
    time: '16:29 WIB',
    desc: 'Awaiting confirmation',
  },
]

class TrackShipment extends Component<any, any> {
  render() {
    return (
      <>
        <NavbarTop
          title="Track Shipment"
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        <ScrollView>
          <View {...styles.container}>
            <View>
              <Font
                style={{ ...fontStyle.futuraBold }}
                size={16}
                color={colors.black100}>
                Receipt Number
              </Font>
              <Font
                style={{ ...fontStyle.helvetica, marginTop: 8, lineHeight: 14 }}
                size={14}
                color={colors.black70}>
                IN-2-00D2BBUNJSLLYQMW4Z6
              </Font>
            </View>

            <View style={{ marginTop: 24 }}>
              {dummy.map((item, key) => (
                <View key={key}>
                  {key !== 0 && (
                    <View
                      style={{
                        marginTop: 4,
                        marginBottom: 4,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
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
                      <Font
                        style={{
                          ...fontStyle.helvetica,
                          marginLeft: 18,
                        }}
                        size={14}
                        color={colors.black100}>
                        {item.desc}
                      </Font>
                    </View>
                  )}
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* bullet */}
                        <View>
                          <View
                            style={{
                              backgroundColor:
                                key !== dummy.length - 1
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
                                key !== dummy.length - 1
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
                            }}
                          />
                        </View>
                        <Font
                          style={{ ...fontStyle.helveticaBold, marginLeft: 8 }}
                          size={14}
                          color={
                            key !== dummy.length - 1
                              ? colors.black60
                              : colors.greenAccent
                          }>
                          {item.date}
                        </Font>
                      </View>
                      <Font
                        style={{ ...fontStyle.helvetica }}
                        size={14}
                        color={colors.black70}>
                        {item.time}
                      </Font>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </>
    )
  }
}

export default TrackShipment
