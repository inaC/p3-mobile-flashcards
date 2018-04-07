import React from 'react';
import { View } from 'react-native';
import TabBar from './components/TabBar';
import MainStatusBar from './components/MainStatusBar';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MainStatusBar backgroundColor='rgb(0, 188, 212)' barStyle='light-content' />
        <TabBar />
      </View>
    );
  }
}
