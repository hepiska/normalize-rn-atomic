import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setGlobalError, setGlobalWarning } from '@modules/global/action'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    bottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 64,
  },
  warning: {
    backgroundColor: 'rgba(255,100,20,0.4)',
  },
  error: {
    backgroundColor: 'rgba(255,100,20,0.4)',
  },
  text: {
    fontFamily: 'Helvetica Neue',
    fontSize: 12,
    color: 'white',
  },
})

const ErrorCom = ({ error, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.error, styles.container]}
      onPress={onPress}>
      <Text style={styles.text}>{error.message}</Text>
    </TouchableOpacity>
  )
}

const WarningComponent = ({ warning, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.warning, styles.container]}
      onPress={onPress}>
      <Text style={styles.text}>{warning.message}</Text>
    </TouchableOpacity>
  )
}

const GlobalErrorAndWarning = (props: any) => {
  if (props.error) {
    return (
      <ErrorCom
        error={props.error}
        onPress={() => props.setGlobalError(null)}
      />
    )
  }
  if (props.warning) {
    return (
      <WarningComponent
        warning={props.warning}
        onPress={() => props.setGlobalWarning(null)}
      />
    )
  }
  return null
}

const mapStateToProps = state => ({
  error: state.global.error,
  warning: state.global.warning,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setGlobalError,
      setGlobalWarning,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalErrorAndWarning)
