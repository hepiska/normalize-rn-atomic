import * as React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
// import { routerMiddleware } from 'react-router-redux'
import { NavigationContainer } from '@react-navigation/native'
import { isMountedRef, navigationRef } from './root-navigation'
import rootReducer from '@modules/index'
import { composeWithDevTools } from 'redux-devtools-extension'
import apiMidleware from '@modules/middleware/api'
import log from '@modules/middleware/log'
import Amplitude from 'amplitude-js'
import { PersistGate } from 'redux-persist/integration/react'
import multidipacerMidleware from '@modules/middleware/multi'
import { persistStore } from 'redux-persist'
import OneSignal from 'react-native-onesignal'
import Pages from '@pages/index'
import Config from 'react-native-config'
import SplashScreen from 'react-native-splash-screen'
import { enableScreens } from 'react-native-screens'
import CONFIG from 'react-native-config'

enableScreens()

// initial store
const enhancers = []
const middleware = [apiMidleware, multidipacerMidleware]
const initialState = {}

const linking = {
  prefixes: [CONFIG.SHONET_URI, CONFIG.APP_SCHEMA + '://'],
  config: {
    screens: {
      Screens: {
        path: '',
        screens: {
          LoginRegister: 'register',
          ProductDetail: 'products/:productSlug',
        },
      },
    },
  },
}

const initialStateScreen = {
  routes: [
    {
      name: 'Main',
      state: {
        routes: [
          {
            name: 'Shop',
          },
        ],
      },
    },
    {
      name: 'Screens',
      state: {
        routes: [
          {
            name: 'LoginRegister',
          },
        ],
      },
    },
  ],
}

export let presist = null
export let store = null

let composedEnhancers
if (__DEV__) {
  composedEnhancers = composeWithDevTools(
    applyMiddleware(...middleware),
    ...enhancers,
  )
  // composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
} else {
  composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)
}

class InitStore extends React.Component<any, any> {
  constructor(props) {
    super(props)
    OneSignal.init(Config.ONE_SIGNAL_APP_ID, {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    })
    OneSignal.promptForPushNotificationsWithUserResponse(
      this.myiOSPromptCallback,
    )
    OneSignal.addEventListener('ids', this.onIds)

    this.state = {
      isLoading: true,
      store: null,
      persistor: null,
    }
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds)
  }

  myiOSPromptCallback(permission) {
    // do something with permission value
  }

  onIds(device) {}

  async componentDidMount() {
    const _store = createStore(rootReducer, initialState, composedEnhancers)
    store = _store
    global.store = _store
    Amplitude.getInstance().init(CONFIG.AMPLITUDE_API_KEY)
    const persistor = persistStore(store)
    presist = persistor
    this.setState({ store: _store, persistor, isLoading: false })
    SplashScreen.hide()
    isMountedRef.current = true
  }

  render() {
    const { isLoading } = this.state
    return isLoading ? null : (
      <Provider store={this.state.store}>
        <PersistGate loading={null} persistor={this.state.persistor}>
          <NavigationContainer
            linking={linking}
            // initialState={initialStateScreen}
            ref={navigationRef}>
            <Pages />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    )
  }
}

export default InitStore
