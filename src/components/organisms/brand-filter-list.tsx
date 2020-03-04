import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Div, Font, ScrollDiv } from '@components/atoms/basic'
import { Button, OutlineButton } from '@components/atoms/button'
import { colors } from '@utils/constants'
import Field from '@components/atoms/field'
import { changeValue } from '@modules/product-filter/action'
import Icon from 'react-native-vector-icons/FontAwesome5'

const BrandFilterList = () => {
  console.log('=======')
  return (
    <Div>
      <Font>asa</Font>
    </Div>
  )
}

export default BrandFilterList
