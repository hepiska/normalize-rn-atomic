import React from 'react'
import {
  View,
  FlatList,
  InteractionManager,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  SectionList,
} from 'react-native'
import {
  getNotification,
  clearNotification,
} from '@modules/notification/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import OrderEmptyState from '@src/components/molecules/order-empty-state'
import { colors } from '@utils/constants'
import { fontStyle } from '../commont-styles'
import { commerceListData } from '@hocs/data/commerce'
import CommerceCard from '@components/molecules/commerce-card'
import { navigate } from '@src/root-navigation'
import NotificationTransactionLoader from '../atoms/loaders/notification-transaction'
import { makeSelectedGroupData } from '@src/modules/notification/commerce-selector'

const { width } = Dimensions.get('screen')

const EcommerceHoc = commerceListData(CommerceCard)

const myOrder = [
  {
    label: 'Waiting for Payment',
    image: require('@src/assets/icons/waiting-for-payment.png'),
    filterTransaction: ['unpaid', 'waiting'],
    screenName: 'PaymentList',
  },
  {
    label: 'In Process',
    image: require('@src/assets/icons/in-process.png'),
    filterTransaction: 'confirmed',
    screenName: 'OrderList',
  },
  {
    label: 'Sent',
    image: require('@src/assets/icons/sent.png'),
    filterTransaction: 'shipping',
    screenName: 'OrderList',
  },
  {
    label: 'Done',
    image: require('@src/assets/icons/done.png'),
    filterTransaction: 'completed',
    screenName: 'OrderList',
  },
]
const navigateTo = (screen, screenName, params = {}) => {
  return navigate(screen, {
    screen: screenName,
    params,
  })
}

class NotificationPage extends React.Component<any, any> {
  limit = 15
  skip = 0
  lastSkip = 0
  type = 'ecommerce'

  componentDidMount() {
    this._freshFetch()
  }

  componentWillUnmount() {
    this.props.clearNotification()
  }

  onPressStatusOrder = (filter, screenName) => () => {
    navigateTo('Screens', screenName, {
      selectedFilter: filter,
      hideHeader: true,
    })
  }

  _freshFetch = () => {
    try {
      this._fetchData(0, '')
      this.lastSkip = 0
      this.skip = 0
    } catch (err) {
      console.log(err)
    }
  }

  _fetchMore = () => {
    if (!this.props.loading_ecommerce) {
      const newSkip = this.skip + 1

      if (newSkip > this.lastSkip) {
        this.skip = newSkip
        this.lastSkip = newSkip
      }

      if (this.props.loading_ecommerce) {
        return
      }
      if (this.props.pagination?.next_token !== undefined) {
        this._fetchData(this.skip, this.props.pagination.next_token)
      }
    }
  }

  _fetchData = (skip, next_token) => {
    const params = {
      limit: this.limit,
      sort_by: 'date',
      sort_direction: 'desc',
      type: this.type,
      next_token,
    }
    this.props.getNotification(params)
  }
  _keyExtractor = (item, index) => '' + item + index

  _emptyComponent = () => {
    return (
      <OrderEmptyState
        title="You don't have any notifications"
        description=""
      />
    )
  }

  _renderItem = ({ item, index }) => {
    const { navigation } = this.props
    return (
      <EcommerceHoc
        navigation={navigation}
        key={index}
        commerceId={item}
        style={{
          marginVertical: 8,
          marginHorizontal: 12,
          paddingVertical: 8,
          paddingHorizontal: 8,
        }}
      />
    )
  }

  _sectionHeader = item => {
    return (
      <View
        style={{
          width: width,
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: 'white',
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

  _renderHeader = () => {
    return (
      <View
        style={{
          marginHorizontal: 8,
          borderBottomColor: colors.black50,
          borderBottomWidth: 1,
        }}>
        <View
          style={{
            marginVertical: 17,
            justifyContent: 'space-around',
            flexDirection: 'row',
            width: '100%',
          }}>
          {myOrder.map((value, key) => {
            return (
              <TouchableOpacity
                key={`myorder-${key}`}
                onPress={this.onPressStatusOrder(
                  value.filterTransaction,
                  value.screenName,
                )}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: 82,
                  }}>
                  <View
                    style={{
                      marginBottom: 8,
                    }}>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={value.image}
                    />
                  </View>
                  <Text
                    style={{
                      ...fontStyle.helvetica,
                      fontSize: 10,
                      color: colors.black100,
                      textAlign: 'center',
                    }}>
                    {value.label}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }

  render() {
    const { loading_ecommerce, groupData } = this.props

    const firstLoading = loading_ecommerce && !this.skip
    return firstLoading ? (
      <NotificationTransactionLoader />
    ) : (
      <View
        style={{
          width,
          flex: 1,
          backgroundColor: colors.white,
        }}>
        <SectionList
          sections={groupData}
          stickySectionHeadersEnabled
          ListHeaderComponent={this._renderHeader}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          renderSectionHeader={this._sectionHeader}
          stickyHeaderIndices={[0]}
          onEndReachedThreshold={0.97}
          onEndReached={this._fetchMore}
        />
      </View>
    )
  }
}

const mapStateToProps = () => {
  const getGroupData = makeSelectedGroupData()
  return state => ({
    loading_ecommerce: state.notifications.loading.ecommerce,
    pagination: state.notifications.pagination.ecommerce || '',
    groupData: getGroupData(state),
  })
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
