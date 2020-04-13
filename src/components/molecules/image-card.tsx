import React, { memo } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { TouchableWithoutFeedback } from '@components/atoms/basic'
import { setImage } from '@utils/helpers'
import { nestedScreenMap } from '@utils/constants'
import ImageAutoSchale from '@components/atoms/image-autoschale'

/* revisi: need to change based on response API */
interface ItemType {
  id: number
  image_url: string
  target_url: string
}

const { width } = Dimensions.get('screen')

interface ItemJumbotronType {
  item: ItemType
  navigation: any
}

const styles = StyleSheet.create({
  image: {
    marginHorizontal: 8,
    borderRadius: 8,
  },
})

const imageWidth = 0.75 * width

const ImageCard = ({ item, navigation }: ItemJumbotronType) => {
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

  return (
    <TouchableWithoutFeedback onPress={_onPress}>
      <View>
        <ImageAutoSchale
          source={{
            uri: setImage(item.image_url, {
              width: imageWidth,
            }),
          }}
          width={imageWidth}
          style={styles.image}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default memo(ImageCard)
