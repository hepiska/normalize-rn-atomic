import * as React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import { NavigationContainer } from '@react-navigation/native'

const createHistory = require('history').createMemoryHistory
import rootReducer from '@modules/index'
import { composeWithDevTools } from 'redux-devtools-extension'
import apiMidleware from '@modules/middleware/api'
import { PersistGate } from 'redux-persist/integration/react'
import multidipacerMidleware from '@modules/middleware/multi'
import { persistStore } from 'redux-persist'
import Pages from '@pages/index'

export const history = createHistory()

// initial store
const initialState = {}
const enhancers = []
const middleware = [
  routerMiddleware(history),
  apiMidleware,
  multidipacerMidleware,
]

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
    this.state = {
      isLoading: true,
      store: null,
      persistor: null,
    }
  }

  async componentDidMount() {
    const _store = createStore(rootReducer, initialState, composedEnhancers)
    store = _store
    const persistor = persistStore(store)
    presist = persistor
    this.setState({ store: _store, persistor, isLoading: false })
  }

  render() {
    const { isLoading } = this.state
    return isLoading ? null : (
      <Provider store={this.state.store}>
        <PersistGate loading={null} persistor={this.state.persistor}>
          <NavigationContainer>
            <Pages />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    )
  }
}

export default InitStore
