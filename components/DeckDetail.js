import React from 'react';
import { View, Text, StyleSheet, Platform, Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';

const DeckDetail = (props) => {
  const { title } = props.deck;
  const numberOfCards = props.deck.questions.length;
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={[styles.item, Platform.OS === 'ios' ? styles.shadowIos : styles.shadowAndroid]}>
          <Text style={{ textAlign: 'center', fontSize: 30 }}> {title} </Text>
          <Text style={{ textAlign: 'center', fontSize: 20 }}> {numberOfCards} {`card${numberOfCards > 0 ? 's' : ''}`} </Text>
        </View>
        <View style={{ flex: 1, marginTop: 20 }}>
          <TextButton
            message="Add Card"
            messageStyle={{ fontSize: 20 }}
            defaultColor="rgb(0, 188, 212)"
            onPress={() => props.navigation.navigate('AddCard', { title: title })}
            disabledColor="rgb(236, 236, 236)"
          />
          <TextButton
            message="Start Quiz"
            messageStyle={{ fontSize: 20 }}
            defaultColor="rgb(0, 188, 212)"
            disabled={numberOfCards === 0}
            onPress={() => numberOfCards > 0 ? props.navigation.navigate('Quiz', { title: title }) : Alert.alert('You must have at least 1 card to start the quiz')}
            disabledColor='rgb(236, 236, 236)'
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'rgb(164, 229, 238)',
    borderRadius: Platform.OS === 'ios' ? 8 : 2,
    // padding: 40,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40,
    marginBottom: 20,
  },
  shadowIos: {
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  shadowAndroid: {
    elevation: 5,
  },
});

const mapStateToProps = (state, props) => ({
  deck: Object.keys(state || {}).map(title => state[title]).filter(deck => deck.title === props.navigation.state.params.title)[0],
});

export default connect(mapStateToProps, null)(DeckDetail);
