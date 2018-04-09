import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import TabBar from './components/TabBar';
import MainStatusBar from './components/MainStatusBar';
import configureStore from './store/configureStore';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <View style={{flex: 1}}>
          <MainStatusBar backgroundColor='rgb(0, 188, 212)' barStyle='light-content' />
          <TabBar />
        </View>
      </Provider>
    );
  }
}
