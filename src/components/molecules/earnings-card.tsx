import React, { Component } from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { colors } from '@src/utils/constants'
import { fontStyle } from '@components/commont-styles'
import { Button } from '../atoms/button'
import { navigate } from '@src/root-navigation'

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
    backgroundColor: colors.cream,
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
    backgroundColor: colors.darkCream,
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
class EarningsCard extends React.Component<any> {
  goDetailEarning() {
    navigateTo('Screens', 'MyEarnings')
  }

  render() {
    return (
      <ImageBackground
        style={styles.card}
        resizeMode={'cover'}
        source={require('@assets/placeholder/earnings-card-bg.png')}>
        <View style={styles.cardWrap}>
          <View style={{ flex: 2 }}>
            <Text style={styles.fs16}>My Earnings Balance</Text>
            <Text style={[styles.fs16, fontStyle.helveticaBold]}>
              IDR 145.000
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
