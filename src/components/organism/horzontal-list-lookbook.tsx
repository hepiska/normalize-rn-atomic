import React from 'react'
import { Dimensions } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PressAbbleDiv, Image, Text, FlatList } from '@components/atoms/basic'
import ListItemLookBook from '@components/molecules/list-item-lookbook'
import { fetchLookbook } from '@modules/lookbook/action'


const { width } = Dimensions.get('window')


const dummyData = [{
  slug: 'sddasdasad',
  title: 'The Shonet Monthly Issue - January 2020',
  image_url: "https://theshonet.imgix.net/lookbook/man-january-2020/theshonet-lookbook-man-january-2020-1.jpg"
},
{
  slug: 'sddasdasad',
  title: 'The Shonet Monthly Issue - January 2020',
  image_url: "https://theshonet.imgix.net/lookbook/man-january-2020/theshonet-lookbook-man-january-2020-1.jpg"
},
{
  slug: 'sddasdasad',
  title: 'The Shonet Monthly Issue - January 2020',
  image_url: "https://theshonet.imgix.net/lookbook/man-january-2020/theshonet-lookbook-man-january-2020-1.jpg"
},
{
  slug: 'sddasdasad',
  title: 'The Shonet Monthly Issue - January 2020',
  image_url: "https://theshonet.imgix.net/lookbook/man-january-2020/theshonet-lookbook-man-january-2020-1.jpg"
}]


class HorizontalListLookBook extends React.Component<any, any>{
  componentDidMount() {
    // console.log('=========', this.props)
    this.props.fetchLookbook({ offset: 0, limit: 30, sort: -1 })
  }

  _renderItem = ({ item, index }) => {
    return (
      <ListItemLookBook
        id={item.slug}
        slug={item.slug}
        title={item.index}
        imageUri={{ uri: item.image_url }}
      />
    )
  }

  _keyExtractor = (item) => item.slug
  render() {
    console.log("lookbooks", this.props.lookbooks)
    return (
      <FlatList
        horizontal
        keyExtractor={this._keyExtractor}
        showsHorizontalScrollIndicator={false}
        decelerationRate='fast'
        snapToAlignment='center'
        snapToInterval={width * 0.33 + 4}
        data={
          this.props.lookbooks
        }
        renderItem={this._renderItem}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchLookbook,
    },
    dispatch,
  )


const mapStateToProps = state => ({
  lookbooks: state.lookbooks.order.map(id => state.lookbooks.data[id]),
  loading: state.lookbooks.loading,
  error: state.lookbooks.error
})
export default connect(mapStateToProps, mapDispatchToProps)(HorizontalListLookBook)