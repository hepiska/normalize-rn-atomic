import React from 'react'
import { StyleSheet } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import Img from '@components/atoms/image'
import { fontStyle } from '@components/commont-styles'
import { setImage } from '@utils/helpers'
import { images, colors } from '@src/utils/constants'
import HTML from 'react-native-render-html'

interface ProductOverviewCart {
  image: any
  brand: string
  name: string
}

const styles = StyleSheet.create({
  image: {
    width: 108,
    height: 162,
    borderRadius: 8,
    marginRight: 16,
  },
})

const ProductOverviewCart: React.FC<ProductOverviewCart> = ({
  image,
  brand,
  name,
}) => {
  if (image.uri) {
    image.uri = setImage(image.uri, {
      width: styles.image.width,
      height: styles.image.height,
    })
  }

  return (
    <Div _direction="row" align="flex-start" _margin="0px 0px 24px">
      <Img source={image} style={styles.image} />
      <Div align="flex-start">
        <Font
          type="HelveticaNeue"
          size={16}
          weight="bold"
          color={colors.black100}
          _margin="0px 0px 8px">
          {brand}
        </Font>
        <HTML
          html={`<name>${name}</name>`}
          renderers={{
            // eslint-disable-next-line react/display-name
            name: (htmlAttribs, children, convertedCSSStyles, passProps) => {
              return (
                <Font
                  style={{ ...fontStyle.helvetica }}
                  size={14}
                  color={colors.black100}>
                  {passProps?.rawChildren[0]?.data}
                </Font>
              )
            },
          }}
        />
      </Div>
    </Div>
  )
}

export default ProductOverviewCart
