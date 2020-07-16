import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import UserDetail from '@components/atoms/loaders/user-detail'
import FilterList from '@components/atoms/loaders/coupon'
import PostCardFulll from '@components/atoms/loaders/post-card'
import PostDetail from '@components/atoms/loaders/post-detail'
import SearchListLoader from '@src/components/atoms/loaders/search-list'
import ConnectionsLoader from '@src/components/atoms/loaders/connection'
import ContentExpandable from '@components/molecules/content-expandable'

const TestPage = props => {
  const [image, setImage] = React.useState(null)
  const toolTipsParent = React.useRef(null)
  const toolTipsTarget = React.useRef(null)

  const renimage = image || { uri: '' }

  return (
    <View style={{ flex: 1, marginTop: 62 }} ref={toolTipsParent}>
      <FilterList />
      {/* <CircleLoader r={50} /> */}
      {/* <ConnectionsLoader /> */}
      {/* <HorizontalImageLoader /> */}
      {/* <View ref={toolTipsTarget}>
        <Text>sas</Text>
      </View>
      <Text>asasssasasasss</Text>
      <FullImageLoader style={{ height: 140 }} />
      <PillsLoader style={{ marginVertical: 16 }} />
      <TitleLoader />
      <ProductCardLoader style={{ marginHorizontal: 16 }} /> */}
      {/* <ProductDetailLoader imageHeight={200} /> */}
      {/* <ScrollView>
        // <ProductDetailLoader />
      </ScrollView> */}
    </View>
  )
}

export default TestPage
