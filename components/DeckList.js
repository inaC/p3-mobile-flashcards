import React from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions/index';
import Deck from './Deck';
import TextButton from './TextButton';

class DeckList extends React.Component {
  componentDidMount() {
    getDecks()
      .then(results => this.props.retrieveDecks(results));
  }

  renderDeck = ({ item }) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetail', { title: item.title })}>
      <Deck key={item.title} title={item.title} numberOfCards={item.questions.length}/>
    </TouchableOpacity>
  )

  renderNoDeckFound = () => (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Entypo name="emoji-sad" size={120} color="rgb(106,85,172)" />
        <Text style={{ textAlign: 'center', fontSize: 30, color: 'rgb(106,85,172)' }}> No deck created yet </Text>
        <TextButton
          message="Add Deck"
          messageStyle={{ fontSize: 20 }}
          defaultColor="rgb(0, 188, 212)"
          onPress={() => this.props.navigation.navigate('AddDeck')}
          disabledColor="rgb(236, 236, 236)"
        />
      </View>
    </ScrollView>
  )

  render() {
    const { decksArray } = this.props;

    return (
      <View style={styles.container}>
        {decksArray.length === 0 ?
          this.renderNoDeckFound() :
          <FlatList data={decksArray} renderItem={this.renderDeck} />}

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
