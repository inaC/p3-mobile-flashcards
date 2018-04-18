import React from 'react';
import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';

class DeckDetail extends React.Component {
  render() {
    const { title } = this.props.deck;
    const numberOfCards = this.props.deck.questions.length
    return (
      <View style={{flex: 1}}>
        <View style={[styles.item, Platform.OS === 'ios' ? styles.shadowIos : styles.shadowAndroid]}>
          <Text style={{textAlign: 'center', fontSize: 30}}> {title} </Text>
          <Text style={{textAlign: 'center', fontSize: 20}}> {numberOfCards} {`card${numberOfCards > 0 ? 's' : ''}`} </Text>
        </View>
        <View style={{flex: 1, marginTop: 20}}>
          <TextButton
            message='Add Card'
            messageStyle={{fontSize: 20}}
            defaultColor='rgb(0, 188, 212)'
            onPressColor='red'
            onPress={() => this.props.navigation.navigate('AddCard', { title: title })}
            disabledColor='rgb(236, 236, 236)'
          />
          <TextButton
            message='Start Quiz'
            messageStyle={{fontSize: 20}}
            defaultColor='rgb(0, 188, 212)'
            onPressColor='red'
            onPress={() => Alert.alert('quiz started!')}
            disabledColor='rgb(236, 236, 236)'
          />
        </View>
      </View>
    );
  }
}

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
