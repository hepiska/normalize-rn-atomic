import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { colors } from '@src/utils/constants'
import FocusContainer from '@src/components/molecules/focus-container'
import { fontStyle } from '../commont-styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CommingSoonPlaceholder from '@src/components/molecules/comming-soon'
import TitleDescriptionCard from '@src/components/molecules/title-description-card'
import dayjs from 'dayjs'

interface MyAudienceType {
  style?: ViewStyle
  user: any
  insights?: any
}

const styles = StyleSheet.create({
  followerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  followerCount: {
    ...fontStyle.helveticaBold,
    fontSize: 24,
    color: '#8131E2',
  },
  followerDesc: {
    ...fontStyle.helveticaBold,
    fontWeight: '500',
    fontSize: 14,
    color: colors.black100,
    marginLeft: 6,
    marginBottom: 2,
  },
  followerIncDec: {
    ...fontStyle.helvetica,
    fontSize: 12,
    color: colors.black70,
  },
})

const MyAudience = (props: MyAudienceType) => {
  const { insights, user } = props

  if (!insights && !user) {
    return null
  }
  return (
    <View>
      <FocusContainer style={{ padding: 16 }}>
        <>
          <View
            style={{
              ...styles.followerContainer,
            }}>
            <Text
              style={{
                ...styles.followerCount,
              }}>
              {user.follower_count || 0}
            </Text>
            <Text
              style={{
                ...styles.followerDesc,
              }}>
              Followers
            </Text>
          </View>
          <View
            style={{
              marginTop: 8,
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...styles.followerIncDec,
              }}>
              {insights.statistics ? `+ ${insights.statistics.follower}` : '0'}

              {insights.date
                ? ` vs. ${dayjs(insights.date.start).format(
                    'DD MMM',
                  )} - ${dayjs(insights.date.end)
                    .subtract(1, 'day')
                    .format('DD MMM')}`
                : ''}
            </Text>
          </View>
        </>
      </FocusContainer>
      <TitleDescriptionCard
        title="Growth"
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
        title="Age Range"
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
        title="Gender"
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
        title="Top Location"
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
        title="Online Time"
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

export default connect(mapStateToProps, null)(MyAudience)
