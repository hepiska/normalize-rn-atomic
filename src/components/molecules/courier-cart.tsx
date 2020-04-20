import React from 'react'
import { StyleSheet, ViewStyle, View } from 'react-native'
import { Font, TouchableWithoutFeedback } from '@components/atoms/basic'
import { formatRupiah } from '@utils/helpers'
import {
  helveticaBlackBold,
  helveticaBlackFont12,
  helveticaBlackBoldFont10,
} from '@components/commont-styles'
import { colors, images as defaultImages } from '@utils/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ImageAutoSchale from '@components/atoms/image-autoschale'

interface CourierCartType {
  style?: ViewStyle
  name: string
  isPreffered?: boolean
  price: string | number
  onPress: () => void
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: colors.black50,
    borderWidth: 1,
    padding: 16,
  },
  image: {
    width: 88,
    height: 66,
    borderRadius: 8,
  },
  information: {
    marginLeft: 16,
  },
  preffered: {
    backgroundColor: colors.black10,
    borderRadius: 100,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

class CourierCart extends React.PureComponent<CourierCartType, any> {
  state = {
    defaultImage: null,
  }

  render() {
    const { style, name, isPreffered, price, onPress } = this.props

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View {...style} {...styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <ImageAutoSchale
              source={require('../../assets/placeholder/placeholder2.jpg')}
              onError={() => {
                this.setState({ defaultImage: defaultImages.product })
              }}
              style={styles.image}
            />
            <View {...styles.information}>
              {isPreffered && (
                <View {...styles.preffered}>
                  <Icon name="check-circle" size={10} color={colors.black100} />
                  <Font {...helveticaBlackBoldFont10} style={{ marginLeft: 6 }}>
                    The Shonet Preffered
                  </Font>
                </View>
              )}
              <Font
                {...helveticaBlackFont12}
                colors={colors.black60}
                style={{ marginTop: 8 }}>
                {name}
              </Font>
              <Font {...helveticaBlackBold} style={{ marginTop: 8 }}>
                {formatRupiah(price)}
              </Font>
            </View>
          </View>
          <View>
            <View>
              <Icon name="chevron-right" size={12} color={colors.black100} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default CourierCart
