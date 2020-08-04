import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native'

const Maintenance = (props: any) => {
  useEffect(() => {
    if (!props.maintenance_mode) {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Main', params: { screen: 'Shop' } }],
        }),
      )
    }
  }, [props.maintenance_mode])

  return (
    <View>
      <Text>Under maintenace</Text>
    </View>
  )
}

const mapStateToProps = state => ({
  maintenance_mode: state.appConfig.maintenance_mode,
})
export default connect(mapStateToProps)(Maintenance)
