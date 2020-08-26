import React, { Component } from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { fontStyle } from '../commont-styles'
import { colors } from '@src/utils/constants'
import {
  textElipsis as limitText,
  setImage,
  countlongCreate,
} from '@utils/helpers'

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'rgb(188, 188, 188)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
    // overflow: 'hidden',
  },
  thumbWrap: {
    width: 130,
    height: 180,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: 'hidden',
  },
  profileWrap: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: colors.black100,
    marginRight: 8,
    overflow: 'hidden',
  },
})

export default class PostCard extends Component<any, any> {
  render() {
    const { post, user } = this.props
    return (
      <View style={styles.wrapper}>
        <View style={styles.thumbWrap}>
          <ImageBackground
            style={{ width: 130, height: 180 }}
            resizeMode="cover"
            // source={require('@src/assets/placeholder/placeholder2.jpg')}
            source={
              typeof post.image_url === 'string'
                ? {
                    uri: setImage(post.image_url, {
                      width: 130 * 2,
                    }),
                  }
                : require('@src/assets/placeholder/placeholder2.jpg')
            }
          />
        </View>
        <View style={{ padding: 16, flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 8,
              alignItems: 'center',
            }}>
            <View style={styles.profileWrap}>
              <ImageBackground
                style={{ width: 30, height: 30 }}
                resizeMode="cover"
                source={
                  typeof user.image_url === 'string'
                    ? {
                        uri: setImage(user.image_url, {
                          width: 40 * 2,
                        }),
                      }
                    : require('@src/assets/placeholder/placeholder2.jpg')
                }
              />
            </View>
            <Text style={{ ...fontStyle.helveticaBold, fontSize: 16 }}>
              {user.name}
            </Text>
          </View>
          <Text style={{ ...fontStyle.helvetica, fontSize: 16 }}>
            {limitText(post.title, 80)}
          </Text>
          <Text style={{ paddingVertical: 16, color: colors.black70 }}>
            {countlongCreate(post.published_at)}
          </Text>
        </View>
      </View>
    )
  }
}
