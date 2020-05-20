import { colors } from '@utils/constants'
import { StyleSheet, Platform } from 'react-native'

export const fontStyle =
  Platform.OS === 'ios'
    ? StyleSheet.create({
        helvetica: {
          fontFamily: 'Helvetica Neue',
          fontWeight: 'normal',
        },
        helveticaThin: {
          fontFamily: 'Helvetica Neue',
          fontWeight: '200',
        },
        helveticaBold: {
          fontFamily: 'Helvetica Neue',
          fontWeight: 'bold',
        },
        futura: {
          fontFamily: 'Futura',
        },
        futuraBold: {
          fontFamily: 'Futura',
          fontWeight: 'bold',
        },
        futuraDemi: {
          fontFamily: 'FuturaDemi',
        },
        playfairBold: {
          fontFamily: 'Playfair Display',
          fontWeight: 'bold',
        },
      })
    : StyleSheet.create({
        helvetica: {
          fontFamily: 'HelveticaNeue',
          // fontWeight: 'normal',
        },
        helveticaThin: {
          fontFamily: 'HelveticaNeue-Thin',
        },
        helveticaBold: {
          fontFamily: 'HelveticaNeue-Bold',
        },
        futuraBold: {
          fontFamily: 'Futura-Bold',
        },
        futura: {
          fontFamily: 'Futura',
        },
        futuraDemi: {
          fontFamily: 'FuturaDemi',
        },
        playfairBold: {
          fontFamily: 'PlayfairDisplay-Bold',
        },
      })

export const futuraBlackFont24 = {
  size: 24,
  type: 'Futura',
  color: colors.black100,
}

export const futuraTitleFont = {
  size: 18,
  type: 'Futura',
  weight: 'bold',
  color: colors.black100,
}

export const futuraBoldFont16 = {
  size: 16,
  color: colors.black100,
}

export const futuraBlackFont14 = {
  size: 14,
  type: 'Futura',
  color: colors.black100,
}

export const futuraNormalFont12 = {
  size: 12,
  type: 'Futura',
  color: colors.black70,
}

export const helveticaNormalFont = {
  size: 14,
  type: 'HelveticaNeue',
  color: colors.gray3,
}

export const helveticaNormalFont12 = {
  size: 12,
  type: 'HelveticaNeue',
  color: colors.gray3,
}

export const helveticaBlackFont12 = {
  size: 12,
  type: 'HelveticaNeue',
  color: colors.black100,
}

export const helveticaBlackBoldFont12 = {
  size: 12,
  type: 'HelveticaNeue',
  weight: 'bold',
  color: colors.black100,
}

export const helveticaBlackFont14 = {
  size: 14,
  type: 'HelveticaNeue',
  color: colors.black80,
}

export const helveticaBlackBold = {
  size: 14,
  type: 'HelveticaNeue',
  weight: 'bold',
  color: colors.black100,
}

export const helveticaBlackTitleBold = {
  size: 16,
  type: 'HelveticaNeue',
  weight: 'Bold',
  color: colors.black100,
}

export const helveticaTitleFont = {
  size: 18,
  type: 'Helvetica',
  weight: 'bold',
  color: colors.black100,
}

export const helveticaNormalFont10 = {
  size: 10,
  type: 'Helvetica',
  color: colors.black60,
}

export const helveticaBlackBoldFont10 = {
  size: 10,
  type: 'HelveticaNeue',
  weight: 'bold',
  color: colors.black100,
}

export const shadows = StyleSheet.create({
  normal: {
    shadowColor: colors.black100,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.18,
    elevation: 1,
  },
})

export const borderStyle = StyleSheet.create({
  all: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.black50,
    borderRadius: 8,
  },
  bottom: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: colors.black50,
  },
  top: {
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderColor: colors.black50,
  },
  left: {
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderColor: colors.black50,
  },
  right: {
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderColor: colors.black50,
  },
})

export const formStyles = StyleSheet.create({
  title: {
    ...fontStyle.futuraDemi,
    fontWeight: '500',
    color: colors.font1,
    marginVertical: 12,
    fontSize: 24,
  },
  field: {
    height: 48,
    marginVertical: 12,
  },
  text: {
    color: colors.black80,
    fontSize: 14,
  },
  info: {
    color: colors.black60,
    fontSize: 14,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 46,
    marginVertical: 16,
    backgroundColor: '#8131E2',
  },
  distance: {
    marginVertical: 12,
  },
})

export const modalSyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    zIndex: 2,
    borderRadius: 8,
  },
  titleContainer: {
    borderBottomWidth: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: colors.gray6,
  },
  actionContainer: {
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: colors.gray6,
  },
  descContainer: { paddingHorizontal: 16, paddingVertical: 24 },
  titleFont: { ...fontStyle.futuraDemi, fontSize: 20 },
  descStyle: { ...fontStyle.helvetica, fontSize: 16 },
})
