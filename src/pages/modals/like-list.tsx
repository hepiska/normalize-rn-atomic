import React from 'react'
import { View, Dimensions, Text, StyleSheet, FlatList } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { colors } from '@utils/constants'
import { fontStyle } from '@src/components/commont-styles'
import { getUserLikePost } from '@modules/post-liked/action'
import { userListData } from '@hocs/data/user'
import FollowCard from '@components/molecules/follow-card'
import { TouchableWithoutFeedback } from '@src/components/atoms/basic'
import LikeListLoader from '@components/atoms/loaders/like-list'

const { height, width } = Dimensions.get('screen')
const FollowCardHoc = userListData(FollowCard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    maxHeight: height * 0.7,
    width: width * 0.8,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
})

class LikeListModal extends React.Component<any, any> {
  limit = 10
  skip = 0
  lastskip = 0

  componentDidMount() {
    this._freshFetch()
  }

  _freshFetch = () => {
    this.skip = 0
    this.lastskip = 0
    this._fetchData(this.skip)
  }

  _fetchData = skip => {
    const params: any = {
      limit: this.limit,
      offset: this.limit * skip,
    }
    const {
      route: {
        params: { postId },
      },
      getUserLikePost,
    } = this.props

    getUserLikePost(postId, params)
  }

  closeModal = () => {
    this.props.navigation.goBack()
  }
  _keyExtractor = (item, index) => '' + item + index
  _emptyComponent = () => {
    return <Text>No Like yet</Text>
  }
  _renderItem = ({ item, index }) => {
    const { loading } = this.props

    if (loading && this.skip === 0) {
      return <LikeListLoader style={{ margin: 4 }} />
    }
    return (
      <FollowCardHoc
        userId={item}
        key={`user-like-post-${index}`}
        style={{ width: width * 0.8 }}
        disableDivider
        isGradientButton
      />
    )
  }
  _fetchMore = () => {
    if (!this.props.loading) {
      const newSkip = this.skip + 1
      if (newSkip > this.lastskip) {
        this.skip = newSkip
        this.lastskip = newSkip
      }

      if (this.props.loading) {
        return
      }
      this._fetchData(this.skip)
      // if (30 > this.props.orders.length) {
      //   this._fetchData(this.skip)
      // }
    }
  }

  _renderHeader = () => {
    return (
      <View
        style={{
          borderBottomColor: colors.black50,
          borderBottomWidth: 1,
          backgroundColor: colors.white,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}>
        <Text
          style={{
            ...fontStyle.futuraDemi,
            fontWeight: '500',
            fontSize: 20,
            color: colors.black100,
            padding: 10,
            textAlign: 'center',
          }}>
          Likes
        </Text>
      </View>
    )
  }
  render() {
    const { user } = this.props

    return (
      <TouchableWithoutFeedback onPress={this.closeModal}>
        <View style={styles.container}>
          <View style={styles.content}>
            <FlatList
              keyExtractor={this._keyExtractor}
              stickyHeaderIndices={[0]}
              ListHeaderComponent={this._renderHeader}
              ListEmptyComponent={this._emptyComponent}
              data={user}
              renderItem={this._renderItem}
              onEndReached={this._fetchMore}
              onEndReachedThreshold={0.99}
              scrollIndicatorInsets={{ right: 1 }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserLikePost,
    },
    dispatch,
  )

const mapStateToProps = state => {
  return {
    user: state.user.order,
    loading: state.user.loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeListModal)
