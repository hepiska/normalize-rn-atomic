import React, { Component } from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { fontStyle } from '../commont-styles'
import { colors } from '@src/utils/constants'
import { textElipsis as limitText } from '@utils/helpers'

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
    backgroundColor: 'red',
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

export default class PostCard extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.thumbWrap}>
          <ImageBackground
            style={{ width: 130, height: 180 }}
            resizeMode="cover"
            source={require('@src/assets/placeholder/placeholder2.jpg')}
            // source={
            //   typeof img === 'string'
            //     ? {
            //         uri: changeImageUri(img, {
            //           width: width * 2,
            //         }),
            //       }
            //     : require('@src/assets/placeholder/bumper.png')
            // }
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
                source={require('@src/assets/placeholder/placeholder2.jpg')}
                // source={
                //   typeof img === 'string'
                //     ? {
                //         uri: changeImageUri(img, {
                //           width: width * 2,
                //         }),
                //       }
                //     : require('@src/assets/placeholder/bumper.png')
                // }
              />
            </View>
            <Text style={{ ...fontStyle.helveticaBold, fontSize: 16 }}>
              The Shonet
            </Text>
          </View>
          <Text style={{ ...fontStyle.helvetica, fontSize: 16 }}>
            {limitText(
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem nulla minus non nesciunt culpa accusantium libero officiis necessitatibus perferendis labore asperiores commodi earum natus ab reprehenderit, sequi debitis placeat explicabo magnam, similique voluptatem. Saepe quos iste nisi, veritatis beatae atque in autem ea mollitia laudantium commodi iure repudiandae numquam debitis eum magni fugit odio tenetur delectus laborum. Architecto adipisci nihil cumque corporis debitis earum unde tempora, harum possimus iusto dicta expedita animi veritatis sunt, deleniti soluta alias? Magni expedita commodi voluptatum. Qui aliquam quos iusto deleniti, dolore doloribus tempora?',
              80,
            )}
          </Text>
          <Text style={{ paddingVertical: 16, color: colors.black70 }}>
            3 days ago
          </Text>
        </View>
      </View>
    )
  }
}
