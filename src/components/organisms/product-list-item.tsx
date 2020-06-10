import React from 'react'
import { StyleSheet } from 'react-native'
import { PressAbbleDiv, Image, Font } from '@components/atoms/basic'
import { setImage } from '@utils/helpers'
import {
  helveticaBlackBold,
  helveticaNormalFont,
} from '@components/commont-styles'
import { colors } from '@utils/constants'
import { formatRupiah, removeLineBreak } from '@utils/helpers'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface ProductListItemType {
  product: any
  brand?: any
  idx: string | number
  onPress: () => void
}

const styles = StyleSheet.create({
  product: {
    width: 132,
    height: 176,
    borderRadius: 8,
  },
  pressableDiv: {
    overflow: 'hidden',
    marginRight: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 'auto',
    width: 132,
  },
  bookmark: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
})

class ProductListItem extends React.PureComponent<ProductListItemType, any> {
  render() {
    const { product, brand, idx, onPress } = this.props

    return product ? (
      <PressAbbleDiv
        style={{
          ...styles.pressableDiv,
          marginLeft: idx === 0 ? 16 : 0,
        }}
        onPress={onPress}>
        <PressAbbleDiv
          style={styles.bookmark}
          zIndex="2"
          _background={colors.white}
          _width="32px"
          _height="32px"
          borderRadius="20px"
          onPress={() =>
            console.log('bookmark pressed')
          } /* revisi: diganti dengan navigation / action bookmark */
        >
          <Icon
            name="bookmark-border" /* revisi: beri kondisi, ganti dengan 'bookmark' kalau saved = true */
            size={16}
            color={colors.black70}
          />
        </PressAbbleDiv>
        <Image
          source={
            product.image_url
              ? {
                  uri: setImage(product.image_url, { ...styles.product }),
                }
              : require('../../assets/placeholder/placeholder-image.png')
          }
          style={styles.product}
        />
        <React.Fragment>
          <Font {...helveticaBlackBold} mar="16px 0 0 0">
            {brand.name}
          </Font>
          <Font {...helveticaNormalFont} mar="8px 0 0 0">
            {removeLineBreak(product.name)}{' '}
            {/* revisi: ditambah dengan varian / color */}
          </Font>
          <Font {...helveticaBlackBold} mar="16px 0 0 0">
            {formatRupiah(product.price)}
          </Font>
        </React.Fragment>
      </PressAbbleDiv>
    ) : null
  }
}

export default ProductListItem
