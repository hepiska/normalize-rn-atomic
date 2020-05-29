import React from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import { Div } from '@components/atoms/basic'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { setImage as changeImageUri, formatRupiah } from '@utils/helpers'
import { images as defaultImages, colors } from '@utils/constants'
import { fontStyle } from '../commont-styles'

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  image: {
    width: 108,
    height: 144,
    borderRadius: 8,
  },
  helvetica10: {
    ...fontStyle.helvetica,
    fontSize: 10,
  },
  helvetica14: {
    ...fontStyle.helvetica,
    fontSize: 14,
  },
  helveticaBold16: {
    ...fontStyle.helveticaBold,
    fontSize: 16,
  },
})

interface TotalCommisionType {
  style?: ViewStyle
}

class TotalCommisionCard extends React.Component<TotalCommisionType, any> {
  state = {
    defaultImage: null,
  }
  render() {
    const { style } = this.props

    let image = defaultImages.product

    return (
      <>
        <View {...style} {...styles.container}>
          <Div flexDirection="row" alignItems="flex-start">
            <ImageAutoSchale
              source={{
                image,
              }}
              onError={() => {
                this.setState({ defaultImage: defaultImages.product })
              }}
              style={styles.image}
            />
            <Div
              _flex="1"
              flexDirection="column"
              align="flex-start"
              _margin="0 0 0 16px">
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{ ...styles.helveticaBold16, color: colors.black100 }}>
                {`brand name`.toUpperCase()}
              </Text>
              <View style={{ marginTop: 8 }}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={{ ...styles.helvetica14, color: colors.black80 }}>
                  {`product names`.replace(/(\r\n|\n|\r)/gm, '')}
                </Text>
              </View>
              <View style={{ marginTop: 24, flexDirection: 'row' }}>
                <Text
                  style={{
                    ...styles.helvetica10,
                    fontWeight: '500',
                    color: colors.black60,
                  }}>
                  97 people
                </Text>
                <Text style={{ ...styles.helvetica10, color: colors.black60 }}>
                  have bought this product
                </Text>
              </View>
              <View style={{ marginTop: 8, flexDirection: 'row' }}>
                <Text
                  style={{
                    ...styles.helvetica10,
                    color: colors.black100,
                  }}>
                  Total commision
                </Text>
              </View>
              <View style={{ marginTop: 4 }}>
                <Text
                  style={{
                    ...fontStyle.helveticaBold,
                    fontSize: 14,
                    color: colors.greenAccent,
                  }}>
                  {formatRupiah(12000) || '0'}
                </Text>
              </View>
            </Div>
          </Div>
        </View>
      </>
    )
  }
}
export default TotalCommisionCard
