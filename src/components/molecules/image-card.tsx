import React, { memo } from 'react'
import { StyleSheet, Dimensions, View, ViewStyle } from 'react-native'
import { TouchableWithoutFeedback } from '@components/atoms/basic'
import { setImage } from '@utils/helpers'
import { nestedScreenMap } from '@utils/constants'
import ImageAutoSchale from '@components/atoms/image-autoschale'

/* revisi: need to change based on response API */
interface ItemType {
  id: number
  image_url: string
  mobile_image_url?: string
  target_url: string
}

const { width } = Dimensions.get('screen')

interface ItemJumbotronType {
  item: ItemType
  style?: ViewStyle
  navigation: any
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginHorizontal: 8,
  },
  image: {
    borderRadius: 8,
  },
})

const imageWidth = 0.75 * width

const ImageCard = ({ item, navigation, style }: ItemJumbotronType) => {
  const _onPress = () => {
    const parsedUri = item.target_url.split('/')
    const screenKey = parsedUri[parsedUri.length - 2]
    const screenParams = parsedUri[parsedUri.length - 1]
    const params = { from: screenKey }
    params[
      Number(screenParams) ? `${screenKey}Id` : `${screenKey}Slug`
    ] = screenParams

    const screen = nestedScreenMap(screenKey, params)
    navigation.navigate(screen.screen, screen.params)
  }

  const composeStyle = { ...styles.container, ...style }

  return (
    <TouchableWithoutFeedback onPress={_onPress}>
      <View style={composeStyle}>
        <ImageAutoSchale
          source={{
            uri: setImage(item.mobile_image_url || item.image_url, {
              width: imageWidth,
            }),
          }}
          width={style?.width || imageWidth}
          style={styles.image}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default memo(ImageCard)
