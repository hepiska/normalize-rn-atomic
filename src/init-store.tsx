import * as React from 'react'
import * as Redux from 'redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import { NativeRouter, MemoryRouter, BackButton } from 'react-router-native'
const createHistory = require('history').createMemoryHistory
import rootReducer from '@modules/index'
import Pages from '@pages/index'

export const history = createHistory()



// initial store 
const initialState = {}
const enhancers = []
const middleware = [
  routerMiddleware(history),
]

if (process.env.NODE_ENV === 'development') {
  // const { devToolsExtension } = window

  // if (typeof devToolsExtension === 'function') {
  //   enhancers.push(devToolsExtension())
  // }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
)
const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
)

class InitStore extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      store,
    }
  }

  async componentDidMount() {
    this.setState({ store, isLoading: false })
  }

  render() {
    const { isLoading } = this.state
    return isLoading ? null : (
      <Provider store={this.state.store}>
        <MemoryRouter
          initialEntries={["/"]}
          initialIndex={0}
        >
          <BackButton>
            <Pages />
          </BackButton>
        </MemoryRouter>
      </Provider>

    )
  }

}


export default InitStore