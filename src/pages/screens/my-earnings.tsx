import React, {
  Component,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from 'react'
import { Text, StyleSheet, ImageBackground, View } from 'react-native'
import NavbarTop from '@src/components/molecules/navbar-top'
import { getEarningHistory } from '@modules/earnings/action'
import { colors } from '@src/utils/constants'
import { Button } from '@src/components/atoms/button'
import { fontStyle } from '@src/components/commont-styles'
import EarningStatusCard from '@components/molecules/earning-status-card'
import EarningsEmptyState from '@components/molecules/earnings-empty-state'
import EarningPageLoader from '@components/atoms/loaders/earning-page'
import EarningCardLoader from '@components/atoms/loaders/earning-status-card'

import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from '@components/layouts/list-header'
import { formatCur } from '@utils/helpers'
import { navigate, push } from '@src/root-navigation'
import { earningData } from '@hocs/data/earning'
import EarningsInfo from '@src/components/molecules/earnings-info'

const EarningWithdata = earningData(EarningStatusCard)

const styles = StyleSheet.create({
  earningWrap: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: colors.gold20,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  h1: {
    ...fontStyle.helveticaBold,
    fontSize: 20,
  },
  h2: {
    ...fontStyle.helveticaThin,
    fontSize: 14,
  },
  btnDetail: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    padding: 8,
    backgroundColor: colors.gold100,
  },
  btnTxt: {
    ...fontStyle.helveticaBold,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 0,
    color: 'white',
  },
})

const EarningBalance = ({ balance }) => {
  const goToWithdraw = () => {
    push('Screens', {
      screen: 'WithdrawEarnings',
    })
  }

  return (
    <>
      <ImageBackground
        style={styles.card}
        resizeMode={'cover'}
        source={require('@assets/placeholder/earnings-card-bg.png')}>
        <View style={styles.earningWrap}>
          <View style={{ flex: 3 }}>
            <Text style={styles.h1}>IDR {formatCur(balance)}</Text>
            <Text style={styles.h2}>Total available earnings balance</Text>
          </View>
          <Button
            title={'Withdraw'}
            disabled={true}
            onPress={goToWithdraw}
            style={styles.btnDetail}
            fontStyle={styles.btnTxt}
            loaderColor={colors.white}
          />
        </View>
      </ImageBackground>
      <EarningsInfo
        title={'Latest Earnings'}
        desc={'Only success earning will be shown'}
        action={true}
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
const _onReachEnd = () => {}

const MyEarnings = props => {
  const dispatch = useDispatch()
  const [skip, setSkip] = useState(0)

  const _fetchData = () => {
    const params = { limit, offset: skip * limit }
    dispatch(getEarningHistory(params))
  }

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

  const _renderEmpty = useMemo(() => {
    if (props.loading) {
      return <EarningCardLoader />
    }
    return <EarningsEmptyState />
  }, [props.loading])

  const _renderFooter = useMemo(() => {
    if (props.earningHistories.length < limit) {
      return null
    }
    return (
      <View style={{ height: 200 }}>
        {props.loading && <EarningCardLoader />}
      </View>
    )
  }, [props.loading, props.earningHistories.length])

  return (
    <>
      <NavbarTop title="My Earnings" leftContent={['back']} />
      <List
        ListHeaderComponent={_header}
        ListEmptyComponent={_renderEmpty}
        listFooterComponent={_renderFooter}
        onEndReached={_onReachEnd}
        data={props.earningHistories}
        renderItem={_renderItem}
        style={null}
      />
    </>
  )
}

const mapStateToProps = state => ({
  earningHistories: state.earnings.order,
  earningSummary: state.earnings.summary,
  loading: state.earnings.loadings.general,
  total: state.earnings.pagination.total || 0,
})

export default connect(mapStateToProps)(MyEarnings)
