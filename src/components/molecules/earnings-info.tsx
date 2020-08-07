import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { fontStyle } from '../commont-styles'
import { colors } from '@src/utils/constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { navigate } from '@src/root-navigation'

const seePending = () => {
  navigate('Screens', {
    screen: 'MyEarningsPending',
  })
}

interface InfoType {
  title?: string
  desc?: string
  action?: boolean
}

class EarningsInfo extends Component<InfoType, any> {
  render() {
    const { title, desc, action } = this.props
    return (
      <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
        <Text
          style={{
            ...fontStyle.playfairMedium,
            fontSize: 24,
            color: colors.black100,
          }}>
          {title}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <Text style={[fontStyle.helveticaThin, { flex: 1 }]}>{desc}</Text>
          {action ? (
            <TouchableOpacity
              onPress={seePending}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[
                  fontStyle.helveticaThin,
                  { marginRight: 4, textDecorationLine: 'underline' },
                ]}>
                See Pending
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    )
  }
}

export default EarningsInfo
