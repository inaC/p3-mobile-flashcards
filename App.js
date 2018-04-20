import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import MainNavigator from './components/TabBar';
import MainStatusBar from './components/MainStatusBar';
import configureStore from './store/configureStore';
import { setLocalNotification } from './utils/localNotification';

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={configureStore()}>
        <View style={{flex: 1}}>
          <MainStatusBar backgroundColor='rgb(0, 188, 212)' barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
