import React from 'react'
import { View, Text } from 'react-native'
import NavbarTop from '@components/molecules/navbar-top'
import FormRegister from '@src/components/molecules/form-register-basic-information'

const RegisterPage = (props: any) => {
  return (
    <>
      <NavbarTop title="Registration" />
      <FormRegister navigation={props.navigation} route={props.route} />
    </>
  )
}
export default RegisterPage
