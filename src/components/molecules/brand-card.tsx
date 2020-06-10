import React from 'react'
import { StyleSheet } from 'react-native'
import {
  Div,
  Image,
  Font,
  TouchableWithoutFeedback,
} from '@components/atoms/basic'
import { setImage } from '@utils/helpers'
import { helveticaBlackTitleBold } from '@components/commont-styles'
import { colors } from '@utils/constants'
import { Button } from '@components/atoms/button'

interface BrandCardType {
  brand: any
  idx: any
  onPress: () => void
  imageOnly: boolean
}

const styles = StyleSheet.create({
  brand: {
    width: 112,
    height: 84,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.black50,
  },
  touchableDiv: {
    overflow: 'hidden',
    marginRight: 32,
    alignItems: 'flex-start',
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

class BrandCard extends React.PureComponent<BrandCardType, any> {
  render() {
    const { brand, idx, onPress, imageOnly } = this.props

    return brand ? (
      <TouchableWithoutFeedback onPress={onPress}>
        <Div
          style={{
            ...styles.touchableDiv,
            marginLeft: !imageOnly ? (idx === 0 ? 16 : 0) : 0,
            marginRight: !imageOnly ? 32 : 0,
          }}
          justify={!imageOnly ? 'space-between' : 'center'}>
          {!imageOnly && (
            <Font {...helveticaBlackTitleBold} size="24px">
              {idx + 1}
            </Font>
          )}
          <Div flexDirection="column">
            <Image
              source={
                brand.image_url
                  ? {
                      uri: setImage(brand.image_url, { ...styles.brand }),
                    }
                  : require('../../assets/placeholder/placeholder2.jpg')
              }
              style={styles.brand}
            />
            {!imageOnly && (
              <Button
                onPress={() => {
                  console.log('follow')
                }} // revisi: belum ada action follow
                title="Follow"
                fontStyle={styles.buttonText}
                style={styles.button}
              />
            )}
          </Div>
        </Div>
      </TouchableWithoutFeedback>
    ) : null
  }
}

export default BrandCard
