import * as React from 'react'
import * as Redux from 'redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
const createHistory = require('history').createMemoryHistory
import rootReducer from '@modules/'

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

class InitRedux extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      store,
    }


  }