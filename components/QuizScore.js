import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { white, purple } from '../utils/colors'

class QuizScore extends Component {

  render() {
    const {deckId, deck, correct, incorrect, restart, navigation } = this.props
    return (
      <View style={styles.center}>
        <Text>Correct: {correct}</Text>
        <Text>Incorrect: {incorrect}</Text>
        <Text>{Math.round((correct/deck.questions.length)*100)}%</Text>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: purple, marginTop: 25}]}
          onPress={restart}
        >
          <Text style={{color: white}}>Restart Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: white, marginTop: 25}]}
          onPress={() => navigation.navigate('Deck', {deckId: deckId, deckName: deck.title})}
        >
          <Text style={{color: purple}}>Back to Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 16,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default withNavigation(QuizScore)
