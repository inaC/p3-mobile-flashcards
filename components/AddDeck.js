import React from 'react';
import { Text, TextInput, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import { connect } from 'react-redux';
import TexButton from './TextButton';
import { getDeckTitles, saveDeckTitle, getDeck } from '../utils/api';
import { addDeck } from '../actions/index';

class AddDeck extends React.Component {
  state = {
    deckTitle: '',
    alreadyUsedTitles: null,
  }

  componentDidMount() {
    this.fetchAlreadyUsedTitles();
  }

  setDeckTitle = input => this.setState({ deckTitle: input })

  fetchAlreadyUsedTitles = () => getDeckTitles().then(titles => this.setState({ alreadyUsedTitles: titles }));

  submitNewDeck = () => {
    const { deckTitle, alreadyUsedTitles } = this.state;
    const trimmedTitle = deckTitle.trim();
    if (alreadyUsedTitles.indexOf(trimmedTitle) >= 0) Alert.alert('Error', `"${trimmedTitle}" is already used by another deck`);
    else {
      saveDeckTitle({ title: trimmedTitle })
        .then(this.fetchAlreadyUsedTitles)
        .then(() => getDeck({ title: trimmedTitle }))
        .then(deck => this.props.submitDeck(deck))
        .then(() => Alert.alert('Success!', `Deck "${trimmedTitle}" created!`))
        .then(() => this.setState({ deckTitle: '' }))
        .then(() => this.props.navigation.navigate('DeckDetail', { title: trimmedTitle }));
    }
  }

  renderSubmitButton = () => (
    <TexButton
      message="Submit"
      messageStyle={{ fontSize: 20 }}
      defaultColor="rgb(0, 188, 212)"
      disabled={this.state.deckTitle.trim().length === 0}
      disabledColor="rgb(236, 236, 236)"
      onPress={this.submitNewDeck}
    />
  )

  render() {
    const { deckTitle, alreadyUsedTitles } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}> What is the title of your new deck? </Text>
        <TextInput
          value={deckTitle}
          style={styles.textInput}
          placeholder="Enter deck title"
          onChangeText={this.setDeckTitle}
        />
        {alreadyUsedTitles && this.renderSubmitButton()}
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  textInput: {
    marginTop: 20,
    fontSize: 20,
    height: 40,
    textAlign: 'center',
    borderRadius: 4,
  },
});

const mapDispatchToProps = dispatch => ({
  submitDeck: deck => dispatch(addDeck(deck)),
});

export default connect(null, mapDispatchToProps)(AddDeck);
