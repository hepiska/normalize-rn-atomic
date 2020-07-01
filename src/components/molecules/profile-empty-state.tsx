import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { Div, Font, Image } from '@components/atoms/basic'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@src/utils/constants'
import { GradientButton } from '@src/components/atoms/button'

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginTop: 32,
    marginBottom: 32,
  },
  button: {
    width: '100%',
    backgroundColor: colors.black100,
    marginTop: 40,
    height: 46,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
})

interface ProfileEmptyType {
  style?: ViewStyle
  title?: string
  subtitle?: string
  onPress?: () => void
}

const ProfileEmptyState = ({ onPress, title, subtitle }: ProfileEmptyType) => {
  return (
    <Div
      _width="100%"
      _justify="center"
      align="center"
      bg={colors.white}
      _padding="0 16px">
      <Image
        source={require('../../assets/placeholder/searching-for-the-search-result.png')}
        style={styles.image}
      />
      <Font
        style={{ ...fontStyle.helveticaBold }}
        size={16}
        color={colors.black100}
        _margin="12px 0 0 0">
        {title || ' Opss, no account found'}
      </Font>
      <Font
        style={{ ...fontStyle.helvetica, lineHeight: 17 }}
        size={12}
        color={colors.black70}
        textAlign="center"
        _margin="16px 0 0 0">
        {subtitle ||
          'When you share photo, journal and collection they will appear in yourprofile'}
      </Font>
      <GradientButton
        onPress={onPress}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#3067E4', '#8131E2']}
        title="Register / Login Now"
        fontStyle={styles.buttonText}
        style={styles.button}
      />
    </Div>
  )
}

export default ProfileEmptyState
