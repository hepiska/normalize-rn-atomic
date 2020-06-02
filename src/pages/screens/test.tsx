import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import PostInsight from '@components/molecules/post-insight'
import { images } from '@utils/constants'

const TestPage = props => {
  const [image, setImage] = React.useState(null)
  const toolTipsParent = React.useRef(null)
  const toolTipsTarget = React.useRef(null)

  const renimage = image || { uri: '' }

  return (
    <View style={{ padding: 16, flex: 1 }} ref={toolTipsParent}>
      <View ref={toolTipsTarget}>
        <Text>sas</Text>
      </View>
      <TouchableOpacity onPress={() => {}} />
      <ScrollView>
        <PostInsight />
      </ScrollView>
    </View>
  )
}

export default TestPage
