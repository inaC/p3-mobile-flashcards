import React from 'react';
import { Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import TexButton from './TextButton';
import { saveCardToDeck } from '../utils/api';
import { addCardToDeck } from '../actions/index';

class AddCard extends React.Component {
  state = {
    question: '',
    answer: '',
  }

  setCardQuestion = input => this.setState({ question: input })

  setCardAnswer = input => this.setState({ answer: input })

  submitNewCard = () => {
    const { question, answer } = this.state;
    const { title } = this.props.navigation.state.params;
    const card = { question, answer };
    saveCardToDeck({ title, card })
      .then(() => this.props.submitCard(title, card))
      .then(() => Alert.alert('Success!', `Card added to '${title}'' deck!`));
  }
  renderSubmitButton = () => (
    <TexButton
      message="Submit Card"
      messageStyle={{ fontSize: 20 }}
      defaultColor="rgb(0, 188, 212)"
      disabled={(this.state.question.trim().length * this.state.answer.trim().length) === 0}
      disabledColor="rgb(236, 236, 236)"
      onPress={this.submitNewCard}
    />
  )

  render() {
    const { question, answer } = this.state;
    const { title } = this.props.navigation.state.params;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={[styles.title, { alignSelf: 'flex-start' }]}> Question </Text>
        <TextInput
          value={question}
          style={[styles.textInput, Platform.OS === 'ios' ? styles.textInputIos : {}]}
          placeholder="Enter question"
          onChangeText={this.setCardQuestion}
        />
        <Text style={[styles.title, { alignSelf: 'flex-start' }]}> Answer </Text>
        <TextInput
          value={answer}
          style={[styles.textInput, Platform.OS === 'ios' ? styles.textInputIos : {}]}
          placeholder="Enter answer"
          onChangeText={this.setCardAnswer}
        />
        {this.renderSubmitButton()}
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
    borderRadius: 4,
  },
  textInputIos: {
    borderColor: 'rgb(106,85,172)',
    borderBottomWidth: 2,
  },
});

const mapDispatchToProps = dispatch => ({
  submitCard: (deckTitle, card) => dispatch(addCardToDeck(deckTitle, card)),
});

export default connect(null, mapDispatchToProps)(AddCard);
