import React from 'react'
import { Dimensions, Button, ViewStyle, FlatList } from 'react-native'
import {
  Div,
  Font,
  Image,
  ScrollDiv,
  PressAbbleDiv,
} from '@components/atoms/basic'
import flastlistItemHoc from '@hocs/flatlist-item'
import { colors } from '@utils/constants'
import NavbarTopAnimated from '@components/molecules/navbar-top-animated'
import CoverImageAimated from '@src/components/organisms/cover-image-animated'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagesWithPreviews from '@components/organisms/images-with-preview'
import ContentExpandable from '@components/molecules/content-expandable'
import ImageCoverContentLayout from '@src/components/layouts/image-cover-animated-content'
import ProductOverviewCard from '@src/components/molecules/product-overview-card-body'
import ProductCard from '@components/molecules/product-card'
import Animated from 'react-native-reanimated'

const { width } = Dimensions.get('screen')

interface ProductGroupType {
  products: any
  title: string
  onShowAll?: Function
  style?: ViewStyle
}

const ProductItem = flastlistItemHoc(ProductCard)

const renderItem = ({ item }) => {
  return (
    <ProductItem
      product={item}
      style={{ width: width / 2 - 16 - 8, marginRight: 16 }}
    />
  )
}

const ProductGroupList = ({
  products,
  title,
  style,
  onShowAll,
}: ProductGroupType) => {
  return (
    <Div _width="100%" style={style} align="flex-start">
      <Div
        _margin="16px 0px"
        _flex="1"
        _width="100%"
        justify="space-between"
        align="stretch"
        _direction="row">
        <Font size={18} type="Futura" weight="bold">
          {title}
        </Font>
        {onShowAll && (
          <PressAbbleDiv>
            <Div _direction="row">
              <Font size={14} color={colors.blue50}>
                Show All
              </Font>
              <Icon
                name="chevron-right"
                color={colors.blue50}
                style={{ marginLeft: 8 }}
              />
            </Div>
          </PressAbbleDiv>
        )}
      </Div>
      <FlatList horizontal data={products} renderItem={renderItem} />
    </Div>
  )
}

export default ProductGroupList
