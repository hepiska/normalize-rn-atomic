import React from 'react'
import { FlatList } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { collectionApi } from '@modules/collection/action'
import { collectionListData } from '@hocs/data/collection'
import InviniteLoader from '@components/atoms/loaders/invinite'
import { Div, Font, PressAbbleDiv } from '@components/atoms/basic'

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
    return (
      <Div>
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
