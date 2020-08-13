import React, { Component } from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { colors } from '@src/utils/constants'
import { fontStyle } from '@components/commont-styles'
import { Button } from '../atoms/button'
import { navigate } from '@src/root-navigation'
import { formatCur } from '@src/utils/helpers'

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

class EarningsCard extends React.PureComponent<EarningCard, any> {
  goDetailEarning() {
    navigateTo('Screens', 'MyEarnings')
  }

  render() {
    const { balance } = this.props
    return (
      <ImageBackground
        style={styles.card}
        resizeMode={'cover'}
        source={require('@assets/placeholder/earnings-card-bg.png')}>
        <View style={styles.cardWrap}>
          <View style={{ flex: 2 }}>
            <Text style={styles.fs16}>My Earnings Balance</Text>
            <Text style={[styles.fs16, fontStyle.helveticaBold]}>
              IDR {formatCur(Math.abs(balance))}
            </Text>
          </View>
          <Button
            title={'See Details'}
            onPress={this.goDetailEarning}
            style={styles.btnDetail}
            fontStyle={styles.btnTxt}
            loaderColor={colors.white}
          />
        </View>
      </ImageBackground>
    )
  }
}

export default EarningsCard
