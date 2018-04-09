import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions/index';
import Deck from './Deck';

class DeckList extends React.Component {
  componentDidMount() {
    getDecks()
      .then(results => this.props.retrieveDecks(results));
  }

  renderDeck = ({ item }) => (
    <Deck key={item.title} title={item.title} numberOfCards={item.questions.length}/>
  )

  render() {
    const { decksArray } = this.props;
    return (
      <View style={styles.container}>
        <FlatList data={decksArray} renderItem={this.renderDeck} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  decksArray: Object.keys(state || {}).map(title => state[title]),
});

const mapDispatchToProps = dispatch => ({
  retrieveDecks: decks => dispatch(receiveDecks(decks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
