import React, { Component, useMemo, useState } from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { colors } from '@src/utils/constants'
import { fontStyle } from '@components/commont-styles'
import { Button } from '../atoms/button'
import { navigate } from '@src/root-navigation'
import { formatCur } from '@src/utils/helpers'
import { earningData } from '@hocs/data/earning'
import { connect, useDispatch } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    paddingVertical: 20,
  },
  playfairBold20: {
    ...fontStyle.playfairBold,
    fontWeight: '700',
    fontSize: 20,
  },
  fs16: {
    ...fontStyle.helveticaThin,
    fontSize: 16,
    marginBottom: 6,
  },
  card: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: colors.gold20,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardWrap: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
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

const navigateTo = (screen, screenName, params = {}) => {
  return navigate(screen, {
    screen: screenName,
    params,
  })
}

interface EarningCard {
  balance?: number
}

const Card = ({ balance }) => {
  const goDetailEarning = () => {
    navigateTo('Screens', 'MyEarnings')
  }

  return (
    <ImageBackground
      style={styles.card}
      resizeMode={'cover'}
      source={require('@assets/placeholder/earnings-card-bg.png')}>
      <View style={styles.cardWrap}>
        <View style={{ flex: 2 }}>
          <Text style={styles.fs16}>Saldo Komisi Saya</Text>
          <Text style={[styles.fs16, fontStyle.helveticaBold]}>
            IDR {formatCur(Math.abs(balance))}
          </Text>
        </View>
        <Button
          title={'Lihat Detail'}
          onPress={goDetailEarning}
          style={styles.btnDetail}
          fontStyle={styles.btnTxt}
          loaderColor={colors.white}
        />
      </View>
    </ImageBackground>
  )
}

const EarningsCard = props => {
  return <Card balance={props.earningSummary.balance} />
}

const mapStateToProps = state => ({
  earningHistories: state.earnings.order,
  earningSummary: state.earnings.summary,
  loading: state.earnings.loadings.general,
  total: state.earnings.pagination.total || 0,
})

export default connect(mapStateToProps)(EarningsCard)
