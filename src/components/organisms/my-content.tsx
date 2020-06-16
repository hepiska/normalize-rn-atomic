import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, ViewStyle, Dimensions } from 'react-native'
import { colors } from '@src/utils/constants'
import { connect } from 'react-redux'
import FocusContainer from '@src/components/molecules/focus-container'
import { fontStyle } from '../commont-styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CommingSoonPlaceholder from '@src/components/molecules/comming-soon'
import TitleDescriptionCard from '@src/components/molecules/title-description-card'
import dayjs from 'dayjs'
import { postListData } from '@hocs/data/post'
import PostCard from '@components/molecules/post-card'

const { width } = Dimensions.get('window')
const PostHoc = postListData(PostCard)

interface MyContentType {
  style?: ViewStyle
  insights?: any
}

const dummy = [
  {
    title: 'Journal+',
    value: 12,
  },
  {
    title: 'Collection',
    value: 5,
  },
]

const MyContent = (props: MyContentType) => {
  const { insights } = props

  if (!insights) {
    return null
  }
  return (
    <View>
      <FocusContainer style={{ padding: 16, marginTop: 8, marginBottom: 32 }}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text
              style={{
                ...fontStyle.helvetica,
                fontSize: 12,
                color: colors.black70,
              }}>
              Your Post from
              {insights.date
                ? ` ${dayjs(insights.date.start).format('DD MMM')} - ${dayjs(
                    insights.date.end,
                  )
                    .subtract(1, 'day')
                    .format('DD MMM')}`
                : ''}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 8,
            }}>
            {dummy.map((value, key) => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                key={`content-${key}`}>
                <Text
                  style={{
                    ...fontStyle.helveticaBold,
                    fontWeight: '500',
                    fontSize: 18,
                    color: '#8131E2',
                  }}>
                  {value.value}
                </Text>
                <Text
                  style={{
                    ...fontStyle.helvetica,
                    fontSize: 14,
                  }}>
                  {value.title}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </FocusContainer>
      <TitleDescriptionCard
        title="Best post in this week"
        description={
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}>
            {insights?.statistics?.top_posts?.map((val, key) => (
              <PostHoc
                key={`best-post-${val}`}
                postId={val}
                idx={key}
                style={{
                  wrappermargin: 8,
                  paddingHorizontal: 0,
                  width: width / 2 - 16,
                }}
              />
            ))}
          </View>
        }
        style={{ marginTop: 32 }}
      />
      <TitleDescriptionCard
        title="Discovery"
        titleAction={
          <View style={{ marginLeft: 8 }}>
            <Icon name="info" size={16} color={colors.black100} />
          </View>
        }
        description={
          // notes: diubah
          <CommingSoonPlaceholder />
        }
        style={{ marginTop: 40 }}
      />
      <TitleDescriptionCard
        title="Interaction"
        titleAction={
          <View style={{ marginLeft: 8 }}>
            <Icon name="info" size={16} color={colors.black100} />
          </View>
        }
        description={
          // notes: diubah
          <CommingSoonPlaceholder />
        }
        style={{ marginTop: 40 }}
      />
    </View>
  )
}

const mapStateToProps = state => ({
  insights: state.insights.data,
})

export default connect(mapStateToProps, null)(MyContent)
