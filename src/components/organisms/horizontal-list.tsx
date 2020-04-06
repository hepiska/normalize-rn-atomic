import React from 'react'
import { FlatList, StyleSheet, Dimensions } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import {
  futuraTitleFont,
  helveticaNormalFont,
} from '@components/commont-styles'
import { OutlineButton } from '@components/atoms/button'
import { colors } from '@utils/constants'
import PostCard from '@components/molecules/post-card'
import CollectionCard from '@components/molecules/post-card'
import BrandCard from '@components/molecules/brand-card'
import ProductCard from '@components/molecules/product-card'
import { postListData } from '@hocs/data/post'
import { collectionListData } from '@hocs/data/collection'
import { productListData } from '@hocs/data/product'
import { brandListData } from '@hocs/data/brand'

const { width } = Dimensions.get('window')

interface HorizontalListType {
  data: any
}

const PostHoc = postListData(PostCard)
const CollectionHoc = collectionListData(CollectionCard)
const ProductHoc = productListData(ProductCard)
const BrandHoc = brandListData(BrandCard)

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

class HorizontalList extends React.Component<HorizontalListType, any> {
  _keyExtractor = item => item.id

  _renderItem = ({ item, index }) => {
    const {
      data: { type },
    } = this.props

    switch (type) {
      case 'post':
        if (this.props.data.posts) {
          return <PostHoc key={index} postId={item} idx={index} />
        } else if (this.props.data.collections) {
          return <CollectionHoc key={index} collectionId={item} idx={index} />
        }
      case 'product':
        return (
          <ProductHoc
            productId={item}
            key={index}
            style={{
              flex: 1,
              wrappermargin: 4,
              width: width / 2 - 8,
              marginTop: 0,
              marginLeft: 8,
              marginRight: 8,
              marginBottom: 0,
              paddingHorizontal: 0,
            }}
          />
        )
      case 'brand':
        return <BrandHoc key={index} brandId={item} idx={index} />
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

  _renderData = () => {
    const { data } = this.props

    if (data[`${data.type}s`]) return data[`${data.type}s`]
    return data[`collections`]
  }

  render() {
    const { data } = this.props

    return (
      <Div _width="100%" align="flex-start" mar="12px 0">
        <Font {...futuraTitleFont} size="24px" mar="0 0 24px 16px">
          {data.title}
        </Font>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToAlignment="center"
          data={this._renderData()} // revisi: based on API response, every type has different key object
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        {this._renderButton(data)}
      </Div>
    )
  }
}

export default HorizontalList
