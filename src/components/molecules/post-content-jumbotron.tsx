import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {} from 'redux'
import { getPage } from '@modules/page/action'
import { setImage } from '@utils/helpers'
import { makeGetShopPage } from '@modules/page/selector'
import { nestedScreenMap } from '@utils/constants'
import ImageAutoSchale from '@components/atoms/image-autoschale'
import { navigate } from '@src/root-navigation'

const getShopPage = makeGetShopPage()
const { width } = Dimensions.get('screen')

const Jumbotron = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPage('shop'))
  }, [])
  const { jumbotron } = useSelector(state => {
    const shopPage = getShopPage(state)
    const jumbotron = shopPage.section?.find(
      _data => _data.component === 'jumbotron' && _data.type === 'image',
    )

    return { jumbotron }
  })

  const displayitem =
    jumbotron && jumbotron.images
      ? jumbotron.images[
          Math.floor(Math.random() * Math.floor(jumbotron.images?.length))
        ]
      : ' '
  const _onPress = () => {
    const parsedUri = displayitem.target_url.split('/')
    const screenKey = parsedUri[parsedUri?.length - 2]
    const screenParams = parsedUri[parsedUri?.length - 1]
    const params = { from: screenKey }
    params[
      Number(screenParams) ? `${screenKey}Id` : `${screenKey}Slug`
    ] = screenParams

    const screen = nestedScreenMap(screenKey, params)
    // handle onclick need to revisit
    navigate(screen.screen, screen.params)
  }
  if (!jumbotron) {
    return null
  }
  if (!jumbotron.images) {
    return null
  }
  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        style={{ borderRadius: 8, overflow: 'hidden' }}
        onPress={_onPress}>
        <ImageAutoSchale
          width={width - 32}
          source={{
            uri: setImage(jumbotron.images[0].image_url, { width: width - 32 }),
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Jumbotron
