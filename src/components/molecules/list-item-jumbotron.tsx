import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import { Image, TouchableWithoutFeedback } from '@components/atoms/basic'
import { setImage } from '@utils/helpers'
import { nestedScreenMap } from '@utils/constants'
import { globalDimention } from '@utils/constants'
import ImageAutoSchale from '@components/atoms/image-autoschale'

/* revisi: need to change based on response API */
interface ItemType {
  id: number
  image_url: string
  mobile_image_url?: string
  target_url: string
}

interface ItemJumbotronType {
  item: ItemType
  navigation: any
  navigateTarget: any
}

const styles = StyleSheet.create({
  image: {
    ...globalDimention.jumbotronSize,
  },
})

const ListItemJumbotron = ({ item, navigation }: ItemJumbotronType) => {
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
      <ImageAutoSchale
        errorStyle={{
          width: globalDimention.jumbotronSize.width,
          height: 0.66 * globalDimention.jumbotronSize.width,
        }}
        source={{
          uri: setImage(item.mobile_image_url || item.image_url, {
            width: globalDimention.jumbotronSize.width,
          }),
        }}
        width={globalDimention.jumbotronSize.width}
        // style={styles.image}
      />
    </TouchableWithoutFeedback>
  )
}

export default memo(ListItemJumbotron)
