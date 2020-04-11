import React from 'react'
import { Dimensions, ViewStyle } from 'react-native'
import {
  Div,
  Font,
  // Image,
  // ScrollDiv,
  // PressAbbleDiv,
} from '@components/atoms/basic'
// import NavbarTopAnimated from '@components/molecules/navbar-top-animated'
// import CoverImageAimated from '@src/components/organisms/cover-image-animated'
// import Icon from 'react-native-vector-icons/FontAwesome'
// import ImagesWithPreviews from '@components/organisms/images-with-preview'
// import ContentExpandable from '@components/molecules/content-expandable'
// import ImageCoverContentLayout from '@src/components/layouts/image-cover-animated-content'
// import ProductOverviewCard from '@src/components/molecules/product-overview-card-body'
import ProductCard from '@components/molecules/product-card'
// import Animated from 'react-native-reanimated'

const { width } = Dimensions.get('screen')

interface ProductGroupType {
  products: any
  title: string
  style?: ViewStyle
}

const ProductGroup = ({ products, title, style }: ProductGroupType) => {
  return (
    <Div _width="100%" style={style} align="flex-start">
      <Div _margin="16px 0px">
        <Font size={18} type="Futura" weight="bold">
          {title}
        </Font>
      </Div>
      <Div width="100%" _direction="row" wrap="wrap" justify="space-between">
        {products.map((product, k) => (
          <ProductCard
            key={`product-group-${k}`}
            product={product}
            onPress={() => {}}
            onAddtoCart={() => {}}
            onSave={() => {}}
            style={{
              width: width / 2 - 16 - 8,
              marginHorizontal: 0,
            }}
          />
        ))}
      </Div>
    </Div>
  )
}

export default ProductGroup
