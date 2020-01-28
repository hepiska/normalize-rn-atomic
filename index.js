import { AppRegistry } from 'react-native';
import App from './src';
import { name } from './app.json';

if (__DEV__) {
  import('./src/utils/reactotron').then(() =>
    console.log('Reactotron Configured'),
  );
}

AppRegistry.registerComponent(name, () => App);
