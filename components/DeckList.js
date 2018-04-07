import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getDecks, getDeck, getDeckTitles } from '../utils/api';

export default class App extends React.Component {
  state = {
    deck: null,
    foundDeck: null,
    deckTitles: null
  }
  componentDidMount() {
    getDecks()
      .then(results => this.setState({deck: results}))
      .then(() => getDeck({ title: 'Teste' }).then(r => this.setState({ foundDeck: r})))
      .then(() => getDeckTitles().then(r => this.setState({ deckTitles: r})));
  }
  render() {
    const { deck, foundDeck, deckTitles } = this.state;
    return (
      <View style={styles.container}>
        <Text> Deck: {JSON.stringify(deck)} </Text>
        <Text> FoundDeck: {JSON.stringify(foundDeck)} </Text>
        <Text> DeckTitle: {JSON.stringify(deckTitles)} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
