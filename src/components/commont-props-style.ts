// commonet props style is collection of props that make style on certaint componnet so we dont have to manulai stylee the component to
import { StyleSheet, Platform } from 'react-native'
import { colors } from '@utils/constants'
import { fontStyle } from '@components/commont-styles'

const styles = StyleSheet.create({
  bottomSheet: {
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 1.0,
    shadowColor: colors.black50,
    elevation: 4,
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: colors.black50,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttontextBlack: {
    color: colors.black100,
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonTextNoIcon: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 0,
  },
  buttonBlue: {
    width: '100%',
    height: 46,
    borderColor: colors.blue60,
    backgroundColor: colors.white,
  },
  button: {
    width: '100%',
    height: 46,
    backgroundColor: '#8131E2',
  },
  blackBottonContent: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    width: 80,
    backgroundColor: colors.black100,
  },
  buttonTextBlue: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
    color: colors.blue60,
    marginLeft: 0,
  },
})

export const buttonPropsStyles = {
  gradientButton: {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
    colors: ['#3067E4', '#8131E2'],
    fontStyle: styles.buttonText,
    style: styles.button,
  },
  purpleOutline: {
    style: styles.buttonBlue,
    fontStyle: styles.buttonTextBlue,
  },
  blackButton: {
    fontStyle: styles.buttonTextNoIcon,
    style: styles.blackBottonContent,
  },
  whiteButton: {
    fontStyle: styles.buttontextBlack,
  },
}
