import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, StackNavigator } from 'react-navigation';
import AddDeck from './AddDeck';
import AddCard from './AddCard';
import DeckList from './DeckList';
import DeckDetail from './DeckDetail';
import Quiz from './Quiz';

const tabBarObject = {
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
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
  navigationOptions: {
    header: null,
  },
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

const stackRoutes = {
  Home: {
    screen: TabBar,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      title: 'Deck Details',
      justifyContents: 'flex-start',
      headerTintColor: 'black',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card To Deck',
      justifyContents: 'flex-start',
      headerTintColor: 'black',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      justifyContents: 'flex-start',
      headerTintColor: 'black',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    },
  },
};

const MainNavigator = StackNavigator(stackRoutes);

export default MainNavigator;
