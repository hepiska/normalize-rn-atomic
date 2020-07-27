import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { fontStyle } from '@components/commont-styles'
import { userListData } from '@hocs/data/user'
import { useDispatch } from 'react-redux'
import { colors } from '@utils/constants'
import NavbarTop from '@components/molecules/navbar-top'
import List from '@components/layouts/list-header'
import CouponAlert from '@components/molecules/coupon-alert'
import { referralsUser } from '@modules/referrals/action'
import FollowListLoader from '@components/atoms/loaders/follow-list'
import OrderEmptyState from '@src/components/molecules/order-empty-state'
import FollowCard from '@components/molecules/follow-card'
import ReferalBanners from '@components/molecules/referal-banner'
import { connect } from 'react-redux'

const FollowCardHoc = userListData(FollowCard)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    ...fontStyle.playfairBold,
    fontSize: 24,
    color: colors.black100,
  },
  text: {
    ...fontStyle.helvetica,
    fontSize: 14,
    color: colors.black60,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  blackSection: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.black100,
  },
  textStyle: {
    marginLeft: 0,
    color: colors.black100,
    ...fontStyle.helveticaBold,
  },
  textbold: {
    ...fontStyle.helveticaBold,
    color: colors.black100,
  },
  textLayout: { marginHorizontal: 25 },

  cartTitle: {},
})

const _renderItem = ({ item, index }) => {
  return <FollowCardHoc userId={item} showCreated />
}

let limit = 10
const ReferalStatus = (props: any) => {
  const [skip, setSkip] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    if (skip > 0 && props.total <= props.users.length) {
      return
    }
    dispatch(referralsUser({ offset: limit * skip, limit }))
  }, [skip])
  const _shareCode = useCallback(() => {}, [])
  const _goToUserReverals = useCallback(() => {}, [])
  const _goToTermndCondition = useCallback(() => {
    props.navigation.navigate('TermsCondition', {
      title: 'Referral Terms and Condition',
    })
  }, [])

  const _renderHeader = useMemo(
    () => () => (
      <View style={styles.container}>
        <CouponAlert style={{ marginVertical: 16 }} />
        <ReferalBanners />
        <Text style={[styles.title, { marginVertical: 24 }]}>
          Invited by you
        </Text>
      </View>
    ),
    [],
  )

  const _renderEmpty = useMemo(
    () => () => {
      if (props.loading) {
        return null
      }
      return (
        <OrderEmptyState
          img={require('@assets/placeholder/searching-for-the-search-result.png')}
          title="Find friends you love"
          description="Share your invitation code and both of you can get special coupon from Shonet"
        />
      )
    },
    [props.loading],
  )
  const _listFooter = useMemo(
    () => () => {
      return (
        <View style={props.users.length > 6 ? { height: 400 } : {}}>
          {props.loading && <FollowListLoader style={styles.container} />}
        </View>
      )
    },
    [props.loading, props.users.length],
  )
  const _onReachEnd = useCallback(() => {
    if (!props.loading) {
      setSkip(state => {
        state += 1
        return state
      })
    }
  }, [props.loading])
  return (
    <>
      <NavbarTop
        leftContent={['back']}
        title="Status"
        saveAreaStyle={{ backgroundColor: 'white' }}
      />
      <List
        data={props.users}
        ListEmptyComponent={_renderEmpty}
        onEndReached={_onReachEnd}
        onEndReachedThreshold={0.98}
        ListHeaderComponent={_renderHeader}
        ListFooterComponent={_listFooter}
        renderItem={_renderItem}
      />
    </>
  )
}

const mapStateToProps = () => {
  return state => {
    return {
      users: state.referrals.order,
      total: state.referrals.pagination.total || 0,
      loading: state.referrals.loading,
    }
  }
}

export default connect(mapStateToProps, null)(ReferalStatus)
