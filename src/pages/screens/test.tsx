import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { images } from '@utils/constants'

const TestPage = props => {
  const [image, setImage] = React.useState(null)
  const toolTipsParent = React.useRef(null)
  const toolTipsTarget = React.useRef(null)

  const renimage = image || { uri: '' }

  return (
    <View style={{ padding: 40, flex: 1 }} ref={toolTipsParent}>
      <View ref={toolTipsTarget}>
        <Text>sas</Text>
      </View>
      <TouchableOpacity onPress={() => {}} />
      <ScrollView>
        <ImageAutoSchale
          width={200}
          style={{ borderRadius: 8 }}
          source={renimage}
          onError={() => setImage(images.product)}
        />
      </ScrollView>
    </View>
  )
}

export default TestPage
