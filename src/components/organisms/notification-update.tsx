import React from 'react'
import { View, Text, Dimensions, SectionList } from 'react-native'
import {
  getNotification,
  clearNotification,
} from '@modules/notification/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import OrderEmptyState from '@src/components/molecules/order-empty-state'
import SocialCard from '@components/molecules/notification-social-card'
import { socialListData } from '@src/hocs/data/social'
import { fontStyle } from '../commont-styles'
import HorizontalList from '@components/organisms/horizontal-list'
import NotificationLoader from '@src/components/atoms/loaders/notification-update'
import { makeSelectedGroupData } from '@src/modules/notification/social-selector'

const { width } = Dimensions.get('screen')

const SocialHoc = socialListData(SocialCard)

class NotificationPage extends React.Component<any, any> {
  limit = 15
  skip = 0
  lastSkip = 0

  componentDidMount() {
    this._freshFetch('announcement')
    this._freshFetch('social')
  }

  componentWillUnmount() {
    this.props.clearNotification()
  }

  _freshFetch = async type => {
    try {
      this._fetchData(0, type, '')
      this.lastSkip = 0
      this.skip = 0
    } catch (err) {
      console.log(err)
    }
  }

  _fetchMore = () => {
    if (!this.props.loading_social) {
      const newSkip = this.skip + 1

      if (newSkip > this.lastSkip) {
        this.skip = newSkip
        this.lastSkip = newSkip
      }

      if (this.props.loading_social) {
        return
      }
      if (this.props.pagination?.next_token !== undefined) {
        this._fetchData(
          this.skip,
          'social',
          this.props.paginationSocial.next_token,
        )
      }
    }
  }

  _fetchData = (skip, type, next_token) => {
    const params = {
      limit: this.limit,
      sort_by: 'date',
      sort_direction: 'desc',
      type,
      next_token,
    }
    this.props.getNotification(params)
  }
  _keyExtractor = (item, index) => '' + item + index

  _sectionHeader = item => {
    return (
      <View
        style={{
          width: width,
          paddingVertical: 8,
          backgroundColor: '#f2f2f2',
          paddingHorizontal: 16,
        }}>
        <Text
          style={{
            ...fontStyle.helveticaThin,
            fontWeight: '300',
            fontSize: 16,
          }}>
          {item.section.title}
        </Text>
      </View>
    )
  }

  _emptyComponent = () => {
    return (
      <OrderEmptyState
        title="You don't have any notifications"
        description=""
      />
    )
  }

  _renderItem = ({ item, index }) => {
    return (
      <SocialHoc
        key={index}
        socialId={item}
        style={{ paddingHorizontal: 16 }}
      />
    )
  }

  render() {
    const {
      announcement,
      loading_announcement,
      loading_social,
      groupData,
    } = this.props

    const firstLoading = loading_announcement && loading_social && !this.skip

    const dataAnnouncement = {
      title: 'Announcement',
      type: 'announcement',
      announcements: announcement,
    }

    return firstLoading ? (
      <NotificationLoader style={{ margin: 16 }} />
    ) : (
      <View
        style={{
          width,
          flex: 1,
          paddingTop: 4,
          // backgroundColor: colors.white,
        }}>
        <HorizontalList
          data={dataAnnouncement}
          navigation={this.props.navigation}
        />
        <View
          style={{
            marginVertical: 16,
            marginBottom: 130,
          }}>
          <Text
            style={{
              ...fontStyle.playfairBold,
              fontWeight: '700',
              fontSize: 24,
              paddingHorizontal: 16,
              marginTop: 16,
            }}>
            Notification
          </Text>
          <View>
            <SectionList
              sections={groupData}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              renderSectionHeader={this._sectionHeader}
              stickyHeaderIndices={[0]}
              onEndReachedThreshold={0.97}
              onEndReached={this._fetchMore}
            />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const getGroupData = makeSelectedGroupData()
  return {
    loading_announcement: state.notifications.loading.announcement,
    loading_social: state.notifications.loading.social,
    announcement: state.notifications.order_announcement,
    groupData: getGroupData(state),
    paginationSocial:
      state.notifications.pagination.social === undefined
        ? ''
        : state.notifications.pagination.social,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getNotification,
      clearNotification,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)
