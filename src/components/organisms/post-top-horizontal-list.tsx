import React from 'react'
import { Dimensions } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FlatList, Div } from '@components/atoms/basic'
import PostTopCard from '@components/molecules/post-top-card'
import { PostTopApi } from '@modules/post-top/action'

const { width } = Dimensions.get('window')

class PostTopHorizontalList extends React.Component<any, any> {
  componentDidMount() {
    this.props.PostTopApi({ category_id: this.props.category_id, limit: 10 })
  }

  _renderItem = ({ item, index }) => {
    return <PostTopCard post={item} />
  }

  _keyExtractor = item => item.slug
  render() {
    return (
      <Div _height="165px" _width="100%">
        <FlatList
          horizontal
          keyExtractor={this._keyExtractor}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToAlignment="center"
          snapToInterval={width}
          data={this.props.topPost}
          renderItem={this._renderItem}
        />
      </Div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      PostTopApi,
    },
    dispatch,
  )

const mapStateToProps = (state, ownProps) => ({
  topPost:
    state.topPost.data[ownProps.category_id] &&
    state.topPost.data[ownProps.category_id].map(id => state.post.data[id]),
  loading: state.topPost.loading,
  error: state.topPost.error,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostTopHorizontalList)
