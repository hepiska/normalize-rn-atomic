import React, { Component } from 'react'
import { Dimensions, ViewStyle, View, Text, StyleSheet } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import ProductCard from '@components/molecules/product-card-new'
import SearchResultCard from '../molecules/search-result-card'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import { ScrollView } from 'react-native-gesture-handler'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
})

interface SearchProductType {
  style?: any
  searchKey?: string
}

const dummy = {
  title: 'Search in Categories',
  data: [
    {
      icon: 'search',
      title: 'Skirts',
    },
    {
      icon: 'search',
      title: 'Mini Skirts',
    },
  ],
}

class SearchProductResult extends Component<SearchProductType, any> {
  render() {
    const { searchKey, style } = this.props
    return (
      <View style={{ ...styles.container, ...style }}>
        {searchKey !== '' && (
          <>
            <View style={{ paddingHorizontal: 16 }}>
              <SearchResultCard
                leftContent={
                  <Text
                    style={{
                      ...fontStyle.helvetica,
                      fontWeight: '300',
                      color: colors.black80,
                      fontSize: 14,
                    }}>
                    {`Show Results for `}
                    <Text
                      style={{ fontWeight: '500' }}>{`"${searchKey}"`}</Text>
                  </Text>
                }
                rightContent={
                  <Icon
                    style={{ marginRight: 8 }}
                    name="search"
                    color={colors.black70}
                  />
                }
                style={{
                  borderBottomColor: colors.black50,
                  borderBottomWidth: 1,
                  paddingVertical: 12,
                }}
                onPress={() => console.log('ditekan')}
              />
            </View>
            <ScrollView style={{ marginHorizontal: 16 }}>
              <View style={{ marginVertical: 24 }}>
                <View style={{ marginVertical: 8 }}>
                  <Text
                    style={{
                      ...fontStyle.helveticaBold,
                      fontSize: 14,
                      color: colors.black80,
                    }}>
                    {dummy.title}
                  </Text>
                </View>
                {dummy.data?.map((val, key) => (
                  <View
                    key={`${dummy.title}-${key}`}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 8,
                    }}>
                    <SearchResultCard
                      style={{
                        justifyContent: 'flex-start',
                        paddingHorizontal: 0,
                        paddingVertical: 0,
                        alignItems: 'center',
                      }}
                      leftContent={
                        <Icon
                          style={{ marginRight: 8 }}
                          name={val.icon}
                          size={10}
                          color={colors.black70}
                        />
                      }
                      rightContent={
                        <Text
                          style={{
                            ...fontStyle.helvetica,
                            fontSize: 14,
                            color: colors.black80,
                          }}>
                          {val.title}
                        </Text>
                      }
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
          </>
        )}
      </View>
    )
  }
}

export default SearchProductResult
