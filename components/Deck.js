import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

class Deck extends React.Component {
  render() {
    const { title, numberOfCards } = this.props;
    return (
      <View style={[styles.item, Platform.OS === 'ios' ? styles.shadowIos : styles.shadowAndroid]}>
        <Text style={{textAlign: 'center', fontSize: 20}}> {title} </Text>
        <Text style={{textAlign: 'center'}}> {numberOfCards} {`card${numberOfCards > 0 ? 's' : ''}`} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'rgb(164, 229, 238)',
    borderRadius: Platform.OS === 'ios' ? 8 : 2,
    padding: 20,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
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

export default Deck;
