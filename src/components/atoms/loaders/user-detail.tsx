import React from 'react'
import { View, ViewStyle, StyleSheet } from 'react-native'
import LineLoader from '@components/atoms/loaders/line'
import CircleLoader from '@src/components/atoms/loaders/circle-loader'
import PostDetailLoader from './post-card-full'

interface LoaderPropsType {
  style?: ViewStyle
}

const styles = StyleSheet.create({
  containermargin: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
})

const UserDetail = (props: LoaderPropsType) => {
  return (
    <View style={{ ...props.style }}>
      <View style={{ flexDirection: 'row', ...styles.containermargin }}>
        <CircleLoader r={38} />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 8 }}>
            <LineLoader
              style={{
                height: 48,
                marginTop: 2,
                flex: 1,
                marginHorizontal: 8,
              }}
            />
            <LineLoader
              style={{
                height: 48,
                marginTop: 2,
                marginHorizontal: 8,
                flex: 1,
              }}
            />
            <LineLoader
              style={{
                height: 48,
                marginTop: 2,
                marginHorizontal: 8,
                flex: 1,
              }}
            />
          </View>
          <LineLoader
            style={{
              height: 32,
              marginTop: 16,
              ...styles.containermargin,
            }}
          />
        </View>
      </View>
      <LineLoader
        style={{ height: 32, width: 149, ...styles.containermargin }}
      />
      <LineLoader
        style={{
          height: 22,
          width: 86,
          ...styles.containermargin,
        }}
      />
      <LineLoader
        style={{
          height: 22,
          width: 86,
          ...styles.containermargin,
        }}
      />
      <LineLoader
        style={{
          height: 22,
          width: 86,
          marginTop: 16,
          ...styles.containermargin,
        }}
      />
      <View style={{ flexDirection: 'row', marginHorizontal: 8 }}>
        <LineLoader
          style={{
            height: 43,
            marginTop: 8,
            flex: 1,
            marginHorizontal: 8,
          }}
        />
        <LineLoader
          style={{
            height: 43,
            marginTop: 8,
            marginHorizontal: 8,
            flex: 1,
          }}
        />
      </View>
      <LineLoader
        style={{
          height: 32,
          width: 149,
          marginTop: 24,
          ...styles.containermargin,
        }}
      />
      <PostDetailLoader style={styles.containermargin} />
    </View>
  )
}
export default UserDetail
