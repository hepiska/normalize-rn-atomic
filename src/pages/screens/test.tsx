import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import PostInsight from '@components/molecules/post-insight'
import TwoColumnListLoader from '@components/atoms/loaders/two-column-card'
import { images } from '@utils/constants'
import ProductLisyHeader from '@components/atoms/loaders/product-list-header'
import SearchAndFilterLoader from '@components/atoms/loaders/search-filter-loader'
import ShopLoader from '@components/atoms/loaders/shop'
import ProductDetailLoader from '@components/atoms/loaders/product-detail'
import ProductListLoadereLoader from '@components/atoms/loaders/product-list'

const TestPage = props => {
  const [image, setImage] = React.useState(null)
  const toolTipsParent = React.useRef(null)
  const toolTipsTarget = React.useRef(null)

  const renimage = image || { uri: '' }

  return (
    <View style={{ flex: 1 }} ref={toolTipsParent}>
      <View ref={toolTipsTarget}>
        <Text>sas</Text>
      </View>
      <TouchableOpacity onPress={() => {}} />
      <ProductListLoadereLoader />
      {/* <ShopLoader /> */}
      {/* <ScrollView>
        // <ProductDetailLoader />
      </ScrollView> */}
    </View>
  )
}

export default TestPage
