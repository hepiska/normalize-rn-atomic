import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import { colors } from '@src/utils/constants'
import FocusContainer from '@src/components/molecules/focus-container'
import { fontStyle } from '../commont-styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CommingSoonPlaceholder from '@src/components/molecules/comming-soon'
import TitleDescriptionCard from '@src/components/molecules/title-description-card'
import { formatRupiah } from '@src/utils/helpers'

interface MyRevenueType {
  style?: ViewStyle
}

const styles = StyleSheet.create({
  helveticaBold: {
    ...fontStyle.helveticaBold,
    fontWeight: '500',
  },
  helvetica10: {
    ...fontStyle.helvetica,
    fontSize: 10,
  },
  helvetica12: {
    ...fontStyle.helvetica,
    fontSize: 12,
  },
})

const MyRevenue = (props: MyRevenueType) => (
  <View>
    <FocusContainer
      style={{ backgroundColor: colors.white }}
      onPress={() => {
        console.log('ditekan')
      }}>
      <>
        <View style={{ alignItems: 'center', padding: 16 }}>
          <Text
            style={{
              ...styles.helveticaBold,
              fontSize: 12,
              color: colors.black70,
            }}>
            Total Revenue
          </Text>
          <Text
            style={{
              ...styles.helveticaBold,
              fontSize: 18,
              color: colors.greenAccent,
              marginTop: 16,
            }}>
            {formatRupiah(12999)}
          </Text>
          <Text
            style={{
              ...styles.helvetica10,
              marginTop: 8,
            }}>
            Click here for more details
          </Text>
        </View>
        <View
          style={{
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            alignItems: 'center',
            padding: 16,
            backgroundColor:
              'linear-gradient(80.31deg, rgba(48, 103, 228, 0.1) -38.87%, rgba(129, 49, 226, 0.1) 186.84%)',
          }}>
          <Text
            style={{
              ...styles.helvetica12,
              color: colors.black80,
            }}>
            {`Your Active Balance `}
            <Text
              style={{
                ...styles.helvetica12,
                fontWeight: '500',
                color: colors.black100,
              }}>
              {formatRupiah(12000)}
            </Text>
          </Text>
        </View>
      </>
    </FocusContainer>

    <TitleDescriptionCard
      title="Revenue"
      description={
        // notes: diubah
        <CommingSoonPlaceholder />
      }
      style={{ marginTop: 40 }}
    />

    <TitleDescriptionCard
      title="The most successfull post"
      description={
        // notes: diubah
        <CommingSoonPlaceholder />
      }
      style={{ marginTop: 40 }}
    />

    <TitleDescriptionCard
      title="Recommended Product to Post"
      description={
        // notes: diubah
        <CommingSoonPlaceholder />
      }
      style={{ marginTop: 40 }}
    />
  </View>
)

export default MyRevenue
