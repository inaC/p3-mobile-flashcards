import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';

class Quiz extends React.Component {
  state = {
    currentQuestion: 0,
    showAnswer: false,
    correctCount: 0,
  }

  showAnswer = () => this.setState(state => (
    {
      ...state,
      showAnswer: true,
    }
  ))

  restartQuiz = () => this.setState({
    currentQuestion: 0,
    showAnswer: false,
    correctCount: 0,
  })

  showNextQuestion = answeredCorrectly => this.setState(state => (
    {
      ...state,
      showAnswer: false,
      currentQuestion: state.currentQuestion + 1,
      correctCount: answeredCorrectly ? state.correctCount + 1 : state.correctCount,
    }
  ))


  renderAnswerWithFeedBack = answer => (
    <View style={{flex: 1}}>
      <Text style={{textAlign: 'center', fontSize: 30}}> {answer} </Text>
      <View style={{flex: 1, marginTop: 20}}>
        <TextButton
          message='Correct'
          messageStyle={{fontSize: 20}}
          defaultColor='green'
          onPressColor='red'
          onPress={() => this.showNextQuestion(true)}
          disabledColor='rgb(236, 236, 236)'
        />
        <TextButton
          message='Wrong'
          messageStyle={{fontSize: 20}}
          defaultColor='red'
          onPressColor='red'
          onPress={() => this.showNextQuestion(false)}
          disabledColor='rgb(236, 236, 236)'
        />
      </View>
    </View>
  )

  renderShowAnswerButton = () => (
    <View style={{flex: 1, marginTop: 20}}>
      <TextButton
        message='Show Answer'
        messageStyle={{fontSize: 20}}
        defaultColor='rgb(0, 188, 212)'
        onPressColor='red'
        onPress={this.showAnswer}
        disabledColor='rgb(236, 236, 236)'
      />
    </View>
  )
  renderFinalScore = (correctCount, totalQuestions) => (
    <View style={{flex: 1, marginTop: 20}}>
      <Text style={[styles.title, {alignSelf: 'flex-start'}]}> {correctCount}/{totalQuestions} correctly answered!</Text>
      <TextButton
        message='Restart Quiz'
        messageStyle={{fontSize: 20}}
        defaultColor='rgb(0, 188, 212)'
        onPressColor='red'
        onPress={this.restartQuiz}
        disabledColor='rgb(236, 236, 236)'
      />
    </View>
  )

  renderQuestion = (currentQuestion, totalQuestions, showAnswer, deck) => (
    <View style={{flex: 1, marginTop: 20}}>
      <Text style={[styles.title, {alignSelf: 'flex-start'}]}> {currentQuestion + 1}/{totalQuestions} </Text>
        <Text style={{textAlign: 'center', fontSize: 30}}> {deck.questions[currentQuestion].question} </Text>
        {showAnswer ? this.renderAnswerWithFeedBack(deck.questions[currentQuestion].answer) : this.renderShowAnswerButton()}
    </View>
  )

  render() {
    const { deck } = this.props;
    const totalQuestions = deck.questions.length;
    const { currentQuestion, showAnswer, correctCount } = this.state;
    const showScore = currentQuestion === totalQuestions;
    return (
      <View style={styles.container}>
        { showScore ?
          this.renderFinalScore(correctCount, totalQuestions) :
          this.renderQuestion(currentQuestion, totalQuestions, showAnswer, deck)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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

const mapStateToProps = (state, props) => ({
  deck: Object.keys(state || {}).map(title => state[title]).filter(deck => deck.title === props.navigation.state.params.title)[0],
});

export default connect(mapStateToProps, null)(Quiz);
