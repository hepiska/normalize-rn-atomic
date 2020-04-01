import React from 'react'
import ModalComponent from '@components/molecules/modal'
import FormLogin from '@components/molecules/form-login'
import FormRegister from '@components/molecules/form-register'
import FormRegisterBasicInformation from '@components/molecules/form-register-basic-information'

export const withAuthModal = Component => {
  class WrappedComponent extends React.Component {
    state = {
      title: 'Login',
      isOpen: false,
      fullscreen: false,
    }

    openModal = () => {
      this.setState({
        isOpen: true,
      })
    }

    closeModal = () => {
      if (this.state.fullscreen) {
        this.setState({
          title: 'Register',
          fullscreen: false,
        })
      } else {
        this.setState({
          isOpen: false,
        })
      }
    }

    onChangeTitle = (title: string) => () => {
      this.setState({
        title,
      })
    }

    onChangeModal = (title: string, fullscreen: boolean) => {
      this.setState({
        title,
        fullscreen,
      })
    }

    renderChild = () => {
      const { title } = this.state
      if (title === 'Login') {
        return <FormLogin onRegisterClick={this.onChangeTitle('Register')} />
      }
      if (title === 'Register') {
        return (
          <FormRegister
            onLoginClick={this.onChangeTitle('Login')}
            onChangeModal={this.onChangeModal}
          />
        )
      }
      if (title === 'Create new account') {
        return <FormRegisterBasicInformation />
      }
    }

    render() {
      const { title, isOpen, fullscreen } = this.state
      return (
        <>
          <ModalComponent
            title={title}
            isOpen={isOpen}
            onClose={this.closeModal}
            fullscreen={fullscreen}>
            {this.renderChild()}
          </ModalComponent>
          <Component openModal={this.openModal} />
        </>
      )
    }
  }
  return WrappedComponent
}
