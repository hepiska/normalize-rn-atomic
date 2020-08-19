import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Modal,
} from 'react-native'
import ImageAutoSchale from '@src/components/atoms/image-autoschale'
import { setImage as changeImageUri, formatCur } from '@utils/helpers'
import { colors } from '@src/utils/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fontStyle } from '@src/components/commont-styles'
import { Button, OutlineButton } from '@src/components/atoms/button'
import NavbarTop from '../../components/molecules/navbar-top'
import { PressAbbleDiv } from '../../components/atoms/basic'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { goBack, navigate, navigationInf } from '@src/root-navigation'
import CardProduct from '@src/components/molecules/earn-card-product'
import Config from 'react-native-config'

const { width, height } = Dimensions.get('screen')

const img =
  'https://shonet.imgix.net/images/b1bd6d85-98bc-4210-b91d-179270795f07-1596516915.jpeg'

const styles = StyleSheet.create({
  imgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
  },
  close: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: 46,
    height: 46,
    borderRadius: 23,
    margin: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  earnInfo: {
    ...fontStyle.helvetica,
    fontWeight: '500',
    color: colors.white,
  },
  brand: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: colors.black100,
  },

  buttonOutline: {
    width: '100%',
    height: 46,
    borderRadius: 4,
    borderColor: '#EFEFEF',
    marginBottom: 16,
    marginTop: 32,
  },
  button: {
    width: '100%',
    height: 46,
    borderRadius: 4,
    backgroundColor: '#E0BC85', //remove this hexa
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  buttonOutlineText: {
    color: colors.white,
    fontWeight: 'bold',
  },
})

class ShareAndEarn extends React.Component<any, any> {
  render() {
    const { product } = this.props.route.params
    const { navigation } = this.props
    const goShareOnly = () => {
      navigation.replace('modals', {
        screen: 'ShareProduct',
        params: {
          product: product,
          title: product.name + ' - The Shonet',
          uri: Config.SHONET_URI + '/products/' + product.slug || product.id,
          message: 'Shop ' + product.name + ' at The Shonet',
        },
      })
    }

    return (
      <Modal animationType={'slide'} transparent={true} visible={true}>
        <View style={{ height: '100%', width: '100%' }}>
          <ImageBackground
            style={styles.imgBg}
            resizeMode="cover"
            source={
              typeof product.image_url === 'string'
                ? {
                    uri: changeImageUri(product.image_url, {
                      width: width,
                    }),
                  }
                : product.image_url
            }
          />
          <LinearGradient
            start={{ x: -0.3, y: 0.75 }}
            end={{ x: 0, y: 0.1 }}
            colors={[
              'rgba(0,0,0,0.9)',
              'rgba(0,0,0,0.7)',
              'rgba(0,0,0,0.35)',
              'rgba(0,0,0,0)',
            ]}
            style={[styles.imgBg, StyleSheet.absoluteFill]}>
            <SafeAreaView>
              <PressAbbleDiv onPress={goBack} style={styles.close}>
                <Icon name="close" size={24} color={colors.white} />
              </PressAbbleDiv>
            </SafeAreaView>
            <View
              style={{
                padding: 16,
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <SafeAreaView>
                <Text style={styles.earnInfo}>
                  You’ll Earn{' '}
                  {product.min_potential_earnings !==
                    product.max_potential_earnings && 'Max '}
                  IDR{' '}
                  {formatCur(
                    product.min_potential_earnings ||
                      product.max_potential_earning,
                  )}{' '}
                  when your friend buy this product from your link
                </Text>
                <CardProduct product={product} />
                <OutlineButton
                  title="Continue without Earn"
                  onPress={goShareOnly}
                  style={styles.buttonOutline}
                  fontStyle={styles.buttonOutlineText}
                />
                <Button
                  title="Let's Register, Share and Earn"
                  onPress={() => {}}
                  style={styles.button}
                  fontStyle={styles.buttonText}
                />
              </SafeAreaView>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    )
  }
}

export default ShareAndEarn
