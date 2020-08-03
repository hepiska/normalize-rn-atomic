import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { fontStyle } from '@components/commont-styles'
import AntdFa from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { colors } from '@src/utils/constants'

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    ...fontStyle.helveticaBold,
    fontSize: 16,
  },
  desc: {
    ...fontStyle.helvetica,
    fontSize: 12,
    color: colors.black60,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: '100%',
  },
  close: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  refCode: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  refImage: {
    marginTop: 32,
    width: 160,
    height: 160,
    marginBottom: 16,
  },
})

const QRModal = (props: any) => {
  const _closeModal = () => {
    props.navigation.goBack()
  }
  return (
    <View style={styles.modalContainer}>
      <View style={styles.container}>
        <AntdFa
          name="closecircle"
          size={24}
          style={styles.close}
          onPress={_closeModal}
        />
        <Text style={styles.title}>QR Code</Text>
        <Text style={[styles.desc, { marginTop: 16 }]}>
          Easily share your referral code by QR code have your friends scan this
          code
        </Text>
        {props.detailme && (
          <View style={styles.refCode}>
            <Image
              source={{ uri: props.detailme.referral_code_url }}
              style={styles.refImage}
            />
            <Text style={styles.title}>{props.detailme.referral_code}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const mapStateToProps = state => {
  if (!state.auth.data.user) {
    return {}
  }
  return {
    me: state.auth.data.user,
    detailme: state.user.data[state.auth.data.user.id],
  }
}

export default connect(mapStateToProps)(QRModal)
