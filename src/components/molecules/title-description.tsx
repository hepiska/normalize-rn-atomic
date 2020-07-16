import React, { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { fontStyle } from '@components/commont-styles'
import { colors } from '@utils/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    ...fontStyle.helveticaBold,
    fontSize: 14,
    marginBottom: 14,
  },
  desc: {
    ...fontStyle.helvetica,
    fontSize: 14,
    color: colors.black70,
    marginBottom: 8,
  },
  image: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardMargin: {
    marginBottom: 16,
  },
  action: {
    flexDirection: 'row',
  },
  section: {
    marginVertical: 8,
  },
  list: {
    paddingHorizontal: 16,
  },
})

const TitleDescription = ({ title, description, style }: any) => {
  const [isShowMore, setIsShowMore] = useState(false)
  const changeShowMore = useCallback(() => {
    setIsShowMore(state => {
      return !state
    })
  }, [])
  const heightStyle = isShowMore
    ? { overflow: 'hidden' }
    : { height: 80, overflow: 'hidden' }
  return (
    <View style={[style]}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ ...heightStyle }}>
        {description.split('\\n').map(text => {
          return (
            <Text style={styles.desc} key={text}>
              {text}
            </Text>
          )
        })}
      </View>

      <TouchableOpacity onPress={changeShowMore} style={{ marginTop: 8 }}>
        <Text style={[styles.title, { marginBottom: 0 }]}>
          Read {isShowMore ? 'less' : 'more'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
export default TitleDescription
