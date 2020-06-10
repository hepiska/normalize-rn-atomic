import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import { colors } from '@utils/constants'
import { fontStyle } from '../commont-styles'

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
})

interface TitleDescriptionType {
  style?: ViewStyle
  title: string | ReactElement
  description: string | ReactElement
  titleAction?: ReactElement
}

class TitleDescriptionCard extends React.Component<TitleDescriptionType, any> {
  state = {
    defaultImage: null,
  }
  render() {
    const { style, title, description, titleAction } = this.props

    return (
      <View {...style} {...styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {typeof title === 'string' ? (
            <Text
              style={{
                ...fontStyle.futuraBold,
                fontSize: 24,
                color: colors.black100,
              }}>
              {title}
            </Text>
          ) : (
            title
          )}
          {titleAction && titleAction}
        </View>
        <View style={{ marginTop: 8 }}>
          {typeof description === 'string' ? (
            <Text
              style={{
                ...fontStyle.helvetica,
                fontSize: 14,
                color: colors.black80,
              }}>
              {description}
            </Text>
          ) : (
            description
          )}
        </View>
      </View>
    )
  }
}
export default TitleDescriptionCard
