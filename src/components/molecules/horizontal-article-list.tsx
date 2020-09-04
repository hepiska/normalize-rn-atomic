import React, { Component, memo } from 'react'
import {
  Text,
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchLatestPost } from '@modules/post-feed/action'
import { fontStyle } from '../commont-styles'
import { colors } from '@src/utils/constants'
import PostCardJournal from './post-card-journal'
import { postListData } from '@src/hocs/data/post'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
  imgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 280,
    zIndex: 2,
  },
  card: {
    marginBottom: 32,
    overflow: 'hidden',
    borderBottomColor: colors.black50,
    borderBottomWidth: 1,
    width: 280,
    borderRadius: 8,
    paddingBottom: 16,
  },
})

const Card = postListData(PostCardJournal)

class ListPost extends React.Component<any, any> {
  state = {
    loading: true,
    posts: [],
  }
  _keyExtractor = (item, index) => {
    return `key-post-journal-${index}`
  }

  componentDidMount() {
    const { categoryId, typePost } = this.props
    this.props.fetchLatestPost(
      { category_id: categoryId, type: typePost },
      res => {
        if (!res.loading) {
          this.setState({
            posts: res.data.result,
            loading: res.loading,
          })
        }
      },
    )
  }

  _renderItem = ({ item, index }) => {
    return (
      <Card
        style={styles.card}
        key={`horizontal-list-post-${index}`}
        postId={item}
        isCard
      />
    )
  }

  _emptyItem = () => {
    return <Text style={{ color: 'white' }}>Loading</Text>
  }

  _separator = () => {
    return <View style={{ width: 16 }} />
  }

  render() {
    const { title, styles, onPress } = this.props
    const { posts } = this.state

    return (
      <View
        style={{
          ...styles,
          alignItems: 'center',
          paddingVertical: 32,
          backgroundColor: colors.black100,
        }}>
        <Text
          style={{
            ...fontStyle.playfair,
            fontWeight: '600',
            color: colors.white,
            fontSize: 24,
            marginBottom: 24,
          }}>
          {' '}
          {title}{' '}
        </Text>

        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          ItemSeparatorComponent={this._separator}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          keyExtractor={this._keyExtractor}
          data={posts}
          renderItem={this._renderItem}
          ListEmptyComponent={this._emptyItem}
        />

        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{ color: colors.white, textDecorationLine: 'underline' }}>
            See All Editorial{' '}
          </Text>
          <Icon name={'arrow-right'} color={colors.white} size={14} />
        </TouchableOpacity>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchLatestPost }, dispatch)

export default connect(null, mapDispatchToProps)(ListPost)
