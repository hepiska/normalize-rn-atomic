import React from 'react'
import { FlatList } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { collectionApi } from '@modules/collection/action'
import { collectionListData } from '@hocs/data/collection'
import InviniteLoader from '@components/atoms/loaders/invinite'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'
import Jumbotron from '@components/organisms/jumbotron'

const CollectionItem = ({ collection, onPress }) => {
  const { id, title } = collection
  return (
    <PressAbbleDiv padd="8px 16px" onPress={onPress}>
      <Font>
        {id} {title}
      </Font>
    </PressAbbleDiv>
  )
}

const Collection = collectionListData(CollectionItem)

class ShopPage extends React.Component<any, any> {
  componentDidMount() {
    this.props.collectionApi()
  }
  render() {
    const { navigation } = this.props
    const dummyPost = {
      "id": 82,
      "type": "image",
      "component": "jumbotron",
      "title": "",
      "subtitle": "",
      "link": "",
      "link_text": "",
      "image_urls": null,
      "order": 1,
      "images": [
          {
              "id": 27,
              "image_url": "https://ecs7.tokopedia.net/img/banner/2020/3/20/85531617/85531617_2d947b4e-eb8a-40c1-ba26-ccf06058bac9.jpg",
              "target_url": "/collections/rafie-botaks"
          },
          {
              "id": 28,
              "image_url": "https://ecs7.tokopedia.net/img/banner/2020/3/20/85531617/85531617_a2ac7b8f-c63e-4739-ae7b-dbb77f4a7338.jpg",
              "target_url": "/collections/rafie-botak"
          },
      ]
    }
      
    return (
      <Div padd="50px 0px">
        <Jumbotron
          data={dummyPost.images}
          navigation={navigation}
          navigateTarget='ProductList'
        />
        <PressAbbleDiv
          onPress={() =>
            navigation.push('ProductList', {
              collectionId: 4,
            })
          }>
          <Font>shop Page</Font>
        </PressAbbleDiv>
        <InviniteLoader />
        <FlatList
          data={this.props.collections}
          renderItem={({ item }) => (
            <Collection
              collectionId={item}
              onPress={() =>
                navigation.push('ProductList', {
                  collectionId: item,
                })
              }
            />
          )}
        />
      </Div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      collectionApi,
    },
    dispatch,
  )

const mapStateToProps = state => ({
  collections: state.collection.order,
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)
