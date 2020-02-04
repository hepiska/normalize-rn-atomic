import * as React from 'react';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import { NativeRouter, MemoryRouter, BackButton } from 'react-router-native';
const createHistory = require('history').createMemoryHistory;
import rootReducer from '@modules/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import apiMidleware from '@modules/middleware/api';
import { PersistGate } from 'redux-persist/integration/react';
import multidipacerMidleware from '@modules/middleware/multi';
import { persistStore } from 'redux-persist';
import rootEpic from '@modules/rootEpic';
import Pages from '@pages/index';

export const history = createHistory();
const epicMiddleware = createEpicMiddleware();

// initial store
const initialState = {};
const enhancers = [];
const middleware = [
  epicMiddleware,
  routerMiddleware(history),
  apiMidleware,
  multidipacerMidleware,
];

let composedEnhancers;
if (__DEV__) {
  composedEnhancers = composeWithDevTools(
    applyMiddleware(...middleware),
    ...enhancers,
  );
  // composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
} else {
  composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
}

class InitStore extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      store: null,
      persistor: null,
    };
  }

  async componentDidMount() {
    const store = createStore(rootReducer, initialState, composedEnhancers);
    const persistor = persistStore(store);
    epicMiddleware.run(rootEpic);

    this.setState({ store, persistor, isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? null : (
      <Provider store={this.state.store}>
        <PersistGate loading={null} persistor={this.state.persistor}>
          <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <BackButton>
              <Pages />
            </BackButton>
          </MemoryRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default InitStore;
