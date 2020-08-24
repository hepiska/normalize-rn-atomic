import React, { Component } from 'react'
import { Text, View, ImageBackground, ImageBackgroundBase } from 'react-native'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import { PressAbbleDiv } from '../atoms/basic'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AvatarImage from '../atoms/avatar-image'
import { calculateDay } from '@src/utils/helpers'

interface ProfileType {
  small?: boolean
  data?: ReadonlyArray<any>
}
export default class ProfileWritten extends Component<ProfileType, any> {
  render() {
    const { small, data } = this.props

    const ActionButton = isFollowed => {
      return (
        <PressAbbleDiv
          padd="6px 12px"
          _direction="row"
          radius="8px"
          style={{ backgroundColor: '#e0b97c' }}
          onPress={null}>
          <Text
            style={{
              color: colors.white,
              ...fontStyle.helveticaBold,
              letterSpacing: 0.5,
              fontSize: 12,
            }}>
            {isFollowed ? 'FOLLOWING' : 'FOLLOW'}
          </Text>
        </PressAbbleDiv>
      )
    }

    const CardNormal = ({ data }) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            borderTopColor: colors.black50,
            borderBottomColor: colors.black50,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingVertical: 24,
          }}>
          <AvatarImage
            size={100}
            imgUrl={data.photo_url}
            style={{ marginRight: 16 }}
          />
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text
              style={{
                ...fontStyle.helvetica,
                letterSpacing: 2,
                fontSize: 14,
                color: colors.black80,
              }}>
              WRITTEN BY
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  paddingVertical: 4,
                  borderBottomColor: colors.black50,
                  borderBottomWidth: 1,
                  marginRight: 4,
                }}>
                <Text
                  style={{
                    ...fontStyle.helveticaBold,
                    fontSize: 20,
                  }}>
                  {data?.username}
                </Text>
              </View>
              <Icon name="check-circle" size={18} color={'#e0b97c'} />
            </View>
            <Text
              style={{
                paddingVertical: 16,
                ...fontStyle.helveticaThin,
                fontWeight: '300',
                fontSize: 14,
                color: colors.black80,
              }}>
              {data?.biography}
            </Text>
            <ActionButton />
          </View>
        </View>
      )
    }

    const CardSmall = ({ data }) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 16,
          }}>
          <AvatarImage
            size={60}
            imgUrl={data.photo_url}
            style={{ marginRight: 16 }}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text>By</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 4,
                  }}>
                  <View
                    style={{
                      paddingVertical: 4,
                      borderBottomColor: colors.black50,
                      borderBottomWidth: 1,
                      marginRight: 4,
                    }}>
                    <Text
                      style={{
                        ...fontStyle.helveticaBold,
                        fontSize: 14,
                      }}>
                      {data?.username}
                    </Text>
                  </View>
                  <Icon name="check-circle" size={14} color={'#e0b97c'} />
                </View>
              </View>
              <Text
                style={{
                  color: colors.black80,
                  fontSize: 12,
                  ...fontStyle.helveticaThin,
                }}>
                {calculateDay(data.createdAt)}
              </Text>
            </View>
            <ActionButton isFollowed={data?.isFollowed} />
          </View>
        </View>
      )
    }

    if (small) {
      return <CardSmall data={data} />
    }
    return <CardNormal data={data} />
  }
}
