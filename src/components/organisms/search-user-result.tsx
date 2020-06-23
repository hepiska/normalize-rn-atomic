import React, { Component } from 'react'
import { Dimensions, ViewStyle, View, Text, StyleSheet } from 'react-native'
import { Div, Font } from '@components/atoms/basic'
import ProductCard from '@components/molecules/product-card-new'
import SearchResultCard from '../molecules/search-result-card'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '@src/utils/constants'
import { fontStyle } from '../commont-styles'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import FollowCard from '@components/molecules/follow-card'
import { userListData } from '@hocs/data/user'

const UserHoc = userListData(FollowCard)

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
})

interface SearchUserType {
  style?: any
  searchKey?: string
  user?: any
}

class SearchUserResult extends Component<SearchUserType, any> {
  render() {
    const { searchKey, style, user } = this.props
    return (
      <View style={{ ...styles.container, ...style }}>
        {searchKey !== '' && (
          <>
            <View>
              <SearchResultCard
                leftContent={
                  <Text
                    style={{
                      ...fontStyle.helvetica,
                      fontSize: 12,
                      color: colors.black80,
                    }}>
                    {`Results for `}
                    <Text
                      style={{ fontWeight: '500' }}>{`"${searchKey}"`}</Text>
                  </Text>
                }
                rightContent={
                  <Text
                    style={{
                      ...fontStyle.helvetica,
                      fontSize: 12,
                      color: colors.black70,
                    }}>
                    {`234 items`}
                  </Text>
                }
                style={{
                  backgroundColor: colors.black50,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                }}
              />
            </View>
            <ScrollView style={{}}>
              {/* {brand.length > 0 &&
                brand.map((val, key) => (
                  <BrandHoc
                    brandId={val}
                    key={`search-brand-${key}`}
                    idx={key}
                  />
                ))} */}
              {user.length > 0 &&
                user.map((val, key) => (
                  <UserHoc userId={val} key={`search-user-${key}`} />
                ))}
            </ScrollView>
          </>
        )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  // console.log('state ---', state)
  return {
    user: [],
    // user: state.user.order,
  }
}
export default connect(mapStateToProps, null)(SearchUserResult)
