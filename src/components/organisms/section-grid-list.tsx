import React from 'react'
import { StyleSheet, Dimensions, ViewStyle } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import {
  futuraTitleFont,
  helveticaNormalFont,
  fontStyle,
} from '@components/commont-styles'
import { OutlineButton } from '@components/atoms/button'
import { colors } from '@utils/constants'
import ProductCard from '@components/molecules/product-card'
import PostCardNew from '@src/components/molecules/post-card-new'
import MansoryLayout from '@components/layouts/mansory-layout'
import { productListData } from '@hocs/data/product'
import { postListData } from '@src/hocs/data/post'
import ImageCard from '@components/molecules/image-card'

const { width } = Dimensions.get('window')

interface SectionGridListType {
  data: any
  navigation: any
  style?: ViewStyle
}

const ProductHoc = productListData(ProductCard)
const PostHoc = postListData(PostCardNew)

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
  _renderPost = item => {
    return (
      <PostHoc
        postId={item}
        type="large"
        style={{
          // flex: 1,
          // wrappermargin: 4,
          marginVertical: 8,
          marginHorizontal: 8,
        }}
      />
    )
  }

  _renderItem = () => {
    const { data, navigation } = this.props
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
      case 'post':
        return (
          <MansoryLayout
            data={_data}
            numColumns={2}
            renderItem={this._renderPost}
          />
        )
      // return (
      //   <Div
      //     _direction="row"
      //     align="flex-start"
      //     justify="center"
      //     style={{ flexWrap: 'wrap' }}>
      //     {_data.map((item, key) => (
      //       // <Div
      //       //   justifyContent="flex-start"
      //       //   align="center"
      //       //   key={item}
      //       //   _width="50%">
      //       <PostHoc
      //         postId={item}
      //         key={'' + item + key}
      //         idx={key}
      //         horizontal
      //         type="large"
      //         style={{
      //           // flex: 1,
      //           // wrappermargin: 4,
      //           width: width - 16,
      //           marginVertical: 24,
      //           paddingHorizontal: 8,
      //         }}
      //       />
      //       // </Div>
      //     ))}
      //   </Div>
      // )
      case 'image':
        return (
          <Div align="flex-start" justify="center">
            {_data.map((item, key) => (
              <ImageCard
                navigation={navigation}
                item={item}
                style={{
                  width: width - 32,
                  marginBottom: 18,
                  marginLeft: 16,
                }}
                key={'image-key' + key}
              />
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
    const { data, style } = this.props

    return (
      <Div
        _flex="1"
        _width="100%"
        align="flex-start"
        mar="12px 0"
        style={style}>
        <Font style={fontStyle.playfairBold} size="24px" mar="0 0 16px 16px">
          {data.title}
        </Font>
        {this._renderItem()}
        {this._renderButton(data)}
      </Div>
    )
  }
}

export default SectionGridList
