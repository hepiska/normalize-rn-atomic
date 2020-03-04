import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import App from './src';
import { name } from './app.json';

if (__DEV__) {
  import('./src/utils/reactotron').then(() =>
    console.log('Reactotron Configured'),
  );
}

AppRegistry.registerComponent(name, () => App);
