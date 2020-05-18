import React, { memo, useState } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { Image } from '@components/atoms/basic'
import { colors, images as defaultImages } from '@src/utils/constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { setImage as changeImageUri } from '@utils/helpers'
import Icon from 'react-native-vector-icons/FontAwesome'
import { fontStyle } from '../commont-styles'
import { OutlineButton } from '@components/atoms/button'
import ImageAutoSchale from '../atoms/image-autoschale'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  backgroundProfile: {
    width: '100%',
  },
  backgroundImage: {
    width: width,
    height: 120,
  },
  profilePicture: {
    width: 89,
    height: 89,
    borderRadius: 100,
  },
  button: {
    width: 132,
    height: 36,
    borderColor: colors.black60,
    padding: 0,
  },
  buttonText: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
    color: colors.black70,
  },
})

interface ProfilePictureType {
  openCamera: any
  photoUrl: any
  type?: string
}

const ChangePictureIcon = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          backgroundColor: 'rgba(26, 26, 26, 0.75)',
          width: 32,
          height: 32,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="camera" size={16} color={colors.white} />
      </View>
    </TouchableOpacity>
  )
}

const InsiderOnlyChips = () => (
  <View
    style={{
      backgroundColor: 'rgba(26, 26, 26, 0.75)',
      height: 32,
      width: 198,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
    }}>
    <Text
      style={{ ...fontStyle.helveticaBold, fontSize: 10, color: colors.white }}>
      Only insiders that can customize cover
    </Text>
  </View>
)

const ProfilePicture = (props: ProfilePictureType) => {
  const { openCamera, photoUrl, type } = props
  const [defaultImage, setDefaultImage] = useState(null)

  const image =
    defaultImage ||
    (!!photoUrl
      ? changeImageUri(photoUrl, { width: 89, height: 89 })
      : defaultImages.product)

  return (
    <View>
      {/* profile picture */}
      <View style={{ marginVertical: 24, marginHorizontal: 16 }}>
        <TouchableOpacity onPress={openCamera('photo_url')}>
          <ImageAutoSchale
            source={typeof image === 'string' ? { uri: image } : image}
            onError={() => setDefaultImage(defaultImages.product)}
            style={styles.profilePicture}
          />
        </TouchableOpacity>
        {type === 'edit' && (
          <View style={{ position: 'absolute', bottom: 8, left: 67 }}>
            <ChangePictureIcon onPress={openCamera('photo_url')} />
          </View>
        )}
      </View>
    </View>
  )
}

export default memo(ProfilePicture)
