import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const TestPage = props => {
  const toolTipsParent = React.useRef(null)
  const toolTipsTarget = React.useRef(null)

  return (
    <View style={{ padding: 40 }} ref={toolTipsParent}>
      <View ref={toolTipsTarget}>
        <Text>sas</Text>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Text>sas</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TestPage
