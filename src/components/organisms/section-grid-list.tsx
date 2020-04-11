import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import {
  futuraTitleFont,
  helveticaNormalFont,
} from '@components/commont-styles'
import { OutlineButton } from '@components/atoms/button'
import { colors } from '@utils/constants'
import ProductCard from '@components/molecules/product-card'
import { productListData } from '@hocs/data/product'

const { width } = Dimensions.get('window')

interface SectionGridListType {
  data: any
}

const ProductHoc = productListData(ProductCard)

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 46,
    borderColor: colors.black60,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 12,
    color: colors.black80,
    marginLeft: 8,
    fontWeight: 'bold',
  },
})

class SectionGridList extends React.Component<SectionGridListType, any> {
  _renderItem = () => {
    const { data } = this.props
    const _data = data[`${data.type}s`]

    switch (data.type) {
      case 'product':
        return (
          <Div
            _direction="row"
            _flex={1}
            align="flex-start"
            style={{ flexWrap: 'wrap' }}>
            {_data.map((item, key) => (
              <Div key={`section-grid-${key}`} _width="50%" _height={430}>
                <ProductHoc
                  productId={item}
                  key={'' + item + key}
                  style={{
                    flex: 1,
                    wrappermargin: 4,
                    width: width / 2 - 8,
                    paddingHorizontal: 0,
                    marginLeft: 8,
                    marginRight: 8,
                  }}
                />
              </Div>
            ))}
          </Div>
        )
      default:
        return null
    }
  }

  _renderButton = data => {
    if (data.link_text) {
      return (
        <Div _width="100%" padd="0px 16px">
          <OutlineButton
            title={data.link_text}
            onPress={() => console.log(data.link)} // revisi: diganti navigasi ke data.link
            {...helveticaNormalFont}
            style={styles.button}
          />
        </Div>
      )
    }
  }

  render() {
    const { data } = this.props

    return (
      <Div _flex="1" _width="100%" align="flex-start" mar="12px 0">
        <Font {...futuraTitleFont} size="24px" mar="0 0 24px 16px">
          {data.title}
        </Font>
        {this._renderItem()}
        {this._renderButton(data)}
      </Div>
    )
  }
}

export default SectionGridList
