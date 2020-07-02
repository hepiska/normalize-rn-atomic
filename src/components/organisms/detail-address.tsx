import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TextInputOutline from '@src/components/atoms/field-floating'
import { GradientButton } from '@components/atoms/button'
import CirleLoader from '@src/components/atoms/loaders/circle'
import { addNewAddress } from '@modules/address/action'

import { colors } from '@utils/constants'

const styles = StyleSheet.create({
  boldFont: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    textAlignVertical: 'top',
    fontWeight: '500',
  },
  loader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  bottomSheet: {
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 1.0,
    shadowColor: colors.black50,
    elevation: 4,
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: colors.black50,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 46,
    backgroundColor: '#8131E2',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 16,
    borderColor: colors.black50,
    borderBottomWidth: 1,
  },
  infoFont: {
    marginTop: 4,
    fontFamily: 'Helvetica Neue',
    fontSize: 10,
    color: colors.black60,
  },
  smallFont: {
    marginTop: 8,
    fontFamily: 'Helvetica Neue',
    lineHeight: 14,
    fontSize: 12,
    color: colors.black60,
  },
})

class DetailAddress extends Component<any, any> {
  state = {
    detail: '',
  }
  _changeDetail = e => {
    this.setState({ detail: e })
  }
  _setData = () => {
    this.props.getDetail(this.state.detail)
  }
  render() {
    const { detail } = this.state
    const { address, loading } = this.props
    const buttontext = detail.length
      ? 'Add Recepient Information'
      : ' Choose Address'
    return (
      <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
        {loading && (
          <View style={styles.loader}>
            <CirleLoader style={{ height: 50, width: 50 }} />
          </View>
        )}
        {address && !loading && (
          <>
            <Text style={styles.boldFont}>{address.name}</Text>
            <Text style={styles.smallFont}>{address.formatted_address}</Text>
            <View style={{ marginTop: 24, height: 32 }}>
              <TextInputOutline
                key="pass"
                style={{ height: 46 }}
                label="Address Detail"
                value={detail}
                onChangeText={this._changeDetail}
                autoCapitalize="none"
              />
              <Text style={styles.infoFont}>
                Example: Street name, House Number, Blok, RT/RW, Building level,
                etc.
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                width: '100%',
              }}>
              <GradientButton
                onPress={this._setData}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#3067E4', '#8131E2']}
                title={buttontext}
                fontStyle={styles.buttonText}
                style={styles.button}
                disabled={!detail.length ? true : false}
              />
            </View>
          </>
        )}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  googleAddress: state.newAddress.googleAddress,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addNewAddress }, dispatch)

export default connect(null, mapDispatchToProps)(DetailAddress)
