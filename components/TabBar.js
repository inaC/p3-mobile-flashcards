import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator } from 'react-navigation';
import AddDeck from './AddDeck';
import DeckList from './DeckList';

const tabBarObject = {
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Mocked Decks',
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={`ios-list-box${focused ? '' : '-outline'}`} size={30} color={tintColor} />,
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={`ios-add-circle${focused ? '' : '-outline'}`} size={30} color={tintColor} />,
    },
  },
};

const options = {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'rgb(106,85,172)' : 'white',
    style: {
      height: 50,
      backgroundColor: Platform.OS === 'ios' ? 'white' : 'rgb(106,85,172)',
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
};

const TabBar = TabNavigator(tabBarObject, options);

export default TabBar;
