import React from 'react'
import {
  StyleSheet,
  ViewStyle,
  View,
  TouchableWithoutFeedback,
  Text,
} from 'react-native'
import { Image } from '@components/atoms/basic'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'
import { calculateDay } from '@utils/helpers'
import { navigate } from '@src/root-navigation'

interface AnnouncementCardType {
  announcement: any
  idx: number
  style?: ViewStyle
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 10,
  },
})

class AnnouncementCard extends React.PureComponent<AnnouncementCardType, any> {
  handlePressAnnouncement = () => {
    navigate('Screens', {
      screen: 'CollectionProductList',
      params: {
        collectionsSlug: 'sale',
        isDisc: true,
      },
    })
  }

  render() {
    const { announcement, idx, style } = this.props
    const img = announcement.image_url
    const defaultStyle = { ...styles.container, ...style }
    return announcement ? (
      <TouchableWithoutFeedback onPress={this.handlePressAnnouncement}>
        <View style={{ ...defaultStyle, marginLeft: idx === 0 && 16 }}>
          <Image
            key={`image-announcement-${idx}`}
            source={
              img
                ? { uri: img }
                : require('@src/assets/placeholder/placeholder2.jpg')
            }
            style={{ ...styles.image }}
          />
          <View style={{ width: 180 }}>
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={{
                ...fontStyle.helvetica,
                fontSize: 14,
                color: colors.black80,
                height: 80,
              }}>
              {announcement?.target?.data?.announcement_content || 'undefined'}
            </Text>
            <Text
              style={{
                textAlign: 'right',
                color: colors.black60,
                fontSize: 14,
              }}>
              {calculateDay(announcement?.updated_at)}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    ) : null
  }
}

export default AnnouncementCard
