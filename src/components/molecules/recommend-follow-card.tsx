import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ViewStyle,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AvatarImage from '../atoms/avatar-image'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import { textElipsis as textLimit } from '@utils/helpers'
import { Button } from '../atoms/button'
import HTML from 'react-native-render-html'

interface RecommendFollowType {
  style?: ViewStyle
  horizontal?: boolean
  user?: any
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.black100,
    width: 120,
  },
  btnTxt: {
    ...fontStyle.helveticaBold,
    color: colors.white,
    marginLeft: 0,
  },
})

export default class FollowCard extends Component<RecommendFollowType, any> {
  render() {
    const data = [
      { color: colors.red1 },
      { color: colors.gold100 },
      { color: colors.gray2 },
    ]
    const { style, horizontal, user } = this.props

    const userCollections = user.post_collections

    const maxDesc = horizontal ? 80 : 100
    return (
      <View
        style={{
          ...style,
          padding: 16,
          borderRadius: 6,
          borderColor: colors.black50,
          borderWidth: 1,
          alignItems: 'center',
          // width: '100%', //300 for horizontal list
          width: horizontal ? 300 : '100%', //300 for horizontal list
        }}>
        <AvatarImage
          imgUrl={user.photo_url}
          size={72}
          style={{ marginBottom: 16 }}
        />
        <TouchableOpacity
          onPress={null}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 8,
          }}>
          <Text
            style={{
              ...fontStyle.helveticaBold,
              fontSize: 18,
              color: colors.black100,
            }}>
            {user.name}
          </Text>
          <Icon
            style={{
              marginLeft: 4,
              borderRadius: 7,
              overflow: 'hidden',
              backgroundColor: colors.gold50,
            }}
            name={'check-circle'}
            size={14}
            color={colors.black100}
          />
        </TouchableOpacity>
        {/* <Text
          style={{
            textAlign: 'center',
            color: colors.black60,
            marginBottom: 32,
          }}> */}
        <HTML
          html={`<bio>${user.biography} || LOL</bio>`}
          renderers={{
            // eslint-disable-next-line react/display-name
            bio: (htmlAttribs, children, convertedCSSStyles, passProps) => {
              // console.log('pass props', passProps?.rawChildren[0].children)
              return (
                <Text
                  key={`user-biography-${htmlAttribs}`}
                  style={{
                    textAlign: 'center',
                    color: colors.black60,
                    marginBottom: 32,
                  }}>
                  {/* {passProps?.rawChildren[0].children
                    ? textLimit(
                        passProps?.rawChildren[0]?.children[0]?.data,
                        maxDesc,
                      )
                    : ''} */}
                  {passProps?.rawChildren[0].children
                    ? textLimit(
                        passProps?.rawChildren[0]?.children[0]?.data || '',
                        maxDesc,
                      )
                    : ''}
                  {/* {passProps?.rawChildren[0]} */}
                </Text>
              )
            },
          }}
        />
        {/* {textLimit(
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad,dignissimos! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, impedit?',
            maxDesc,
          )} */}
        {/* </Text> */}
        <View
          style={{
            height: 80, // 80 for horizontal list
            marginBottom: 32,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {userCollections &&
            userCollections.map((coll, idx) => {
              return (
                <View
                  key={'thumb' + idx}
                  style={{
                    width: '31%',
                  }}>
                  <ImageBackground
                    style={{
                      width: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      height: '100%',
                    }}
                    resizeMode={'cover'}
                    source={{
                      uri: coll.image_url,
                    }}
                  />
                </View>
              )
            })}
          {/* {data.map((res, idx) => {
            return (
              <View
                key={'thumb' + idx}
                style={{
                  width: '31%',
                }}>
                <ImageBackground
                  style={{
                    width: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: '100%',
                  }}
                  resizeMode={'cover'}
                  source={require('@assets/placeholder/placeholder2.jpg')}
                />
              </View>
            )
          })} */}
        </View>
        <Button
          title={'Follow'}
          onPress={null}
          loaderColor={colors.white}
          style={styles.btn}
          fontStyle={styles.btnTxt}
        />
      </View>
    )
  }
}
