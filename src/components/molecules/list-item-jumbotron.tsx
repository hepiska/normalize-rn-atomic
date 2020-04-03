import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import { Image, TouchableWithoutFeedback } from '@components/atoms/basic'
import { setImage } from '@utils/helpers'
import { globalDimention } from '@utils/constants'

/* revisi: need to change based on response API */
interface ItemType {
  id: number
  image_url: string
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

const ListItemJumbotron = ({
  item,
  navigation,
  navigateTarget,
}: ItemJumbotronType) => {
  const _onPress = () => {
    navigation.push(navigateTarget, {
      collectionId: 4,
    })
  }

  return (
    <TouchableWithoutFeedback onPress={_onPress}>
      <Image
        source={{
          uri: setImage(item.image_url, { ...styles.image }),
        }}
        style={styles.image}
      />
    </TouchableWithoutFeedback>
  )
}

export default memo(ListItemJumbotron)
