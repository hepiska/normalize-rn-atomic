import React from 'react'
import { StyleSheet } from 'react-native'
import { Div, PressAbbleDiv, Image, Font } from '@components/atoms/basic'
import { setImage } from '@utils/helpers'
import { helveticaBlackTitleBold } from '@components/commont-styles'
import { colors } from '@utils/constants'
import { Button } from '@components/atoms/button'
import InviniteLoader from '@components/atoms/loaders/invinite'

interface BrandListItemType {
  brand: any
  idx: any
  onPress: () => void
}

const styles = StyleSheet.create({
  brand: {
    width: 112,
    height: 84,
    borderRadius: 8,
  },
  pressableDiv: {
    overflow: 'hidden',
    marginRight: 32,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 'auto',
    width: 138,
  },
  buttonText: {
    color: colors.white,
    fontSize: 10,
  },
  button: {
    width: '100%',
    height: 22,
    marginTop: 16,
    backgroundColor: colors.black100,
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
  },
})

class BrandListItem extends React.PureComponent<BrandListItemType, any> {
  render() {
    const { brand, idx, onPress } = this.props

    return brand ? (
      <PressAbbleDiv
        style={{
          ...styles.pressableDiv,
          marginLeft: idx === 0 ? 16 : 0,
        }}
        onPress={onPress}>
        <Font {...helveticaBlackTitleBold} size="24px">
          {idx + 1}
        </Font>
        <Div flexDirection="column">
          <Image
            source={{
              uri: brand.image_url
                ? setImage(brand.image_url, { ...styles.brand })
                : brand.image_url,
            }}
            style={styles.brand}
          />
          <Button
            onPress={() => {
              console.log('follow')
            }} // revisi: belum ada action follow
            title="Follow"
            fontStyle={styles.buttonText}
            style={styles.button}
          />
        </Div>
      </PressAbbleDiv>
    ) : (
      <InviniteLoader />
    )
  }
}

export default BrandListItem
