import React from 'react'
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import {
  changesRightSideBar,
  changeRightSideBarSection,
} from '@modules/ui-interaction/action'
import { useDispatch } from 'react-redux'
import UserDetail from '@components/atoms/loaders/user-detail'
import FilterList from '@components/atoms/loaders/coupon'
import PostCardFulll from '@components/atoms/loaders/post-card'
import PostDetail from '@components/atoms/loaders/post-detail'
import SearchListLoader from '@src/components/atoms/loaders/search-list'
import ConnectionsLoader from '@src/components/atoms/loaders/connection'
import ContentExpandable from '@components/molecules/content-expandable'
import RefStatus from '@src/components/atoms/loaders/earning-page'
import PostContent from '@components/molecules/post-content'
import HorizontalImageLoader from '@src/components/atoms/loaders/horizontal-image'
import ProfileWritten from '@src/components/molecules/profile-written'
import RelatedPostCard from '@src/components/molecules/related-post-card'
import Tags from '@src/components/molecules/tags-pill'
import EditorPicks from '@src/components/molecules/editor-picks'
import RelatedPost from '@src/components/molecules/related-post'
import PostComment from '@src/components/molecules/post-comment'
import ListJournal from '@src/components/molecules/horizontal-article-list'
import { navigate } from '@src/root-navigation'

const TestPage = props => {
  const [image, setImage] = React.useState(null)
  const toolTipsParent = React.useRef(null)
  const toolTipsTarget = React.useRef(null)

  const renimage = image || { uri: '' }
  const dispatch = useDispatch()
  const data = [
    { title: 'beauty' },
    { title: 'mantapbetul' },
    { title: 'masalahrambut' },
  ]
  // const data = [
  //   {
  //     title:
  //       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam odit laudantium fugit mollitia praesentium.',
  //   },
  //   {
  //     title:
  //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ab sapiente voluptatem fugiat ea tenetur.',
  //   },
  //   {
  //     title:
  //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum rem iste quasi nihil eius eos modi at et.',
  //   },
  //   {
  //     title:
  //       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque nisi quam quis. Lorem, ipsum.',
  //   },
  // ]
  const _trigger = () => {
    navigate('modals', { screen: 'FirstIntroduceRegister' })
  }

  return (
    <ScrollView style={{ flex: 1, marginTop: 62 }} ref={toolTipsParent}>
      <TouchableOpacity onPress={_trigger}>
        <Text>skajkdjfa</Text>
      </TouchableOpacity>
      {/* <FilterList /> */}
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
    </ScrollView>
  )
}

export default TestPage
