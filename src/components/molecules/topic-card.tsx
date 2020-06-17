import React from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  ViewStyle,
  StyleSheet,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
const { width } = Dimensions.get('screen')
const margin = 8
const widthCard = width / 3 - margin * 2

const styles = StyleSheet.create({
  container: {
    width: widthCard,
    height: widthCard,
    borderColor: colors.black10,
    borderRadius: 4,
    borderWidth: 1,
    margin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedContainer: {
    backgroundColor: colors.black10,
  },
  image: {
    width: widthCard / 2,
    height: widthCard / 2,
  },
  imageBig: {
    width: widthCard,
    height: widthCard,
  },
  title: {
    ...fontStyle.helvetica,
    fontSize: 12,
    color: colors.black70,
    marginTop: 12,
  },
  absIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.white,
    borderRadius: 100,
  },
})

interface DataType {
  id: string | number
  title: string
  image: any
}

interface TopicType {
  topic: DataType
  style?: ViewStyle
  key: string | number
  onPress: () => void
  selected: boolean
  imageType?: string
  isPressable?: boolean
}

const Overlay = () => (
  <View
    style={[
      StyleSheet.absoluteFillObject,
      { backgroundColor: 'rgba(248,248,248, 0.5)' },
    ]}
  />
)

class TopicCard extends React.Component<TopicType, any> {
  render() {
    const {
      style,
      topic: { id, title, image },
      onPress,
      selected,
      imageType,
      isPressable,
    } = this.props

    return (
      <TouchableWithoutFeedback onPress={isPressable ? onPress : null}>
        <View
          style={{
            backgroundColor: selected ? colors.black10 : 'transparent',
            ...styles.container,
            ...style,
          }}>
          {imageType === 'big' && (
            <Image source={image} style={{ ...styles.imageBig }} />
          )}
          {(!imageType || imageType !== 'big') && (
            <>
              <Image source={image} style={{ ...styles.image }} />
              <Text style={{ ...styles.title }}>{title}</Text>
            </>
          )}
          {imageType === 'big' && selected && <Overlay />}
          {selected && (
            <View style={{ ...styles.absIcon }}>
              <Icon name="check-circle" size={16} color={colors.black100} />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default TopicCard
