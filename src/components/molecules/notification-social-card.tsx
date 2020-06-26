import React, { memo } from 'react'
import { View, Text, ViewStyle, StyleSheet, Image } from 'react-native'
import { fontStyle } from '../commont-styles'
import { colors, images as defaultImages } from '@src/utils/constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { navigate } from '@src/root-navigation'
import isEqual from 'lodash/isEqual'

interface SocialCardType {
  social: any
  style?: ViewStyle
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    width: 40,
    height: 40,
  },
  underline: {
    textDecorationLine: 'underline',
  },
})

class SocialCard extends React.Component<SocialCardType, any> {
  state = {
    defaultImage: null,
  }

  shouldComponentUpdate(nextProps) {
    const { props } = this
    if (!isEqual(props.social !== nextProps.social)) {
      return true
    }
    return false
  }

  handleActorPress = id => () => {
    navigate('Screens', {
      screen: 'UserDetail',
      params: { userId: id },
    })
  }

  handleActionPress = data => () => {
    navigate('Screens', {
      screen: 'Articles',
      params: {
        postType: data.post_type,
        postSlug: data.post_slug,
        postTitle: data.post_title,
      },
    })
  }

  handleTargetPress = target => () => {}
  render() {
    const {
      social: { action, target, actors, image_url },
      style,
    } = this.props

    /* name */
    let _newName = []
    actors.data.length > 0 &&
      actors.data.map((item, key) => {
        if (key >= 3) return null
        if (key > 0) {
          _newName.push(<Text>{`, `}</Text>)
        }
        _newName.push(
          <Text onPress={this.handleActorPress(item.id)}>{item.name}</Text>,
        )
      })
    if (actors.data.length >= 3) {
      _newName.push(<Text>{` and ${actors.data.length - 3}`}</Text>)
    }
    /* --------- */

    /* action */
    let _newAction = []
    _newAction.push(<Text>{` `}</Text>)
    if (action === 'USER_FOLLOW_CREATE') {
      _newAction.push(<Text>started following you</Text>)
    } else if (action === 'POST_COMMENT_LIKE_CREATE') {
      _newAction.push(<Text>{`replied to your comment "`}</Text>)
      _newAction.push(
        <Text
          style={{ ...styles.underline }}
          onPress={this.handleActionPress(target.data)}>
          {target.data.post_title}
        </Text>,
      )
      _newAction.push(<Text>{`"`}</Text>)
    } else if (action === 'POST_COMMENT_LIKE_CREATE') {
      _newAction.push(<Text>{`liked your comment "`}</Text>)
      _newAction.push(
        <Text
          style={{ ...styles.underline }}
          onPress={this.handleActionPress(target.data)}>
          {target.data.post_title}
        </Text>,
      )
      _newAction.push(<Text>{`"`}</Text>)
    } else if (action === 'POST_COMMENT_MENTION') {
      _newAction.push(<Text>{`mentioned you in a comment "`}</Text>)
      _newAction.push(
        <Text
          style={{ ...styles.underline }}
          onPress={this.handleActionPress(target.data)}>
          {target.data.post_title}
        </Text>,
      )
      _newAction.push(<Text>{`"`}</Text>)
    } else if (action === 'POST_LIKE_CREATE') {
      _newAction.push(<Text>{`liked your post "`}</Text>)
      _newAction.push(
        <Text
          style={{ ...styles.underline }}
          onPress={this.handleActionPress(target.data)}>
          {target.data.post_title}
        </Text>,
      )
      _newAction.push(<Text>{`"`}</Text>)
    } else if (action === 'POST_COMMENT_CREATE') {
      _newAction.push(<Text>{`commented on your post "`}</Text>)
      _newAction.push(
        <Text
          style={{ ...styles.underline }}
          onPress={this.handleActionPress(target.data)}>
          {target.data.comment_content || ''}
        </Text>,
      )
      _newAction.push(<Text>{`"`}</Text>)
    } else if (action === 'POST_COMMENT_CREATE_ON_LIKED_POST') {
      _newAction.push(
        <Text>{`commented on ${target.data.post_author_name}'s post "`}</Text>,
      )
      _newAction.push(
        <Text
          style={{ ...styles.underline }}
          onPress={this.handleActionPress(target.data)}>
          {target.data.comment_content}
        </Text>,
      )
      _newAction.push(<Text>{`"`}</Text>)
    } else if (action === 'POST_COMMENT_CREATE_ON_COMMENTED_POST') {
      _newAction.push(<Text>{`commented on her post "`}</Text>)
      _newAction.push(
        <Text
          style={{ ...styles.underline }}
          onPress={this.handleActionPress(target.data)}>
          {target.data.comment_content}
        </Text>,
      )
      _newAction.push(<Text>{`"`}</Text>)
    } else _newAction.push(<Text>{`belum`}</Text>)

    /* --------- */

    if (!action || !target || !actors) {
      return null
    }
    return (
      <View
        style={{
          marginVertical: 12,
          flexDirection: 'row',
          ...style,
        }}>
        <TouchableOpacity onPress={this.handleActorPress(actors.data[0]?.id)}>
          <Image
            source={
              actors.data[0]?.photo_url
                ? { uri: actors.data[0].photo_url }
                : defaultImages.product
            }
            style={{ ...styles.image, borderRadius: 100 }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
          <Text
            style={{
              ...fontStyle.helvetica,
              fontSize: 12,
              color: colors.black100,
              marginLeft: 8,
            }}>
            <Text style={{ fontWeight: '500' }}>{_newName}</Text>
            {_newAction}
          </Text>
        </View>
        {image_url ? (
          <TouchableOpacity /* onPress={this.handleTargetPress()} */>
            <Image
              source={image_url ? { uri: image_url } : defaultImages.product}
              style={styles.image}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    )
  }
}

export default SocialCard
