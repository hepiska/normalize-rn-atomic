import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import NavbarTop from '@components/molecules/navbar-top'
import FormLogin from '@src/components/molecules/form-login'
import LoginModals from '@src/components/organisms/login-modals'
import { fontStyle, landingPageStyles } from '@components/commont-styles'
import TextInputOutline from '@src/components/atoms/field-floating'
import { Button, OutlineButton } from '@components/atoms/button'
import { useDispatch, useSelector } from 'react-redux'
import Line from '@components/atoms/line'
import { colors } from '@utils/constants'
import { useFormValidator } from '@src/hooks/use-form-validator'
import { useuserReferrals } from '@src/hooks/referrals'

const LoginPage = props => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalSection, setModalSection] = useState('forgotPassword')
  const { autherror } = useSelector(state => ({ autherror: state.auth.error }))

  useEffect(() => {
    console.log('aut', autherror)
    if (autherror) {
      setIsOpen(true)
      setModalSection('nonexist')
    }
  }, [autherror])
  // const [isModalOpen, setisopen] = useState(false)
  const closeModal = useCallback(() => {
    setIsOpen(() => false)
  }, [])
  const handleForgetPassword = useCallback(() => {
    setIsOpen(() => true)
    setModalSection('forgotPassword')
  }, [])

  const changeModalSection = useCallback(section => {
    setModalSection(section)
  }, [])

  return (
    <>
      <LoginModals
        isOpen={isOpen}
        onClose={closeModal}
        onChangeSection={changeModalSection}
        section={modalSection}
      />
      <NavbarTop
        leftContent={['back']}
        title={
          <Image
            style={{ width: 130, height: 19 }}
            source={require('@assets/icons/theshonet-logo-black.png')}
          />
        }
      />
      <FormLogin {...props} onForgotPassword={handleForgetPassword} />
    </>
  )
}

export default LoginPage
