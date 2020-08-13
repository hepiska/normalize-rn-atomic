import React, {
  Component,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import NavbarTop from '@src/components/molecules/navbar-top'
import EarningsInfo from '@src/components/molecules/earnings-info'
import { connect, useDispatch } from 'react-redux'
import { colors } from '@src/utils/constants'
import { fontStyle } from '@src/components/commont-styles'
import { formatCur } from '@utils/helpers'
import EarningsEmptyState from '@src/components/molecules/earnings-empty-state'
import EarningStatusCard from '@src/components/molecules/earning-status-card'
import { getPendingHistory } from '@modules/earnings/action'
import { earningData } from '@hocs/data/earning'
const EarningWithdata = earningData(EarningStatusCard)

import List from '@components/layouts/list-header'
import EarningCardLoader from '@components/atoms/loaders/earning-status-card'

const styles = StyleSheet.create({
  earningWrap: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.black50,
  },
  h1: {
    ...fontStyle.helveticaBold,
    fontSize: 20,
    textAlign: 'center',
  },
  h2: {
    ...fontStyle.helveticaThin,
    textAlign: 'center',

    fontSize: 14,
  },
})

const EarningBalance = ({ balance }) => {
  return (
    <>
      <View style={styles.earningWrap}>
        <View style={{ flex: 3 }}>
          <Text style={styles.h1}>IDR {formatCur(balance)}</Text>
          <Text style={styles.h2}>Total available earnings balance</Text>
        </View>
      </View>
      <EarningsInfo
        title={'Pending Earnings'}
        desc={
          'Earnings will be sent to you if your friend complete the purchase process'
        }
        action={false}
      />
    </>
  )
}

const _renderItem = ({ item, index }) => {
  return (
    <View
      style={{
        marginHorizontal: 16,
        borderBottomColor: colors.black10,
        borderBottomWidth: 1,
      }}>
      <EarningWithdata earningId={item} />
    </View>
  )
}

let limit = 10
const EarningsPending = props => {
  const dispatch = useDispatch()
  const [skip, setSkip] = useState(0)

  const _fetchData = () => {
    const params = { limit, offset: skip * limit }
    dispatch(getPendingHistory(params))
  }

  const _renderEmpty = useMemo(() => {
    if (props.loading) {
      return <EarningCardLoader />
    }
    return <EarningsEmptyState />
  }, [props.loading])

  useEffect(() => {
    if (skip > 0 && props.total <= props.earningHistories.length) {
      return
    }
    _fetchData()
  }, [skip])
  const _header = useMemo(() => {
    return <EarningBalance balance={props.earningSummary.balance} />
  }, [props.earningSummary.balance])
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
      <NavbarTop title="My Earnings" leftContent={['back']} />
      <List
        ListHeaderComponent={_header}
        ListEmptyComponent={_renderEmpty}
        onEndReached={_onReachEnd}
        data={props.earningHistories}
        renderItem={_renderItem}
        style={null}
      />
    </>
  )
}

const mapStateToProps = state => ({
  earningHistories: state.earnings.pendingorder,
  earningSummary: state.earnings.pendingSummary,
  loading: state.earnings.loadings,
  total: state.earnings.pendingPagination.total || 0,
})

export default connect(mapStateToProps)(EarningsPending)
