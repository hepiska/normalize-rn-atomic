import React from 'react'
import { View, StyleSheet, Text, ViewStyle } from 'react-native'
import { capilEachWord } from '@utils/helpers'
import { colors } from '@utils/constants'
import { fontStyle } from '@components/commont-styles'
import Icon from 'react-native-vector-icons/FontAwesome5'

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusOrder: {
    width: '100%',
    flexDirection: 'row',
  },
})

interface StatusAlrtPropsType {
  status: string
  icon: string
  style?: ViewStyle
  text: string
}

const getColorFromStatus = status => {
  switch (status.toLowerCase()) {
    case 'waiting for payment':
    case 'paid':
    case 'unpaid':
    case 'waiting for confirmation':
    case 'waiting':
    case 'confirmed':
    case 'in process':
    case 'shipping':
    case 'sent':
      return {
        textColor: '#FFA010',
        backgroundColor: 'rgba(255, 160, 16, 0.05)',
      }
    case 'delivered':
    case 'complete':
    case 'completed':
    case 'returned':
      return {
        textColor: colors.greenAccent,
        backgroundColor: 'rgba(0, 184, 0, 0.1)',
      }
    default:
      return {
        textColor: colors.black100,
        backgroundColor: 'rgba(26, 26, 26, 0.1)',
      }
  }
}

const StatusAlert = (props: StatusAlrtPropsType) => {
  return (
    <View
      // {...styles.statusOrder}
      style={{
        ...styles.container,
        backgroundColor: getColorFromStatus(props.status).backgroundColor,
        ...props.style,
      }}>
      <Icon
        name={props.icon}
        size={12}
        color={getColorFromStatus(props.status).textColor}
      />
      <Text
        style={{
          ...fontStyle.helveticaBold,
          color: getColorFromStatus(props.status).textColor,
          fontSize: 12,
          marginLeft: 8,
        }}>
        {capilEachWord(props.text)}
      </Text>
    </View>
  )
}

export default StatusAlert
