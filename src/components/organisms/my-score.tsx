import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { colors } from '@src/utils/constants'
import FocusContainer from '@src/components/molecules/focus-container'
import { fontStyle } from '../commont-styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import TitleDescriptionCard from '@src/components/molecules/title-description-card'
import dayjs from 'dayjs'

interface MyScoreType {
  style?: ViewStyle
  insights?: any
}

class MyScore extends React.Component<MyScoreType, any> {
  renderSummary = value => {
    let title = ''
    let val = ''
    if (value === 'post_view') {
      title = 'Total Post Views'
      val = this.props.insights.statistics[value]
    } else if (value === 'post_comment') {
      title = 'Total Comments'
      val = this.props.insights.statistics[value]
    } else if (value === 'follower') {
      title = 'Total Followers'
      val = this.props.insights.statistics[value]
    } else if (value === 'post_like') {
      title = 'Total Likes'
      val = this.props.insights.statistics[value]
    } else if (value === 'post_bookmark') {
      title = 'Total Bookmarks'
      val = this.props.insights.statistics[value]
    } else {
      title = null
      val = null
    }

    return (
      title !== null &&
      val !== null && (
        <View
          key={`score-breakdown-${value}`}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
          }}>
          <Text style={{ ...fontStyle.helvetica, fontSize: 14 }}>{title}</Text>
          <Text
            style={{
              ...fontStyle.helveticaBold,
              fontWeight: '500',
              fontSize: 14,
              color: '#8131E2',
            }}>
            {val}
          </Text>
        </View>
      )
    )
  }
  render() {
    const { insights } = this.props

    if (!insights.statistics) {
      return null
    }
    return (
      <View>
        {/* score */}
        <FocusContainer style={{ padding: 16, marginTop: 8, marginBottom: 32 }}>
          <Text style={{ ...fontStyle.helveticaBold, color: '#3067E4' }}>
            0
          </Text>
        </FocusContainer>

        {/* score breakdown */}
        <TitleDescriptionCard
          title="Score Breakdown"
          description={
            <View style={{ marginVertical: 16 }}>
              <Text
                style={{
                  ...fontStyle.helvetica,
                  fontSize: 12,
                  color: colors.black70,
                }}>
                {`Score is calculated since ${dayjs(insights.date.start).format(
                  'DD MMM YYYY',
                )}`}
              </Text>
              {Object.keys(insights.statistics).map(value =>
                this.renderSummary(value),
              )}
            </View>
          }
        />

        {/* the shonet tips */}
        <FocusContainer
          style={{
            padding: 6,
            borderRadius: 100,
            borderWidth: 0,
            backgroundColor: 'rgba(26, 26, 26, 0.05)',
            alignSelf: 'flex-start',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="verified-user" size={14} color={colors.black100} />
            <Text
              style={{
                marginLeft: 4,
                ...fontStyle.helveticaBold,
                fontWeight: '500',
                fontSize: 14,
              }}>
              The Shonet Tips
            </Text>
          </View>
        </FocusContainer>
        <View style={{ marginTop: 8 }}>
          <Text style={{ ...fontStyle.helvetica, fontSize: 12 }}>
            Incrase your score so you can become an insider and enjoy attractive
            benefits!!
          </Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  insights: state.insights.data,
})
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyScore)
